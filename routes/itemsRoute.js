const items = require('../items');
const {getAllItems, getSingleItem, addItem, deleteItem, updateItem} = require('../controller/itemsController')
const Item = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        name: { type: 'string' }
    }
}
// Options for Get All items

const getAllItemsOptions = {
    schema: {
        response: {
            200: {
                type: 'array',
                items: Item
            },
        },
    },
    handler: getAllItems
}

const getSingleItemOptions = {
    schema: {
        querystring: {
            type: 'object',
            properties: {
                id: { type: 'string' },
            },
            required: ['id'],
        },
        response: {
            200: Item,
        },
    },
    handler: getSingleItem,
};


const postItemOptions = {
    schema: {
        body: {
            type: 'object',
            required: ['name'], // This enforces that 'name' is required in the request body
            properties: {
                name: { type: 'string' }, // This specifies the 'name' property as a string
            },
        },
        response: {
            201: Item,
        },
    },
    handler: addItem
};


const deleteItemOptions = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    message: { type: 'string'}
                }
            }
           },
    },
    handler: deleteItem
}

const updateItemOptions = {
    schema: {
        params: {
            type: 'object',
            properties: {
                id: { type: 'string' }, // Define 'id' as a parameter in the URL
            },
        },
        body: {
            type: 'object',
            required: ['name'], // Make 'id' and 'name' required fields in the request body
            properties: {
                name: { type: 'string' }, // Specify 'name' as a string field
            },
        },
        response: {
            200: Item,
        },
    },
    handler: updateItem,
};



function itemRoutes(fastify, options, done) {
    // Get All items
    fastify.get('/items', getAllItemsOptions)

    // Get Single item
    fastify.get('/items/:id', getSingleItemOptions)

    // Add Item
    fastify.post('/addItem', postItemOptions)

    // Delet Item
    fastify.delete('/items/:id', deleteItemOptions)

    fastify.put('/items/:id', updateItemOptions)


    done()
}

module.exports = itemRoutes