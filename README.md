# BMW E34 Service Book — v0.6

PWA responsive para el historial y la documentación de un BMW E34.

## Mejoras v0.6
- Unifica el logo de interfaz y los iconos de instalación Android con los colores BMW Motorsport; añade una foto genérica del BMW 520i y selector español/inglés.
- Mejora la lectura en móviles con tipografía ampliada y tarjetas que se adaptan a dos columnas.
- Mantiene visible el botón «Instalar» y ofrece instrucciones alternativas si el navegador no muestra el aviso nativo.
- Permite elegir una foto propia del vehículo; se procesa y guarda solo en el almacenamiento local del navegador.
- Mantiene los textos ya escritos en registros, el kilometraje en km y la biblioteca de pares en español.
- Atribución de la imagen: “BMW E34 520i.jpg”, Felix Schmidt, Wikimedia Commons, CC BY-SA 3.0. Es un 520i alemán de 1992 y no necesariamente representa la unidad del usuario. La imagen original se distribuye sin modificar: https://commons.wikimedia.org/wiki/File:BMW_E34_520i.jpg

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
La ficha v0.5 identifica el vehículo base como 520i E34 berlina, 1991, M50B20 sin VANOS, según la ficha técnica existente en la aplicación. Los manuales Haynes y Bentley están enlazados como referencias generales, pero sus especificaciones no se han validado contra la configuración europea concreta ni contra el VIN. Por eso se dejan pendientes las cantidades, homologaciones/viscosidades y referencias OEM. Para completar caja, diferencial y dirección hacen falta sus identificadores físicos; la capacidad de servicio no debe confundirse con la capacidad total.

- Haynes BMW 3 & 5 Series Service and Repair Manual: https://www.bmwclub.by/book/e34/Haynes%20Repair%20Manual%20-%20Bmw%20e30%2C%20e28%20%26%20e34.pdf
- Bentley BMW 5-Series Service Manual (mercado/variante por confirmar): https://www.e34chassis.com/wp-content/uploads/2023/08/Bentley_BMW_5-Series_Service_Manual_edited_eF1x.pdf
