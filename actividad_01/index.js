const fs = require('fs');

const readable = fs.createReadStream('datos.txt', {
    encoding: 'utf8'
});

readable.on('data', (chunk) => {
    console.log('Fragmento recibido:');
    console.log(chunk);
});

readable.on('end', () => {
    console.log('Lectura completa');
});

readable.on('error', (error) => {
    console.error('Error:', error.message);
});