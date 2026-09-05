const { Transform } = require('stream');
const fs = require('fs');

const transformStream = new Transform({
    transform(chunk, encoding, callback) {
        callback(null, chunk.toString().toUpperCase());
    }
});

const readStream = fs.createReadStream('texto.txt');

const writeStream = fs.createWriteStream('texto_mayusculas.txt');

readStream
    .pipe(transformStream)
    .pipe(writeStream);

writeStream.on('finish', () => {
    console.log('Archivo convertido a mayúsculas correctamente.');
});

readStream.on('error', (error) => {
    console.error('Error al leer el archivo:', error.message);
});

writeStream.on('error', (error) => {
    console.error('Error al crear el archivo:', error.message);
});