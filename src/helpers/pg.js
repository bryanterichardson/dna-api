import pg from 'pg';
import settings from '../config.js';
import knex from 'knex';


export const pool = new pg.Pool({
    ...settings.postgres,
    max: 5,
})

export const client = new pg.Client({
    ...settings.postgres,
})

export const queryBuilder = knex({
    client: 'pg',
    connection: settings.postgres,
})

export class Model {
    constructor (tableName) {
        this.tableName = tableName
        this.queryBuilder = queryBuilder
    }

    query(tableName) {
        return this.queryBuilder(tableName)
    }

    create(data) {
        return this.queryBuilder
            .insert(data)
            .into(this.tableName)
            .returning('*')
    }

    deleteById(id) {
        return this.queryBuilder
            .delete()
            .from(this.tableName)
            .where('id', '=', id)
    }

    find(...paramsObjs) {
        const query = this.queryBuilder
            .select()
            .from(this.tableName)
        paramsObjs.forEach((item) => {
            query.where(item)
        })
        return query
    }

    getBy(columnName, value) {
        return this.queryBuilder
            .select()
            .from(this.tableName)
            .where({columnName: value})
    }

    getById(id) {
        return this.queryBuilder
            .select()
            .from(this.tableName)
            .where({id})
            .limit(1)
    }

    getByUserId(user_id) {
        return this.queryBuilder
            .select()
            .from(this.tableName)
            .where({user_id})
            .limit(1)
    }

    orFind(...paramsObjs) {
        const query = this.queryBuilder
            .select()
            .from(this.tableName)
        paramsObjs.forEach((item) => {
            query.orWhere(item)
        })
        return query
    }

    updateById(id, data){
        return this.queryBuilder(this.tableName)
            .update(data)
            .where({id})
            .returning('*')
    }
}
