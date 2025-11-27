export class TenantServices{
    constructor(repo, logger){
        this.repo = repo
        this.logger = logger
    }

    async createTenant(dto){
        this.logger.info('Cruando tenant 5s', dto.name)
        if (!dto.name || dto.name.length < 2)
        throw new Error('Nome do tenant inválido')

        const exists = await this.repo.findByName(dto.name)
        if (exists) throw new Error('Tenant já existe')

        const tenant = await this.repo.create({ name: dto.name })
        this.logger.info('Tenant criado id=%s', tenant.id)
        return tenant
    }

}
    
