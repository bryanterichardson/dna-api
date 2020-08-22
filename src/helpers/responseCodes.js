export const status200 = (res, data={}) => {
    res.status(200).json({
        status: 'success',
        statusCode: 200,
        data
    })
}


export const status400 = (res, data={}) => {
    res.status(400).json({
        status: 'failure',
        statusCode: 400,
        data: {
            error: 'bad request',
            ...data,
        }
    })
}


export const status401 = (res, data={}) => {
    res.status(401).json({
        status: 'failure',
        statusCode: 401,
        data: {
            error: 'unauthorized',
            ...data,
        }
    })
}


export const status404 = (res, data={}) => {
    res.status(404).json({
        status: 'failure',
        statusCode: 404,
        data: {
            error: 'resource not found',
            ...data,
        }
    })
}


export const status500 = (res, data={}) => {
    res.status(500).json({
        status: 'failure',
        statusCode: 500,
        data: {
            error: 'server error',
            ...data,
        }
    })
}
