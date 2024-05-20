import * as url from 'url';
import dotenv from 'dotenv';
dotenv.config();
export const config = {
    PORT: process.env.PORT || 8080,
    DIRNAME: url.fileURLToPath(new URL('.', import.meta.url)),
    MONGODB_URI: process.env.MONGODB_URI,
    get UPLOAD_DIR() { return `${this.DIRNAME}/public/img` },
    get VIEWS_DIR() { return `${this.DIRNAME}/views` },
    get STATIC_DIR() { return `${this.DIRNAME}/public` }
}
