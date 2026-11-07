import copy
from datetime import datetime
import json
from pathlib import Path
import tempfile
import unittest
from concurrent.futures import ThreadPoolExecutor

import blogger_workflow as b


class WorkflowTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.root = Path(self.tmp.name)
        (self.root / 'guidelines').mkdir()
        (self.root / 'guidelines/test.md').write_text('test', encoding='utf-8')
        self.folder = '26_1107/앱사용_테스트'
        (self.root / self.folder).mkdir(parents=True)
        self.now = datetime.fromisoformat('2026-11-07T21:42:47+09:00')
        self.snapshot = {'spreadsheetId': b.SHEET, 'sheetId': 2121839224, 'tab': '앱사용', 'row': 4,
            'headerRow': 1, 'keyword': '테스트', 'readAt': self.now.isoformat(),
            'headers': ['날짜', 'No.', '수집', b.HEADERS['content'], '기타', '기타2', b.HEADERS['draft'], b.HEADERS['url'], b.HEADERS['keyword'], 'PC', '모바일', b.HEADERS['published_at']],
            'cells': [{} for _ in range(12)]}
        self.snapshot['cells'][8] = {'userEnteredValue': {'stringValue': '테스트'}}
        self.job = {'spreadsheetId': b.SHEET, 'tab': '앱사용', 'row': 4, 'folder': self.folder,
            'stage': 'A', 'owner': 'test-chat'}

    def pair(self, sub='웹조사/publish'):
        d = self.root / self.folder / sub
        d.mkdir(parents=True, exist_ok=True)
        (d / '앱사용_테스트_html콘텐츠.html').write_text('<p>검수된 본문</p>', encoding='utf-8')
        (d / '앱사용_테스트_제목메타디스크립션.txt').write_text('검수된 메타', encoding='utf-8')
        return d

    def test_scan_whole_keyword_tree(self):
        self.assertEqual(b.scan(self.folder, self.root)['status'], 'create')
        self.pair('outputs/legacy')
        self.assertEqual(b.scan(self.folder, self.root)['status'], 'skip_existing')
        self.pair()
        self.assertEqual(b.scan(self.folder, self.root)['status'], 'review_duplicates')

    def test_partial_empty_and_split_pair(self):
        d = self.pair()
        (d / '앱사용_테스트_html콘텐츠.html').write_text('', encoding='utf-8')
        self.assertEqual(b.scan(self.folder, self.root)['status'], 'review_partial')
        (d / '앱사용_테스트_html콘텐츠.html').write_text('html', encoding='utf-8')
        p = d / '앱사용_테스트_제목메타디스크립션.txt'
        p.rename(self.root / self.folder / p.name)
        self.assertEqual(b.scan(self.folder, self.root)['status'], 'review_partial')

    def test_wrong_project_and_path(self):
        for path in ('../outside', 'C:/outside', '26_1107', self.folder + '/웹조사'):
            with self.assertRaises(ValueError):
                b.scan(path, self.root)
        (self.root / 'guidelines/test.md').unlink()
        with self.assertRaises(ValueError):
            b.scan(self.folder, self.root)

    def test_concurrent_claim_and_release_owner(self):
        def attempt(_):
            try:
                return b.claim(self.job, self.root)
            except FileExistsError:
                return None
        with ThreadPoolExecutor(max_workers=3) as pool:
            receipts = list(pool.map(attempt, range(3)))
        winners = [r for r in receipts if r]
        self.assertEqual(len(winners), 1)
        fake = copy.deepcopy(winners[0])
        fake['token'] = 'wrong'
        with self.assertRaises(ValueError):
            b.release(fake, self.root)
        b.release(winners[0], self.root)
        self.assertEqual(list((self.root / '.session/blogger-workflow/locks').glob('*.json')), [])

    def test_existing_results_rollback_claim(self):
        self.pair()
        with self.assertRaises(ValueError):
            b.claim(self.job, self.root)
        self.assertEqual(list((self.root / '.session/blogger-workflow/locks').glob('*.json')), [])

    def test_headers_reordered(self):
        s = self.snapshot
        s['headers'][3], s['headers'][4] = s['headers'][4], s['headers'][3]
        self.assertEqual(b.preflight(s, self.now)['columns']['content'], 'E')
        s['headers'][2] = b.HEADERS['content']
        with self.assertRaises(ValueError):
            b.preflight(s, self.now)

    def test_formula_empty_and_draft_gate(self):
        self.assertEqual(b.preflight(self.snapshot, self.now)['decision'], 'eligible_new')
        self.snapshot['cells'][6] = {'userEnteredValue': {'formulaValue': '=IF(TRUE,"","")'}, 'formattedValue': ''}
        self.assertEqual(b.preflight(self.snapshot, self.now)['decision'], 'resume_existing_only')
        self.snapshot['cells'][7] = {'userEnteredValue': {'stringValue': 'https://blog.example/post'}}
        self.assertEqual(b.preflight(self.snapshot, self.now)['decision'], 'skip_existing_link')

    def test_stale_and_keyword_mismatch(self):
        self.snapshot['readAt'] = '2026-11-07T21:32:47+09:00'
        with self.assertRaises(ValueError):
            b.preflight(self.snapshot, self.now)
        self.snapshot['readAt'] = self.now.isoformat()
        self.snapshot['keyword'] = '다른 키워드'
        with self.assertRaises(ValueError):
            b.preflight(self.snapshot, self.now)

    def test_content_pair_and_exact_field(self):
        event = {'type': 'content', 'verified': True, 'folder': self.folder}
        with self.assertRaises(ValueError):
            b.sheet_plan(self.snapshot, event, self.root, self.now)
        self.pair()
        plan = b.sheet_plan(self.snapshot, event, self.root, self.now)
        self.assertEqual(plan['changes'], [{'cell': 'D4', 'value': 'ㅇ'}])
        self.assertEqual(plan['requests'][0]['updateCells']['fields'], 'userEnteredValue')
        self.snapshot['cells'][3] = {'userEnteredValue': {'stringValue': 'ㅇ'}}
        self.assertEqual(b.sheet_plan(self.snapshot, event, self.root, self.now)['requests'], [])

    def test_draft_does_not_write_link_or_time(self):
        event = {'type': 'draft', 'verified': True, 'blogId': 'b', 'postId': 'p', 'savedAt': self.now.isoformat()}
        self.assertEqual(b.sheet_plan(self.snapshot, event, self.root, self.now)['changes'], [{'cell': 'G4', 'value': 'ㅇ'}])

    def test_published_batch_and_korean_time(self):
        event = {'type': 'published', 'verified': True, 'blogId': 'b', 'postId': 'p',
            'url': 'https://blog.example/2026/11/post.html', 'publishedAt': '2026-11-07T12:42:47Z'}
        plan = b.sheet_plan(self.snapshot, event, self.root, self.now)
        self.assertEqual([c['cell'] for c in plan['changes']], ['G4', 'H4', 'L4'])
        expected = (datetime(2026, 11, 7, 21, 42, 47) - datetime(1899, 12, 30)).total_seconds() / 86400
        self.assertAlmostEqual(plan['changes'][2]['value'], expected)
        for change in plan['changes']:
            idx = {'G4': 6, 'H4': 7, 'L4': 11}[change['cell']]
            value = change['value']
            self.snapshot['cells'][idx] = {'userEnteredValue': {'numberValue' if isinstance(value, float) else 'stringValue': value}}
        self.assertEqual(b.sheet_plan(self.snapshot, event, self.root, self.now)['requests'], [])

    def test_conflicting_link_does_not_build_partial_plan(self):
        self.snapshot['cells'][7] = {'userEnteredValue': {'stringValue': 'https://other.example/post'}}
        event = {'type': 'published', 'verified': True, 'blogId': 'b', 'postId': 'p',
            'url': 'https://blog.example/post', 'publishedAt': self.now.isoformat()}
        with self.assertRaises(ValueError):
            b.sheet_plan(self.snapshot, event, self.root, self.now)

    def test_validation_and_future_publish(self):
        event = {'type': 'draft', 'verified': True, 'blogId': 'b', 'postId': 'p', 'savedAt': self.now.isoformat()}
        self.snapshot['cells'][6] = {'dataValidation': {'strict': True, 'condition': {'type': 'BOOLEAN'}}}
        with self.assertRaises(ValueError):
            b.sheet_plan(self.snapshot, event, self.root, self.now)
        self.snapshot['cells'][6] = {}
        event.update(type='published', url='https://blog.example/post', publishedAt='2026-11-08T12:00:00+09:00')
        with self.assertRaises(ValueError):
            b.sheet_plan(self.snapshot, event, self.root, self.now)


if __name__ == '__main__':
    unittest.main()
