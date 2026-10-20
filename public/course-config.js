'use strict';
let selectedCourse='es';
try{selectedCourse=localStorage.getItem('learning-es-ru-course')||'es';}catch{}
if(!['es','ru','en-ja','en-gp'].includes(selectedCourse))selectedCourse='es';
const learningRussian=selectedCourse==='ru';
const learningEnglish=selectedCourse.startsWith('en-');
const SPANISH_LESSONS=LESSONS.slice();
const SPANISH_UNITS=UNITS.slice();
if(learningRussian){LESSONS.splice(0,LESSONS.length,...RUSSIAN_LESSONS);UNITS.splice(0,UNITS.length,...RUSSIAN_UNITS);}
if(learningEnglish){LESSONS.splice(0,LESSONS.length,...englishLessons(selectedCourse==='en-ja'?'ru':'es'));UNITS.splice(0,UNITS.length,...ENGLISH_UNITS);}
const COURSE={code:selectedCourse,language:learningEnglish?'en':learningRussian?'ru':'es',supportLanguage:selectedCourse==='en-gp'||learningRussian?'es':'ru',voice:learningEnglish?'Aria':learningRussian?'Svetlana':'Dalia',voiceLang:learningEnglish?'en-US':learningRussian?'ru-RU':'es-MX'};
const targetText=w=>learningRussian?w.ru:w.es;
const supportText=w=>learningRussian?w.es:w.ru;
const supportValue=(es,ru)=>COURSE.supportLanguage==='ru'?ru:es;
