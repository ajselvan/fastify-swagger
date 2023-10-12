const { getAllUserDetails, getUserDetails, addUserDetails, deleteUser, updateUser, addMissions, addLevels, getUserByUsername, referralRecords, getReferralRecords, addreferralLinks, missionActivity, getCompletedMissions, getLeaderBoard } = require('../controller/itemsController');
const Item = {
    type: 'object',
    properties: {
        user_wallet: { type: 'string' },
        uuid: { type: 'string' },
        user_display_name: { type: 'string' },
        username: { type: 'string' },
        language: { type: 'string' },
        signup_timestamp: { type: 'string' },
        preferred_genres: { type: 'array' },
        instagram: { type: 'string' },
        twitter: { type: 'string' },
        telegram: { type: 'string' },
        discord: { type: 'string' },
        steam_identifier: { type: 'string' },
        points: { type: 'string' },
        current_level: { type: 'string' },
        last_active: { type: 'string' },
        referral_link: { type: 'string' },
        wallet_whitelisted: { type: 'string' }
    }
}

const missions = {
    type: 'object',
    properties: {
        mission_id: { type: 'string' },
        mission_title: { type: 'string' },
        platform: { type: 'string' }
    }
}

const levels = {
    type: 'object',
    properties: {
        level_id: { type: 'string' },
        level_name: { type: 'string' },
        badge_id: { type: 'string' },
        badge_name: { type: 'string' },
        badge_description: { type: 'string' },
        required_points: { type: 'string' },
    }
}

const referrals = {
    type: 'object',
    properties: {
        referral_id: { type: 'string' },
        referrer_wallet: { type: 'string' },
        referred_wallet: { type: 'string' },
    }
}

const missionCompleted = {
    type: 'object',
    properties: {
        mission_id: { type: 'string' },
        user_wallet: { type: 'string' },
    }
}

const referralsLinks = {
    type: 'object',
    properties: {
        user_wallet: { type: 'string' },
        referral_link: { type: 'string' },
    }
}
// Options for Get All items

const getAllUserDetailsOptions = {
    schema: {
        response: {
            200: {
                type: 'array',
                items: Item
            },
        },
    },
    handler: getAllUserDetails
}

const leaderBoardOptions = {
    schema: {
        response: {
            200: {
                type: 'array',
                items: Item
            },
        },
    },
    handler: getLeaderBoard
}

const getUserDetailsOptions = {
    schema: {
        querystring: {
            type: 'object',
            properties: {
                user_wallet: { type: 'string' },
            },
            required: ['user_wallet'],
        },
        response: {
            200: Item,
        },
    },
    handler: getUserDetails,
};

const getReferralRecordsOptions = {
    schema: {
        querystring: {
            type: 'object',
            properties: {
                referrer_wallet: { type: 'string' },
            },
            required: ['referrer_wallet'],
        },
        response: {
            200: {
                type: 'array',
                items: referrals
            },
        },
    },
    handler: getReferralRecords,
};

const getCompletedMissionsOptions = {
    schema: {
        querystring: {
            type: 'object',
            properties: {
                user_wallet: { type: 'string' },
            },
            required: ['user_wallet'],
        },
        response: {
            200: {
                type: 'array',
                items: missionCompleted
            },
        },
    },
    handler: getCompletedMissions,
};


const getUserByUsernameOptions = {
    schema: {
        querystring: {
            type: 'object',
            properties: {
                username: { type: 'string' },
            },
            required: ['username'],
        },
        response: {
            200: Item,
        },
    },
    handler: getUserByUsername,
};

const addUserDetailsOptions = {
    schema: {
        body: {
            type: 'object',
            required: ['user_wallet', 'username'], 
            properties: {
                user_wallet: { type: 'string' },
                username: { type: 'string' },
            },
        },
        response: {
            201: Item,
        },
    },
    handler: addUserDetails
};


const deletUserOptions = {
    schema: {
        querystring: {
            type: 'object',
            properties: {
                user_wallet: { type: 'string' },
            },
            required: ['user_wallet'],
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    message: { type: 'string' }
                }
            }
        },
    },
    handler: deleteUser
}

const updateUserOptions = {
    schema: {
        querystring: {
            type: 'object',
            properties: {
                user_wallet: { type: 'string' }, 
            },
        },
        body: {
            type: 'object',
            required: ['username'], 
            properties: {
                username: { type: 'string' }, 
            },
        },
        response: {
            200: Item,
        },
    },
    handler: updateUser,
};

const missionOptions = {
    schema: {
        body: {
            type: 'object',
            required: ['mission_id', 'mission_title', 'platform'], 
            properties: {
                mission_id: { type: 'string' }, 
                mission_title: { type: 'string' },
                platform: { type: 'string' },
            },
        },
        response: {
            201: missions,
        },
    },
    handler: addMissions
};


const referralRecordsOptions = {
    schema: {
        body: {
            type: 'object',
            required: ['referrer_wallet', 'referred_wallet'], 
            properties: {
                referrer_wallet: { type: 'string' }, 
                referred_wallet: { type: 'string' },
            },
        },
        response: {
            201: referrals,
        },
    },
    handler: referralRecords
};


const missionActivityOptions = {
    schema: {
        body: {
            type: 'object',
            required: ['mission_id', 'user_wallet'], 
            properties: {
                mission_id: { type: 'string' }, 
                user_wallet: { type: 'string' },
            },
        },
        response: {
            201: missionCompleted,
        },
    },
    handler: missionActivity
};


const addReferralLinksOptions = {
    schema: {
        body: {
            type: 'object',
            required: ['user_wallet', 'referral_link'],  
            properties: {
                user_wallet: { type: 'string' },
                referral_link: { type: 'string' },
            },
        },
        response: {
            201: referralsLinks,
        },
    },
    handler: addreferralLinks
};


const levelOptions = {
    schema: {
        body: {
            type: 'object',
            required: ['level_id', 'level_name', 'badge_id', 'badge_name', 'badge_description', 'required_points'],
            properties: {
                level_id: { type: 'string' },
                level_name: { type: 'string' },
                badge_id: { type: 'string' },
                badge_name: { type: 'string' },
                badge_description: { type: 'string' },
                required_points: { type: 'string' },
            },
        },
        response: {
            201: levels,
        },
    },
    handler: addLevels
};

function itemRoutes(fastify, options, done) {
    // Get All items
    fastify.get('/getAllUserDetails', getAllUserDetailsOptions)

    // Get Single item
    fastify.get('/getUserDetails', getUserDetailsOptions)

    // Get User By User name
    fastify.get('/getUserByUsername', getUserByUsernameOptions)

    // Get ReferralRecords
    fastify.get('/getReferralRecords', getReferralRecordsOptions)

    // Get Completed Missions
    fastify.get('/getCompletedMissions', getCompletedMissionsOptions)
    
    // Get LeaderBoard
    fastify.get('/leaderBoard', leaderBoardOptions)

    // Add Item
    fastify.post('/addUserDetails', addUserDetailsOptions)

    // Add Missions
    fastify.post('/mission', missionOptions)

    // Add Mission Activity
    fastify.post('/missionActivity', missionActivityOptions)

    // Add referralRecords
    fastify.post('/referralRecords', referralRecordsOptions)

    // Add referral Links
    fastify.post('/addReferralLinks', addReferralLinksOptions)

    // Add Levels
    fastify.post('/levelRecords', levelOptions)

    // Delet Item
    fastify.delete('/deletUser', deletUserOptions)

    // Update Item
    fastify.put('/updateUser', updateUserOptions)


    done()
}

module.exports = itemRoutes