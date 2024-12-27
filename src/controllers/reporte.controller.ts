import { Request, Response } from 'express';
import { storeProcedure } from '../classes/database';

// Reportar mi mascota (FALTA POR TERMINAR PSAUMIS)
export async function reportarMiMascota(req: any, res: Response): Promise<Response> {
    try {
        const { id } = req.usuario;
        const { mascota, latitud, longitud, tipo } = req.body;
        const body = {
            storeProcedure: 'reportarMiMascota',
            vusuario: id,
            vmascota: mascota,
            vlatitud: latitud,
            vlongitud: longitud,
            vtipo: tipo,
        }; 
        const sp = await storeProcedure(body);
        const data = sp[0][0];
        return res.status(200).json({
            estatus: true,
            data
        });
    } catch (err) {
        console.log('reportarMiMascota-error:', err);
        return res.status(400).json({ 
            estatus: false,
            mensaje: '¡Error! Reportar mi mascota'
        });
    }
}

// Reportes
export async function reportes(req: Request, res: Response): Promise<Response> {
    try {
        const { tipo } = req.body;
        const body = {
            storeProcedure: 'reportes',
            vtipo: tipo
        }; 
        const sp = await storeProcedure(body);
        const data = sp[0];
        return res.status(200).json({
            estatus: true,
            data
        });
    } catch (err) {
        console.log('reportes-error:', err);
        return res.status(400).json({ 
            estatus: false,
            mensaje: '¡Error! Reportes'
        });
    }
}

// Encontraron mi mascota reportada
export async function encontraronMiMascotaReportada(req: any, res: Response): Promise<Response> {
    try {
        const { id } = req.usuario;
        const { reporte, enmipoder, latitud, longitud } = req.body;
        const body = {
            storeProcedure: 'encontraronMiMascotaReportada',
            vreporte: reporte,
            vusuario: id,
            venmipoder: enmipoder,
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
        console.log('reportarMiMascota-error:', err);
        return res.status(400).json({ 
            estatus: false,
            mensaje: '¡Error! Reportar mi mascota'
        });
    }
}
