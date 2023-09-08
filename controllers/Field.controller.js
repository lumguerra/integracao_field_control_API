const API_KEY = `YWRiNDU5MzYtZmFhNS00M2YyLTlmZjYtZjhkMmQzODI1M2NlOjU2OTUx`;
// IMPORTEI A LIB FIELD CONTROL 
const FieldControl = require('fieldcontrol')
const moment = require('moment-timezone');
const { getFormById } = require('../services/Field.service');
const util = require('./util');
const questionController = require('./Question.controller');

// GEREI O CLIENT CONFORME DOC GITHUB
const client = new FieldControl({
    apiKey: API_KEY
})



async function handleFieldApis(identifier) {

    let formAquecedorDetails, formPgtoDetails, formDiagnosticoInternoDetails;
    let infoAquecedor, infoPgto, infoDiagnosticoInterno;

    // ORDEM DE SERICO
    const order = await util.getOrders(identifier);
    if (!order) {
        return null
    }

    const id = order.id;

    // BUSCO OS FORMULARIOS
    const forms = await util.getForms(id);
    if (!forms) {
        return null
    }



    const task = await util.getTask(id);
    const employeeId = task?.employee?.id
    const employee = await util.getEmployee(employeeId);
    const parsedDataArray = [];

    for (const f of forms?.items || []) {
        const formData = await util.buildFormsData(forms, f.name);
        const details = await getFormById(id, formData.id);
        const parsed = questionController.parseQuestionForm(details);
        parsedDataArray.push({ ...parsed }); // Substitua 'additionalField' pelo nome do campo que deseja adicionar.

    }


    const responseObj = {
        osNumero: identifier,
        data: task.data,
        inicio: task.start,
        termino: task.end,
        colaborador: employee,
        status: task.status,
        descricao: order?.description || '',
        relatorio: parsedDataArray
    }

    const finalObj = cleanUnusedFields(responseObj)
    return finalObj;
}


function cleanUnusedFields(objResponse) {
    const unwantedKeys = ['Lembrete', 'Foto Inicio Atividade'];
    objResponse.relatorio = objResponse.relatorio.filter(question => !unwantedKeys.includes(question.name));
    return objResponse;
}



module.exports = {
    handleFieldApis
}