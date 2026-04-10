# TODO Proyecto Accesibilidad

## Documentacion e informe
- [X] Realizar captura de la paleta de colores utilizada en el sitio.
- [X] Fase 4: presentar las decisiones de diseno; si el desarrollo queda muy extenso, mover la ampliacion al anexo en LaTeX.
- [ ] Usar mejor espaciado en LaTeX para la presentacion del informe.
- [X] Usar `subcaption` en figuras LaTeX para mostrar comparativas antes/despues.
- [X] Agregar a la tabla de hallazgos la criticidad del problema encontrado y el nivel/principio WCAG asociado.
- [X] Separar las conclusiones por barreras de accesibilidad.
- [X] Actualizar el chapter de fase 4 cada vez que entren commits nuevos relacionados con diseno, contraste, tipografia o navegacion.

## Contenido visual y comparativas
- [X] Colocar mas imagenes y videos en el sitio.
- [X] Incorporar articulos, imagenes y videos dentro de secciones relevantes para enriquecer las vistas.
- [D] Preparar comparativas visuales del navbar, formularios, tipografias y paletas para el informe.

## Accesibilidad operable y ARIA
- [X] Resolver el manejo de alertas con etiquetado accesible.
- [X] Evaluar e implementar `role="alert"` o `alertdialog` segun corresponda, especialmente en mensajes de error y avisos dinamicos.
- [X] Arreglar el tema ARIA en todas las vistas y componentes interactivos.
- [X] Revisar el modal de aviso para agregar foco atrapado, cierre por teclado y semantica accesible completa.
- [X] Validar que los mensajes de error no dependan solo del color y tengan anuncio accesible para lector de pantalla.
- [X] Probar navegacion completa por teclado en navbar, submenu, modal, formulario y selectores de tema/tipografia.

## UI y componentes
- [X] Evaluar el uso de Material UI con foco en accesibilidad solo si el proyecto crece en complejidad de componentes: https://v6.mui.com/base-ui/getting-started/accessibility/
- [X] Agregar el `.ico` de `images` a la pagina.
- [X] Colocar el logo de la facultad en el navbar, alineado con la variante visual SIU Guarani.
- [X] Revisar la consistencia visual del navbar en todas las resoluciones despues de los ultimos ajustes.
- [X] Revisar y corregir problemas de codificacion de caracteres visibles en varias paginas y contenidos renderizados.

## Mapa del sitio y busqueda
- [ ] Agregar busqueda avanzada; el mapa del sitio deberia recibir una actualizacion importante.
- [X] Arreglar el mapa del sitio completando la palabra "termino" en el buscador.
- [ ] Definir si la busqueda avanzada vive dentro del mapa del sitio, en carreras, o en ambos sectores.

## Carreras y filtros
- [X] Separar visualmente mejor cada carrera dentro del listado.
- [X] Eliminar el texto/enlace "Enlace directo a cada carrera" mientras ese destino no exista.
- [ ] Agregar mas filtros para carreras: modalidad hibrida/presencial/digital.
- [ ] Agregar filtros por duracion.
- [ ] Agregar filtros por tipo de titulacion, por ejemplo licenciatura, tecnicatura, especializacion o doctorado.
- [ ] Evaluar que la busqueda avanzada se implemente dentro del sector de carreras.