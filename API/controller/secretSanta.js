const fs = require('fs')
const path = require('path');
const { csvToJson, uploadFileToLocal, jsonToCsv } = require('../utils/helper');
const { assignSantaClause } = require('../common/common');

const assignSanta = async (req, res) => {
    let payload = req.files, uploadFile, status, employeeJson, lastYearJson, assignedJson, exportCSV;
    try {
        if (payload == undefined || payload.length < 2) {

            return res.send({ status: 500, response: "Upload all files" })
        }
        for (let i = 0; i < req.files.length; i++) {
            status = csvToJson(req.files[i].buffer)
            if (status === false) {

                return res.send({ status: 500, response: "Something went wrong" })
            }
            if (i == 0) {
                employeeJson = status
            } else {
                lastYearJson = status
            }
        }
        assignedJson = assignSantaClause(employeeJson, lastYearJson)
        if (assignedJson === false) {

            return res.send({ status: 500, response: "Something went wrong" })
        }

        return res.send({ status: 200, data: assignedJson, response: "Santa assinged successfully" })
    } catch (error) {
        console.log(`Error in secretSanta controller at assignSanta func - ${error}`);
        return res.send({ status: 500, response: "Internal  server error" })
    }
}

module.exports = { assignSanta }