const sequalize = require('../config/connection');
const { User, BlogPost } = require('../models');

const userData = require('./userData.json');
const blogPostData = require('./blogPostData.json');

const seedDatabase = async () => {
    await sequalize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    for (const post of blogPostData) {
        await BlogPost.create({
            ...post,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

    process.exit(0);
};

seedDatabase();