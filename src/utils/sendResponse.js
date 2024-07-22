
const sendResponse = (res, code, status, message, data={}) => {
    res.status(code).send({
        status,
        message,
        data,
        timestamp: new Date().toISOString(),
        path: res.req.originalUrl,
        method: res.req.method,
    })
}

export default sendResponse;