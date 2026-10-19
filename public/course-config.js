'use strict';
let learningRussian=false;
try{learningRussian=localStorage.getItem('learning-es-ru-course')==='ru';}catch{}
const SPANISH_LESSONS=LESSONS.slice();
const SPANISH_UNITS=UNITS.slice();
if(learningRussian){LESSONS.splice(0,LESSONS.length,...RUSSIAN_LESSONS);UNITS.splice(0,UNITS.length,...RUSSIAN_UNITS);}
const COURSE={code:learningRussian?'ru':'es',language:learningRussian?'ru':'es',voice:learningRussian?'Svetlana':'Dalia',voiceLang:learningRussian?'ru-RU':'es-MX'};
const targetText=w=>learningRussian?w.ru:w.es;
const supportText=w=>learningRussian?w.es:w.ru;
