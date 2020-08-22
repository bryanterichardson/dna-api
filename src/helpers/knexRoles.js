import knex from 'knex'

const attachRoleHandler = function () {
    knex.QueryBuilder.extend('enforceRoles', function (role, schema={}) {
        if (typeof role !== 'string'){
            throw new Error('enforceRoles error: role must be a string')
        }
        if (typeof schema === 'object' && Array.isArray(schema)) {
            throw new Error('enforceRoles error: schema must be an object')
        }
        return this.client.transaction( async (trx) => {
            const result = await this.transacting(trx)
            const data = result.data || result
            if (!data.length) { return data }
            return data.map( (item) => {
                for (let [columnName, roleDefinition] of Object.entries(schema)) {
                    if (roleDefinition === '*') { continue }
                    if (roleDefinition === '-') {
                        delete item[columnName]
                        continue
                    }
                    if (!Array.isArray(roleDefinition)){
                        roleDefinition = [roleDefinition]
                    }
                    const allowed = []
                    const notAllowed = []
                    roleDefinition.forEach( (definedRole) => {
                        if (definedRole[0] === '-'){
                            notAllowed.push(definedRole.substring(1))
                            return
                        }
                        allowed.push(definedRole)
                    })
                    if (allowed.length && !allowed.includes(role)){
                        delete item[columnName]
                    } else if (notAllowed.length && notAllowed.includes(role)) {
                        delete item[columnName]
                    }
                }
                return item
            })
        })
    })
}

export default attachRoleHandler
