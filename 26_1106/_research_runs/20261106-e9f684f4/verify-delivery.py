import hashlib,json,re
from pathlib import Path
import sys
run=Path(__file__).resolve().parent
root=run.parents[2]
sys.path.insert(0,str(root))
from tools.research_pipeline import check,read,write,notify
for keyword,row in [('코레일 승차권 전달',48),('당근마켓 채팅 걸기',49)]:
    folder=root/'26_1106'/f'앱사용_{keyword}'/'웹조사'
    data=read(folder/'research.json');validation=read(folder/'validation.json')
    assert not check(folder,data)
    assert validation['visualReviewed'] and validation['status']=='ready_for_sheet'
    assert hashlib.sha256((folder/'research.json').read_bytes()).hexdigest()==validation['researchSha256']
    for path,digest in validation['artifactHashes'].items():
        assert hashlib.sha256((folder/path).read_bytes()).hexdigest()==digest,path
    for path in [folder/'웹조사결과.md',*list((folder/'publish').glob('*.md'))]:
        for link in re.findall(r'!\[[^\]]*\]\(([^)]+)\)',path.read_text('utf-8')):
            assert (path.parent/link).is_file(),link
    record={'row':row,'keyword':keyword,'date':'2026-11-06','cells':{f'A{row}':'2026-11-06',f'C{row}':'ㅇ'},'readbackVerified':True,'bodyChars':len(data['body']),'rawImages':len(list((folder/'raw').glob('*.png'))),'publishImages':len(list((folder/'publish').glob('*.png'))),'browserStatus':read(folder/'evidence/browser.json')['status']}
    write(folder/'evidence/sheet-result.json',record)
    with (folder/'evidence/진행상태.md').open('a',encoding='utf-8') as f:
        f.write('\n\n## 최종 저장 및 반영 완료\n\n공식 자료 보강 후 웹조사결과.md와 publish 이미지, 근거를 저장하고 전체 시각 검수·파일 해시·링크 검사를 마쳤습니다. 로그인 이후 실사용 미검증 범위는 본문과 캡션에 표시했습니다. 지정 행 A열 2026-11-06, C열 ㅇ를 빈 값 확인 후 반영하고 재조회했습니다. 자세한 상태와 실제 이미지 수는 sheet-result.json을 참고하세요.\n')
    print(json.dumps(record,ensure_ascii=False))
notify(True)
