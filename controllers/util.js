const API_KEY = `YWRiNDU5MzYtZmFhNS00M2YyLTlmZjYtZjhkMmQzODI1M2NlOjU2OTUx`;
const FieldControl = require('fieldcontrol')
const moment = require('moment-timezone');

const client = new FieldControl({
    apiKey: API_KEY
})

// BUSCA FORM
async function getForms(identifier) {
    try {
        const response = await client.orders.listForms(identifier);
        return response.data;
    } catch (error) {
        console.log("Deu erro");
    }
}

// BUSCA O.S
async function getOrders(identifier) {
    try {
        const response = await client.orders.list({
            filter: {
                identifier: identifier
            }
        });
        return response.data?.items[0];
    } catch (error) {
        console.log("Deu erro");
    }
}


// BUSCA FORM POR TITULO
async function buildFormsData(forms, formTitle) {
    const form = forms.items.find(item => item.name === formTitle);
    return form
}

// BUSCA DADOS DE SERVICO   
async function getTask(id) {
    const response = await client.orders.listTasks(id);
    if (!response.data.items.length) {
        return {}
    }
    const rep = response.data.items[0];
    const parseConvertido = {
        data: moment(rep.startedAt).tz('America/Sao_Paulo').format('DD/MM/YYYY'),
        start: moment(rep.startedAt).tz('America/Sao_Paulo').format('DD/MM/YYYY HH:mm'),
        end: moment(rep.completedAt).tz('America/Sao_Paulo').format('DD/MM/YYYY HH:mm'),
        employee: rep.employee,
        status: rep.status === 'done' ? 'Concluído' : 'Em andamento',
    };
    return parseConvertido
}

// FORMATA O NOME DO COLABORADOR
async function getEmployee(id) {
    try {
        const employee = await client.employees.get(id);
        if (!employee?.data) {
            return {}
        }
        return employee?.data?.name;
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    getForms,
    getOrders,
    buildFormsData,
    getTask,
    getEmployee
}

