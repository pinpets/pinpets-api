import { Request, Response } from 'express';
import { storeProcedure } from '../classes/database';

// Combo lista de tipos, generos y tamaños de mascotas
export async function listaTipoGeneroTamano(req: Request, res: Response): Promise<Response> {
    try {
        const bodyTipo = {
            storeProcedure: 'tipoMascotas'
        };
        const bodyGenero = {
            storeProcedure: 'generoMascotas'
        }; 
        const bodyTamano = {
            storeProcedure: 'tamanoMascotas'
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

// Combo lista de razas y colores de mascotas
export async function listaRazaColor(req: Request, res: Response): Promise<Response> {
    try {
        const { tipo } = req.body;
        const bodyRaza = {
            storeProcedure: 'razaMascotas',
            vtipo: tipo,
        };
        const bodyColor = {
            storeProcedure: 'colorMascotas',
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
