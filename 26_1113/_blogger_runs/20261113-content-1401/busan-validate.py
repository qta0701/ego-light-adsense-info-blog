from pathlib import Path
from html.parser import HTMLParser
import re

pub=Path('26_1113/은행_재테크_부산은행 환전/웹조사/publish')
name='은행_재테크_부산은행 환전'
html=(pub/f'{name}_html콘텐츠.html').read_text(encoding='utf-8')
txtpath=pub/f'{name}_제목메타디스크립션.txt'
txt=txtpath.read_text(encoding='utf-8')
class Parser(HTMLParser):
    def __init__(self):
        super().__init__(); self.ids=[]; self.img=[]; self.h2=0; self.in_h2=False; self.linked=0; self.forbidden=[]
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if 'id' in a:self.ids.append(a['id'])
        if tag in ('html','head','body','h1','title','meta'):self.forbidden.append(tag)
        if tag=='h2':self.h2+=1;self.in_h2=True
        if tag=='a' and self.in_h2 and a.get('href'):self.linked+=1
        if tag=='a' and a.get('target'):self.forbidden.append('target')
        if tag=='img':self.img.append(a)
    def handle_endtag(self,tag):
        if tag=='h2':self.in_h2=False
p=Parser();p.feed(html)
assert len(p.ids)==len(set(p.ids))
assert p.h2==p.linked==5 and not p.forbidden
assert len(p.img)==5
for i,a in enumerate(p.img,1):
    ident=f'IMG_{i:02d}'
    assert a['src']=='{{BLOGGER_IMAGE_URL_'+ident+'}}' and a['alt'] in txt
    assert html.count('IMAGE_SLOT:'+ident+' START')==html.count('IMAGE_SLOT:'+ident+' END')==1
    assert txt.count('삽입 ID: '+ident)==1
for file in ('02_guide.png','03_guide.png','04_guide.png','05_guide.png','blogger-images/06_delivery_marked.png'):
    assert (pub/file).is_file() and (pub/file).stat().st_size>0
txt=txt.replace('파일·이미지·출처·슬롯 대응: 검수 진행','파일·이미지·출처·슬롯 대응: UTF-8, 중복 ID 없음, 5개 슬롯·토큰·alt·캡션 및 실제 파일 1:1 확인; H2 5개 모두 공식 링크 연결')
txt=txt.replace('모바일/PC 로컬 미리보기: 검수 진행','모바일/PC 로컬 미리보기: 임시 사본과 별도 CSS 사용, 390px 및 1280px에서 이미지 5개 로드·비율·순서·캡션 및 가로 넘침 확인. 모바일에서 PC 원본 이미지의 작은 글씨는 확대 필요.')
txtpath.write_text(txt,encoding='utf-8')
print('PASS: UTF-8 / unique IDs / 5 linked H2 / 5 matching image slots / files exist')
print('HTML lines:',len(html.splitlines()),'TXT lines:',len(txt.splitlines()))
