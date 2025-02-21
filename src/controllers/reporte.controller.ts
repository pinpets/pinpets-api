import { Request, Response } from 'express';
import { storeProcedure } from '../classes/database';

// Reportar mi mascota 
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

// Reportar encontre mascota 
export async function reportarEncontreMascota(req: any, res: Response): Promise<Response> {
    try {
        const { id: idUsuario } = req.usuario;
        const { id, latitud, longitud, tipo } = req.body;
        const body = {
            storeProcedure: 'AvisarEncontreMascota',
            vusuario: idUsuario,
            vid: id,
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
        console.log('reportarEncontreMascota-error:', err);
        return res.status(400).json({ 
            estatus: false,
            mensaje: '¡Error! Reportar encontre mascota'
        });
    }
}

// Reportar en mi mascota 
export async function reportarEsMiMascota(req: any, res: Response): Promise<Response> {
    try {
        const { id: idUsuario } = req.usuario;
        const { id } = req.body;
        const body = {
            storeProcedure: 'AvisarMascotaEsMia',
            vusuario: idUsuario,
            vid: id,
        };
        const sp = await storeProcedure(body);
        const data = sp[0][0];
        return res.status(200).json({
            estatus: true,
            data
        });
    } catch (err) {
        console.log('reportarEncontreMascota-error:', err);
        return res.status(400).json({ 
            estatus: false,
            mensaje: '¡Error! Reportar encontre mascota'
        });
    }
}

// Reportes
export async function reportes(req: any, res: Response): Promise<Response> {
    try {
        const { id } = req.usuario;
        const { tipo } = req.body;
        const body = {
            storeProcedure: 'reportes',
            vusuario: id,
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

// Detalle Reporte
export async function reporteDetalle(req: any, res: Response): Promise<Response> {
    try {
        const { reporte } = req.body;
        const body = {
            storeProcedure: 'reportes_det',
            vreporte: reporte
        }; 
        const sp = await storeProcedure(body);
        const data = sp[0];
        let coordenadas = [];
        for (const d of data) {
            coordenadas.push({
                lotengo: d.lotengo,
                lat: d.latitud,
                lng: d.longitud
            });
        }
        return res.status(200).json({
            estatus: true,
            reporte: data[0],
            coords: coordenadas
        });
    } catch (err) {
        console.log('reportes-error:', err);
        return res.status(400).json({ 
            estatus: false,
            mensaje: '¡Error! Reportes'
        });
    }
}
