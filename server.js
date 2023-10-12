const fastify = require('fastify')({
    logger: true
})

fastify.register(require('@fastify/swagger'),
{
    exposeRoute: true,
    routePrefix: '/gaming',
    swagger: {
        info: {
            title: 'fastify swagger'
        },
    },
})

fastify.register(require('../Fastify swagger/routes/itemsRoute'))

const PORT = 5000

const start = async () => {
    try{
        await fastify.listen(PORT)
    }
    catch (error) {
        fastify.log.error(error)
        process.exit(1)
    }
}

start();