const express = require('express');
const fs = require('fs'); 
const path = require('path');
const app = express();
const port = 3000;

const UPLOADS_DIR = path.join(__dirname, 'uploads');

app.use('/img', express.static(UPLOADS_DIR));

app.get('/', (req, res) => {
    fs.readdir(UPLOADS_DIR, (err, files) => {
        let filasTabla = '';

        if (err || !files) {
            filasTabla = '<tr><td colspan="4">No se pudo leer la carpeta de imágenes o está vacía.</td></tr>';
        } else {
            const imagenes = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));

            if (imagenes.length === 0) {
                filasTabla = '<tr><td colspan="4">No hay imágenes en la carpeta.</td></tr>';
            } else {
                filasTabla = imagenes.map((archivo, index) => {
                    const fecha = new Date().toLocaleString(); 
                    
                    return `
                        <tr>
                            <td style="font-size: 0.9em;">${fecha}</td>
                            <td> archivo</td>
                            <td style="color: green; font-weight: bold;">Exitoso</td>
                            <td>
                                <!-- Muestra la imagen real de tu carpeta -->
                                <a href="/img/${archivo}" target="_blank">
                                    <img src="/img/${archivo}" class="evidence-img" alt="${archivo}">
                                </a>
                                <div style="font-size:0.8em; color:#666;">${archivo}</div>
                            </td>
                        </tr>
                    `;
                }).join('');
            }
        }

        let html = `
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <title>Monitor de Logs</title>
                <style>
                    body { font-family: sans-serif; padding: 20px; text-align: center; background-color: #f4f4f4; }
                    /* LOGO */
                    .logo { width: 100px; display: block; margin: 0 auto 10px auto; }
                    
                    h1 { margin-bottom: 20px; color: #333; }
                    
                    /* TABLA */
                    table { width: 90%; margin: 0 auto; border-collapse: collapse; background: white; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
                    th, td { padding: 15px; border: 1px solid #ddd; text-align: center; vertical-align: middle; }
                    th { background-color: #333; color: white; }
                    tr:nth-child(even) { background-color: #f9f9f9; }
                    
                    /* IMAGEN EN TABLA */
                    .evidence-img { width: 80px; height: 80px; object-fit: cover; border: 1px solid #ccc; border-radius: 4px; }
                    .evidence-img:hover { transform: scale(1.5); transition: 0.3s; cursor: pointer; }
                </style>
            </head>
            <body>
                <!-- INTENTO DE CARGAR EL LOGO (Si existe dock.png en la carpeta) -->
                <img src="/img/dock.png" alt="Logo" class="logo" onerror="this.style.display='none'">
                
                <h1>Tabla de Logs del Sistema</h1>
                
                <table>
                    <thead>
                        <tr>
                            <th>Hora</th>
                            <th>Actividad</th>
                            <th>Estado</th>
                            <th>Imagen (Evidencia)</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${filasTabla}
                    </tbody>
                </table>
            </body>
            </html>
        `;
        res.send(html);
    });
});

app.listen(port, () => console.log(`Servidor iniciado en puerto ${port}`));