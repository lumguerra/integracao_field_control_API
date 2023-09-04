const API_KEY = `YWRiNDU5MzYtZmFhNS00M2YyLTlmZjYtZjhkMmQzODI1M2NlOjU2OTUx`;
// IMPORTEI A LIB FIELD CONTROL 
const FieldControl = require('fieldcontrol')

// GEREI O CLIENT CONFORME DOC GITHUB
const client = new FieldControl({
    apiKey: API_KEY
})  

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



function parseOrders(data) {
    return data.items.map(item => item.id);
};   


// FUNCAO QUE EXPORTA O MODULO QUE ESTA NESTE ARQUIVO
module.exports = {
    getOrders,
    parseOrders,
    getForms
}