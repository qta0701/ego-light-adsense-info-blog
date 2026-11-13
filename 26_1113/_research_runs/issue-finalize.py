from pathlib import Path
import json,datetime,zoneinfo
root=Path(__file__).resolve().parents[2]; f=root/'26_1113/_research_runs/issue-1-manifest.json'
m=json.loads(f.read_text(encoding='utf-8')); now=datetime.datetime.now(zoneinfo.ZoneInfo('Asia/Seoul')).isoformat(timespec='seconds')
m.update({'status':'complete','completedAtKST':now,'sheetId':448262533,'spaceCleanup':'각 Space finish({keep:[]}) 반환 closedSpace=true; 후속 목록에서 2, 3, 4 없음','spaceListTransient':'첫 종료 직후 목록에 4가 잠시 표시되었으나 재조회에서 없음'})
for row in m['rows']:
 row.update({'status':'complete','sheet':{'before':'I 키워드 일치, A와 C 공란; 셀 서식·검증 확인','write':'A 날짜값 46339, C 한글 ㅇ','verify':'A 2026-11-13 (날짜값 46339), C ㅇ, I 키워드 일치','verifiedAtKST':now},'spaceCleanup':'finished; closedSpace=true; 후속 목록에서 없음','resume':None})
f.write_text(json.dumps(m,ensure_ascii=False,indent=2),encoding='utf-8')
print(f.read_text(encoding='utf-8'))
