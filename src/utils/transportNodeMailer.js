import nodemailer from 'nodemailer';
import { config } from '../config.js';

export const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: config.GMAIL_APP_USER,
        pass: config.PASS_APP_GMAIL
    }
})

