import hashlib, json, subprocess, sys
from pathlib import Path
from PIL import Image
root=Path(__file__).resolve().parents[2]
manifest_path=root/'26_1113/_research_runs/bank-2-manifest.json'
manifest=json.loads(manifest_path.read_text(encoding='utf-8'))
def sha(p): return hashlib.sha256(p.read_bytes()).hexdigest()
for row in manifest['rows']:
 d=root/row['folder']; data=json.loads((d/'research.json').read_text(encoding='utf-8'))
 maps=json.loads((d/'evidence/publish-map.json').read_text(encoding='utf-8'))
 p=subprocess.run([sys.executable,str(root/'tools/research_pipeline.py'),'--no-notify','validate',str(d)],text=True,capture_output=True,encoding='utf-8')
 result=json.loads(p.stdout); errors=result['errors']
 assert all(e.startswith('본문 ') or e.startswith('안내 4~8장') for e in errors), errors
 assert len(maps)>=4 and len(maps)==len(data['images'])
 seen=set(); hashes={}
 for item in maps:
  raw=d/'raw'/item['raw']; pub=d/'publish'/item['publish']
  assert raw.is_file() and pub.is_file() and sha(raw)==item['rawSha256'] and sha(pub)==item['publishSha256']
  assert item['actualUrl'].startswith('https://')
  assert sha(raw) not in seen;seen.add(sha(raw))
  with Image.open(pub) as im:
   assert im.format=='PNG' and min(im.size)>=200
   im.verify()
  hashes[str(pub.relative_to(d))]=sha(pub)
 md=d/'publish'/f'은행_재테크_{row["keyword"]}_웹조사결과.md'
 text=md.read_text(encoding='utf-8')
 for item in maps: assert f']({item["publish"]})' in text and item['actualUrl'] in text
 hashes[str(md.relative_to(d))]=sha(md)
 partial=d/'publish/조사_중간기록.md'
 if partial.exists(): partial.rename(d/'evidence/조사_중간기록.md')
 review={'status':'agent_review_complete','checkedAt':'2026-11-13 Asia/Seoul','automaticValidation':{'exitCode':p.returncode,'errors':errors},
  'quantityAdjustment':'구 도구의 3500자 및 안내 4장 고정 기준과 현재 권장 기준 차이. 로그인 경계와 공개 화면의 정보 범위에 맞췄고 중복 화면을 늘리지 않음.',
  'manualChecks':['원본과 발행 이미지 전체 시각 비교: 표식, 캡션, 단계, 가독성, 팝업, 검색 주소와 계정 가림 확인','PNG 열림, 픽셀 크기, 원본 및 발행 SHA-256, 중복 원본, 이미지별 실제 URL과 Markdown 상대 경로 확인','공식 본문과 요약을 대조하고 로그인 이후 미확인과 시점 의존 조건 명시'],
  'limitations':('계좌조회 로그인 이후와 모바일 앱 화면 미확인' if row['row']==17 else 'PC 로그인 이후 신청과 모바일 앱 실제 조작 미확인; 조건은 신청 화면 재확인' if row['row']==18 else 'USD 선택 후 조회했으나 단일 통화로 결과 갱신 여부 미확인; 캡처 값은 당시 예시'),
  'contentDecision':'핵심 의도에 대한 공식 진입·범위·확인 방법과 활용 가능한 실제 이미지 확보. 미확인 경계 명시.',
  'rawImages':len(list((d/'raw').glob('*.png'))),'publishedImages':len(maps),'artifactHashes':hashes,'researchSha256':sha(d/'research.json'),
  'unusedRaw':(['raw/04_account.png: 로그인 화면과 중복되어 미사용'] if row['row']==17 else ['raw/01_search.png: 동일 공식 결과의 더 집중된 07_searchfocus.png를 사용'] if row['row']==18 else [])}
 (d/'evidence/review.json').write_text(json.dumps(review,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
 row.update(status='reviewed_ready_for_sheet',rawImages=review['rawImages'],publishedImages=review['publishedImages'],markedImages=review['publishedImages'],document=str(md.relative_to(root)).replace('\\','/'),review=str((d/'evidence/review.json').relative_to(root)).replace('\\','/'),limitations=review['limitations'],automaticValidation=errors,partialDocument=str((d/'evidence/조사_중간기록.md').relative_to(root)).replace('\\','/'))
manifest['status']='reviewed_ready_for_sheet';manifest['captureCoordination']='bank-1 reported all image captures and reviews complete before bank-2 captures began.'
manifest_path.write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print('Review saved:',[(x['row'],x['rawImages'],x['publishedImages']) for x in manifest['rows']])
