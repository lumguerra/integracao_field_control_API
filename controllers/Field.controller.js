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

    const formAquecedor = await util.buildFormsData(forms, 'Formulário Aquecedor');

    if (formAquecedor) {
        formAquecedorDetails = await getFormById(id, formAquecedor.id)
        infoAquecedor = questionController.parseQuestionForm(formAquecedorDetails);
    }

    const formPgto = await util.buildFormsData(forms, "Forma de Pgto");

    if(formPgto) {
        formPgtoDetails = await getFormById(id, formPgto.id);
        infoPgto = questionController.parseQuestionForm(formPgtoDetails);
    }

    const formDiagnInter = await util.buildFormsData(forms, "Diagnóstico (Interno)");
    
    if(formDiagnInter){
        formDiagnosticoInternoDetails = await getFormById(id, formDiagnInter.id);
        infoDiagnosticoInterno = questionController.parseQuestionForm(formDiagnosticoInternoDetails);
    }


    const responseObj = {
        osNumero: identifier,
        data: task.data,
        inicio: task.start,
        termino: task.end,
        colaborador: employee,
        status: task.status,
        descricao: order?.description || '',
        infoAquecedor,
        infoPgto,
        infoDiagnosticoInterno
    }
    return responseObj;
}



module.exports = {
    handleFieldApis
}