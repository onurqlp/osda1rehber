const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const source=fs.readFileSync(path.join(root,'a1/app.js'),'utf8');
const style=fs.readFileSync(path.join(root,'a1/ux-review.css'),'utf8');
const prefix=source.slice(0,source.indexOf('const allTasks='));
const context=vm.createContext({});
vm.runInContext(prefix,context,{timeout:1500});
const pages=vm.runInContext('officialA1Pages',context);
const card=id=>vm.runInContext('officialA1Card('+JSON.stringify(id)+')',context);
const expected={
 'lesen-1':['za1-page-02.jpg','za1-page-03.jpg'],
 'lesen-2':['za1-page-04.jpg'],
 'lesen-3':['za1-page-05.jpg','za1-page-06.jpg'],
 'horen-1':['za1-page-07.jpg'],
 'horen-2':['za1-hoeren-2.jpg'],
 'horen-3':['za1-hoeren-3.jpg'],
 'schreiben-1':['za1-page-09.jpg'],
 'schreiben-2':['za1-page-10.jpg'],
 'sprechen-1':['za1-page-11.jpg'],
 'sprechen-2':['za1-page-12.jpg'],
 'sprechen-3':['za1-page-12.jpg']
};
assert.deepEqual(Object.keys(pages).sort(),Object.keys(expected).sort());
for(const [task,scans] of Object.entries(expected)){
 const html=card(task);
 assert.equal((html.match(/<figure /g)||[]).length,scans.length,task+' must display all exam sheets');
 assert.equal((html.match(/class="official-page-tab/g)||[]).length,scans.length>1?2:0,task+' page selector');
 assert.ok(html.includes('Resmî PDF’de aç'),task+' should link official PDF');
 assert.ok(!html.includes('official-more'),task+' cannot hide sheet behind details');
 for(const scan of scans){
   assert.ok(html.includes(scan),task+' missing scan '+scan);
   assert.ok(fs.statSync(path.join(root,'a1/assets/model',scan)).size>8000,scan+' missing image asset');
 }
}
assert.ok(card('lesen-1').includes('2. İlanlar'));
assert.ok(card('lesen-3').includes('2. Resimler'));
assert.ok(card('lesen-2').includes('JA/NEIN'));
assert.ok(source.includes("event.target.closest('.official-page-tab')"),'page buttons need a click handler');
assert.ok(source.includes('figure.hidden=index!==page'),'page change should switch image');
assert.ok(style.includes('.official-page-tab.is-active'),'selected page should be visually obvious');
console.log('PASS: 11 A1 tasks, all official sheets included, two-sheet selectors, correct files and page interaction.');
