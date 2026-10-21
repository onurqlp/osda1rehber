const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const js=fs.readFileSync(path.join(root,'a2/app.js'),'utf8');
const css=fs.readFileSync(path.join(root,'a2/ux-review.css'),'utf8');
const sandbox=vm.createContext({});
vm.runInContext(js.slice(0,js.indexOf('const allTasks=')),sandbox,{timeout:1500});
const mapping=vm.runInContext('officialPages',sandbox);
const render=id=>vm.runInContext('officialScanCard('+JSON.stringify(id)+')',sandbox);
const expected={
 'lesen-1':['za2-page-02.jpg','za2-page-03.jpg'],
 'lesen-2':['za2-page-04.jpg','za2-page-05.jpg'],
 'horen-1':['za2-hoeren-1.jpg'],
 'horen-2':['za2-hoeren-2.jpg'],
 'horen-3':['za2-hoeren-3.jpg'],
 'schreiben-1':['za2-page-07.jpg','za2-page-08.jpg'],
 'sprechen-1':['za2-page-10.jpg'],
 'sprechen-2':['za2-page-09.jpg']
};
assert.deepEqual(Object.keys(mapping).sort(),Object.keys(expected).sort());
for(const [task,images] of Object.entries(expected)){
 const html=render(task);
 assert.equal((html.match(/<figure /g)||[]).length,images.length,task+' lost an original scan');
 assert.equal((html.match(/class="official-page-tab/g)||[]).length,images.length>1?2:0,task+' incorrect tabs');
 assert.ok(!html.includes('official-more'),task+' hides exam paper inside details');
 assert.ok(html.includes('Orijinal PDF'),task+' no source PDF link');
 for(const filename of images){
  assert.ok(html.includes(filename),task+' missing '+filename);
  const local=path.join(root,'a2/assets/model',filename);
  assert.ok(fs.statSync(local).size>10000,'Image missing/empty '+local);
 }
}
assert.ok(render('lesen-1').includes('2. Metinler'));
assert.ok(render('lesen-2').includes('2. A/B/C soruları'));
assert.ok(render('schreiben-1').includes('2. Cevap sayfası'));
assert.ok(render('lesen-2').includes('za2-page-04.jpg')&&render('lesen-2').includes('za2-page-05.jpg'));
assert.ok(js.includes("event.target.closest('.official-page-tab')"),'No page switching handler');
assert.ok(js.includes('figure.hidden=index!==page'),'Page selection does not switch images');
assert.ok(css.includes('.official-page-tab.is-active'),'Page selector has no selected state');
console.log('PASS: all 8 A2 tasks show official model sheets, three paired paper tasks have accessible page selectors.');
