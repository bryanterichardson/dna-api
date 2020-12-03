const settings = {}

settings.secretKey = process.env.SECRET_KEY || 'bad_secret'

settings.postgres = {
    user: process.env.PGUSER || 'root',
    password: process.env.PGPASSWORD || '',
    hostname: process.env.PGHOST || 'localhost',
    port: process.env.PGPORT || '5432',
    database: 'dna_production',
}

export default settings
