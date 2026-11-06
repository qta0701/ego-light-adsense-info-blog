import json
from pathlib import Path
import shutil
import time
import uuid
import unittest
from PIL import Image
from research_pipeline import initialize, local, check, package, write


class PipelineTests(unittest.TestCase):
    def setUp(self):
        self.test_base=Path(__file__).resolve().parents[1]/'.test-research'
        self.root=self.test_base/uuid.uuid4().hex
        self.root.mkdir(parents=True)
        (self.root/'guidelines').mkdir();(self.root/'guidelines/a.md').write_text('guide')
        self.config={'date':'2026-11-06','spreadsheetId':'test','jobs':[
            {'tab':'앱사용','row':46,'keyword':'테스트 하나'},
            {'tab':'앱사용','row':47,'keyword':'테스트 둘'}]}

    def tearDown(self):
        target=self.root.resolve()
        if target.parent != self.test_base.resolve(): raise ValueError('Unsafe cleanup path')
        for attempt in range(10):
            try:
                shutil.rmtree(target)
                break
            except PermissionError:
                if attempt==9: raise
                time.sleep(0.15)
        if not any(self.test_base.iterdir()): self.test_base.rmdir()

    def test_isolation_and_existing_results(self):
        manifest=json.loads(initialize(self.config,self.root).read_text('utf-8'))
        self.assertEqual(len({j['spaceName'] for j in manifest['jobs']}),2)
        self.assertEqual(len({j['folder'] for j in manifest['jobs']}),2)
        with self.assertRaises(ValueError): initialize(self.config,self.root)

    def test_duplicate_and_path_traversal(self):
        self.config['jobs'][1]['row']=46
        with self.assertRaises(ValueError): initialize(self.config,self.root)
        for p in ['../secret','C:/old/root','/tmp/outside']:
            with self.assertRaises(ValueError):local(self.root,p)

    def test_complex_keyword_two_queries(self):
        self.config['jobs'][0].update({'multiIntent':True,'queries':['당근마켓 카드 결제 구매 방법','당근마켓 판매 수수료 정산']})
        manifest=json.loads(initialize(self.config,self.root).read_text('utf-8'))
        self.assertEqual(len(manifest['jobs'][0]['queries']),2)
        self.assertEqual(len({j['spaceName'] for j in manifest['jobs']}),2)

    def fixture(self):
        manifest=json.loads(initialize(self.config,self.root).read_text('utf-8'))
        d=local(self.root,manifest['jobs'][0]['folder']);data=json.loads((d/'research.json').read_text('utf-8'))
        data['body']='확인된 내용과 단계별 설명입니다. '*220
        data['sources']=[{'id':f'S{i}','url':f'https://example.org/{i}', 'title':'공식 안내',
                          'official':True,'checkedAt':'2026-11-06'} for i in (1,2)]
        for n in range(5):
            Image.new('RGB',(390,844),(n*50,80,120)).save(d/f'raw/{n}.png')
            data['images'].append({'role':'search' if n==0 else 'guide','file':f'raw/{n}.png','sourceId':'S1',
                                  'query':data['queries'][0] if n==0 else None,
                                  'alt':'검색 결과' if n==0 else '단계 화면','caption':'공식 링크 확인' if n==0 else '단계별 버튼 확인',
                                  'boxes':[[20,70,120,50]]})
        write(d/'research.json',data);return d,data

    def test_bounds_duplicates_and_budget(self):
        d,data=self.fixture();self.assertEqual(check(d,data),[])
        data['images'][0]['boxes']=[[380,0,20,20]]
        self.assertTrue(any('표식' in e for e in check(d,data)))
        data['images'][0]['boxes']=[[20,70,120,50]]
        data['images'] += [data['images'][0]]*3
        errors=check(d,data)
        self.assertTrue(any('중복' in e for e in errors))
        self.assertTrue(any('중복' in e for e in errors))

    def test_pack_requires_visual_review(self):
        d,data=self.fixture();out=package(d,data)
        self.assertEqual(len(list(out.glob('*.png'))),5)
        self.assertEqual(json.loads((d/'validation.json').read_text('utf-8'))['status'],'needs_visual_review')
        data['visualReviewed']=True;write(d/'research.json',data);package(d,data)
        self.assertEqual(json.loads((d/'validation.json').read_text('utf-8'))['status'],'ready_for_sheet')

    def test_search_capture_is_required_for_each_complex_query(self):
        self.config['jobs'][0].update({'multiIntent':True,'queries':['당근마켓 카드 결제 구매 방법','당근마켓 판매 수수료 정산']})
        d,data=self.fixture()
        self.assertTrue(any('검색결과 이미지' in e for e in check(d,data)))
        Image.new('RGB',(390,844),(210,230,240)).save(d/'raw/extra.png')
        data['images'].append({'role':'search','file':'raw/extra.png','sourceId':'S1',
            'query':data['queries'][1],'alt':'두 번째 검색 결과','caption':'공식 결과 링크',
            'boxes':[[20,70,120,50]]})
        self.assertEqual(check(d,data),[])

    def test_repack_preserves_identical_files(self):
        d,data=self.fixture();out=package(d,data)
        image=out/'01_search.png';before=image.stat().st_mtime_ns
        package(d,data)
        self.assertEqual(image.stat().st_mtime_ns,before)

    def test_qr_redaction_and_related_sources(self):
        d,data=self.fixture()
        data['images'][0]['redactions']=[[200,200,100,100]]
        data['sources'][0]['relatedUrls']=[{'title':'추가 공식 안내','url':'https://example.org/details'}]
        out=package(d,data)
        with Image.open(out/'01_search.png') as im:
            self.assertEqual(im.getpixel((int(250*720/390),int(280*720/390))),(36,51,74))
        self.assertIn('https://example.org/details',(out/'앱사용_테스트 하나_웹조사결과.md').read_text('utf-8'))
        data['images'][0]['redactions']=[[380,200,100,100]]
        self.assertTrue(any('표식' in e for e in check(d,data)))


if __name__=='__main__':unittest.main()
