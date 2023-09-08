const axios = require('axios');



async function getFormById(osId, formId) {
    try {
        const apiUrl = `https://carchost.fieldcontrol.com.br/orders/${osId}/forms/${formId}`;
        const response = await axios.get(apiUrl,{
            headers: {
              'X-Api-Key': 'YWRiNDU5MzYtZmFhNS00M2YyLTlmZjYtZjhkMmQzODI1M2NlOjU2OTUx'
            }
          });
        if(!response){
            return null
        }
        return response.data;
         
    } catch (e) {
        console.log('EER', e)
    }


}

module.exports = {
    getFormById
}