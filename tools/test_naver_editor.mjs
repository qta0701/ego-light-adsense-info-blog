import test from 'node:test';
import assert from 'node:assert/strict';
import {assertStyleAudit} from './naver_editor.mjs';

const plan={links:[{url:'https://example.com/post'}],images:[{caption:'guide'}]};
const fixture=()=>({cta:[{background:'rgb(255, 248, 178)',text:[{color:'rgb(27, 27, 248)',size:'19px',weight:'700'}]}],normal:[{found:true,bold:false}],images:[{loaded:true,caption:'guide\n'}],og:[{thumbnail:true,previousTable:true,links:['https://example.com/post']}],tables:1,markers:0,rawUrls:0});
test('Verified public article passes',()=>assert.equal(assertStyleAudit(fixture(),plan,{publicPage:true,expectedTables:1}),true));
test('URL preconversion regression is rejected',()=>{const a=fixture();a.cta[0].background='rgba(0, 0, 0, 0)';a.cta[0].text[0].color='rgb(0, 0, 0)';assert.throws(()=>assertStyleAudit(a,plan),/CTA style/);});
test('Inherited bold and caption contamination are rejected',()=>{const a=fixture();a.normal[0].bold=true;a.images[0].caption+='body prose';assert.throws(()=>assertStyleAudit(a,plan),/Normal body.*Image\/caption/);});
test('Reservation checks do not pretend to verify public hrefs',()=>{const a=fixture();a.og[0].links=[];assert.equal(assertStyleAudit(a,plan),true);assert.throws(()=>assertStyleAudit(a,plan,{publicPage:true}),/OG/);});
test('Missing content and residual markers prevent publication',()=>{const a=fixture();a.normal[0].found=false;a.markers=1;a.og[0].previousTable=false;assert.throws(()=>assertStyleAudit(a,plan),/Normal body.*OG.*residue/);});
