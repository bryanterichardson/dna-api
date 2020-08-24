const viewHandler = (viewSchema={}) => {
    if(typeof viewSchema === 'object' && Array.isArray(viewSchema)){
        throw new Error('enforceRoles error: viewSchema must be an object')
    }
    return (role_name, array_of_items) => {
        if(typeof role_name !== 'string'){
            throw new Error('enforceRoles error: role_name must be a string')
        }
        array_of_items = array_of_items.data || array_of_items
        array_of_items.forEach((item) => {
            for(let columnName of Object.keys(item)){
                let roleDefinition = viewSchema[columnName]
                if (!roleDefinition) {
                    delete item[columnName]
                    continue
                }
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
                if (allowed.length && !allowed.includes(role_name)) {
                    delete item[columnName]
                } else if(notAllowed.length && notAllowed.includes(role_name)){
                    delete item[columnName]
                }
            }
            return item
        })
    }
}

export default viewHandler
