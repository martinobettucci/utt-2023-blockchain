const express = require('express');
const path = require('path');
const app = express();

// Serve files from the 'src' directory
app.use(express.static(path.join(__dirname, 'src/pages')));

// Route for '/abi' to serve files from 'build/contracts'
app.use('/abi', express.static(path.join(__dirname, 'build/contracts')));

// Route for '/dist' to serve files from webpack
app.use('/js', express.static(path.join(__dirname, 'build/js')));

// Choose your port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
