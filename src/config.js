import * as url from 'url';
import dotenv from 'dotenv';
import { Command } from 'commander'


const commandLine = new Command();
commandLine
    .option('--port <port>')
    .option('--mode <mode>')
commandLine.parse();
const clOptions = commandLine.opts();

dotenv.config({ path: `.env.${clOptions.mode}` });


export const config = {
    PORT: process.env.PORT || clOptions.port || 5050,
    DIRNAME: url.fileURLToPath(new URL('.', import.meta.url)),
    MODE: process.env.NODE_ENV || clOptions.mode || "development",
    MONGODB_URI: process.env.MONGODB_URI,
    SECRET: process.env.SECRET,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    GITHUB_CALLBACK_URL: process.env.GITHUB_CALLBACK_URL,
    GMAIL_APP_USER: process.env.GMAIL_APP_USER,
    PASS_APP_GMAIL: process.env.PASS_APP_GMAIL,
    EMAIL_CALLBACK_URL: process.env.EMAIL_CALLBACK_URL,
    get DOC_API_DIR() { return `${this.DIRNAME}/docs/apiDocs.yaml` },
    get UPLOAD_DIR() { return `${this.DIRNAME}/public/upload` },
    get VIEWS_DIR() { return `${this.DIRNAME}/views` },
    get STATIC_DIR() { return `${this.DIRNAME}/public` }
}
