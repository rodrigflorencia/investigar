import { Parser, transforms } from 'json2csv';

/**
 * A simple CSV converter for basic cases.
 * @param objArray The array of objects to convert.
 * @param headerList The list of headers.
 * @returns A CSV string.
 */
function convertToCSV(objArray: any[], headerList: string[]): string {
  const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
  let str = '';
  let row = 'S.No,';

  for (const index in headerList) {
    row += headerList[index] + ',';
  }
  row = row.slice(0, -1);
  str += row + '\r\n';

  for (let i = 0; i < array.length; i++) {
    let line = (i + 1) + '';
    for (const index in headerList) {
      const head = headerList[index];
      line += ',' + array[i][head];
    }
    str += line + '\r\n';
  }
  return str;
}

/**
 * Generates a CSV string from data using json2csv for more complex objects.
 * @param data The data to convert.
 * @param fields The fields to include in the CSV.
 * @returns A CSV string.
 */
function generateJson2Csv(data: any[], fields: string[]): string {
  const json2csvParser = new Parser({ fields, transforms: [transforms.flatten()] });
  return json2csvParser.parse(data);
}


/**
 * Triggers a file download in the browser.
 * @param content The content of the file.
 * @param fileName The name of the file to download.
 * @param mimeType The MIME type of the file.
 */
function downloadFile(content: string, fileName: string, mimeType: string = 'text/csv;charset=utf-8;') {
    const blob = new Blob(['\ufeff' + content], { type: mimeType });
    const dwldLink = document.createElement('a');
    const url = URL.createObjectURL(blob);
    const isSafariBrowser = navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1;

    if (isSafariBrowser) {
      dwldLink.setAttribute('target', '_blank');
    }

    dwldLink.setAttribute('href', url);
    dwldLink.setAttribute('download', fileName);
    dwldLink.style.visibility = 'hidden';
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
}

export const CsvExporter = {
    exportToCsv: (data: any[], headers: string[], fileName: string) => {
        const csvData = convertToCSV(data, headers);
        downloadFile(csvData, fileName);
    },
    exportJsonToCsv: (data: any[], fields: string[], fileName: string) => {
        const csvData = generateJson2Csv(data, fields);
        downloadFile(csvData, fileName);
    }
};
