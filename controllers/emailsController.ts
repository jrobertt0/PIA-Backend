import Email from '../models/email';
import { Request, Response } from 'express';

export const example = async (req: Request, res: Response) => {
    res.send('Hello world Email');
}

export const countEmails = async (req: Request, res: Response) => {
    const count = await Email.count().catch((err) => res.send(err));
    let result = JSON.stringify(count, null, 2);
    res.send(result);
}

export const getEmails = async (req: Request, res: Response) => {
    const emails = await Email.findAll().catch((err) => res.send(err));
    let result = JSON.stringify(emails, null, 2);
    res.send(result);
}

export const getEmailsLocal = async (): Promise<string> => {
    const emails = await Email.findAll().catch((err) => console.log(err));
    let result = JSON.stringify(emails, null, 2);
    
    return result
}

export const getEmail = async (req: Request, res: Response) => {
    const email = await Email.findOne({
        where: {
            id: req.params.id
        }
    }).catch((err) => res.json({ error: err }));

    let result = JSON.stringify(email, null, 2);
    if (!result) return res.json({ error: "No hay emails con ese id" });
    res.send(result);
}

export const addEmail = async (req: Request, res: Response) => {
    const data = req.body;
    
    const email = await Email.findOne({
        where: {
            email: data.email
        }
    }).catch((err) => res.json({ error: err }));

    if(email !== null){
        return res.json({ error: "Email ya registrado" })
    }

    const result = await Email.create({
        email: data.email
    }).catch((err) => res.json({ error: err }));

    res.send({result, msg: "Email Registrado Exitosamente"});
}

export const editEmail = async (req: Request, res: Response) => {
    const data = req.body;

    await Email.update({
        email: data.email
    }, {
        where: {
            id: data.id
        }
    }).catch((err) => res.send(err));

    res.json({msg: "Email actualizado exitosamente"});
}

export const deleteEmail = async (req: Request, res: Response) => {

    let result = await Email.destroy({
        where: {
            email: req.body.email
        }
    }).catch((err) => res.send(err));


    if (result == 0)
        res.json({ error: "Email no existente" });
    else
        res.json({msg: "Email eliminado exitosamente"});
}