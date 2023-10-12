const { getAllUserDetails, getUserDetails, addUserDetails, deleteUser, updateUser, addMissions, addLevels, getUserByUsername, referralRecords, getReferralRecords, addreferralLinks, missionActivity, getCompletedMissions, getLeaderBoard, steamConnect, twitterAuthLink, twitterConnect, twitterFollow, getNotCompletedMissions, getUsernameExistsOrNot } = require('../controller/itemsController');
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

const twittermissions = {
    type: 'object',
    properties: {
        oauth_token: { type: 'string' },
        oauth_verifier: { type: 'string' },
    }
}

const steamResponse = {
    type: 'string'
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

const missionNotCompleted = {
    type: 'object',
    properties: {
        mission_id: { type: 'string' },
        mission_title: { type: 'string' },
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
        tags: ['User'],
        response: {
            200: {
                type: 'array',
                items: Item
            },
            400: {
                type: 'object',
                properties: {
                    error: { type: 'string' }
                },
                example: { error: 'Failed to get all the users' }
            },
        },
    },
    handler: getAllUserDetails
}

const getUserDetailsOptions = {
    schema: {
        tags: ['User'],
        querystring: {
            type: 'object',
            properties: {
                user_wallet: { type: 'string' },
            },
            required: ['user_wallet'],
        },
        response: {
            200: Item,
            400: {
                type: 'object',
                properties: {
                    error: { type: 'string' }
                },
                example: { error: 'user_wallet not found' }
            },
        },
    },
    handler: getUserDetails,
};


const getUserExitsOrNotOptions = {
    schema: {
        tags: ['User'],
        querystring: {
            type: 'object',
            properties: {
                username: { type: 'string' },
            },
            required: ['username'],
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                },
            },
            400: {
                type: 'object',
                properties: {
                    error: { type: 'string' }
                },
                example: { error: 'username not found' }
            },
        },
    },
    handler: getUsernameExistsOrNot,
};


const steamConnectOptions = {
    schema: {
        tags: ['Missions'],
        querystring: {
            type: 'object',
            properties: {
                user_wallet: { type: 'string' },
                mission_id: { type: 'string' },
            },
            required: ['user_wallet', 'mission_id'],
        },
        response: {
            200: steamResponse,
            400: {
                type: 'object',
                properties: {
                    error: { type: 'string' }
                },
                example: { error: 'Failed to Connect Steam' }
            },
            
        },
    },
    handler: steamConnect,
};

const authLinkOptions = {
    schema: {
        tags: ['Missions'],
        response: {
            200: steamResponse,
            400: {
                type: 'object',
                properties: {
                    error: { type: 'string' }
                },
                example: { error: 'Failed to Get AuthLink' }
            },
        },
    },
    handler: twitterAuthLink,
};

const connectOptions = {
    schema: {
        tags: ['Missions'],
        body: {
            type: 'object',
            required: ['oauth_token', 'oauth_verifier'],
            properties: {
                oauth_token: { type: 'string' },
                oauth_verifier: { type: 'string' },
            },
        },
        response: {
            201: twittermissions,
            400: {
                type: 'object',
                properties: {
                    error: { type: 'string' }
                },
                example: { error: 'Failed to Connect Twitter' }
            },
        },
    },
    handler: twitterConnect,
};

const followOptions = {
    schema: {
        tags: ['Missions'],
        body: {
            type: 'object',
            required: ['user_wallet'],
            properties: {
                user_wallet: { type: 'string' },
            },
        },
        response: {
            201: steamResponse,
            400: {
                type: 'object',
                properties: {
                    error: { type: 'string' }
                },
                example: { error: 'Failed to Follow Twitter' }
            },
        },
    },
    handler: twitterFollow,
};

const getReferralRecordsOptions = {
    schema: {
        tags: ['Referrals'],
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
            400: {
                type: 'object',
                properties: {
                    error: { type: 'string' }
                },
                example: { error: 'referrer_wallet not found' }
            },
        },
    },
    handler: getReferralRecords,
};

const getCompletedMissionsOptions = {
    schema: {
        tags: ['Mission Activity'],
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
            400: {
                type: 'object',
                properties: {
                    error: { type: 'string' }
                },
                example: { error: 'user_wallet not found' }
            },
        },
    },
    handler: getCompletedMissions,
};


const getNotCompletedMissionsOptions = {
    schema: {
        tags: ['Mission Activity'],
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
                items: missionNotCompleted
            },
            400: {
                type: 'object',
                properties: {
                    error: { type: 'string' }
                },
                example: { error: 'user_wallet not found' }
            },
        },
    },
    handler: getNotCompletedMissions,
};


const getUserByUsernameOptions = {
    schema: {
        tags: ['User'],
        querystring: {
            type: 'object',
            properties: {
                username: { type: 'string' },
            },
            required: ['username'],
        },
        response: {
            200: Item,
            400: {
                type: 'object',
                properties: {
                    error: { type: 'string' }
                },
                example: { error: 'username not found' }
            },
        },
    },
    handler: getUserByUsername,
};

const addUserDetailsOptions = {
    schema: {
        tags: ['User'],
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
            400: {
                type: 'object',
                properties: {
                    error: { type: 'string' }
                },
                example: { error: 'Failed to add user details' }
            },
        },
    },
    handler: addUserDetails
};


const deletUserOptions = {
    schema: {
        tags: ['User'],
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
            },
            400: {
                type: 'object',
                properties: {
                    error: { type: 'string' }
                },
                example: { error: 'Failed to delete user details' }
            },
        },
    },
    handler: deleteUser
}

const updateUserOptions = {
    schema: {
        tags: ['User'],
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
            400: {
                type: 'object',
                properties: {
                    error: { type: 'string' }
                },
                example: { error: 'Failed to update a user details' }
            },
        },
    },
    handler: updateUser,
};

const missionOptions = {
    schema: {
        tags: ['Missions'],
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
            400: {
                type: 'object',
                properties: {
                    error: { type: 'string' }
                },
                example: { error: 'Failed to add missions' }
            },
        },
    },
    handler: addMissions
};


const referralRecordsOptions = {
    schema: {
        tags: ['Referrals'],
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
            400: {
                type: 'object',
                properties: {
                    error: { type: 'string' }
                },
                example: { error: 'Failed to add referral records' }
            },
        },
    },
    handler: referralRecords
};


const missionActivityOptions = {
    schema: {
        tags: ['Mission Activity'],
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
            400: {
                type: 'object',
                properties: {
                    error: { type: 'string' }
                },
                example: { error: 'Failed to add mission activity' }
            },
        },
    },
    handler: missionActivity
};


const addReferralLinksOptions = {
    schema: {
        tags: ['Referrals'],
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
            400: {
                type: 'object',
                properties: {
                    error: { type: 'string' }
                },
                example: { error: 'Failed to add referral links' }
            },
        },
    },
    handler: addreferralLinks
};


const levelOptions = {
    schema: {
        tags: ['Levels'],
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
            400: {
                type: 'object',
                properties: {
                    error: { type: 'string' }
                },
                example: { error: 'Failed to add levels' }
            },
        },
    },
    handler: addLevels
};

const leaderBoardOptions = {
    schema: {
        tags: ['LeaderBoard'],
        response: {
            200: {
                type: 'array',
                items: Item
            },
            400: {
                type: 'object',
                properties: {
                    error: { type: 'string' }
                },
                example: { error: 'Failed to get leaderboard' }
            },
        },
    },
    handler: getLeaderBoard
};

function itemRoutes(fastify, options, done) {
    // Get All items
    fastify.get('/getAllUserDetails', getAllUserDetailsOptions)

    // Get Single item
    fastify.get('/getUserDetails', getUserDetailsOptions)

    // Get User By User name
    fastify.get('/getUserByUsername', getUserByUsernameOptions)

    // Add Item
    fastify.post('/addUserDetails', addUserDetailsOptions)

    // User name exists or not
    fastify.delete('/deletUser', deletUserOptions)

    // Update Item
    fastify.put('/updateUser', updateUserOptions)

    // Add referralRecords
    fastify.post('/referralRecords', referralRecordsOptions)

    // Get ReferralRecords
    fastify.get('/getReferralRecords', getReferralRecordsOptions)

    // Add referral Links
    fastify.post('/addReferralLinks', addReferralLinksOptions)

    // Add Missions
    fastify.post('/mission', missionOptions)

    // Add Levels
    fastify.post('/levelRecords', levelOptions)

    // Add Mission Activity
    fastify.post('/missionActivity', missionActivityOptions)

    // Get Completed Missions
    fastify.get('/steam/connect', steamConnectOptions)

    // Twitter Auth Link
    fastify.post('/twitter/authlink', authLinkOptions)

    // Twitter Connect
    fastify.post('/twitter/connect', connectOptions)

    // Twitter Follow
    fastify.post('/twitter/follow', followOptions)

    // Get Completed Missions
    fastify.get('/getCompletedMissions', getCompletedMissionsOptions)

    // Get Completed Missions
    fastify.get('/getNotCompletedMissions', getNotCompletedMissionsOptions)

    // Get LeaderBoard
    fastify.get('/leaderBoard', leaderBoardOptions)


    // Get User By User name
    fastify.get('/userName', getUserExitsOrNotOptions)

    done()
}

module.exports = itemRoutes