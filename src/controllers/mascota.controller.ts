import { Request, Response } from 'express';
import { storeProcedure } from '../classes/database';
import { upload } from './image.controller';
import Configurations from '../config/config';
const config = new Configurations();
const hostName = config.getHostName() || '';

// Crear mascota
export async function crear(req: any, res: Response): Promise<Response> {
    try {
        const { id } = req.usuario;
        const { 
            color,
            ne_color,
            fecha_nac,
            genero,
            raza,
            ne_raza,
            tipo_mascota,
            ne_tipo_mascota,
            qr,
            nombre,
            senas_particulares,
            tamano,
            ne_tamano,
        } = req.body;
        const body = {
            storeProcedure: 'nuevaMascota',
            vcolor: color,
            vne_color: ne_color,
            vfecha_nac: fecha_nac,
            vgenero: genero,
            vraza: raza,
            vne_raza: ne_raza,
            vtipo_mascota: tipo_mascota,
            vne_tipo_mascota: ne_tipo_mascota,
            vqr: qr,
            vnombre: nombre,
            vsenas_particulares: senas_particulares,
            vtamano: tamano,
            vne_tamano: ne_tamano,
            vusuario: id,
        };
        
        const sp = await storeProcedure(body);
        const data = sp[0][0];
        if (!data) {
            return res.status(200).json({
                id: 0, 
                estatus: false,
                mensaje: 'Mascota no creada'
            });
        }
        if (data.error === 1) {
            return res.status(200).json({ 
                id: 0,
                estatus: false,
                mensaje: data.mensaje
            })
        }
        return res.status(200).json({
            id: data.id,
            estatus: true,
            mensaje: 'Mascota creada correctamente'
        });
    } catch (err) {
        console.log('crear-err:', err);
        return res.status(400).json({ 
            id: 0,
            estatus: false,
            mensaje: '¡Error! Crear mascota'
        });
    }
}

// Actualizar mascota
export async function actualizar(req: any, res: Response): Promise<Response> {  
    try {
        const { 
            color,
            ne_color,
            fecha_nac,
            genero,
            raza,
            ne_raza,
            tipo_mascota,
            ne_tipo_mascota,
            qr,
            nombre,
            senas_particulares,
            tamano,
            ne_tamano,
            idMascota,
        } = req.body;
        const body = {
            storeProcedure: 'actualizarMascota',
            vcolor: color,
            vne_color: ne_color,
            vfecha_nac: fecha_nac,
            vgenero: genero,
            vraza: raza,
            vne_raza: ne_raza,
            vtipo_mascota: tipo_mascota,
            vne_tipo_mascota: ne_tipo_mascota,
            vqr: qr,
            vnombre: nombre,
            vsenas_particulares: senas_particulares,
            vtamano: tamano,
            vne_tamano: ne_tamano,
            vid: idMascota,
        };
        const sp = await storeProcedure(body);
        const data = sp[0][0];
        if (!data) {
            return res.status(200).json({ 
                estatus: false,
                mensaje: 'Mascota no encontrada'
            });
        }
        if (data.error === 1) {
            return res.status(200).json({ 
                estatus: false,
                mensaje: data.mensaje
            })
        }
        return res.status(200).json({
            estatus: true,
            mensaje: 'Mascota actualizada correctamente'
        });
    } catch (err) {
        console.log('actualizar-error:', err);
        return res.status(400).json({ 
            estatus: false,
            mensaje: '¡Error! Actualizar mascota'
        });
    }
}

// Actualizar mascota con QR
export async function actualizarQR(req: any, res: Response): Promise<Response> {  
    try {
        const { 
            qr,
            idMascota,
        } = req.body;
        const body = {
            storeProcedure: 'actualizarQR',
            vqr: qr,
            vid: idMascota,
        };
        const sp = await storeProcedure(body);
        const data = sp[0][0];
        if (!data) {
            return res.status(200).json({ 
                estatus: false,
                mensaje: 'Mascota no encontrada'
            });
        }
        if (data.error === 1) {
            return res.status(200).json({ 
                estatus: false,
                mensaje: data.mensaje
            })
        }
        return res.status(200).json({
            estatus: true,
            mensaje: 'QR de mascota actualizada correctamente'
        });
    } catch (err) {
        console.log('actualizar-error:', err);
        return res.status(400).json({ 
            estatus: false,
            mensaje: '¡Error! Actualizar QR mascota'
        });
    }
}

// Borrar mascota
export async function borrar(req: any, res: Response): Promise<Response> {
    try {
        const { id } = req.usuario;
        const { idMascota } = req.body;
        const body = {
            storeProcedure: 'borrarMascota',
            vusuario: id,
            vmascota: idMascota
        }; 
        const sp = await storeProcedure(body);
        const data = sp[0][0];
        if (!data) {
            return res.status(200).json({ 
                estatus: false,
                mensaje: 'Mascota no encontrada'
            });
        }
        return res.status(200).json({
            estatus: true,
            mensaje: 'Mascota borrada correctamente'
        });
    } catch (err) {
        console.log('borrar-error:', err);
        return res.status(400).json({ 
            estatus: false,
            mensaje: '¡Error! Borrar mascota'
        });
    }
}

// Obtener mascota
export async function obtener(req: any, res: Response): Promise<Response> {
    try {
        const { id } = req.usuario;
        const { idMascota } = req.body;
        const body = {
            storeProcedure: 'obtenerMascota',
            vusuario: id,
            vidMascota: idMascota
        }; 
        const sp = await storeProcedure(body);
        const data = sp[0][0];
        if (!data) {
            return res.status(200).json({ 
                estatus: false,
                mensaje: 'Mascota no encontrada'
            });
        }
        
        return res.status(200).json({
            estatus: true,
            data
        });
    } catch (err) {
        console.log('obtener-error:', err);
        return res.status(400).json({ 
            estatus: false,
            mensaje: '¡Error! Obtener mascota'
        });
    }
}

// Obtener lista de mascotas
export async function lista(req: any, res: Response): Promise<Response> {
    try {
        const { id } = req.usuario;
        const body = {
            storeProcedure: 'mascotas',
            vusuario: id,
        }; 
        const sp = await storeProcedure(body);
        const data = sp[0];
        return res.status(200).json({
            estatus: true,
            data
        });
    } catch (err) {
        console.log('lista-error:', err);
        return res.status(400).json({ 
            estatus: false,
            mensaje: '¡Error! Lista de mascotas'
        });
    }
}

// Subir foto de perfil
export async function subirFotoMascota(req: any, res: Response): Promise<Response> {  
    try {
        /* const { id } = req.usuario; */
        const { mascota } = req.body;
        req.params.path = 'mascotas';
        const { estatus, imagen } = await upload(req);
        if (!estatus) {
            return res.status(200).json({ 
                estatus: false,
                mensaje: 'Archivo no subido'
            });
        }
        const body = {
            storeProcedure: 'subirFotoMascota',
            /* vusuario: id, */
            vmascota: mascota,
            vfoto: imagen,
        };
        const sp = await storeProcedure(body);
        const data = sp[0][0];
        if (!data) {
            return res.status(200).json({ 
                estatus: false,
                mensaje: 'Foto de mascota no actualizada'
            });
        }
        return res.status(200).json({
            estatus: true,
            mensaje: 'Foto de mascota actualizada'
        });
    } catch (err: any) {
        console.log('subirFotoMascota-error:', err);
        return res.status(200).json({ 
            estatus: false,
            mensaje: err.mensaje
        });
    }
}
