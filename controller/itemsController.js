let items = require('../userDetails');
let referrals = require('../referralRecords');
let missionCompleted = require('../missionActivity');
let registrations = require('../tournamentRegistrations')
let tournament_details = require('../tournamentDetails')


const steam_data = "Steam Connected Successfully"
const auth_link = "https://api.twitter.com/oauth/authenticate?oauth_token=k5jEUQAAAAABpu-YAAABiyM-zjI"
const twitter_data = "Twitter followed kanalabs Successfully"




const { v4: uuidv4 } = require('uuid')

const getAllUserDetails = (req, reply) => {
    if (items) {
        reply.send(items);
    } else {
        reply.code(400).send({ error: 'Failed to get all the users' });
    }
}

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
    const itemIndex = items.findIndex((item) => item.user_wallet === user_wallet);
    if (itemIndex === -1) {
        reply.code(400).send({ error: 'User not found' });
    } else {
        items.splice(itemIndex, 1);
        reply.send({ message: `Item ${user_wallet} has been removed` });
    }
};



const deleteTournamentRegistration = (req, reply) => {
    const { registration_id } = req.query;
    const itemIndex = registrations.findIndex((item) => item.registration_id === registration_id);
    if (itemIndex === -1) {
        reply.code(400).send({ error: 'User not found' });
    } else {
        registrations.splice(itemIndex, 1);
        reply.send({ message: `Item ${registration_id} has been removed` });
    }
};


const deleteTournamentDetails = (req, reply) => {
    const { tournament_id } = req.query;
    const itemIndex = tournament_details.findIndex((item) => item.tournament_id === tournament_id);
    if (itemIndex === -1) {
        reply.code(400).send({ error: 'User not found' });
    } else {
        tournament_details.splice(itemIndex, 1);
        reply.send({ message: `Item ${tournament_id} has been removed` });
    }
};


const updateUser = (req, reply) => {
    const { username, discord, user_display_name, language, preferred_genres, instagram, twitter, telegram } = req.body;

    const itemIndex = items.findIndex((item) => item.user_wallet === user_wallet);

    if (itemIndex !== -1) {
        const updates = {};

        if (username !== undefined) {
            updates.username = username;
        }

        if (discord !== undefined) {
            updates.discord = discord;
        }

        if (user_display_name !== undefined) {
            updates.user_display_name = user_display_name;
        }

        if (language !== undefined) {
            updates.language = language;
        }
        
        if (preferred_genres !== undefined) {
            updates.preferred_genres = preferred_genres;
        }

        if (instagram !== undefined) {
            updates.instagram = instagram;
        }

        if (twitter !== undefined) {
            updates.twitter = twitter;
        }

        if (telegram !== undefined) {
            updates.telegram = telegram;
        }
        // Apply updates to the item
        items[itemIndex] = { ...items[itemIndex], ...updates };

        const updatedItem = items[itemIndex];

        reply.send(updatedItem);
    } else {
        reply.status(404).send({ message: 'Failed to update user details' });
    }
};


const updateTournamentregistration = (req, reply) => {
    const { registration_id, selected_tournament_mode, tournament_id, team_id, selected_tournament_format } = req.body;

    const itemIndex = registrations.findIndex((item) => item.registration_id === registration_id);

    if (itemIndex !== -1) {
        const updates = {};

        if (tournament_id !== undefined) {
            updates.tournament_id = tournament_id;
        }

        if (registration_id !== undefined) {
            updates.registration_id = registration_id;
        }

        if (selected_tournament_format !== undefined) {
            updates.selected_tournament_format = selected_tournament_format;
        }

        if (team_id !== undefined) {
            updates.team_id = team_id;
        }

        if (selected_tournament_mode !== undefined) {
            updates.selected_tournament_mode = selected_tournament_mode;
        }

        registrations[itemIndex] = { ...registrations[itemIndex], ...updates };

        const updatedItem = registrations[itemIndex];

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
    }
}


const addTournamentregistration = (req, reply) => {
    const { registration_id, tournament_id, team_id, selected_tournament_mode, selected_tournament_format } = req.body
    const item = {
        registration_id,
        tournament_id,
        team_id,
        selected_tournament_mode,
        selected_tournament_format
    }
    if (item) {
        reply.send(item);
    } else {
        reply.code(400).send({ error: 'failed to add tournament registration' });
    }
}
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
    }
}

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
    }
}

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
    }
}

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
    }
}


const tournamentBracket = (req, reply) => {
    const { tournament_id, teamIds } = req.body;
  
    if (!tournament_id || !teamIds || teamIds.length < 2) {
      reply.code(400).send({ error: 'Invalid input. You must provide a valid tournament_id and at least 2 teamIds.' });
    } else {
      const bracket = generateBracketLogic(tournament_id, teamIds);
      if (bracket) {
        reply.send({ status: 200, bracket: bracket });
      } else {
        reply.code(400).send({ error: 'Failed to generate bracket.' });
      }
    }
  };
  
  function generateBracketLogic(tournament_id, teamIds) {
  
    const numberOfTeams = teamIds.length;
    if (numberOfTeams < 2) {
      return null;
    }
  
    shuffleArray(teamIds);
  
    const bracket = [[]];
  
    for (let i = 0; i < numberOfTeams; i += 2) {
      bracket[0].push([teamIds[i], teamIds[i + 1]]);
    }
  
    const formattedBracket = bracket[0].map(match => match.map(team => team.split(',')));
  
    return formattedBracket;
  }  

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  const getTournamentDetails = (req, reply) => {
    const { tournament_status } = req.query;
    const matchingRecords = tournament_details.filter((item) => item.tournament_status === tournament_status);
    if (matchingRecords) {
        console.log(matchingRecords);
        reply.send(matchingRecords);
    } else {
        reply.code(400).send({ error: 'tournament_status not found' });
    }
};


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
    twitterFollow,
    addTournamentregistration,
    deleteTournamentRegistration,
    deleteTournamentDetails,
    tournamentBracket,
    updateTournamentregistration,
    getTournamentDetails
}