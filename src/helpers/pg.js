import knex from 'knex';
import knexPaginate from 'knex-paginate';
import pg from 'pg';

import settings from '../config.js';


knexPaginate.attachPaginate()


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
        return this.queryBuilder(this.tableName)
            .insert(data)
            .returning('*')
    }

    deleteById(id) {
        return this.queryBuilder(this.tableName)
            .delete()
            .where(`${this.tableName}.id`, '=', id)
            .returning('*')
    }

    find(wheres=[]) {
        let query = this.queryBuilder(this.tableName)
            .select()
        wheres.forEach((item) => {
            query = query.where(item)
        })
        return query
    }

    getBy(columnName, value) {
        return this.queryBuilder(this.tableName)
            .select()
            .where(`${this.tableName}.${columnName}`, '=', value)
    }

    getById(id) {
        return this.queryBuilder(this.tableName)
            .select()
            .where(`${this.tableName}.id`, '=', id)
            .limit(1)
    }

    getByUserId(user_id) {
        return this.queryBuilder(this.tableName)
            .select()
            .where(`${this.tableName}.user_id`, '=', user_id)
            .limit(1)
    }

    orFind(wheres=[]) {
        let query = this.queryBuilder(this.tableName)
            .select()
        wheres.forEach((item) => {
            query = query.orWhere(item)
        })
        return query
    }

    updateById(id, data){
        return this.queryBuilder(this.tableName)
            .update(data)
            .where(`${this.tableName}.id`, '=', id)
            .returning('*')
    }
}
