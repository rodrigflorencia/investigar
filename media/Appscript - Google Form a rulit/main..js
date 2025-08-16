/***************************************************************************************
 * Proyecto: Rulit Test - Endpoint y Automatización de Formulario (Google Sheets & Forms)
 * Archivo: main.gs
 * Plataforma: Google Apps Script (Sheets + Forms + Mail)
 *
 * Descripción:
 *   - Publica un endpoint web (doGet) que muestra una página de instrucciones y abre la app.
 *   - Escucha envíos de Google Forms (onFormSubmit), guarda un ID de respuesta en Sheets
 *     y envía un correo de confirmación al respondente (con copia opcional al admin).
 *   - Incluye utilidades para crear/borrar triggers de forma segura.
 *
 * Recomendado:
 *   - Vincular este proyecto a la HOJA de cálculo de respuestas del Form (Extensions → Apps Script).
 *   - Implementar despliegue como app web (Deploy → New deployment → Web app).
 *
 * NOTA IMPORTANTE:
 *   - Este código está DOCUMENTADO línea a línea para facilitar su mantenimiento.
 ***************************************************************************************/
function onFormSubmit(e) {
  const formResp = e.response;                 // FormResponse
  const responseId = formResp.getId();         // ID de respuesta del Form
  const editUrl    = formResp.getEditResponseUrl();
  const timestamp  = formResp.getTimestamp();  // Date

  // Mapear respuestas por título de pregunta
  const answers = {};
  formResp.getItemResponses().forEach(ir => {
    const title = ir.getItem().getTitle();
    answers[title] = ir.getResponse();
  });

  // Documento a guardar en Firestore con ID = responseId
  
  const doc = {
    responseId,
    editUrl,
    userId: `${responseId}`,
    graphAndSolutionCode: "19db35dd",
    submittedAt: timestamp,
    answers,
    shortMemoryTest: [],      // Array<IRulitExercise>
    longMemoryTest: [],       // Array<IRulitExercise>
    stepErrors: [],           // Array<number>
    nextTest: 'learning',
    trainingDate: null,       // nullValue
    testDate: null            // nullValue
  };


  // 1) Guardar en Firestore con documentId = responseId
  saveToFirestoreWithId('rulit-users', responseId, doc);

  // 2) Escribir el responseId en la Hoja de respuestas
  const form = FormApp.getActiveForm();
  writeResponseIdToSheet(form, timestamp, responseId);
  enviar_correo("hola",responseId);
}
