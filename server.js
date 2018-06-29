const express = require('express');

// * Initialze a Variable to Express
const app = express();

// * Test Route
app.get('/', (req, res) => {
  res.send('Hello World');
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
