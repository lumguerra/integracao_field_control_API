const FieldControl = require('fieldcontrol');

const API_KEY = `YWRiNDU5MzYtZmFhNS00M2YyLTlmZjYtZjhkMmQzODI1M2NlOjU2OTUx`;

const client = new FieldControl({
    apiKey: API_KEY
});

module.exports = {
    client, // Export the FieldControl instance
};