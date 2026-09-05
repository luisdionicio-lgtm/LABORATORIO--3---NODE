const http = require('http');
const ExcelJS = require('exceljs');

const PORT = 3000;

const server = http.createServer(async (req, res) => {

    if (req.url === '/reporte' && req.method === 'GET') {

        try {

            const workbook = new ExcelJS.Workbook();

            const worksheet = workbook.addWorksheet('Ventas');

            worksheet.columns = [
                {
                    header: 'Producto',
                    key: 'producto',
                    width: 25
                },
                {
                    header: 'Cantidad',
                    key: 'cantidad',
                    width: 15
                },
                {
                    header: 'Precio',
                    key: 'precio',
                    width: 15
                }
            ];

            const ventas = [
                { producto: 'Laptop', cantidad: 2, precio: 3500 },
                { producto: 'Mouse', cantidad: 10, precio: 45 },
                { producto: 'Teclado', cantidad: 8, precio: 120 },
                { producto: 'Monitor', cantidad: 5, precio: 890 },
                { producto: 'Audífonos', cantidad: 12, precio: 80 },
                { producto: 'Webcam', cantidad: 6, precio: 150 },
                { producto: 'Memoria USB', cantidad: 15, precio: 35 },
                { producto: 'SSD 1TB', cantidad: 7, precio: 320 },
                { producto: 'Disco duro', cantidad: 5, precio: 280 },
                { producto: 'Router', cantidad: 4, precio: 190 },
                { producto: 'Cable HDMI', cantidad: 20, precio: 25 },
                { producto: 'Adaptador USB', cantidad: 14, precio: 30 },
                { producto: 'Micrófono', cantidad: 5, precio: 180 },
                { producto: 'Parlantes', cantidad: 8, precio: 110 },
                { producto: 'Impresora', cantidad: 3, precio: 750 },
                { producto: 'Tablet', cantidad: 4, precio: 950 },
                { producto: 'Smartphone', cantidad: 6, precio: 1200 },
                { producto: 'Cargador', cantidad: 18, precio: 65 },
                { producto: 'Mouse Pad', cantidad: 13, precio: 40 },
                { producto: 'Hub USB', cantidad: 9, precio: 90 }
            ];

            worksheet.addRows(ventas);

            worksheet.getRow(1).font = {
                bold: true
            };

            res.writeHead(200, {
                'Content-Type':
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',

                'Content-Disposition':
                    'attachment; filename="reporte_ventas.xlsx"'
            });

            await workbook.xlsx.write(res);

            res.end();

            console.log('Reporte enviado correctamente.');

        } catch (error) {

            console.error(
                'Error al generar el reporte:',
                error.message
            );

            res.writeHead(500, {
                'Content-Type':
                    'text/plain; charset=utf-8'
            });

            res.end(
                'Error al generar el reporte Excel.'
            );
        }

    } else {

        res.writeHead(200, {
            'Content-Type':
                'text/plain; charset=utf-8'
        });

        res.end(
            'Visita /reporte para descargar el Excel'
        );
    }

});

server.listen(PORT, () => {
    console.log(
        `Servidor ejecutándose en http://localhost:${PORT}`
    );
});