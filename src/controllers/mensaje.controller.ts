import { Request, Response } from 'express';
import { storeProcedure } from '../classes/database';

// Enviar mensaje
export async function enviarMensaje(req: any, res: Response): Promise<Response> {
    try {
        const { id } = req.usuario;
        const { usuariorecibe, mensaje } = req.body;
        const body = {
            storeProcedure: 'enviarMensaje',
            vusuario: id,
            vusuariorecibe: usuariorecibe,
            vmensaje: mensaje
        }; 
        const sp = await storeProcedure(body);
        const data = sp[0][0];
        return res.status(200).json({
            estatus: true,
            data
        });
    } catch (err) {
        console.log('enviarMensaje-error:', err);
        return res.status(400).json({ 
            estatus: false,
            mensaje: '¡Error! Enviar mensaje'
        });
    }
}

// Encontaron mi mascota mensaje
export async function encontraronMascota(req: any, res: Response): Promise<Response> {
    try {
        const { id } = req.usuario;
        const { reporte } = req.body;
        const body = {
            storeProcedure: 'encontraronMiMascota',
            vreporte: reporte,
            vusuario: id,
        }; 
        const sp = await storeProcedure(body);
        const data = sp[0][0];
        return res.status(200).json({
            estatus: true,
            data
        });
    } catch (err) {
        console.log('enviarMensaje-error:', err);
        return res.status(400).json({ 
            estatus: false,
            mensaje: '¡Error! Encontaron mi mascota'
        });
    }
}

// Numero de mensaje
export async function totalMensajes(req: any, res: Response): Promise<Response> {
    try {
        const { id } = req.usuario;
        const body = {
            storeProcedure: 'numeroMensajes',
            vusuario: id,
        }; 
        const sp = await storeProcedure(body);
        const data = sp[0][0];
        return res.status(200).json({
            estatus: true,
            data
        });
    } catch (err) {
        console.log('numeroMensajes-error:', err);
        return res.status(400).json({ 
            estatus: false,
            mensaje: '¡Error! numero de mensajes'
        });
    }
}

// Mensaje de chat
export async function mensajesChat(req: any, res: Response): Promise<Response> {
    try {
        const { id } = req.usuario;
        const body = {
            storeProcedure: 'mensajesChat',
            vusuario: id,
        }; 
        const sp = await storeProcedure(body);
        const data = sp[0];
        return res.status(200).json({
            estatus: true,
            data
        });
    } catch (err) {
        console.log('mensajesChat-error:', err);
        return res.status(400).json({ 
            estatus: false,
            mensaje: '¡Error! mensajes de chat'
        });
    }
}

// Mensajes de chat usuarios
export async function mensajesChatUsuario(req: any, res: Response): Promise<Response> {
    try {
        const { id } = req.usuario;
        const { usuarioenvia } = req.body;
        const body = {
            storeProcedure: 'mensajesChatUsuario',
            vusuario: id,
            vusuarioenvia: usuarioenvia,
        }; 
        const sp = await storeProcedure(body);
        const data = sp[0];
        const [ item ] = data;
        return res.status(200).json({
            estatus: true,
            name: item.usuario,
            data
        });
    } catch (err) {
        console.log('mensajesChatUsuario-error:', err);
        return res.status(400).json({ 
            estatus: false,
            mensaje: '¡Error! Mensajes chat usuario'
        });
    }
}

// Detalle chat por usuario y el que recibe
export async function chatDetalle(req: any, res: Response): Promise<Response> {
    try {
        const { id } = req.usuario;
        const { usuariochat } = req.body;
        const body = {
            storeProcedure: 'chatDetalle',
            vusuario: id,
            vusuariochat: usuariochat,
        }; 
        const sp = await storeProcedure(body);
        const data = sp[0];
        return res.status(200).json({
            estatus: true,
            data
        });
    } catch (err) {
        console.log('chatDetalle-error:', err);
        return res.status(400).json({ 
            estatus: false,
            mensaje: '¡Error! Chat detalle'
        });
    }
}

// Chat por usuario
export async function chat(req: any, res: Response): Promise<Response> {
    try {
        const { id } = req.usuario;
        const body = {
            storeProcedure: 'chat',
            vusuario: id
        }; 
        const sp = await storeProcedure(body);
        const data = sp[0];
        return res.status(200).json({
            estatus: true,
            data
        });
    } catch (err) {
        console.log('chat-error:', err);
        return res.status(400).json({ 
            estatus: false,
            mensaje: '¡Error! Chat'
        });
    }
}

// Chat por usuario
export async function numeroChatsPendientesLeer(req: any, res: Response): Promise<Response> {
    try {
        const { id } = req.usuario;
        const body = {
            storeProcedure: 'numeroChatsPendientesLeer',
            vusuario: id
        }; 
        const sp = await storeProcedure(body);
        const data = sp[0][0];
        return res.status(200).json({
            estatus: true,
            data
        });
    } catch (err) {
        console.log('numeroChatsPendientesLeer-error:', err);
        return res.status(400).json({ 
            estatus: false,
            mensaje: '¡Error! Numero chats pendientes leer'
        });
    }
}

// LIsta de Chat por usuario
export async function listaChats(req: any, res: Response): Promise<Response> {
    try {
        const { id } = req.usuario;
        const body = {
            storeProcedure: 'listaChats',
            vusuario: id
        }; 
        const sp = await storeProcedure(body);
        const data = sp[0];
        return res.status(200).json({
            estatus: true,
            data
        });
    } catch (err) {
        console.log('listaChats-error:', err);
        return res.status(400).json({ 
            estatus: false,
            mensaje: '¡Error! Lista chats'
        });
    }
}

