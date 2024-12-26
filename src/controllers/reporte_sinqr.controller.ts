import { Request, Response } from 'express';
import { storeProcedure } from '../classes/database';
import { upload } from './image.controller';

// Subir foto sin qr
export async function subirFotoMascotaSinQR(req: any, res: Response): Promise<Response> {
    try {
        const { mascota } = req.body;
        req.params.path = 'reporteSinqr';
        const { estatus, imagen } = await upload(req);
        if (!estatus) {
            return res.status(200).json({ 
                estatus: false,
                mensaje: 'Archivo no subido'
            });
        }
        const body = {
            storeProcedure: 'subirFotoMascotaSinQR',
            vmascota: mascota,
            vfoto: imagen,
        }; 
        const sp = await storeProcedure(body);
        const data = sp[0][0];
        return res.status(200).json({
            estatus: true,
            data
        });
    } catch (err) {
        console.log('subirFotoMascotaSinQR-error:', err);
        return res.status(400).json({ 
            estatus: false,
            mensaje: '¡Error! Subir foto sin qr'
        });
    }
}

// Nuevo reporte sin qr
export async function nuevoReporteSinQR(req: any, res: Response): Promise<Response> {
    try {
        const { id } = req.usuario;
        const { 
            color,
            ne_color,
            genero,
            raza,
            ne_raza,
            tipo_mascota,
            ne_tipo_mascota,
            nombre,
            senas_particulares,
            tamano,
            ne_tamano,
            latitud,
            longitud,
        } = req.body;
        const body = {
            storeProcedure: 'nuevoReporteSinQR',
            vcolor: color,
            vne_color: ne_color,
            vgenero: genero,
            vraza: raza,
            vne_raza: ne_raza,
            vtipo_mascota: tipo_mascota,
            vne_tipo_mascota: ne_tipo_mascota,
            vnombre: nombre,
            vsenas_particulares: senas_particulares,
            vtamano: tamano,
            vne_tamano: ne_tamano,
            vusuario: id,
            vlatitud: latitud,
            vlongitud: longitud,
        }; 
        const sp = await storeProcedure(body);
        const data = sp[0][0];
        return res.status(200).json({
            estatus: true,
            data
        });
    } catch (err) {
        console.log('nuevoReporteSinQR-error:', err);
        return res.status(400).json({ 
            estatus: false,
            mensaje: '¡Error! Nuevo reporte sin QR'
        });
    }
}

// Reportar encontre mascota sin QR
export async function reportarEncontreMascotaSinQR(req: any, res: Response): Promise<Response> {
    try {
        const { id } = req.usuario;
        const { 
            color,
            ne_color,
            genero,
            raza,
            ne_raza,
            tipo_mascota,
            ne_tipo_mascota,
            nombre,
            senas_particulares,
            tamano,
            ne_tamano,
            latitud,
            longitud,
        } = req.body;
        const body = {
            storeProcedure: 'reportarEncontreMascotaSinQR',
            vcolor: color,
            vne_color: ne_color,
            vgenero: genero,
            vraza: raza,
            vne_raza: ne_raza,
            vtipo_mascota: tipo_mascota,
            vne_tipo_mascota: ne_tipo_mascota,
            vnombre: nombre,
            vsenas_particulares: senas_particulares,
            vtamano: tamano,
            vne_tamano: ne_tamano,
            vusuario: id,
            vlatitud: latitud,
            vlongitud: longitud,
        }; 
        const sp = await storeProcedure(body);
        const data = sp[0][0];
        return res.status(200).json({
            estatus: true,
            data
        });
    } catch (err) {
        console.log('reportarEncontreMascotaSinQR-error:', err);
        return res.status(400).json({ 
            estatus: false,
            mensaje: '¡Error! Reportar encontre mascota sin QR'
        });
    }
}

// Reportar mascota sin QR es mia
export async function reportarMascotaSinQREsMia(req: any, res: Response): Promise<Response> {
    try {
        const { id } = req.usuario;
        const { reporte } = req.body;
        const body = {
            storeProcedure: 'reportarMascotaSinQREsMia',
            vusuario: id,
            vreporte: reporte,
        }; 
        const sp = await storeProcedure(body);
        const data = sp[0][0];
        return res.status(200).json({
            estatus: true,
            data
        });
    } catch (err) {
        console.log('reportarMascotaSinQREsMia-error:', err);
        return res.status(400).json({ 
            estatus: false,
            mensaje: '¡Error! Reportar mascota sin QR es mia'
        });
    }
}
