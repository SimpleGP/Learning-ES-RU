'use strict';
const SPEECH_KEY='entre-palabras-speech-v1-'+COURSE.code;
const VOICE_SAMPLES={es:'Hola. Vamos a aprender español, poco a poco. ¿Cómo estás? Muy bien, gracias.',ru:'Привет! Давай учить русский язык вместе. Как дела? Всё хорошо, спасибо.'};
const VOICE_SAMPLE=VOICE_SAMPLES[COURSE.code];
const speechPrefs={voice:'recorded',rate:1};
try{const saved=JSON.parse(localStorage.getItem(SPEECH_KEY)||'null');if(saved&&typeof saved.voice==='string'&&saved.voice.length<500)speechPrefs.voice=saved.voice;if([0.75,0.85,1,1.1].includes(saved?.rate))speechPrefs.rate=saved.rate;}catch{}
function spanishVoices(){if(!('speechSynthesis'in window))return [];return speechSynthesis.getVoices().filter(v=>(learningRussian?/^ru(?:-|_)/i:/^es(?:-|_)/i).test(v.lang)).sort((a,b)=>voiceQuality(b)-voiceQuality(a)||a.name.localeCompare(b.name));}
function voiceQuality(v){return (/natural|neural|online|premium|enhanced/i.test(v.name)?100:0)+(/Google/i.test(v.name)?60:0)+(/Paulina|Mónica|Monica|Marisol|Dalia|Elvira/i.test(v.name)?30:0)+(!v.localService?10:0);}
function speechVoiceOptions(){return `<option value="recorded" ${speechPrefs.voice==='recorded'?'selected':''}>${COURSE.voice} · ${learningRussian?t("Ruso"):t("Español de México")}</option>${spanishVoices().map(v=>`<option value="${esc('system:'+v.voiceURI)}" ${speechPrefs.voice==='system:'+v.voiceURI?'selected':''}>${esc(v.name)} · ${esc(v.lang)}</option>`).join('')}`;}
function speechSettings(){return `<section class="speech-settings" aria-label="${t("Ajustes de voz")}"><div><label for="speech-voice">${t("Elige una voz")}</label><select id="speech-voice">${speechVoiceOptions()}</select></div><div><label for="speech-rate">${t("Velocidad")}</label><select id="speech-rate">${[[0.75,'Muy despacio','Очень медленно'],[0.85,'Despacio','Медленно'],[1,'Clara y natural','Обычная'],[1.1,'Un poco más rápida','Чуть быстрее']].map(([rate,es,ru])=>`<option value="${rate}" ${speechPrefs.rate===rate?'selected':''}>${tr(es,ru)}</option>`).join('')}</select></div><div class="speech-actions"><button type="button" class="button" data-say="${esc(VOICE_SAMPLE)}">${icon('sound')}${t("Probar la voz")}</button><button type="button" class="button secondary" data-action="stop-speech">${t("Detener")}</button></div><p class="speech-status" id="speech-status" role="status" aria-live="polite">${t("La voz y la velocidad se aplican a todas las lecciones.")}</p></section>`;}
function setSpeechPreference(key,value){if(key==='rate'&&[0.75,0.85,1,1.1].includes(value))speechPrefs.rate=value;if(key==='voice'&&(value==='recorded'||spanishVoices().some(v=>'system:'+v.voiceURI===value)))speechPrefs.voice=value;stopSpeech();refreshVoices();try{localStorage.setItem(SPEECH_KEY,JSON.stringify(speechPrefs));}catch{}speechStatus(t("Ajustes de voz guardados. Prueba cómo suena."));}
function speechStatus(message){const el=document.getElementById('speech-status');if(el)el.textContent=message;}
function refreshVoices(){const voices=spanishVoices();ttsVoice=voices.find(v=>'system:'+v.voiceURI===speechPrefs.voice)||voices[0]||null;const select=document.getElementById('speech-voice');if(select){select.innerHTML=speechVoiceOptions();if(select.selectedIndex<0)select.value='recorded';}}
function stopSpeech(){const audio=document.getElementById('lesson-audio');if(audio){audio.pause();audio.currentTime=0;audio.onended=null;audio.onerror=null;}if('speechSynthesis'in window)speechSynthesis.cancel();speechStatus(t("Audio detenido."));}
function say(text){
 stopSpeech();
 if(speechPrefs.voice==='recorded'){
  const file=typeof LESSON_AUDIO!=='undefined'?LESSON_AUDIO[text]:null;
  if(!file){toast(t("Esta frase todavía no tiene audio. Puedes elegir una voz del dispositivo en Sonidos."));return;}
  const audio=document.getElementById('lesson-audio');
  audio.src=file;audio.playbackRate=speechPrefs.rate;audio.preservesPitch=true;if('webkitPreservesPitch'in audio)audio.webkitPreservesPitch=true;
  audio.onended=()=>speechStatus(t("Listo. Ahora repite tú."));
  audio.onerror=()=>{speechStatus(t("No se pudo cargar el audio."));toast(t("No se pudo cargar el audio. Vuelve a tocar Escuchar."));};
  const play=audio.play();if(play)play.then(()=>speechStatus(t("Reproduciendo: ")+COURSE.voice)).catch(err=>{if(err.name!=='AbortError')toast(t("Toca Escuchar para iniciar el audio."));});
  return;
 }
 if(!('speechSynthesis'in window)||!('SpeechSynthesisUtterance'in window)){toast(t("Elige la voz incluida en Sonidos para escuchar los audios."));return;}
 refreshVoices();if(!ttsVoice){toast(t("No hay una voz en español en este dispositivo. Elige la voz incluida en Sonidos."));return;}
 const utterance=new SpeechSynthesisUtterance(text==='cu'?'cú':text.replace(/ \/ /g,', '));utterance.lang=ttsVoice.lang;utterance.voice=ttsVoice;utterance.rate=0.92*speechPrefs.rate;utterance.pitch=1;utterance.volume=1;
 utterance.onstart=()=>speechStatus(t("Escuchando: ")+ttsVoice.name);utterance.onend=()=>speechStatus(t("Listo. Ahora repite tú."));utterance.onerror=e=>{if(!['canceled','interrupted'].includes(e.error))toast(t("Esta voz no se pudo reproducir. Elige la voz incluida."));};
 window.currentUtterance=utterance;speechSynthesis.speak(utterance);
}
