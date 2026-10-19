const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const path=require('node:path');
const root=path.join(__dirname,'public');
const data=fs.readFileSync(path.join(root,'course.js'),'utf8')+'\n'+fs.readFileSync(path.join(root,'course-extra.js'),'utf8')+'\n'+fs.readFileSync(path.join(root,'course-russian.js'),'utf8')+'\nJSON.stringify({LESSONS,UNITS,RUSSIAN_LESSONS})';
const {LESSONS,UNITS,RUSSIAN_LESSONS}=JSON.parse(vm.runInNewContext(data));
assert.equal(LESSONS.length,24);assert.equal(UNITS.length,4);
assert.equal(RUSSIAN_LESSONS.length,12);
for(const course of [LESSONS,RUSSIAN_LESSONS])for(const [i,l] of course.entries()){
 assert.equal(l.id,i+1);assert.equal(l.words.length,6);assert.equal(l.quiz.length,4);
 for(const field of ['title','goal','task','ru','goalRu','taskRu'])assert.ok(l[field]?.length,`Lección ${l.id}: ${field}`);
 for(const [es,ru] of [...l.words,...l.rules,...l.dialog]){assert.ok(es&&ru);assert.match(ru,/[а-яё]/i);}
 for(const q of l.quiz){assert.equal(q.options.filter(o=>o===q.answer).length,1,`${l.id}: ${q.es}`);assert.equal(q.options.length,3);assert.ok(q.why&&q.whyRu);}
}
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
for(const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)){const file=match[1];if(!/^https?:/.test(file))assert.ok(fs.existsSync(path.join(root,file)),file);}
for(const file of fs.readdirSync(root).filter(f=>f.endsWith('.js')))new vm.Script(fs.readFileSync(path.join(root,file),'utf8'),{filename:file});
const audio=JSON.parse(vm.runInNewContext(fs.readFileSync(path.join(root,'audio-manifest.js'),'utf8')+'\nJSON.stringify(LESSON_AUDIO)'));
for(const [course,index] of [[LESSONS,0],[RUSSIAN_LESSONS,1]])for(const l of course)for(const pair of [...l.words,...l.dialog]){const phrase=pair[index];assert.ok(audio[phrase],`Sin audio: ${phrase}`);assert.ok(fs.statSync(path.join(root,audio[phrase])).size>512,`Audio vacío: ${phrase}`);}
const es=JSON.parse(fs.readFileSync(path.join(root,'i18n','es.json'),'utf8'));
const ru=JSON.parse(fs.readFileSync(path.join(root,'i18n','ru.json'),'utf8'));
assert.deepEqual(Object.keys(es).sort(),Object.keys(ru).sort(),'Las claves i18n deben coincidir.');
for(const catalog of [es,ru])for(const value of Object.values(catalog))assert.ok(typeof value==='string'&&value.length,'Los textos de interfaz deben ser cadenas no vacías.');
const appSource=['course.js','course-extra.js','course-russian.js','course-config.js','app.js'].map(file=>fs.readFileSync(path.join(root,file),'utf8')).join('\n');
for(const direction of ['es','ru']){
 const storage={
  'learning-es-ru-course':direction,
  'entre-palabras-v1':JSON.stringify({completed:[1,2],notes:{general:'Notas de español'}}),
  'entre-palabras-ru-v1':JSON.stringify({completed:[1],notes:{general:'Notas de ruso'}})
 };
 const result=JSON.parse(vm.runInNewContext(appSource+'\nJSON.stringify({key:KEY,count:LESSONS.length,completed:state.completed,notes:state.notes.general,target:targetText(WORDS[0])})',{
  localStorage:{getItem:key=>storage[key]??null},document:{getElementById:()=>({})}
 }));
 assert.equal(result.count,direction==='es'?24:12);
 assert.equal(result.completed.length,direction==='es'?2:1);
 assert.equal(result.notes,direction==='es'?'Notas de español':'Notas de ruso');
 assert.match(result.target,direction==='es'?/^Hola$/:/ма́ма/);
}
for(const file of ['app.js','app-tools.js','speech.js','course-ui.js'])for(const match of fs.readFileSync(path.join(root,file),'utf8').matchAll(/\bt\(\s*('(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*")\s*\)/g)){const key=vm.runInNewContext(match[1]);assert.ok(Object.hasOwn(es,key)&&Object.hasOwn(ru,key),`Falta traducción: ${key}`);}
console.log(`OK: ${Object.keys(es).length} claves de interfaz en es.json y ru.json.`);
console.log(`OK: ${Object.keys(audio).length} audios estáticos; todas las palabras y los diálogos tienen voz.`);
console.log('OK: español 24 lecciones/96 preguntas; ruso 12 lecciones/48 preguntas; recursos locales válidos.');
