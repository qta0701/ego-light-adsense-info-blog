import unittest
from naver_workflow import allocate, next_time, schedule_decision, prepare, sheet_plan, PROFILES
from pathlib import Path
from uuid import uuid4


class NaverWorkflowTests(unittest.TestCase):
    def test_balanced_allocation_and_no_duplicate_profiles_in_first_cycle(self):
        for count in (1, 4, 6, 17):
            jobs = [{'tab': '앱사용', 'row': n + 2, 'keyword': f'k{n}'} for n in range(count)]
            plan = allocate(jobs, seed=7)
            self.assertTrue(all(j['publishMode'] == 'pending_timeline_check' for j in plan))
            counts = [sum(j['account'] == p['account'] for j in plan) for p in PROFILES]
            self.assertLessEqual(max(counts) - min(counts), 1)
            self.assertEqual(len({j['account'] for j in plan[:4]}), min(count, 4))
            for account in {j['account'] for j in plan}:
                self.assertEqual([j['indexOnProfile'] for j in plan if j['account'] == account],
                                 list(range(sum(j['account'] == account for j in plan))))

    def test_duplicate_work_is_rejected(self):
        job = {'tab': '앱사용', 'row': 34, 'keyword': '카카오톡 무료 이모티콘'}
        with self.assertRaises(ValueError):
            allocate([job, job])

    def test_schedule_rollover_and_precision(self):
        self.assertEqual(next_time('2026-11-10T23:32:12+09:00'), '2026-11-11T01:40:00+09:00')
        self.assertEqual(next_time('2026-11-10T20:00:00+09:00'), '2026-11-10T22:00:00+09:00')
        with self.assertRaises(ValueError):
            next_time('2026-11-10T20:00:00')

    def fixture(self):
        return {
            'job': {'tab': '앱사용', 'row': 34, 'keyword': '카카오톡 무료 이모티콘',
                    'account': 'qta14', 'promotionUrl': 'https://app.supportimes.com/2026/11/blog-post_468.html'},
            'event': {'verified': True, 'status': 'published', 'account': 'qta14',
                      'publicationTime': '2026-11-10T23:32:12+09:00',
                      'publicUrl': 'https://blog.naver.com/qta14/224472271533'},
            'source': {'sheetId': 1, 'row': 34, 'keyword': '카카오톡 무료 이모티콘', 'completionCell': {}},
            'ledger': {'sheetId': 2, 'row': 876, 'lastDataRow': 875,
                       'headers': {'A': '블로그 업로드 날짜', 'D': '카테고리', 'E': '메인 키워드',
                                   'F': '애드센스 포스팅 링크', 'H': '네이버 블로그 포스팅 링크',
                                   'I': '1.almawade1', 'J': '2.qta14', 'K': '3.supportimes001', 'L': '4.chocolateelf'},
                       'targetCells': {col: {} for col in 'ADEFHJ'}}}

    def test_existing_publication_and_queue_control_first_job(self):
        now = '2026-11-11T00:30:00+09:00'
        self.assertEqual(schedule_decision(now, '2026-11-10T23:32:12+09:00', [])['publicationTime'],
                         '2026-11-11T01:40:00+09:00')
        self.assertEqual(schedule_decision(now, '2026-11-03T23:59:59+09:00', [])['mode'], 'current')
        self.assertEqual(schedule_decision(now, '2026-11-03T23:59:59+09:00',
                         ['2026-11-11T02:00:00+09:00'])['publicationTime'], '2026-11-11T04:00:00+09:00')
        with self.assertRaises(ValueError):
            schedule_decision(now, None, None)

    def test_real_urls_survive_converter_input(self):
        test_root = Path(__file__).resolve().parents[1] / '.session'
        test_root.mkdir(exist_ok=True)
        root = test_root / ('naver-test-' + uuid4().hex)
        try:
            folder = root / '26_1106' / '앱사용_테스트'
            publish = folder / '웹조사' / 'publish'
            publish.mkdir(parents=True)
            guide = root / 'guidelines' / 'fixture.md'
            guide.parent.mkdir()
            guide.write_text('fixture', encoding='utf-8')
            url = 'https://example.com/post'
            (publish / '앱사용_테스트_네이버블로그.md').write_text(
                '| CTA👇 |\n :---: \n\n' + url + '\n\n' + url + '\n', encoding='utf-8')
            result = prepare(folder.relative_to(root).as_posix(), root)
            self.assertEqual(result['converterMarkdown'].count(url), 2)
            self.assertNotIn('NAVEROG', result['converterMarkdown'])
            self.assertEqual([x['marker'] for x in result['links']], ['NAVEROG1', 'NAVEROG2'])
        finally:
            self.assertTrue(root.resolve().is_relative_to(test_root.resolve()))
            source = publish / '앱사용_테스트_네이버블로그.md'
            if source.exists():
                source.unlink()
            if guide.exists():
                guide.unlink()
                guide.parent.rmdir()
            for directory in (publish, publish.parent, folder, folder.parent, root):
                if directory.exists():
                    directory.rmdir()

    def test_exact_sheet_columns_and_success_guard(self):
        data = self.fixture()
        plan = sheet_plan(data)
        self.assertEqual([r['updateCells']['start']['columnIndex'] for r in plan['ledgerRequests']],
                         [0, 3, 4, 5, 7, 9])
        self.assertEqual(plan['sourceRequests'][0]['updateCells']['start']['rowIndex'], 33)
        data['event']['verified'] = False
        with self.assertRaises(ValueError):
            sheet_plan(data)

    def test_existing_formula_or_false_is_not_blank(self):
        for value in ({'formulaValue': '=""'}, {'boolValue': False}, {'numberValue': 0}, {'stringValue': ' '}):
            data = self.fixture()
            data['ledger']['targetCells']['E'] = {'userEnteredValue': value}
            with self.assertRaises(ValueError):
                sheet_plan(data)


if __name__ == '__main__':
    unittest.main()
