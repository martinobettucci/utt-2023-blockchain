const express = require('express');
const path = require('path');
const app = express();

// Serve files from the 'src' directory
app.use(express.static(path.join(__dirname, 'src')));

// Route for '/abi' to serve files from 'build/contracts'
app.use('/abi', express.static(path.join(__dirname, 'build/contracts')));

// Serve Bootstrap CSS and JS
app.use('/bootstrap/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/bootstrap/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));

// Serve Web3 JS
app.use('/web3', express.static(path.join(__dirname, 'node_modules/web3/dist')));

// Choose your port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
