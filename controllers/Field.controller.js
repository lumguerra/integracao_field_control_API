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
        return response.data; // Return the data from the API response
    } catch (error) {
        throw error;
    }
  }

// FUNCAO QUE EXPORTA O MODULO QUE ESTA NESTE ARQUIVO
module.exports = {
    getOrders
}