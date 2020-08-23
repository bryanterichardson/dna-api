import knex from 'knex'


export function attachPaginate() {
    knex.QueryBuilder.extend('paginate', function paginate({
        perPage = 10,
        currentPage = 1,
        isFromStart = false,
        isLengthAware = false,
    }) {
        if (isNaN(perPage)) {
            throw new Error('Paginate error: perPage must be a number.');
        }

        if (isNaN(currentPage)) {
            throw new Error('Paginate error: currentPage must be a number.');
        }

        if (typeof isFromStart !== 'boolean') {
            throw new Error('Paginate error: isFromStart must be a boolean.');
        }

        if (typeof isLengthAware !== 'boolean') {
            throw new Error('Paginate error: isLengthAware must be a boolean.');
        }

        const shouldFetchTotals = isLengthAware || currentPage === 1 || isFromStart;
        let pagination = {};
        let countQuery = null;

        if (currentPage < 1) {
            currentPage = 1;
        }

        const offset = isFromStart ? 0 : (currentPage - 1) * perPage;
        const limit = isFromStart ? perPage * currentPage : perPage;

        if (shouldFetchTotals) {
            countQuery = new this.constructor(this.client)
                .count('* as total')
                .from(
                    this.clone()
                        .offset(0)
                        .clearOrder()
                        .as('count__query__'),
                )
                .first()
                .debug(this._debug);
        }

        // This will paginate the data itself
        this.offset(offset).limit(limit);

        return this.client.transaction(async trx => {
            const result = await this.transacting(trx);

            if (shouldFetchTotals) {
                const countResult = await countQuery.transacting(trx);
                const total = +(countResult.TOTAL || countResult.total);

                pagination = {
                    total,
                    lastPage: Math.ceil(total / perPage),
                };
            }

            // Add pagination data to paginator object
            pagination = {
                ...pagination,
                perPage,
                currentPage,
                from: offset,
                to: offset + result.length,
            };

            return { data: result, pagination };
        });
    });
}

export function attachRoleHandler () {
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
