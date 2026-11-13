from pathlib import Path
import json,datetime,zoneinfo
root=Path(__file__).resolve().parents[2];f=root/'26_1113/_research_runs/knowhow-1-manifest.json';m=json.loads(f.read_text(encoding='utf-8'));now=datetime.datetime.now(zoneinfo.ZoneInfo('Asia/Seoul')).isoformat(timespec='seconds')
finish=json.loads((f.parent/'knowhow-finish-result.json').read_text(encoding='utf-8'));assert all(x.get('result',{}).get('closedSpace') is True for x in finish)
m.update({'status':'complete','completedAtKST':now,'spaceCleanup':'Space 5, 6, 7 각각 finish({keep: []}) closedSpace=true; 후속 listTaskSpaces 결과 비어 있음','sheetVisualVerification':'연결 도구의 서식 및 표시값 재조회; Google 렌더 화면은 별도 검수하지 않음'})
for row in m['rows']:
 row.update({'status':'complete','sheet':{'before':'I 키워드 일치, A·C 공란 및 서식·검증 확인','write':'A 날짜값 46339, C 한글 ㅇ','verify':'A 2026-11-13(날짜값 46339), C ㅇ, I 키워드 일치','verifiedAtKST':now},'spaceCleanup':'finish closedSpace=true, 후속 목록에 없음','resume':None})
 d=root/'26_1113'/('노하우_'+row['keyword'])/'웹조사';state=json.loads((d/'evidence/browser.json').read_text(encoding='utf-8'));state.update({'status':'finished','closedSpace':True});(d/'evidence/browser.json').write_text(json.dumps(state,ensure_ascii=False,indent=2),encoding='utf-8')
f.write_text(json.dumps(m,ensure_ascii=False,indent=2),encoding='utf-8');print(f.read_text(encoding='utf-8'))
