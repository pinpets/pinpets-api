import { Request, Response } from 'express';
import { storeProcedure } from '../classes/database';

// Filtro lista de tipos, generos y tamaños de mascotas
export async function listaTipoGeneroTamano(req: Request, res: Response): Promise<Response> {
    try {
        const bodyTipo = {
            storeProcedure: 'tipoMascotasTodos'
        };
        const bodyGenero = {
            storeProcedure: 'generoMascotasTodos'
        }; 
        const bodyTamano = {
            storeProcedure: 'tamanoMascotasTodos'
        }; 
        const spTipo = await storeProcedure(bodyTipo);
        const spGenero = await storeProcedure(bodyGenero);
        const spTamano = await storeProcedure(bodyTamano);
        const dataTipo = spTipo[0];
        const dataGenero = spGenero[0];
        const dataTamano = spTamano[0];
        return res.status(200).json({
            estatus: true,
            tipos: dataTipo,
            generos: dataGenero,
            tamanos: dataTamano
        });
    } catch (err) {
        console.log('lista-error:', err);
        return res.status(400).json({ 
            estatus: false,
            mensaje: '¡Error! Lista tipos, generos y tanaños de mascotas'
        });
    }
}

// Filtro lista de razas y colores de mascotas
export async function listaRazaColor(req: Request, res: Response): Promise<Response> {
    try {
        const { tipo } = req.body;
        const bodyRaza = {
            storeProcedure: 'razaMascotasTodos',
            vtipo: tipo,
        };
        const bodyColor = {
            storeProcedure: 'colorMascotasTodos',
            vtipo: tipo,
        }; 
        const spRaza = await storeProcedure(bodyRaza);
        const spColor = await storeProcedure(bodyColor);
        const dataRaza = spRaza[0];
        const dataColor = spColor[0];
        return res.status(200).json({
            estatus: true,
            razas: dataRaza,
            colores: dataColor
        });
    } catch (err) {
        console.log('lista-error:', err);
        return res.status(400).json({ 
            estatus: false,
            mensaje: '¡Error! Lista razas y colores de mascotas'
        });
    }
}

// Aplicar Filtros
export async function aplicarFiltros(req: any, res: Response): Promise<Response> {
    try {
        const { id } = req.usuario;
        const { tipo, raza, color, sexo, tamano } = req.body;
        
        const body = {
            storeProcedure: 'AplicarFiltros',
            vusuario: id,
            vtipo: tipo,
            vraza: raza,
            vcolor: color,
            vsexo: sexo,
            vtamano: tamano,
        };
        
        const sp = await storeProcedure(body);
        const data = sp[0][0];
        return res.status(200).json({
            estatus: true,
            data: data,
        });
    } catch (err) {
        console.log('lista-error:', err);
        return res.status(400).json({ 
            estatus: false,
            mensaje: '¡Error! Aplicar filtros de mascotas'
        });
    }
}

// Ver Filtros
export async function verFiltros(req: any, res: Response): Promise<Response> {
    try {
        
        const { id } = req.usuario;
        
        const body = {
            storeProcedure: 'VerFiltros',
            vusuario: id,
        };
        
        const sp = await storeProcedure(body);
        const data = sp[0];
        return res.status(200).json({
            estatus: true,
            data: data,
        });
    } catch (err) {
        console.log('lista-error:', err);
        return res.status(400).json({ 
            estatus: false,
            mensaje: '¡Error! Ver filtros de mascotas'
        });
    }
}

// Limpiar Filtros
export async function limpiarFiltros(req: any, res: Response): Promise<Response> {
    try {
        
        const { id } = req.usuario;
        
        const body = {
            storeProcedure: 'LimpiarFiltros',
            vusuario: id,
        };
        
        const sp = await storeProcedure(body);
        const data = sp[0][0];
        return res.status(200).json({
            estatus: true,
            data: data,
        });
    } catch (err) {
        console.log('lista-error:', err);
        return res.status(400).json({ 
            estatus: false,
            mensaje: '¡Error! Limpiar filtros de mascotas'
        });
    }
}
