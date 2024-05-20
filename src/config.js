import * as url from 'url'

export const config = {
    PORT: process.env.PORT || 8080,
    DIRNAME: url.fileURLToPath(new URL('.', import.meta.url)),
    MONGODB_URI:"mongodb+srv://Cesar:ignacioCT2024@cluster0.biy4chz.mongodb.net/ecommerce",
    get UPLOAD_DIR() { return `${this.DIRNAME}/public/img` },
    get VIEWS_DIR() { return `${this.DIRNAME}/views` },
    get STATIC_DIR() { return `${this.DIRNAME}/public` }
}
