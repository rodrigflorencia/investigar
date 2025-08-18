/****************************************************************************************
 * Archivo: email.gs
 * Descripción:
 *   Construcción de HTML de email y envio.
 ****************************************************************************************/

/** ============================== HTML: PLANTILLAS ================================== **/

/**
 * Espacio de nombres para construir HTML (página de instrucciones).
 */
function generar_cuerpo (formId){return `<!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Instrucciones del Test</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
                line-height: 1.6;
                color: #333;
            }
            .instruction-container {
                margin: 20px 0;
            }
            .instruction-item {
                margin-bottom: 30px;
                padding: 20px;
                background-color: #f9f9f9;
                border-radius: 8px;
                box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            }
            .instruction-item img {
                max-width: 100%;
                height: auto;
                border-radius: 4px;
                margin: 10px 0;
                display: block;
                margin-left: auto;
                margin-right: auto;
            }
            h1 {
                color: #2c3e50;
                text-align: center;
                margin-bottom: 30px;
            }
            h2 {
                color: #34495e;
                margin-top: 0;
            }
            .btn {
                display: block;
                width: 200px;
                background-color: #3498db;
                color: white;
                text-align: center;
                padding: 12px;
                margin: 30px auto;
                text-decoration: none;
                border-radius: 4px;
                font-weight: bold;
                transition: background-color 0.3s;
            }
            .btn:hover {
                background-color: #2980b9;
            }
            .step-number {
                display: inline-block;
                width: 30px;
                height: 30px;
                background-color: #3498db;
                color: white;
                border-radius: 50%;
                text-align: center;
                line-height: 30px;
                margin-right: 10px;
                font-weight: bold;
            }
        </style>
    </head>
    <body>
    
        <h1>Instrucciones del Test</h1>
        <div style="font-family: Arial, sans-serif; max-width: 620px; margin: 0 auto;">
      <h2 style="color: #2c3e50; margin-bottom: 8px;">¡Gracias por completar el formulario!</h2>
      <p style="margin-top: 0;">Hemos recibido tu respuesta correctamente.</p>
      <p style="margin-top: 0;">Para finalizar la primera parte de la prueba, debes hacer un juego que te llevará como máximo diez minutos.</p>
      <p style="margin-top: 0;">A continuación te damos las instrucciones y el enlace para que puedas acceder desde tu celular o computadora.</p>
        <div class="instruction-container">
            <div class="instruction-item">
                <h2><span class="step-number">1</span> Instrucción Inicial</h2>
                <p>Bienvenido al test. Por favor, lea atentamente todas las instrucciones antes de comenzar.</p>
                <img src="https://investigar-webapp.web.app/assets/videos/instructionRulit_1.gif" alt="Instrucción 1">
                <p>Observe atentamente la animación que muestra el patrón a seguir durante el test.</p>
            </div>
    
            <div class="instruction-item">
                <h2><span class="step-number">2</span> Secuencia Lógica</h2>
                <img src="https://investigar-webapp.web.app/assets/images/instructionRulit_2.png" alt="Instrucción 2">
                <p>Identifique la secuencia lógica mostrada en la imagen. Este será el tipo de patrones que deberá completar.</p>
            </div>
    
            <div class="instruction-item">
                <h2><span class="step-number">3</span> Selección de Respuesta</h2>
                <img src="https://investigar-webapp.web.app/assets/images/instruction_4.png" alt="Instrucción 3">
                <p>Para cada pregunta, seleccione la opción que mejor complete el patrón mostrado.</p>
                <ul>
                    <li>Analice cuidadosamente cada opción</li>
                    <li>Elija solo una respuesta</li>
                    <li>Tendrá un tiempo limitado para cada pregunta</li>
                </ul>
            </div>
        </div>
        <button id="startTestBtn"><a href="https://investigar-webapp.web.app/rulit//test/${encodeURIComponent(formId)}" /a>Comenzar Test</button>
    
      <p style="font-size: 12px; color: #666; margin-top: 24px;">
        Si el botón no funciona, copia y pega esta URL en tu navegador:<br>
        https://investigar-webapp.web.app/rulit/test/${encodeURIComponent(formId)}
      </p>
    </div></body></html>`;
    }
      function enviar_correo(email,responseId){
      MailApp.sendEmail({
            to: 'rodrig.florencia@gmail.com',
            subject: "hola",
            htmlBody:  generar_cuerpo (responseId)
          });
          
        return {
          status: "success",
          responseId: responseId,
          emailSent: !!email,
          email: email || 'No proporcionado'
        }};
        
    