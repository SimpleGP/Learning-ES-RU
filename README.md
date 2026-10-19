# Learning ES–RU

**Español y ruso, paso a paso.**

[Abrir la web](https://learning-es-ru.web.app/)

Learning ES–RU nació de una necesidad real: aprender español y ruso mediante un intercambio de conocimientos. Como estudiante de Ingeniería de Software de la Universidad Peruana de Ciencias Aplicadas, estoy convirtiendo ese intercambio en una herramienta que otras personas puedan utilizar, estudiar y mejorar.

El nombre elegido para el repositorio es **Learning-ES-RU**. La aplicación conserva la identidad visual «Entre palabras», el mensaje «Ayudando a JA» para español y «Aprendiendo ruso · para GP» para ruso.

## Objetivo y alcance

Facilitar el aprendizaje gradual entre hispanohablantes y rusohablantes mediante explicaciones, vocabulario, diálogos, audios, ejercicios y práctica compartida. También me permite aplicar conocimientos de mi carrera y construir una experiencia demostrable para mi portafolio.

El proyecto reúne lecciones, audios, ejercicios, diccionario y cuaderno en un mismo lugar. El código está disponible en [SimpleGP/Learning-ES-RU](https://github.com/SimpleGP/Learning-ES-RU) e incluye la configuración para alojar la web estática en Firebase Hosting.

## Funcionalidades

- **Español para JA:** 24 lecciones introductorias con situaciones A1–A2, 144 expresiones y 96 preguntas corregidas.
- **Ruso para GP:** 12 lecciones iniciales con situaciones A1, 72 expresiones y 48 preguntas. Incluye cirílico, presentación, números, familia, rutinas, ubicación, comida, gustos y una introducción al pasado y los planes.
- Selector del idioma que quiero estudiar, independiente del idioma de los menús.
- Explicaciones y diálogos bilingües, práctica oral y escritura.
- Audios incluidos con Dalia para español y Svetlana para ruso; prueba, velocidad y detención, con voces del dispositivo como alternativa.
- Diccionario del curso, búsqueda en los dos idiomas, favoritos y tarjetas de repaso. Es una selección de vocabulario; no contiene todas las palabras de los dos idiomas.
- Cuaderno descargable y progreso local separado por ruta.
- Diseño adaptable a móvil y escritorio, navegación por teclado y controles táctiles.

## Herramientas que utilicé

| Herramienta o tecnología | Uso en el proyecto |
| --- | --- |
| HTML5 | Estructura semántica, formularios y controles. |
| CSS3 | Grid, Flexbox, variables y diseño adaptable. |
| JavaScript | Navegación, ejercicios, búsqueda, tarjetas y estado de la aplicación. |
| JSON e i18n propio | Separación de textos en `public/i18n/es.json` y `ru.json`, sin una librería de traducción. |
| Web Storage API | Notas, preferencias y progreso mediante `localStorage`. |
| HTMLMediaElement y Web Speech API | Audios MP3 y voces opcionales del dispositivo. |
| Node.js y npm | Servidor local y comprobaciones automáticas. |
| Python y edge-tts | Generación previa de audios. No se necesitan para ejecutar la web publicada. |
| Git y GitHub Actions | Control de versiones y validación automática del repositorio. |
| Firebase Hosting | Configuración preparada para publicar la carpeta `public/`. |
| PowerShell y navegador | Ejecución local y verificación de las funciones. |

El proyecto puede abrirse en WebStorm o en otro editor compatible con HTML, CSS y JavaScript.

## Conocimientos adquiridos y reforzados

En relación con mi formación y las habilidades de HTML, CSS, JavaScript y Python que incluyo en mi CV, este proyecto me permite practicar:

- Convertir una necesidad de usuarios en funciones y recorridos de aprendizaje.
- Separar presentación, lógica, contenido educativo y traducciones.
- Implementar internacionalización y distinguir el idioma de la interfaz del idioma estudiado.
- Manejar eventos, formularios, validación, estructuras de datos y actualizaciones del DOM.
- Persistir información local y comprender sus diferencias respecto a una base de datos con sincronización.
- Automatizar recursos con Python y Node.js y reproducir audio desde una web estática.
- Aplicar accesibilidad, diseño adaptable, pruebas y documentación técnica.
- Preparar un proyecto para versionarlo, recibir aportes y publicarlo.
- Aprender vocabulario y estructuras iniciales del ruso mientras adapto el contenido para hispanohablantes.

Lo presento como aprendizaje práctico en progreso, no como una acreditación de dominio de todas las tecnologías o de un nivel de ruso.

## Fuentes y fundamento académico

Para organizar los objetivos de español tomé como referencia el **Plan Curricular del Instituto Cervantes** y las descripciones del **Marco Común Europeo de Referencia del Consejo de Europa**. Para ruso consulté la propuesta introductoria de ruso como lengua extranjera del **portal del Instituto Pushkin**, especialmente su organización A1. También revisé referencias lingüísticas sobre el contraste entre los dos idiomas.

A partir de esas fuentes preparé una selección de explicaciones, ejemplos y ejercicios propios para nuestro intercambio. Busqué una progresión comprensible y relacioné cada tema con una tarea cotidiana. Las fuentes son una orientación: **el proyecto no es un curso oficial, no certifica un nivel ni cuenta con aval de esas instituciones**. Sus materiales no se incluyen como si fueran de mi autoría.

| Referencia | Aporte al proyecto |
| --- | --- |
| [Instituto Cervantes, objetivos A1–A2](https://cvc.cervantes.es/ensenanza/biblioteca_ele/plan_curricular/niveles/01_objetivos_relacion_a1-a2.htm) | Objetivos y situaciones comunicativas de español. |
| [Consejo de Europa, niveles MCER](https://www.coe.int/en/web/common-european-framework-reference-languages/level-descriptions) | Descripción general de habilidades y alcance. |
| [Instituto Pushkin, portal de ruso](https://pushkininstitute.ru/) y [propuesta introductoria A1](https://pushkininstitute.ru/external_courses/274) | Consulta de temas iniciales de fonética, gramática y comunicación en ruso. |
| [Cervantes, aprendientes rusohablantes](https://cvc.cervantes.es/ensenanza/biblioteca_ele/carabela/pdf/52/52_061.pdf) | Diferencias entre español y ruso. |
| [RAE, Diccionario panhispánico de dudas](https://www.rae.es/dpd/) | Consulta sobre usos y pronunciación del español. |
| [WikDict español–ruso](https://www.wikdict.com/es-ru/) | Recurso público adicional. Su base completa todavía no está integrada. |

Completar las microlecciones no demuestra por sí solo un nivel A1 o A2. La conversación, la lectura, la escritura y la escucha requieren práctica adicional.

## Estructura

```text
Learning-ES-RU/
├── public/
│   ├── index.html
│   ├── styles.css
│   ├── i18n/
│   │   ├── es.json
│   │   └── ru.json
│   ├── i18n.js
│   ├── course.js
│   ├── course-extra.js
│   ├── course-russian.js
│   ├── course-config.js
│   ├── course-ui.js
│   ├── app.js
│   ├── app-tools.js
│   ├── speech.js
│   ├── audio-manifest.js
│   └── audio/
├── scripts/
├── .github/workflows/check.yml
├── firebase.json
├── preview.cjs
├── check.cjs
├── package.json
└── README.md
```

## Datos y privacidad

El progreso, las palabras guardadas, las notas y las preferencias se guardan automáticamente en el navegador, separados por ruta. Para continuar, abre el mismo enlace desde el mismo navegador y dispositivo; cerrar la página no borra el avance.

No hay cuentas ni sincronización entre dispositivos. Al borrar los datos del sitio también puede perderse el progreso local. La opción «Descargar mis notas» permite conservar el cuaderno como archivo de texto; no incluye una copia de los resultados de los ejercicios.

No se graba el micrófono ni se incluye analítica propia. El alojamiento y Google Fonts pueden recibir los datos habituales de las solicitudes web.

## Contribuciones

Se pueden proponer correcciones lingüísticas, mejoras de accesibilidad, ejemplos y funciones. Los aportes deben identificar sus fuentes y evitar datos personales o materiales sin permiso de reutilización.

**Learning ES–RU — Desarrollo web educativo**

Plataforma educativa bilingüe con HTML, CSS y JavaScript, rutas de español y ruso, internacionalización mediante JSON, ejercicios interactivos, audio y persistencia local. Automatización de recursos y validaciones con Python y Node.js.
