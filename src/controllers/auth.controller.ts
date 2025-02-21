import { Request, Response } from 'express';
import path from 'path';
import { storeProcedure } from '../classes/database';
import Methods from '../classes/methods';
import { upload } from './image.controller';
import Configurations from '../config/config';
const config = new Configurations();
const hostName = config.getHostName() || '';

// Login cliente
export async function login(req: Request, res: Response): Promise<Response> {
    try {
        const { mail, pass } = req.body;
        const body = {
            storeProcedure: 'login',
            vmail: mail,
            vpass: pass
        };
        const sp = await storeProcedure(body);
        const data = sp[0][0];
        // No existe email
        if (!data) {
            return res.status(200).json({ 
                estatus: false,
                mensaje: 'Cliente no registrado'
            });
        }
        if (data.error === 1) {
            return res.status(200).json({ 
                estatus: false,
                mensaje: data.mensaje
            });
        }
        // Genera token
        data.pass = ':)';
        const token = Methods.getJwtToken(data);
        console.log('data', data);
        
        // Cliente no activado
        if (data.estatus === 'I') {
            // Envia correo para verificar cuenta
            await Methods.sendMailUserVerifyAccount(data);
            return res.status(200).json({ 
                estatus: true,
                activo: false,
                mensaje: 'Código enviado al email registrado',
                token,
            });
        }
        return res.status(200).json({
            estatus: true,
            activo: true,
            data,
            token,
            mensaje: `Bienvenido ${ data.nombre }`
        });
    } catch (err) {
        console.log('login-error:', err);
        return res.status(200).json({ 
            estatus: false,
            mensaje: '!Error¡ cliente no registrado'
        });
    }
}

// Registrar cliente
export async function registro(req: Request, res: Response): Promise<Response> {
    try {
        const { 
            nombre,
            apellido,
            contrasena,
            telefono,
            fechanac,
            mail,
            genero,
            cp,
            estado,
            municipio,
            colonia,
            calle,
            numeroe,
            numeroi,
            foto,
            nacionalidad,
            ne_nacionalidad,
            tipo
        } = req.body;
        
        let body = {
            storeProcedure: 'registro',
            vnombre: nombre,
            vapellido: apellido,
            vcontrasena: contrasena,
            vtelefono: telefono,
            vmail: mail,
            vfechanac: fechanac,
            vgenero: genero,
            vcp: cp,
            vestado: estado,
            vmunicipio: municipio,
            vcolonia: colonia,
            vcalle: calle,
            vnumeroe: numeroe,
            vnumeroi: numeroi,
            vfoto: foto,
            vnacionalidad: nacionalidad,
            vne_nacionalidad: ne_nacionalidad,
            vtipo: tipo,
            vlatitud: '',
            vlongitud: '',
        };
        const address = `calle ${ body.vcalle } #${ body.vnumeroe }, col. ${ body.vcolonia }, ${body.vcp}, Méx`;
        const dataGeometry = await Methods.getGoogleMapsGeometry(address);
        console.log('dataGeometry', dataGeometry);
        
        if (!dataGeometry.estatus) {
            return res.status(200).json({ 
                estatus: false,
                mensaje: dataGeometry.mensaje
            })
        }

        body.vlatitud = dataGeometry.data.location.lat;
        body.vlongitud = dataGeometry.data.location.lng;

        /* body.vlatitud = '-1';
        body.vlongitud = '1'; */

        const sp = await storeProcedure(body);
        let data = sp[0][0];
        if (!data) {
            return res.status(200).json({ 
                estatus: false,
                mensaje: 'Cliente no registrado'
            });
        }
        data.pass = ':)';
        const token = Methods.getJwtToken(data);
        // Cliente no activado
        if (data.estatus === 'I') {
            // Envia correo para verificar cuenta
            await Methods.sendMailUserVerifyAccount(data);
            return res.status(200).json({ 
                estatus: true,
                activo: false,
                mensaje: 'Código enviado al email registrado',
                token,
            });
        }
        return res.status(200).json({
            estatus: true,
            token,
            activo: true,
            mensaje: 'Cliente registrado correctamente'
        });
    } catch (err) {
        console.log('registro-err:', err);
        return res.status(200).json({ 
            status: false,
            mensaje: '!Error¡ al registrar cliente'
        });
    }
}

// Actualizar la contraseña del cliente
export async function cambiarPass(req: any, res: Response): Promise<Response> {  
    try {
        const { id } = req.usuario;
        const { contrasena } = req.body;
        const body = {
            storeProcedure: 'actualizarContrasena',
            vidUsuario: id,
            vcontrasena: contrasena
        };
        const sp = await storeProcedure(body);
        let data = sp[0][0];
        console.log('Data', data);
        
        if (!data) {
            return res.status(200).json({ 
                estatus: false,
                mensaje: 'Cliente no encontrado'
            });
        }
        if (data.error === 1) {
            return res.status(200).json({ 
                estatus: false,
                mensaje: 'Cliente no encontrado'
            });
        }
        data.pass = ':)';
        const token = Methods.getJwtToken(data)
        return res.status(200).json({
            estatus: true,
            data,
            token,
            mensaje: 'Contraseña actualizar correctamente'
        });
    } catch (err) {
        console.log('codigoMail-error:', err);
        return res.status(200).json({ 
            estatus: false,
            mensaje: '!Error¡ Contraseña no actualizada'
        });
    }
}

// Activar cliente
export async function activar(req: any, res: Response): Promise<Response> {  
    try {
        const { id } = req.usuario;
        const { codigo } = req.body;
        const body = {
            storeProcedure: 'activar',
            vid: id,
            vcodigo: codigo,
        };
        const sp = await storeProcedure(body);
        const data = sp[0][0];
        if (!data) {
            return res.status(200).json({ 
                estatus: false,
                mensaje: 'Cliente no encontrado'
            });
        }
        if (data.error === 1) {
            return res.status(200).json({ 
                estatus: false,
                mensaje: data.mensaje
            })
        }
        data.pass = ':)';
        // Genera token
        const token = Methods.getJwtToken(data)
        return res.status(200).json({
            estatus: true,
            data,
            token,
            mensaje: 'Cliente activado correctamente'
        });
    } catch (err) {
        console.log('activar-error:', err);
        return res.status(200).json({ 
            estatus: false,
            mensaje: '!Error¡ Cliente no activado'
        });
    }
}

// Enviar Codigo de activacion por mail
export async function codigoMail(req: any, res: Response): Promise<Response> {
    try {
        const { id } = req.usuario;
        const body = {
            storeProcedure: 'codigoMail',
            vid: id
        }; 
        const sp = await storeProcedure(body);
        let data = sp[0][0];
        if (!data) {
            return res.status(200).json({ 
                estatus: false,
                mensaje: 'Cliente no encontrado'
            });
        }
        
        if (data.estatus === 'I') {
            // Envia correo para verificar cuenta
            await Methods.sendMailUserVerifyAccount(data);
            return res.status(200).json({ 
                estatus: true,
                mensaje: 'Código enviado al email registrado',
            });
        }
        return res.status(200).json({
            estatus: true,
            mensaje: data.mensaje
            
        });
    } catch (err) {
        console.log('cliente-error:', err);
        return res.status(400).json({ 
            estatus: false,
            mensaje: '¡Error! cliente no encontrado'
        });
    }
}

// Obtener cliente
export async function obtener(req: any, res: Response): Promise<Response> {
    try {
        const { id } = req.usuario;
        const body = {
            storeProcedure: 'perfil',
            vid: id
        }; 
        const sp = await storeProcedure(body);
        let data = sp[0][0];
        if (!data) {
            return res.status(200).json({ 
                estatus: false,
                mensaje: 'Cliente no encontrado'
            });
        }
        data.pass = ':)';
        if (data.foto) {
            const urlImagen = `${hostName}/api/images/usuarios/${data.foto}`;
            data.foto = urlImagen;
        } else {
            const urlImagen = `${hostName}/api/images/uploads/user.png`;
            data.foto = urlImagen;
        }
        return res.status(200).json({
            estatus: true,
            data
        });
    } catch (err) {
        console.log('cliente-error:', err);
        return res.status(400).json({ 
            estatus: false,
            mensaje: '¡Error! cliente no encontrado'
        });
    }
}

// Actualizar cliente
export async function actualizar(req: any, res: Response): Promise<Response> {  
    try {
        const { id } = req.usuario;
        const { 
            nombre, 
            apellido, 
            telefono,
            fechanac,
            genero, 
            cp,
            estado,
            municipio,
            colonia,
            calle,
            numeroe,
            numeroi,
            nacionalidad,
            ne_nacionalidad
        } = req.body;
        const body = {
            storeProcedure: 'actualizarPerfil',
            vnombre: nombre,
            vapellido: apellido,
            vidUsuario: id,
            vtelefono: telefono,
            vfechanac: fechanac,
            vgenero: genero,
            vcp: cp,
            vestado: estado,
            vmunicipio: municipio,
            vcolonia: colonia,
            vcalle: calle,
            vnumeroe: numeroe,
            vnumeroi: numeroi,
            vnacionalidad: nacionalidad,
            vne_nacionalidad: ne_nacionalidad,
        };         
        const sp = await storeProcedure(body);
        let data = sp[0][0];
        if (!data) {
            return res.status(200).json({ 
                estatus: false,
                mensaje: 'Cliente no encontrado'
            });
        }
        if (data.error === 1) {
            return res.status(200).json({ 
                estatus: false,
                mensaje: 'Cliente no encontrado'
            });
        }
        data.pass = ':)';
        const token = Methods.getJwtToken(data)
        return res.status(200).json({
            estatus: true,
            data,
            token,
            mensaje: 'Cliente actualizar correctamente'
        });
    } catch (err) {
        console.log('actualizarPerfil-error:', err);
        return res.status(200).json({ 
            estatus: false,
            mensaje: '!Error¡ al actualizar perfil del cliente'
        });
    }
}

// Token
export async function token(req: any, res: Response): Promise<Response> {
    try {
        const cliente = req.usuario;
        return res.status(200).json({
            estatus: true,
            cliente
        })
    } catch (err) {
        console.log('token-error:', err);
        return res.status(400).json({ 
            estatus: false,
            mensaje: err
        })
    }
}

// Imagen
export async function image(req: any, res: any): Promise<Response> {
    try {
        // Arma la respuesta y no sabe donde
        /* const tipo = req.params.tipo;
        const foto = req.params.foto;
        const pathImg = path.join( __dirname, `../uploads/${ tipo }/${ foto }` );
        // imagen por defecto
        if ( fs.existsSync( pathImg ) ) {
            res.sendFile( pathImg );
        } else {
            const pathImg = path.join( __dirname, `../uploads/no-img.jpg` );
            res.sendFile( pathImg );
        } */

        const pathImg = path.join( __dirname, `../uploads/user.png` );
        return res.sendFile( pathImg );
    } catch (error) {
        return res.status(400).json({ 
            estatus: false,
            mensaje: error
        })
    }

}

// Subir foto de perfil
export async function subirFotoPerfil(req: any, res: Response): Promise<Response> {  
    try {
        const { id } = req.usuario;
        req.params.path = 'usuarios';
        const { estatus, imagen } = await upload(req);
        if (!estatus) {
            return res.status(200).json({ 
                estatus: false,
                mensaje: 'Archivo no subido'
            });
        }
        const body = {
            storeProcedure: 'subirFotoPerfil',
            vusuario: id,
            vfoto: imagen,
        };
        const sp = await storeProcedure(body);
        const data = sp[0][0];
        if (!data) {
            return res.status(200).json({ 
                estatus: false,
                mensaje: 'Foto de perfil no actualizada'
            });
        }
        return res.status(200).json({
            estatus: true,
            mensaje: 'Foto de perfil actualizada'
        });
    } catch (err: any) {
        console.log('activar-error:', err);
        return res.status(200).json({ 
            estatus: false,
            mensaje: err.mensaje
        });
    }
}

// Genera una contraseña al azar en base datos y lo envia por email
export async function recuperarPassMail(req: Request, res: Response): Promise<Response> {
    try {
        const { mail } = req.body;
        const body = {
            storeProcedure: 'recuperarContrasena',
            vmail: mail,
        };
        const sp = await storeProcedure(body);
        const data = sp[0][0];
        // No existe email
        if (!data) {
            return res.status(200).json({ 
                estatus: false,
                mensaje: 'Cliente no registrado'
            });
        }

        const context = {
            email: mail,
            password: data.nuevopass
        }
        // Envia Correo para recuperar contraseña
        await Methods.sendMailUserUpdatePassword(context);
        return res.status(200).json({
            estatus: true,
            mensaje: 'Contraseña enviada al correo registrado'
        });
    } catch (err) {
        console.log('cambiarPassMail-error:', err);
        return res.status(400).json({ 
            estatus: false,
            mensaje: '¡Error! contraseña no enviada'
        });
    }
}