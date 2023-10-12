let items = require('../items');
let referrals = require('../referralRecords');
let missionCompleted = require('../missionActivity');

const steam_data = "Steam Connected Successfully"
const auth_link = "https://api.twitter.com/oauth/authenticate?oauth_token=k5jEUQAAAAABpu-YAAABiyM-zjI"
const twitter_data = "Twitter followed kanalabs Successfully"




const { v4: uuidv4 } = require('uuid')

const getAllUserDetails = (req,reply) => {
    reply.send(items)
}

const steamConnect = (req,reply) => {
    reply.send(steam_data)
}

const twitterAuthLink = (req,reply) => {
    reply.send(auth_link)
}

const twitterFollow = (req,reply) => {
    reply.send(twitter_data)
}

const twitterConnect = (req,reply) => {
    const {oauth_token, oauth_verifier } = req.body
    const item = {
        oauth_token,
        oauth_verifier,
    }
    reply.code(201).send(item)
}

const getLeaderBoard = (req,reply) => {
    reply.send(items)
}

const getUsernameExistsOrNot = (req, reply) => {
    const { username } = req.query;
    const user = items.find(item => item.username === username);
  
    if (user) {
      reply.code(200).send({ message: 'Username exists' });
    } else {
      reply.code(404).send({ message: 'Username does not exist' });
    }
  };
  

const getUserDetails = (req,reply) => {
    const { user_wallet } = req.query;
    const item = items.find((item => item.user_wallet === user_wallet))
    reply.send(item)
}

const getUserByUsername = (req,reply) => {
    const { username } = req.query;
    const item = items.find((item => item.username === username))
    reply.send(item)
}

const getReferralRecords = (req, reply) => {
    const { referrer_wallet } = req.query;
    const matchingRecords = referrals.filter((item) => item.referrer_wallet === referrer_wallet);  
    reply.send(matchingRecords);
  };

  const getCompletedMissions = (req, reply) => {
    const { user_wallet } = req.query;
    const matchingRecords = missionCompleted.filter((item) => item.user_wallet === user_wallet);  
    reply.send(matchingRecords);
  };

  const getNotCompletedMissions = (req, reply) => {
    const { user_wallet } = req.query;
    const matchingRecords = missionCompleted.filter((item) => item.user_wallet === user_wallet);  
    reply.send(matchingRecords);
  };

const addUserDetails = (req,reply) => {
    const {user_wallet, username, user_display_name, language, preferred_genres, instagram, twitter, telegram, discord } = req.body
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

    reply.code(201).send(item)
}

const deleteUser = (req,reply) => {
    const { user_wallet } = req.query;
    items = items.filter((item => item.user_wallet !== user_wallet))
    reply.send({message: `Item ${user_wallet} has been removed`})
}

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
        // If the item is not found, return an error response
        reply.status(404).send({ message: 'Item not found' });
    }
};

module.exports = {
    updateUser,
};

const addMissions = (req,reply) => {
    const {mission_id, mission_title, platform } = req.body
    const item = {
        mission_id,
        mission_title,
        platform
    }
    reply.code(201).send(item)
}

const referralRecords = (req,reply) => {
    const {referrer_wallet, referred_wallet } = req.body
    const item = {
        referral_id: uuidv4(),
        referrer_wallet,
        referred_wallet,
    }

    referrals = [...referrals, item]

    reply.code(201).send(item)
}

const missionActivity = (req,reply) => {
    const {mission_id, user_wallet } = req.body
    const item = {
        activity_id: uuidv4(),
        mission_id,
        user_wallet,
    }

    missionCompleted = [...missionCompleted, item]

    reply.code(201).send(item)
}

const addreferralLinks = (req,reply) => {
    const {user_wallet, referral_link } = req.body
    const item = {
        user_wallet,
        referral_link,
    }
    reply.code(201).send(item)
}

const addLevels = (req,reply) => {
    const {level_id, level_name, badge_id,  badge_name, badge_description, required_points} = req.body
    const item = {
        level_id,
        level_name, 
        badge_id,  
        badge_name, 
        badge_description,
        required_points
    }
    reply.code(201).send(item)
}


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