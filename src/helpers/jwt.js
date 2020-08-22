import jwt from 'jsonwebtoken'

import settings from '../config.js'


export const jwtSign = (data, custom_options) => {
    return new Promise( (resolve, reject) => {
        let options = {expiresIn: '12h'}
        if (custom_options) {
            options = {...options, ...custom_options}
        }
        return jwt.sign(data, settings.secretKey, options, (err, token) => {
            if (err) {
                reject({})
            }
            resolve(token)
        })
    })
}


export const jwtVerify = (token) => {
    return new Promise( (resolve, reject) => {
        return jwt.verify(token, settings.secretKey, (err, decoded) => {
            if (err) {
                reject({})
            }
            resolve(decoded)
        })
    })
}
