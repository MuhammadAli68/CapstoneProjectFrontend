const axios = require('axios');
const fs = require('fs');
const crypto = require('crypto');
const express = require('express');

const app = express();

app.get('/client',(req,res)=>{
    let file = '';
    let Checksum = '';
    axios.get('http://server:3000/file')
  .then((response) => {
    if(response.data)
    {
        // console.log(response.data);
        // console.log(response.status);
        // console.log(response.statusText);
        // console.log(response.headers);
        // console.log(response.config);
        file = response.data;
        fs.writeFileSync('/app/clientdata/randomfile.txt',file['fileContent']);
        Checksum = generateChecksum(file['fileContent']);
    }
    res.send(`<div style="text-align: center;">
    <h1>Hello from Client</h1>
    <p>Received File Content:</p>
    <pre>${ file['fileContent'] }</pre>
    <p> Received Checksum:</p>
    <pre>${ file['checksum'] }</pre>
    <p> Calculated Checksum:</p>
    <pre>${ Checksum }</pre>
  </div>`);
  });


});

function generateChecksum(str, algorithm, encoding) {
    return crypto
        .createHash(algorithm || 'md5')
        .update(str, 'utf8')
        .digest(encoding || 'hex');
}

app.listen(5000,()=>{
    console.log('client is running on port 5000');
});
