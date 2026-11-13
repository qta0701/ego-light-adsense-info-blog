from pathlib import Path
import json
root=Path(__file__).resolve().parents[2];runs=root/'26_1113'/'_research_runs';path=runs/'knowhow2-1-manifest.json'
old=json.loads(path.read_text(encoding='utf-8'))
details=[(34,'진학어플라이 회원가입',8,4,4,'가입 화면의 h2 선택자가 모호해 캡처 실패; 공식 가이드 예시로 대체.'),(35,'인스타그램 탈퇴방법',9,5,5,'초기 main 선택자가 없어 캡처 실패; 같은 공식 문서의 실제 요소로 재시도해 성공.'),(36,'배민클럽 환불',10,7,4,'공식 약관은 Google에서 색인되지 않아 직접 방문. 외부 단계 안내의 첫 캡처는 페이지 변경으로 실패했으나 안정화 후 성공; 광고를 잘라냄. 약관 스크린샷은 일부 겹치나 별도 조건을 표시.')]
rows=[]
for row,key,sid,raw,pub,issue in details:
 folder=f'26_1113/노하우2_{key}/웹조사';d=root/folder
 state=json.loads((d/'evidence'/'browser.json').read_text(encoding='utf-8'));state.update(status='finished',finishedVia='TaskSpace.finish({keep:[]})',postFinish='user-owned space remains visible' if sid==10 else 'absent from listTaskSpaces');(d/'evidence'/'browser.json').write_text(json.dumps(state,ensure_ascii=False,indent=2),encoding='utf-8')
 rows.append({'row':row,'keyword':key,'spaceId':sid,'folder':folder,'result':f'{folder}/publish/노하우2_{key}_웹조사결과.md','rawImageCount':raw,'publishedImageCount':pub,'markedImageCount':pub,'review':f'{folder}/evidence/review.json','validation':'구 수량 검사 미통과; 대안 검수 완료','sheet':{'precheck':'I 일치, A·C 공란','A':'2026-11-13 (numberValue 46339; DATE yyyy-MM-dd)','C':'ㅇ','postcheck':'A·C·I 재조회 일치'},'captureIssuesAndAlternatives':issue,'resumePoint':None,'spaceFinish':'finish({keep:[]}) 성공; 목록에서 사라짐' if sid!=10 else 'finish({keep:[]}) 성공; 이후 목록에 사용자 소유 Space로 남음. 추가 조작하지 않음','status':'complete'})
old.update(status='complete_with_space_retained',date='2026-11-13',spreadsheetId='1KAnq9pvZ7VYFJOAQ_25cM8EjaDFUX5Z6x9jfCCtTf7s',sheetId=962861723,runManifest='26_1113/_research_runs/20261113-89fb2b97/manifest.json',rows=rows,summary='3행 자료·시트 완료. Space 10은 finish 성공 후 사용자 소유 상태로 남아 보존.')
path.write_text(json.dumps(old,ensure_ascii=False,indent=2),encoding='utf-8')
print(path)
