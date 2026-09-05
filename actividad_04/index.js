const fs = require('fs');

const readable = fs.createReadStream('datos.txt');
const writable = fs.createWriteStream('copia.txt');

readable.on('data', (chunk) => {

    const puedeContinuar = writable.write(chunk);

    if (!puedeContinuar) {
        console.log('Pausando lectura...');
        readable.pause();
    }
});

writable.on('drain', () => {
    console.log('Continuando lectura...');
    readable.resume();
});

readable.on('end', () => {
    writable.end();
});

writable.on('finish', () => {
    console.log('Proceso terminado correctamente.');
});

readable.on('error', (error) => {
    console.error('Error de lectura:', error.message);
});

writable.on('error', (error) => {
    console.error('Error de escritura:', error.message);
});