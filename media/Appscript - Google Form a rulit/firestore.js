/**
 * Requisitos:
 * - Este script debe estar en el proyecto del FORMULARIO (no en la hoja).
 * - El formulario debe tener destino en una hoja (Form -> Respuestas -> Vincular con hojas de cálculo).
 * - API de Firestore habilitada en el proyecto de GCP vinculado al Apps Script.
 * - Scope: https://www.googleapis.com/auth/datastore
 */


// -------- Helpers Firestore --------
function toFirestoreFields(obj) {
    const wrap = (v) => {
      if (v === null) return { nullValue: null };
      if (v instanceof Date) return { timestampValue: v.toISOString() };
      if (Array.isArray(v)) return { arrayValue: { values: v.map(wrap) } };
      switch (typeof v) {
        case 'string':  return { stringValue: v };
        case 'boolean': return { booleanValue: v };
        case 'number':  return Number.isInteger(v) ? { integerValue: String(v) } : { doubleValue: v };
        case 'object':  return { mapValue: { fields: toFirestoreFields(v) } };
        default:        return { stringValue: String(v) };
      }
    };
    const fields = {};
    Object.keys(obj || {}).forEach(k => fields[k] = wrap(obj[k]));
    return fields;
  }
  
  function saveToFirestoreWithId(collection, docId, data) {
    const url = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/${encodeURIComponent(collection)}?documentId=${encodeURIComponent(docId)}`;
    const token = createJwtToken();
    const resp = UrlFetchApp.fetch(url, {
      method: 'post',
      headers: { Authorization: `Bearer ${token}` },
      contentType: 'application/json',
      payload: JSON.stringify({ fields: toFirestoreFields(data) }),
      muteHttpExceptions: true
    });
    const code = resp.getResponseCode();
    if (code >= 400) throw new Error(`Firestore ${code}: ${resp.getContentText()}`);
    return JSON.parse(resp.getContentText());
  }
  
  // -------- Helper Hoja de respuestas --------
  /**
   * Escribe el responseId en la Hoja de respuestas del Form en la fila correspondiente al timestamp.
   * Crea la columna "Response ID" si no existe.
   */
  function writeResponseIdToSheet(form, timestamp, responseId) {
    const destId = form.getDestinationId();
    if (!destId) return;
  
    const ss = SpreadsheetApp.openById(destId);
    const sheet = ss.getSheets()[0];
    const lastRow = sheet.getLastRow();
    const lastCol = sheet.getLastColumn();
    
    if (lastRow < 2) return;
  
    const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
    const tsColIdx = findTimestampColumnIndex(headers);
    const idColIdx = ensureResponseIdColumn(sheet, headers, lastCol);
  
    const targetRow = findMatchingRow(sheet, tsColIdx, lastRow, timestamp);
    if (targetRow !== -1) {
      sheet.getRange(targetRow, idColIdx).setValue(responseId);
    } else {
      appendNewRowWithResponseId(sheet, idColIdx, responseId);
    }
  }
  
  function findTimestampColumnIndex(headers) {
    const tsHeaderCandidates = ['Timestamp', 'Marca de tiempo', 'Fecha y hora'];
    const tsColIndex = headers.findIndex(header => 
      tsHeaderCandidates.includes(header)
    );
    return tsColIndex !== -1 ? tsColIndex + 1 : 1;
  }
  
  function ensureResponseIdColumn(sheet, headers, lastCol) {
    let idColIdx = headers.indexOf('Response ID') + 1;
    if (idColIdx === 0) {
      idColIdx = lastCol + 1;
      sheet.getRange(1, idColIdx).setValue('Response ID');
    }
    return idColIdx;
  }
  
  function findMatchingRow(sheet, tsColIdx, lastRow, targetTime) {
    const tsValues = sheet.getRange(2, tsColIdx, lastRow - 1, 1).getValues();
    const targetTimestamp = new Date(targetTime).getTime();
    
    // Check exact match first
    for (let i = tsValues.length - 1; i >= 0; i--) {
      const cell = tsValues[i][0];
      if (cell && cell instanceof Date && cell.getTime() === targetTimestamp) {
        return i + 2;
      }
    }
    
    // Check within 2 seconds window if no exact match
    return findMatchingRowInTimeWindow(tsValues, targetTimestamp);
  }
  
  function findMatchingRowInTimeWindow(tsValues, targetTimestamp) {
    for (let i = tsValues.length - 1; i >= 0; i--) {
      const cell = tsValues[i][0];
      if (cell && cell instanceof Date) {
        const diff = Math.abs(cell.getTime() - targetTimestamp);
        if (diff <= 2000) {
          return i + 2;
        }
      }
    }
    return -1;
  }
  
  function appendNewRowWithResponseId(sheet, idColIdx, responseId) {
    sheet.appendRow(Array(10).fill('')); // Create empty row with 10 columns
    const lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, idColIdx).setValue(responseId);
  }
    
  