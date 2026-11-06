from pathlib import Path
import json, math, os
from PIL import Image, ImageDraw, ImageFont, ImageOps

ROOT = Path(__file__).resolve().parents[2]
DATE = ROOT / '26_1106'
FONT = Path(os.environ.get('WINDIR', 'C:/Windows')) / 'Fonts' / 'malgun.ttf'
RED = '#e23535'

TEXT = {
'00_구글검색': ('00 | Google 검색 의도 확인', ['광고를 제외하고 공식 페이지부터 확인합니다.']),
'01_월이무_모바일첫화면': ('01 | 월이무 공식 페이지 열기', ['원하는 이모티콘을 3종 고릅니다.', '상품 구성은 매주 달라질 수 있습니다.']),
'02_이모티콘3종선택': ('02 | 3종 선택 후 받기', ['노란 체크 표시 3개를 확인합니다.', '금요일 예시: 다음주에 받기 → 로그인']),
'03_카카오계정_로그인까지만': ('03 | 카카오계정 로그인 단계', ['계정이 없다면 회원가입을 확인합니다.', '이번 조사는 로그인 입력 전까지입니다.']),
'04_월이무_지급시점과유의사항': ('04 | 지급 시점·사용 기간 확인', ['월요일 참여: 즉시 / 화~일: 다음 월요일', '받은 뒤 72시간, 계정당 매주 1회']),
'05_과거미니프로모션_현재접속확인': ('05 | 과거 무료 링크 재확인', ['2024년 미니 프로모션 링크의 현재 화면', '현재 이용 가능한 다운로드로 소개하지 않습니다.']),
'06_카드뽑기_공식기간확인': ('06 | 카드 뽑기 종료 일정 확인', ['공식 안내 기간: 2026.10.12~11.02', '11월 6일 조사 기준 신규 참여 기간 종료']),
'01_코레일_신고안내_PC': ('01 | 코레일 공식 안내', ['신고·습득물 조회·수령 절차를 확인합니다.']),
'02_코레일_모바일신고안내': ('02 | 상황에 따라 바로 문의', ['철도고객센터: 1588-7788', '하차 직후 역무실 / 승차 중 승무원 신고']),
'03_역별연락처_서울검색': ('03 | 해당 역 연락처 찾기', ['역 이름을 입력하고 돋보기를 누릅니다.', '서울역 예시: 02-755-7108']),
'04_본인대리수령_준비물': ('04 | 수령 준비물 확인', ['본인: 신분증 / 대리인: 위임장 등', '방문 전 실제 보관 장소와 운영시간 확인']),
'05_경찰민원24_모바일첫화면': ('05 | 경찰민원24 공식 홈', ['화면을 내려 유실물 민원 영역을 찾습니다.']),
'06_경찰민원24_습득물검색메뉴': ('06 | 습득물 검색 선택', ['찾아진 물건 조회는 습득물 검색입니다.', '조회 후 없으면 분실물 신고를 확인합니다.']),
'07_경찰민원24_검색필터': ('07 | 모바일 검색 필터 참고', ['조사 환경에서 필터 일부가 겹쳐 보였습니다.', '전체 조건 입력은 다음 PC 가이드를 참고하세요.']),
'08_경찰민원24_PC검색조건': ('08 | PC에서 검색 조건 입력', ['습득장소: 기차 / 보관장소: 서울역 예시', '날짜·물품 조건을 조정한 뒤 검색하기']),
'09_코레일_모바일홈': ('09 | 코레일 모바일 홈', ['아래로 내려 종합이용 가이드로 이동합니다.']),
'10_코레일_홈유실물메뉴': ('10 | 홈에서 유실물 안내 열기', ['종합이용 가이드 → 유실물을 누릅니다.']),
'11_기차서울역_습득물검색결과': ('11 | 검색 결과의 보관 장소 확인', ['물건의 특징과 습득일자를 비교합니다.', '보관기관에 본인 물건 여부·수령 방법 문의']),
'12_경찰민원24_분실신고안내': ('12 | 없으면 분실물 신고 안내', ['서비스 내용을 읽고 신고하기를 누릅니다.']),
'13_분실신고_로그인단계': ('13 | 로그인 필요 안내까지', ['신고에는 로그인이 필요합니다.', '이번 조사는 로그인·신고 접수 전까지입니다.']),
}

def font(size): return ImageFont.truetype(str(FONT), size)
def wrap(draw, text, f, width):
    lines=[]; line=''
    for c in text:
        if draw.textlength(line+c,font=f)>width:
            lines.append(line);line=c
        else: line+=c
    if line: lines.append(line)
    return lines

for folder in DATE.glob('앱사용_*/웹조사'):
    for f in folder.glob('참고이미지_공식이모티콘_*.png'):
        im=Image.open(f)
        if im.format=='WEBP':
            original=f.with_suffix('.webp')
            if not original.exists(): original.write_bytes(f.read_bytes())
            im.convert('RGBA').save(f,format='PNG')
    ref=folder/'참고이미지_미니이모티콘_공식보도자료.webp'
    if ref.exists(): Image.open(ref).convert('RGB').save(ref.with_suffix('.png'))
    guides=[]
    for raw in sorted(folder.glob('*_원본.png')):
        key=raw.name.removesuffix('_원본.png')
        if key not in TEXT: continue
        title, instructions=TEXT[key]
        im=Image.open(raw).convert('RGB')
        meta_path=folder/(key+'_캡처정보.json')
        meta=json.loads(meta_path.read_text('utf-8')) if meta_path.exists() else {}
        if key=='01_코레일_신고안내_PC':
            meta['url']='https://www.korail.com/ticket/guest/lost/register'
        if key=='09_코레일_모바일홈':
            meta['targets']=[]
        # Keep original screenshot unchanged; crop only the separate presentation copy.
        if key=='08_경찰민원24_PC검색조건': im=im.crop((0,0,im.width,430))
        if key=='11_기차서울역_습득물검색결과': im=im.crop((0,0,im.width,475))
        if key=='00_구글검색': im=im.crop((0,0,min(im.width,1100),min(im.height,1050)))
        scale=2 if im.width<600 else 1
        sw,sh=im.width*scale,im.height*scale
        canvas=Image.new('RGB',(sw,sh+250),'white'); d=ImageDraw.Draw(canvas)
        d.rectangle((0,0,sw,64),fill='#14253b')
        tf=font(29 if sw<1000 else 32)
        d.text((22,12),title,fill='white',font=tf)
        y=78; bodyfont=font(25 if sw<1000 else 28)
        for i,line in enumerate(instructions,1):
            for part in wrap(d,f'{i}. {line}',bodyfont,sw-44):
                d.text((22,y),part,fill='#24334a',font=bodyfont);y+=35
        top=190
        canvas.paste(im.resize((sw,sh),Image.Resampling.LANCZOS),(0,top))
        for n,target in enumerate(meta.get('targets',[]),1):
            if target.get('missing'): continue
            x,y,w,h=(target[v] for v in ('x','y','w','h'))
            if w<=0 or h<=0 or y+h<0 or y>=im.height or x>=im.width: continue
            x1=max(2,x*scale);y1=max(top+2,top+y*scale)
            x2=min(sw-3,(x+w)*scale);y2=min(top+sh-3,top+(y+h)*scale)
            if x2<=x1 or y2<=y1: continue
            d.rounded_rectangle((x1,y1,x2,y2),radius=7,outline=RED,width=4)
            ex=min(sw-25,max(25,x2-18));ey=y1
            sx=max(25,ex-55);sy=max(top+24,ey-55)
            if abs(sy-ey)>12:
                d.line((sx,sy,ex,ey),fill=RED,width=5)
                a=math.atan2(ey-sy,ex-sx)
                points=[(ex,ey),(ex-17*math.cos(a-.5),ey-17*math.sin(a-.5)),(ex-17*math.cos(a+.5),ey-17*math.sin(a+.5))]
                d.polygon(points,fill=RED)
            cx=max(20,x1+16);cy=min(top+sh-20,y1+16)
            d.ellipse((cx-17,cy-17,cx+17,cy+17),fill=RED)
            d.text((cx,cy-1),str(n),font=font(22),fill='white',anchor='mm')
        # These evidence screenshots contain no actionable DOM target.
        if key in ('05_과거미니프로모션_현재접속확인','06_카드뽑기_공식기간확인','13_분실신고_로그인단계'):
            d.rectangle((8,top+8,sw-9,top+sh-9),outline=RED,width=4)
        source=meta.get('url','Google 검색결과').split('?')[0].replace('https://','')
        footer=f'출처: {source} | 확인: 2026-11-06'
        footerfont=font(18)
        for i,line in enumerate(wrap(d,footer,footerfont,sw-30)[:2]):
            d.text((15,top+sh+8+i*22),line,font=footerfont,fill='#526176')
        output=folder/(key+'_가이드.png'); canvas.save(output); guides.append(output)
    thumbs=[]
    for f in guides:
        img=Image.open(f).convert('RGB');img.thumbnail((300,580))
        card=Image.new('RGB',(320,640),'#e9edf2');card.paste(img,((320-img.width)//2,12));dd=ImageDraw.Draw(card)
        for i,line in enumerate(wrap(dd,f.stem,font(14),300)[:2]):dd.text((10,600+i*19),line,font=font(14),fill='black')
        thumbs.append(card)
    if thumbs:
        cols=4;rows=math.ceil(len(thumbs)/cols);sheet=Image.new('RGB',(cols*320,rows*640),'white')
        for i,card in enumerate(thumbs):sheet.paste(card,((i%cols)*320,(i//cols)*640))
        sheet.save(folder/'이미지목록_미리보기.jpg',quality=90)
    print(folder.parent.name, len(guides), 'guide images')
