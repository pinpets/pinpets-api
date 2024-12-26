import { Request, Response } from 'express';
import { storeProcedure } from '../classes/database';

// Nuevo reporte qr
export async function nuevoReporteQR(req: any, res: Response): Promise<Response> {
    try {
        const { id } = req.usuario;
        const {
            qr,
            latitud,
            longitud,
            latengo 
        } = req.body;
        const body = {
            storeProcedure: 'nuevoReporteQR',
            vqr: qr,
            vusuario: id,
            vlatitud: latitud,
            vlongitud: longitud,
            vlatengo: latengo
        }; 
        const sp = await storeProcedure(body);
        const data = sp[0][0];
        return res.status(200).json({
            estatus: true,
            data
        });
    } catch (err) {
        console.log('nuevoReporteQR-error:', err);
        return res.status(400).json({ 
            estatus: false,
            mensaje: '¡Error! Nuevo reporte QR'
        });
    }
}

// Reporte perdido qr
export async function reportarPerdidoQR(req: any, res: Response): Promise<Response> {
    try {
        const { id } = req.usuario;
        const { mascota } = req.body;
        const body = {
            storeProcedure: 'reportarPerdidoQR',
            vmascota: mascota,
            vusuario: id
        }; 
        const sp = await storeProcedure(body);
        const data = sp[0][0];
        return res.status(200).json({
            estatus: true,
            data
        });
    } catch (err) {
        console.log('reportarPerdidoQR-error:', err);
        return res.status(400).json({ 
            estatus: false,
            mensaje: '¡Error! Reportar perdido QR'
        });
    }
}

// Reporte encontrado qr
export async function reportarEncontradoQR(req: any, res: Response): Promise<Response> {
    try {
        const { id } = req.usuario;
        const { qr } = req.body;
        const body = {
            storeProcedure: 'reportarEncontradoQR',
            vqr: qr,
            vusuario: id
        }; 
        const sp = await storeProcedure(body);
        const data = sp[0][0];
        return res.status(200).json({
            estatus: true,
            data
        });
    } catch (err) {
        console.log('reportarEncontradoQR-error:', err);
        return res.status(400).json({ 
            estatus: false,
            mensaje: '¡Error! Reportar encontrado QR'
        });
    }
}

// Reportar encontre mascota QR
export async function reportarEncontreMascotaQR(req: any, res: Response): Promise<Response> {
    try {
        const { id } = req.usuario;
        const {
            qr,
            latitud,
            longitud
        } = req.body;
        const body = {
            storeProcedure: 'reportarEncontreMascotaQR',
            vusuario: id,
            vqr: qr,
            vlatitud: latitud,
            vlongitud: longitud
        }; 
        const sp = await storeProcedure(body);
        const data = sp[0][0];
        return res.status(200).json({
            estatus: true,
            data
        });
    } catch (err) {
        console.log('reportarEncontreMascotaQR-error:', err);
        return res.status(400).json({ 
            estatus: false,
            mensaje: '¡Error! Reportar encontre mascota QR'
        });
    }
}
