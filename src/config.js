import * as url from 'url'

export const config = {
    PORT: 8080,
    DIRNAME: url.fileURLToPath(new URL('.', import.meta.url)),
    get UPLOAD_DIR() { return `${this.DIRNAME}/public/img` },
    get DIR_VIEWS() { return `${this.DIRNAME}/views` },
    get STATIC_DIR() {return `${this.DIRNAME}/public`}
}
