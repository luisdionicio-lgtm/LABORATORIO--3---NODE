const fs = require('fs');
const zlib = require('zlib');

const readStream = fs.createReadStream('entrada.txt');
const writeStream = fs.createWriteStream('entrada.txt.gz');
const gzip = zlib.createGzip();

readStream
    .pipe(gzip)
    .pipe(writeStream);

writeStream.on('finish', () => {
    console.log('Archivo comprimido correctamente.');
});

readStream.on('error', (error) => {
    console.error('Error de lectura:', error.message);
});

writeStream.on('error', (error) => {
    console.error('Error de escritura:', error.message);
});