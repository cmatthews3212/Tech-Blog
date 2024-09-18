const router = require('express').Router();
const { BlogPost, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const blogPostData = await BlogPost.findAll({
            include: [
                {
                    model: User,
                    attributes: ['first_name', 'last_name'],
                },
            ],
        });

        const blogPosts = blogPostData.map((post) => post.get({ plain: true }));

        res.render('homepage', {
            blogPosts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/blogpost/:id', async (req, res) => {
    try {
        const blogPostData = await BlogPost.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['first_name', 'last_name'],
                },
                
            ],
        });

        

        const blogPost = blogPostData.get({ plain: true });

        const comments = await Comment.findAll({
            where: {
                blogpost_id: req.params.id,
            },
        });

        const comment = comments.map((comment) => comment.get({ plain: true }));

        console.log(comment)
        console.log('comments', comments)

        res.render('blogpost', {
            ...blogPost,
            comments,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        console.error(err)
        res.status(500).json(err);
    }
});

router.get('/profile', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: BlogPost }],
        });

        console.log(userData)

        const user = userData.get({ plain: true });

        res.render('profile', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if(req.session.logged_in) {
        res.redirect('/profile');
        return;
    }

    res.render('login');
});

module.exports = router;