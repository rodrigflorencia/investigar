
# Resumen

- Este proyecto publica un endpoint web (doGet) con instrucciones y un botón que abre la app principal.
- Captura envíos del Form (onFormSubmit), escribe el ID de respuesta en Sheets y envía un correo de confirmación.

## Cómo usar

1) En tu Spreadsheet o Form → Extensions → Apps Script → pegar archivos main.gs y utils.gs.

2) Reemplaza CFG_FORM_ID, CFG_SHEET_ID y CFG_EXEC_URL_BASE por los de tu entorno.

3) Ejecuta manualmente setupFormSubmitTrigger() una vez para instalar el trigger de envío del Form.

4) Deploy → New deployment → Web app → elige acceso (Anyone / Anyone with link) según tu caso.

5) Abre la URL de despliegue para ver la página de instrucciones. Puedes pasar ?rowId=<ID>.
