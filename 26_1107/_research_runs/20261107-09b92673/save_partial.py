import json
from pathlib import Path

root = Path(__file__).resolve().parents[3]
jobs = [
    ('11월 넷플릭스 한국영화 순위', 'https://www.netflix.com/tudum/top10/south-korea', 'Netflix Top 10: South Korea Movies', []),
    ('11월 넷플릭스 오리지널 순위', 'https://www.netflix.com/tudum/top10', 'Netflix Top 10: Global Movies', []),
    ('넷플릭스 성인인증 방법', 'https://help.netflix.com/ko/node/41299', '넷플릭스 성인 인증 방법', [{'id': 'S2', 'title': '성인 인증 실패', 'url': 'https://help.netflix.com/ko/node/109172', 'official': True, 'checkedAt': '2026-11-07'}]),
]
for keyword, url, title, extra in jobs:
    folder = root / '26_1107' / ('앱사용_' + keyword) / '웹조사'
    research_file = folder / 'research.json'
    data = json.loads(research_file.read_text(encoding='utf-8'))
    if data['body'] or data['sources'] or data['images']:
        raise RuntimeError(f'Existing research is not empty: {keyword}')
    draft = (folder / 'publish' / ('앱사용_' + keyword + '_웹조사결과.md')).read_text(encoding='utf-8')
    data['body'] = draft.split('\n\n', 2)[2].split('\n## 출처와 조사 메모')[0]
    data['sources'] = [{'id': 'S1', 'title': title, 'url': url, 'official': True, 'checkedAt': '2026-11-07'}] + extra
    if keyword == '넷플릭스 성인인증 방법':
        data['sources'][0]['relatedUrls'] = [{'title': '프로필 관람등급 설정 (검색 결과만 확인)', 'url': 'https://help.netflix.com/ko/node/114276'}]
    research_file.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    state_file = folder / 'evidence' / 'browser.json'
    state = json.loads(state_file.read_text(encoding='utf-8'))
    state['status'] = 'blocked'
    state['blockReason'] = 'Capture failed: ego-lite window is minimized. Restore window before resuming existing Space.'
    state_file.write_text(json.dumps(state, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(keyword, 'body chars:', len(data['body']), 'images:', len(data['images']))
