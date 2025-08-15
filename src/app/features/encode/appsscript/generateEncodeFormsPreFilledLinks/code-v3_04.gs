// 
// implementacion
// descripcion: v3.04
// url: https://script.google.com/macros/s/AKfycbzpqwuNAGCWG0pF4KRxiIQ0H62rapGEky3XxjuuYkVDieBCCl4IcQLYsPHaYSyf79e8/exec
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
  
  // let userIdItem = formItems[0].asMultipleChoiceItem().setChoiceValues([userId]);
  let userIdItem = formItems[0].asTextItem();
  // let itemResponse = userIdItem.createResponse(userId);
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