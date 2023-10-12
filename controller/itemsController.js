let items = require('../items');
let referrals = require('../referralRecords');
let missionCompleted = require('../missionActivity');

const steam_data = "Steam Connected Successfully"
const auth_link = "https://api.twitter.com/oauth/authenticate?oauth_token=k5jEUQAAAAABpu-YAAABiyM-zjI"
const twitter_data = "Twitter followed kanalabs Successfully"




const { v4: uuidv4 } = require('uuid')

const getAllUserDetails = (req, reply) => {
    if (items) {
        reply.send(items);
    } else {
        reply.code(400).send({ error: 'Failed to get all the users' });
    }}

const steamConnect = (req, reply) => {
    reply.send(steam_data)
}

const twitterAuthLink = (req, reply) => {
    reply.send(auth_link)
}

const twitterFollow = (req, reply) => {
    reply.send(twitter_data)
}

const twitterConnect = (req, reply) => {
    const { oauth_token, oauth_verifier } = req.body
    const item = {
        oauth_token,
        oauth_verifier,
    }
    if (item) {
        reply.send(item);
    } else {
        reply.code(400).send({ error: 'Failed to connect twitter' });
    }
}

const getLeaderBoard = (req, reply) => {
    const sortedItems = items.sort((a, b) => b.points - a.points);
    if (sortedItems) {
        reply.send(sortedItems);
    } else {
        reply.code(400).send({ error: 'Failed to get leaderboard' });
    }
};


const getUsernameExistsOrNot = (req, reply) => {
    const { username } = req.query;
    const user = items.find(item => item.username === username);

    if (user) {
        reply.code(200).send({ message: 'Username exists' });
    } else {
        reply.code(404).send({ message: 'Username does not exist' });
    }
};


// itemsController.js
const getUserDetails = (req, reply) => {
    const { user_wallet } = req.query;
    const item = items.find((item) => item.user_wallet === user_wallet);

    if (item) {
        reply.send(item);
    } else {
        reply.code(400).send({ error: 'User not found' });
    }
};


const getUserByUsername = (req, reply) => {
    const { username } = req.query;
    const item = items.find((item => item.username === username))
    if (item) {
        reply.send(item);
    } else {
        reply.code(400).send({ error: 'username not found' });
    }
};

const getReferralRecords = (req, reply) => {
    const { referrer_wallet } = req.query;
    const matchingRecords = referrals.filter((item) => item.referrer_wallet === referrer_wallet);
    if (matchingRecords) {
        reply.send(matchingRecords);
    } else {
        reply.code(400).send({ error: 'referrer_wallet not found' });
    }
};

const getCompletedMissions = (req, reply) => {
    const { user_wallet } = req.query;
    const matchingRecords = missionCompleted.filter((item) => item.user_wallet === user_wallet);
    if (matchingRecords) {
        reply.send(matchingRecords);
    } else {
        reply.code(400).send({ error: 'referrer_wallet not found' });
    }
};

const getNotCompletedMissions = (req, reply) => {
    const { user_wallet } = req.query;
    const matchingRecords = missionCompleted.filter((item) => item.user_wallet === user_wallet);
    if (matchingRecords) {
        reply.send(matchingRecords);
    } else {
        reply.code(400).send({ error: 'referrer_wallet not found' });
    }
};

const addUserDetails = (req, reply) => {
    const { user_wallet, username, user_display_name, language, preferred_genres, instagram, twitter, telegram, discord } = req.body
    const item = {
        uuid: uuidv4(),
        user_wallet,
        username,
        user_display_name,
        instagram,
        twitter,
        preferred_genres,
        language,
        telegram,
        discord
    }
    // items.push(item); // Add the new item to the items array

    items = [...items, item]

    if (item) {
        reply.send(item);
    } else {
        reply.code(400).send({ error: 'failed to add user details' });
    }
};
const deleteUser = (req, reply) => {
    const { user_wallet } = req.query;
    items = items.filter((item => item.user_wallet !== user_wallet))
    if (error) {
        reply.code(400).send({ error: 'user_wallet not found' });
    } else {
        reply.send({ message: `Item ${user_wallet} has been removed` })
    }
};


const updateUser = (req, reply) => {
    const { user_wallet } = req.query;
    const { username, discord } = req.body;

    // Find the item with the given user_wallet
    const itemIndex = items.findIndex((item) => item.user_wallet === user_wallet);

    if (itemIndex !== -1) {
        // Create an object to hold the fields to update
        const updates = {};

        // Update the fields if provided in the request
        if (username !== undefined) {
            updates.username = username;
        }

        if (discord !== undefined) {
            updates.discord = discord;
        }

        // Apply updates to the item
        items[itemIndex] = { ...items[itemIndex], ...updates };

        const updatedItem = items[itemIndex];

        reply.send(updatedItem);
    } else {
        reply.status(404).send({ message: 'Failed to update user details' });
    }
};


const addMissions = (req, reply) => {
    const { mission_id, mission_title, platform } = req.body
    const item = {
        mission_id,
        mission_title,
        platform
    }
    if (item) {
        reply.send(item);
    } else {
        reply.code(400).send({ error: 'failed to add missions' });
    }}

const referralRecords = (req, reply) => {
    const { referrer_wallet, referred_wallet } = req.body
    const item = {
        referral_id: uuidv4(),
        referrer_wallet,
        referred_wallet,
    }

    referrals = [...referrals, item]

    if (item) {
        reply.send(item);
    } else {
        reply.code(400).send({ error: 'failed to add referral records' });
    }}

const missionActivity = (req, reply) => {
    const { mission_id, user_wallet } = req.body
    const item = {
        activity_id: uuidv4(),
        mission_id,
        user_wallet,
    }

    missionCompleted = [...missionCompleted, item]

    if (item) {
        reply.send(item);
    } else {
        reply.code(400).send({ error: 'failed to add mission Activity' });
    }}

const addreferralLinks = (req, reply) => {
    const { user_wallet, referral_link } = req.body
    const item = {
        user_wallet,
        referral_link,
    }
    if (item) {
        reply.send(item);
    } else {
        reply.code(400).send({ error: 'failed to add referral links' });
    }}

const addLevels = (req, reply) => {
    const { level_id, level_name, badge_id, badge_name, badge_description, required_points } = req.body
    const item = {
        level_id,
        level_name,
        badge_id,
        badge_name,
        badge_description,
        required_points
    }
    if (item) {
        reply.send(item);
    } else {
        reply.code(400).send({ error: 'failed to add levels' });
    }}


module.exports = {
    getAllUserDetails,
    getLeaderBoard,
    getUserDetails,
    getUsernameExistsOrNot,
    addUserDetails,
    deleteUser,
    updateUser,
    addMissions,
    addLevels,
    getUserByUsername,
    referralRecords,
    getReferralRecords,
    addreferralLinks,
    missionActivity,
    getCompletedMissions,
    getNotCompletedMissions,
    steamConnect,
    twitterAuthLink,
    twitterConnect,
    twitterFollow
}