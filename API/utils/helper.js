const fs = require('fs')
const path = require('path');
const XLSX = require('xlsx')


const csvToJson = (buffer) => {
    try {
        let workbook, sheetName, sheet, jsonData, status
        workbook = XLSX.read(buffer, { type: 'buffer' });
        sheetName = workbook.SheetNames[0];
        sheet = workbook.Sheets[sheetName];
        jsonData = XLSX.utils.sheet_to_json(sheet);
        if (jsonData != undefined && jsonData.length !== 0) {
            return jsonData
        }
        return false;
    } catch (error) {
        console.log(`Error in csvToJson funct in helper - ${error}`);
        return false;
    }
}

const jsonToCsv = (jsonData) => {
    try {
        let worksheet, workbook, filePath;
        filePath = path.join(__dirname, `../statics/AssignedSanta(2024).xlsx`)
        worksheet = XLSX.utils.json_to_sheet(jsonData);
        workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        XLSX.writeFile(workbook, filePath);
        
        return true;
    } catch (error) {
        console.log(`Error in jsonToCsv funct in helper - ${error}`);
        return false;
    }
}



module.exports = { csvToJson, jsonToCsv }