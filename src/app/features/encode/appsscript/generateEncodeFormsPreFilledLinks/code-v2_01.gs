// 
// implementacion
// descripcion: v2.01
// url: https://script.google.com/macros/s/AKfycbyMMbupBPwdCvZ5Oh90DeAGwNmTsbwqT5V2p6JzGR0iP3KdX1D4FI8hSHBvz15dH7pg/exec
// 
"use strict";

function doGet(e){
  const userId = e.parameter.userId;
  const formsURLs = e.parameters.formsURLs;
  
  let preFilledResponses = [];

  for (let formURL of formsURLs){
    preFilledResponses.push(generateNewResponse(userId, formURL));
  }

  return ContentService.createTextOutput(JSON.stringify(preFilledResponses)).setMimeType(ContentService.MimeType.JSON); 
}

function generateNewResponse(userId, formURL){
  const form = FormApp.openByUrl(formURL);
  const formId = form.getId();
  const isResponded = false;
  let formItems = form.getItems();
  let newFormResponse = form.createResponse();
  
  let userIdItem = formItems[0].asMultipleChoiceItem().setChoiceValues([userId]);
  let itemResponse = userIdItem.createResponse(userId);
  newFormResponse.withItemResponse(itemResponse);

  const preFilledURL = newFormResponse.toPrefilledUrl();

  const newResponse = {
    formID: formId,
    preFilledURL: preFilledURL,
    isResponded: isResponded
  };

  return newResponse;
}
