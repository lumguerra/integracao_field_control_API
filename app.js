const axios = require('axios');
const FieldControl = require('fieldcontrol');
const express = require('express');
const app = express();
const apiRoutes = require('./apiRoutes');
const { client } = require('./config');

app.use(express.json());

const API_KEY = `YWRiNDU5MzYtZmFhNS00M2YyLTlmZjYtZjhkMmQzODI1M2NlOjU2OTUx`;

async function fetchDataFromUrl() {
  try {
      const response = await axios.get('https://carchost.fieldcontrol.com.br/');
      return response.data; // Return the data from the URL
  } catch (error) {
      throw error;
  }
}

async function forms(identifier) {
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

app.use('/api', apiRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});