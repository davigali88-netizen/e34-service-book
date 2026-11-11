# BMW E34 Service Book — v0.9

PWA responsive para el historial y la documentación de un BMW E34.

## Mejoras v0.6
- Unifica el logo de interfaz y los iconos de instalación Android con los colores BMW Motorsport; añade una foto genérica del BMW 520i y selector español/inglés.
- Mejora la lectura en móviles con tipografía ampliada y tarjetas que se adaptan a dos columnas.
- Mantiene visible el botón «Instalar» y ofrece instrucciones alternativas si el navegador no muestra el aviso nativo.
- Resume los costes registrados por año y categoría, reutilizando el coste opcional de cada intervención.
- Incluye los manuales PDF de usuario en español e inglés y el documento OBC en el sitio.
- Permite elegir una foto propia del vehículo; se procesa y guarda solo en el almacenamiento local del navegador.
- Mantiene los textos ya escritos en registros, el kilometraje en km y la biblioteca de pares en español.
- Atribución de la imagen: “BMW E34 520i.jpg”, Felix Schmidt, Wikimedia Commons, CC BY-SA 3.0. Es un 520i alemán de 1992 y no necesariamente representa la unidad del usuario. La imagen original se distribuye sin modificar: https://commons.wikimedia.org/wiki/File:BMW_E34_520i.jpg

## Mejoras v0.7
- Incluye en la aplicación los manuales PDF en español e inglés y el documento de información OBC.
- Permite guardar localmente los últimos siete caracteres válidos del VIN, copiarlos y consultar RealOEM manualmente; la app no envía el VIN ni decodifica automáticamente la configuración.
- En v0.7 las capacidades de fluidos aún estaban pendientes de contraste.
- Identifica al creador como Sr. Balloneta en el aviso de proyecto independiente.

## Mejoras v0.8
- La ficha de fluidos acepta un VIN completo y decodifica localmente el código de tipo en las posiciones 4–7; el VIN completo no se guarda ni se envía. Solo se conserva el código de tipo y la terminación de siete caracteres.
- Incluye códigos europeos de carrocería berlina para gasolina, diésel, tracción total y M5; los códigos no reconocidos (incluidos los Touring no presentes en la tabla consultada) quedan sin decodificar.
- Muestra capacidades orientativas de aceite y refrigeración cuando hay referencias secundarias trazables, y permite consultar capacidades de algunas cajas manuales al leer su código.
- Para el 520i M50 incluye referencias secundarias de caja, diferencial y refrigeración. La caja automática se identifica como capacidad total, no como cantidad de vaciado y reposición.
- Señala explícitamente los datos ausentes y las discrepancias entre fuentes. No completa homologaciones, referencias OEM, capacidades de variantes sin evidencia suficiente ni el tipo de fluido de dirección sin leer la etiqueta del depósito.
- Mantiene el kilometraje en km y no incorpora el selector futuro de unidades.

## Mejoras v0.9
- Añade al menú una sección de homenaje con el anuncio de la Serie 5 de 1988 aportado por el usuario y reproducción dentro de la app.
- Incluye el vídeo en la caché inicial de la PWA y sirve correctamente solicitudes parciales para permitir reproducción y búsqueda offline.

## Mejoras v0.5
- Sustituye el placeholder de fluidos por una ficha para el 520i E34 de 1991 con motor M50B20.
- Separa los datos identificados de los pendientes para motor, caja, diferencial, dirección asistida y refrigeración.
- No publica capacidades, especificaciones ni referencias OEM sin contrastarlas con la variante y el VIN.

## Mejoras v0.4
- Generador de plan base: crea siete recordatorios por fecha y kilometraje desde los datos actuales.
- Intervalos orientativos inspirados en el calendario Haynes para E30/E28/E34; se identifican como pauta conservadora y no como programa oficial BMW específico del M50.
- Evita duplicar recordatorios pendientes del mismo nombre.

## Mejoras v0.3
- Edición de intervenciones ya registradas, además de alta y borrado.
- Estado automático de recordatorios: pendiente, vencido o completado, según odómetro/fecha.
- Favoritos en la biblioteca de pares de apriete y filtro para consultarlos.
- Copiar al portapapeles el par, la aplicación y la referencia de página.
- Migración compatible con los datos guardados en v0.1/v0.2.
- Mantiene exportación CSV, copia/restauración JSON y modo offline.

## Instalación Android
Publicar la carpeta en HTTPS y abrirla con Chrome → menú → Instalar aplicación/Añadir a pantalla de inicio.

## Instalación iPhone
Abrir en Safari → Compartir → Añadir a pantalla de inicio.

## Datos técnicos
La biblioteca de pares es una transcripción parcial del catálogo BMW Tightening Torques (20/10/1997), no una transcripción íntegra de las 136 páginas. Cada registro conserva la página de origen y el alcance de aplicación identificado. Consultar el PDF original antes de aplicar cualquier valor, especialmente si la variante, caja o condición de montaje difiere.

Fuente: https://www.e34chassis.com/wp-content/uploads/2023/08/bmw_torq.pdf

Proyecto independiente, no afiliado a BMW AG.


## Fuente del plan de mantenimiento
Haynes BMW 3 & 5 Series Service and Repair Manual, sección 1·4 (calendario de mantenimiento). El manual advierte que sus intervalos son pautas de mantenimiento preventivo abreviadas respecto a los intervalos de concesionario. Aplicabilidad y especificaciones deben confirmarse para la unidad concreta.
Fuente consultable: https://www.bmwclub.by/book/e34/Haynes%20Repair%20Manual%20-%20Bmw%20e30%2C%20e28%20%26%20e34.pdf

## Ficha de fluidos
La tabla de códigos se basa en los códigos de producción E34 publicados por BimmerArchive. Las capacidades proceden de BMW Guide, Auto-ABC y una guía secundaria escaneada para el 520i; no son una confirmación BMW del vehículo concreto. Las cajas automáticas y algunos sistemas se expresan como capacidad total, que puede diferir del vaciado y reposición. Confirma la etiqueta de la caja, el marcado del diferencial, el depósito de dirección y el manual de taller de tu unidad antes de comprar o añadir fluidos.

- Códigos E34: https://www.bimmerarchive.org/e-code/e34.html
- Capacidades de modelos: https://www.auto-abc.eu/bmw-5-serija/v3156-1990
- Tabla de aceite E34: https://bmwguide.net/bmw-e34-engine-oil-change/
- Guía de fluidos 520i: https://www.scribd.com/doc/268460081/BMW-5-Series-520i-1992-1995
- Haynes BMW 3 & 5 Series Service and Repair Manual: https://www.bmwclub.by/book/e34/Haynes%20Repair%20Manual%20-%20Bmw%20e30%2C%20e28%20%26%20e34.pdf
- Bentley BMW 5-Series Service Manual (mercado/variante por confirmar): https://www.e34chassis.com/wp-content/uploads/2023/08/Bentley_BMW_5-Series_Service_Manual_edited_eF1x.pdf
