"use strict";

function sendConfirmationToInvestigar(e)
{
  let form = FormApp.getActiveForm();
  let formId = form.getId();
  let itemResponses = e.response.getItemResponses();
  let userId = itemResponses[0].getResponse();
  
  fetchInvestigarAPI(userId, formId);
}

function fetchInvestigarAPI(userId, formId){
  var url = 'http://143.198.65.36:7000/confirm-encode-form'
    + '?userId=' + userId
    + '&formId=' + formId;

  var response = UrlFetchApp.fetch(url, {'method': 'POST', 'muteHttpExceptions': true});
  Logger.log(response);
}