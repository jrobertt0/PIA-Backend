import Afi from '../models/afi';
import { Request, Response } from 'express';
import { getTransporter } from "../utilities/emailSender"
import { getEmailsLocal } from "../controllers/emailsController"

const transporter = getTransporter()

export const example = async (req: Request, res: Response) => {
    res.send('Hello world Afi');
}

export const countAfis = async (req: Request, res: Response) => {
    const count = await Afi.count().catch((err) => res.send(err));
    let result = JSON.stringify(count, null, 2);
    res.send(result);
}

export const getAfis = async (req: Request, res: Response) => {
    const afis = await Afi.findAll().catch((err) => res.send(err));
    let result = JSON.stringify(afis, null, 2);
    res.send(result);
}

export const getAfi = async (req: Request, res: Response) => {
    const afi = await Afi.findOne({
        where: {
            id: req.params.id
        }
    }).catch((err) => res.json({ error: err }));

    let result = JSON.stringify(afi, null, 2);
    if (!result) return res.json({ error: "No hay alumnos con ese id" })
    res.send(result);
}

export const addAfi = async (req: Request, res: Response) => {
    const data = req.body;

    const result = await Afi.create({
        organized_by: data.organized_by,
        area: data.area,
        event: data.event,
        date_time_start: data.date_time_start,
        date_time_end: data.date_time_end,
        capacity: data.capacity,
        occupied: data.occupied,
        available: data.available,
    }).catch((err) => res.send({ error: err }));

    res.send(result);
}

async function sendEmail(afis: Array<any>) {
    let htmlText = ""
    let htmlTextTop = ""
    afis.forEach(afi => {
        console.log(afi.isNew)
        if (afi.isNew) {
            htmlTextTop += `<div style="background-color: grey;"><br>Nombre: ${afi.event} 
                        <br>Organizado por: ${afi.organized_by} 
                        <br>Fecha de inicio: ${afi.date_time_start}
                        <br>Fecha de finalización: ${afi.date_time_end} 
                        <br>Espacios Disponibles: ${afi.available}<br></div>`
        } else {
            htmlText += `<br>Nombre: ${afi.event} 
                        <br>Organizado por: ${afi.organized_by} 
                        <br>Fecha de inicio: ${afi.date_time_start}
                        <br>Fecha de finalización: ${afi.date_time_end} 
                        <br>Espacios Disponibles: ${afi.available}<br>`
        }
    })
    htmlText = htmlTextTop + htmlText

    let emails = await getEmailsLocal()
    let emails_obj: Array<any> = JSON.parse(emails)
    let to: Array<string> = []
    emails_obj.forEach(email => {
        to.push(email.email)
    })

    await transporter.sendMail({
        from: 'AFIS',
        to: to.join(', '),
        subject: "Nuevas Afis Disponibles ✔", // Subject line
        text: "Afis", // plain text body
        html: htmlText, // html body
    }).catch(err => console.log(err));
    console.log("Email Sent")
}

export const addAfis = async (req: Request, res: Response) => {
    const afis: Array<any> = req.body.afis;
    var mustSendEmail = false

    console.log(req.body)

    for (let afi of afis) {
        const afi_found = await Afi.findOne({
            where: {
                event: afi.event
            }
        }).catch((err) => res.json({ error: err }));

        if (afi_found == null) {
            mustSendEmail = true
            afi.isNew = true
            console.log(mustSendEmail, "then")
        }
    }

    let deletedRows = await Afi.destroy({ where: {}, truncate: true })
    console.log("Rows Deleted:", deletedRows)

    for (let afi of afis) {
        await Afi.create({
            organized_by: afi.organized_by,
            area: afi.area,
            event: afi.event,
            date_time_start: afi.date_time_start,
            date_time_end: afi.date_time_end,
            capacity: afi.capacity,
            occupied: afi.occupied,
            available: afi.available,
        }).catch((err) => res.send({ error: err }))
    }

    if (mustSendEmail) {
        sendEmail(afis)
        res.send("Afis Agregadas");
    } else {
        res.send("Afis ya existentes");
    }

}

export const editAfi = async (req: Request, res: Response) => {
    const data = req.body;

    await Afi.update({
        organized_by: data.organized_by,
        area: data.area,
        event: data.event,
        date_time_start: data.date_time_start,
        date_time_end: data.date_time_end,
        capacity: data.capacity,
        occupied: data.occupied,
        available: data.available,
    }, {
        where: {
            id: data.id
        }
    }).catch((err) => res.send({ error: err }));

    res.send("Afi actualizado exitosamente");
}

export const deleteAfi = async (req: Request, res: Response) => {

    let result = await Afi.destroy({
        where: {
            id: req.params.id
        }
    }).catch((err) => res.send({ error: err }));


    if (result == 0)
        res.json({ error: "Afi no existente" });
    else
        res.json("Afi eliminado exitosamente");
}