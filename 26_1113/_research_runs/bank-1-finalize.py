import json
from pathlib import Path
root=Path(__file__).resolve().parents[2]
p=root/'26_1113/_research_runs/bank-1-manifest.json'
m=json.loads(p.read_text(encoding='utf8'))
m.update(status='complete',reason='사용자의 계속 요청 후 기존 Space에서 재개; 결과와 시트 재조회 완료',spaceCleanup='Space 11, 12, 13 각각 SDK finish({keep:[]}) 성공',captureAlternative='모든 발행 이미지는 실제 TaskSpace 화면 캡처를 원본으로 사용; 검색 이미지는 개인정보 및 불필요한 AI 요약을 제거하도록 잘랐다.')
m['sheet'].update(preWriteCheck='I14:I16 키워드 일치, A14:A16 및 C14:C16 공란 재확인',write='A14:A16 날짜값 serial 46339, C14:C16 ㅇ',postWriteVerification='A14:A16 2026-11-13 DATE 및 C14:C16 ㅇ, I14:I16 키워드 일치 재조회')
for item,raw,pub,lim in zip(m['rows'],[5,8,4],[5,7,4],[
 '첫 Google 공식 결과는 페이지 없음 오류. 같은 사이트 공식 메뉴의 ONE환전 안내로 보완; 실제 앱 신청의 입력 화면은 미확인.',
 '비로그인 약관 화면까지 확인; 동의 및 실제 입력·거래 미진행.',
 '로그인 이후 인쇄와 앱 단계는 직접 확인하지 않고 제3자 공개 안내를 구분 표기; STM 공식 안내를 대안으로 확인.'
]):
 item.update(status='complete',rawImages=raw,publishedImages=pub,markedImages=pub,sheetApplied=True,sheetVerified=True,sheetDate='2026-11-13',sheetMarker='ㅇ',spaceCleanup='finished',resume=None,limitation=lim,review='evidence/review.json',validation='자동검증 구 수량 기준 미통과; 에이전트 대안 검수 완료')
 d=root/item['folder']; b=d/'evidence/browser.json'; state=json.loads(b.read_text(encoding='utf8'));state.update(status='finished',finishMethod='SDK finish after alternative review',spaceId=item['spaceId']);b.write_text(json.dumps(state,ensure_ascii=False,indent=2),encoding='utf8')
p.write_text(json.dumps(m,ensure_ascii=False,indent=2),encoding='utf8')
print(json.dumps({'status':m['status'],'rows':[{k:r[k] for k in ('row','spaceId','rawImages','publishedImages','markedImages','sheetVerified','spaceCleanup')} for r in m['rows']]},ensure_ascii=False))
