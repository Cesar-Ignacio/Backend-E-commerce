import { config } from '../config.js';
import nodemailer from 'nodemailer';
import { createToken } from '../utils/jwt.js';
import { userService } from '../services/index.js';
import CustomError from '../error/customError.error.js';
import errorsDictionary from '../error/errorDictionary.error.js';
import sendResponse from '../utils/sendResponse.js';

const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: config.GMAIL_APP_USER,
        pass: config.PASS_APP_GMAIL
    }
})

const handleSendResetLink = async (req, res, next) => {
    try {
        const { email } = req.body
        const user = await userService.findOneByEmail(email);
        if (!user) {
            req.logger.warning(`No se encontro el usuario ${email}`);
            throw new CustomError(errorsDictionary.USER_NOT_FOUND, { message: `No se encontro el usario ${email} ` });
        }
        const token = createToken({ ...user }, 300000);
        res.cookie('token', token, { maxAge: 300000, signed: true, httpOnly: true });
        let result = await transport.sendMail({
            from: `E-commerce <${config.GMAIL_APP_USER}>`,
            to: email,
            subject: "Recuperación de Contraseña",
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h2 style="color: #555;">Recuperación de Contraseña</h2>
                    <p>Hola,</p>
                    <p>Hemos recibido una solicitud para restablecer tu contraseña. Si no realizaste esta solicitud, por favor ignora este correo. De lo contrario, haz clic en el botón a continuación para recuperar tu contraseña:</p>
                    <div style="text-align: center; margin: 20px 0;">
                        <a href="http://localhost:8080/newPasswordEmailTemplate" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Recuperar contraseña</a>
                    </div>
                    <p>Gracias,</p>
                    <p>El equipo de E-commerce</p>
                </div>
            `
        });
        sendResponse(res,200,true,"Email enviado",{result})
    } catch (error) {
        next(error);
    }

}

export default { handleSendResetLink }