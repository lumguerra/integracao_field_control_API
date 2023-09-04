const API_KEY = `YWRiNDU5MzYtZmFhNS00M2YyLTlmZjYtZjhkMmQzODI1M2NlOjU2OTUx`;
// IMPORTEI A LIB FIELD CONTROL 
const FieldControl = require('fieldcontrol')

// GEREI O CLIENT CONFORME DOC GITHUB
const client = new FieldControl({
    apiKey: API_KEY
})



async function handleFieldApis(identifier) {
    // ORDEM DE SERICO
    const orders = await getOrders(identifier);
    if (!orders) {
        return null
    }

    // TRANSFORMA A ORDEM EM ID ["XPTO"]
    const idOrders = parseOrders(orders);

    // PEGO O PRIMEIRO ID DO ARRAY
    const id = idOrders[0];

    // BUSCO OS FORMULARIOS
    const forms = await getForms(id);

    if (!forms) {
        return null
    }
    
    return forms;
}   

// CRIEI A FUNCAO CONTROLLER PARA LOGICA DE LLISTAGEM QUE É IMPORTAD EM APIROUTES.JS
async function getOrders(identifier) {
    try {
        const response = await client.orders.list({
            filter: {
                identifier: identifier
            }
        });
        return response.data;
    } catch (error) {
        console.log("Deu erro");
    }
}

// Busca formularios
async function getForms(identifier) {
    try {
        const response = await client.orders.listForms(identifier);
        return response.data;
    } catch (error) {
        console.log("Deu erro");
    }
}

// FUNCAO QUE TRANSFORMA OS EM ID_ARRAY
function parseOrders(data) {
    return data.items.map(item => item.id);
};


// FUNCAO QUE BUSCA ANEXOS

async function getAnexos(id) {
    try {
        const response = await client.orders.listAttachments(id)
        return response.data;
    } catch (e) {
        console.log('DEU ERRO GET ANEXOS')
    }
}

// FUNCAO QUE EXPORTA O MODULO QUE ESTA NESTE ARQUIVO
module.exports = {
    getOrders,
    parseOrders,
    getForms,
    handleFieldApis
}