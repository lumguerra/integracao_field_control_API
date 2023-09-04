const axios = require('axios');
const express = require('express');
const app = express();
const apiRoutes = require('./apiRoutes');

app.use(express.json());
app.use('/api', apiRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});