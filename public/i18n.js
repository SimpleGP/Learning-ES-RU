'use strict';
const translations={es:{},ru:{}};
const i18nReady=Promise.all(['es','ru'].map(async lang=>{
 const response=await fetch(new URL(`i18n/${lang}.json`,document.baseURI));
 if(!response.ok)throw new Error(`No se pudo cargar i18n/${lang}.json`);
 translations[lang]=await response.json();
}));
function t(key){return translations[state.lang]?.[key]??translations.es[key]??key;}
function tr(es,ru){return Object.hasOwn(translations.es,es)?t(es):state.lang==='ru'?ru:es;}
