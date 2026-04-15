# Refactor de accesibilidad - Portal SIU Guarani

Sitio web estatico desarrollado como prototipo academico para analizar, corregir y documentar barreras de accesibilidad en un portal universitario inspirado en SIU Guarani.

El proyecto sigue una evolucion por fases y toma como referencia los principios de WCAG 2.1, especialmente nivel AA para contraste, foco visible, estructura semantica, navegacion consistente, formularios y contenido dinamico.

## Objetivo

El repositorio parte de un sitio intencionalmente problematico y lo transforma progresivamente en una version mas accesible, mantenible y auditable.

Los objetivos principales son:

- identificar barreras de accesibilidad reales;
- aplicar correcciones sobre HTML, CSS y JavaScript;
- documentar decisiones tecnicas y visuales;
- mantener trazabilidad entre hallazgos, cambios y commits;
- evitar frameworks innecesarios cuando HTML, CSS y JavaScript nativo alcanzan.

## Tecnologias

El stack se mantiene simple a proposito:

- HTML5 semantico;
- CSS con variables globales;
- JavaScript vanilla;
- JSON como fuente de contenido;
- fuentes locales para OpenDyslexic;
- parciales HTML compartidos para header y footer.

No se usa build step, bundler ni framework frontend.

## Estado Actual

Cambios implementados hasta el momento:

- estructura semantica en paginas principales;
- encabezado y pie compartidos mediante parciales;
- breadcrumbs consistentes en vistas secundarias;
- titulos de pagina orientados a `SIU Guarani`;
- favicon y logo en navbar como apoyo de orientacion cognitiva;
- dos paletas accesibles seleccionables: `Contrastes` y `SIU Guarani`;
- selector tipografico entre OpenDyslexic y Helvetica;
- preferencias visuales persistidas en el navegador;
- navbar con estado activo, foco visible y hover reforzado;
- submenu `Facultad` operable por teclado y sincronizado con ARIA;
- formulario de estudiantes con labels, campos obligatorios, mensajes de error y anuncio accesible;
- sesion simulada mediante cookies;
- boton de usuario en el navbar al iniciar sesion;
- modal de aviso importante implementado como `alertdialog`;
- listado de carreras renderizado desde JSON;
- filtros de carreras por turno;
- resultados dinamicos anunciados con `aria-live`;
- imagenes representativas para carreras;
- separadores visuales explicitos entre secciones y articulos;
- noticias y bloques de informacion cargados desde JSON;
- video con controles y subtitulos.

## Estructura del Proyecto

```text
.
|-- css/
|   |-- font-awesome.min.css
|   |-- global.css
|   |-- navbar.css
|   `-- styles.css
|-- data/
|   |-- carreras.json
|   |-- info-blocks.json
|   `-- noticias.json
|-- fonts/
|   |-- OpenDyslexic-Bold.otf
|   |-- OpenDyslexic-BoldItalic.otf
|   |-- OpenDyslexic-Italic.otf
|   `-- OpenDyslexic-Regular.otf
|-- images/
|-- js/
|   |-- load-partials.js
|   |-- portal-login.js
|   |-- promo-modal.js
|   |-- render-careers.js
|   |-- render-home.js
|   |-- render-loader.js
|   |-- render-news.js
|   `-- session.js
|-- media/
|   `-- subtitulos.vtt
|-- partials/
|   |-- site-footer.html
|   `-- site-header.html
|-- carreras.html
|-- estudiantes.html
|-- index.html
|-- mapa.html
|-- novedades.html
`-- README.md
```

## Paginas

- `index.html`: portada con imagen institucional, aviso importante, noticias y bloques informativos.
- `carreras.html`: oferta academica con filtros y listado renderizado desde `data/carreras.json`.
- `novedades.html`: noticias institucionales y contenido multimedia.
- `estudiantes.html`: acceso simulado al portal de estudiantes.
- `mapa.html`: mapa del sitio y buscador interno.

## Como Ejecutar

No conviene abrir los archivos directamente con `file://`, porque el sitio usa `fetch()` para cargar:

- parciales HTML;
- archivos JSON;
- contenido dinamico.

Ejecutar con un servidor local. Por ejemplo:

```bash
python -m http.server 8000
```

Luego abrir:

```text
http://localhost:8000
```

Tambien sirve cualquier servidor local equivalente, como Live Server de VS Code.

## Accesibilidad

El trabajo se organiza alrededor de los principios WCAG:

- Perceptible: contraste, tipografia, subtitulos, textos alternativos y separadores visuales.
- Operable: foco visible, navegacion por teclado, botones nativos y cierre de dialogos con teclado.
- Comprensible: labels, instrucciones, estados de error y navegacion consistente.
- Robusto: roles ARIA, estados sincronizados, regiones vivas y estructura HTML semantica.

Las mejoras no dependen solo del color. Cuando hay errores o cambios dinamicos, se agregan mensajes textuales y anuncios accesibles.

## Decisiones Visuales

El sitio incluye dos temas de color:

- `Contrastes`: tema por defecto, basado en una paleta con contrastes accesibles.
- `SIU Guarani`: variante institucional inspirada en los colores de referencia de la aplicacion.

Tambien incluye dos opciones tipograficas:

- OpenDyslexic;
- Helvetica.

OpenDyslexic se incorpora como fuente local por tratarse de un recurso open source. EasyReading fue evaluada, pero no se incluye en el repositorio por restricciones de licencia.

## Documentacion

La documentacion del informe se mantiene en `docs/` como material de trabajo en LaTeX y Markdown.

Esa carpeta contiene, entre otros archivos:

- fases del informe;
- tabla de hallazgos;
- decisiones de paleta;
- lista de pendientes;
- trazabilidad de cambios.

`docs/` puede mantenerse fuera de los commits principales si se desea separar el codigo fuente del material de informe.

## Nota Sobre el Alcance

Este repositorio no representa un sistema SIU Guarani real ni una aplicacion productiva. Es un prototipo academico para practicar auditoria, correccion y documentacion de accesibilidad web.
