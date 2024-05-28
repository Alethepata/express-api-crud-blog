module.exports = (req, res, next) => { 
    const posts = require('../db/posts.js');
    const slugs = []
    posts.forEach(post => {
        slugs.push(post.slug)
    });
    if (!slugs.includes(req.params.slug)) {
        res.format({
            json: () => { 
                res.status(404).json({
                    status: 404,
                    message: 'Post non trovato'
                });
            }
        })
    }
    next();
}