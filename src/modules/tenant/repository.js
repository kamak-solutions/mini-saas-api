import {pool} from '../../config/db.js'

export class TenantRepository{
    async create({name}){
        const {rows} = await pool.query(
            'INSERT INTO tenants (nome) VALUES ($1) RETURNING*',
            [name]
        )
        return rows[0]
    }

    async findByName(name){
        const {rows} = await pool.query(
            'SELECT * FROM tenants WHERE nome = $1',
            [name]
        )
        return rows[0]
    }

}