const roleMapper = (viewSchema={}) => {
    if(typeof viewSchema === 'object' && Array.isArray(viewSchema)){
        throw new Error('enforceRoles error: viewSchema must be an object')
    }
    return (role, array_of_items) => {
        if(typeof role !== 'string'){
            throw new Error('enforceRoles error: role must be a string')
        }
        array_of_items.forEach( (item) => {
            for(let [columnName, roleDefinition] of Object.entries(viewSchema)){
                if(roleDefinition === '*'){
                    continue
                }
                if(roleDefinition === '-'){
                    delete item[columnName]
                    continue
                }
                if(!Array.isArray(roleDefinition)){
                    roleDefinition = [roleDefinition]
                }
                const allowed = []
                const notAllowed = []
                roleDefinition.forEach((definedRole) => {
                    if(definedRole[0] === '-'){
                        notAllowed.push(definedRole.substring(1))
                        return
                    }
                    allowed.push(definedRole)
                })
                if (allowed.length && !allowed.includes(role)) {
                    delete item[columnName]
                } else if(notAllowed.length && notAllowed.includes(role)){
                    delete item[columnName]
                }
            }
            return item
        })
    }
}

export default roleMapper
