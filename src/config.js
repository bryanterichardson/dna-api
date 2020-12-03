const settings = {}

settings.secretKey = "83668b5eaab7366dff68f1b610928fa560edd52fa0cb755bbf9ef7703bda834ced10862351b610ee45c9d777101172fe7a706fae32e8d5cd42ff5b440f57aa9f8f90ea5a206cdf2c3759ad7cb7a79b3b785af83e2dae3f38db97fb0be1563bcb8fcd6f68d1d6a85dee91d056e274506e7106957828f2d20b3695bf740a0a961aa4a39011b466dd92ae98151be9c6906f56b264c5237fbdd507d5fcbc1178afc7"

settings.postgres = {
    user: process.env.PGUSER || 'root',
    password: process.env.PGPASSWORD || '',
    hostname: process.env.PGHOST || 'localhost',
    port: process.env.PGPORT || '5432',
    database: 'dna_production',
}

export default settings
