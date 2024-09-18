const router = require('express').Router();
const { BlogPost, Comment } = require('../../models');
const { findCreateFind } = require('../../models/BlogPost');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    console.log(req.body)
    try {
        const newBlogPost = await BlogPost.create({
            ...req.body,
            user_id: req.session.user_id,
            
        });
        res.status(200).json(newBlogPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

// router.get('/:id', async (req, res) => {
//     try {
//         const blogPost = await BlogPost.findByPk(req.params.id, {
//             include: [{ model: Comment }],
//         });

//         // const comments = await Comment.findAll({
//         //     where: {
//         //         blogpost_id: req.params.id,
//         //     },
//         // });

//         if (!blogPost) {
//             return res.status(404).json({ message: 'blog post not found' });
//         }

//         // console.log(blogPost)
//         // console.log(comments)
        
//         // res.render('blogpost', {
//         //     comments,
//         // })
//         res.status(200).json(blogPost, comments)
//     } catch (err) {
//         console.log(err) 
//         res.status(500).json(err)
//     }
// })

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const blogPostData = await BlogPost.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!blogPostData) {
            res.status(404).json({ message: 'No blog post found with this id!' });
            return;
        }

        res.status(200).json(blogPostData);
    } catch (err) {
        res.status(500).json(err);
    }
});



router.post('/:id', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            comment_content: req.body.comment_content,
            blogpost_id: req.params.id,
            user_id: req.session.user_id
        })

        console.log(newComment)


        res.status(201).json(newComment)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
});





module.exports = router;