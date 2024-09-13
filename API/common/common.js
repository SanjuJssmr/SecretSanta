const assignSantaClause = (employeeList, previousReport) => {
    let previousSet = new Map(), shuffledSantas = [], result = [], empEmail, empName, assignedSanta, swapIndex, assignedSantaData;
    try {
        for (const emp of previousReport) {
            previousSet.set(emp.Employee_EmailID, emp.Secret_Child_EmailID);
        }
        for (const santa of employeeList) {
            shuffledSantas.push(santa.Employee_EmailID)
        }

        shuffledSantas.sort(() => Math.random() - 0.5);

        for (let i = 0; i < employeeList.length; i++) {
            empEmail = employeeList[i].Employee_EmailID;
            empName = employeeList[i].Employee_Name;
            assignedSanta = shuffledSantas[i];

            if (assignedSanta === empEmail || assignedSanta === previousSet.get(empEmail)) {
                swapIndex = (i + 1) % employeeList.length;
                [shuffledSantas[i], shuffledSantas[swapIndex]] = [shuffledSantas[swapIndex], shuffledSantas[i]];
                assignedSanta = shuffledSantas[i];
            }

            assignedSantaData = employeeList.find(emp => emp.Employee_EmailID === assignedSanta);

            result.push({
                Employee_Name: empName,
                Employee_EmailID: empEmail,
                Secret_Child_Name: assignedSantaData.Employee_Name,
                Secret_Child_EmailID: assignedSantaData.Employee_EmailID
            });
        }

        return result;
    } catch (error) {
        console.log(`Error in assingSantaClause func in common.js - ${error}`);
        return false;
    }
};

module.exports = { assignSantaClause }