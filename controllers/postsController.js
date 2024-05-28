const path = require('path');
const posts = require('../db/posts.js');



const index = (req, res) => {
    res.format({
        html: () => {
            let html;
            posts.forEach(post => {
                html +=
                    `
                    <div class="container">
                        <div class="card" style="width: 18rem; border: 1px solid black; padding:20px">
                            <img src="/imgs/posts/${post.image}" style="width:100%" alt="${post.title}">
                            <div class="card-body">
                                <div class="card-title">
                                    <h3>${post.title}</h3>
                                </div>
                                <div class="card-text">
                                    <p>${post.content}</p>
                                    <div class="tags">
                    `
                
                post.tags.forEach(tag => html += `<span style="margin:2px">#${tag}</span>`);
                
                html +=
                `
                                </div>
                                </div>
                                <a href="/posts/${post.slug}">${post.title}</a>
                            </div>
                        </div>
                    </div>
                `
                
            })
            res.send(html);
    
        },
        json: () => {
            res.json(posts);
        }
    })
};

const show = (req, res) => {
    const slug = req.params.slug;
    const post = posts.find(post => post.slug === slug);
    res.format({
        html: () => {
            let html;
            if (post) {
                html += `
                <div>
                   <h1>${post.title}</h1>
                   <img width="500" src="/imgs/posts/${post.image}" alt="${post.title}">
                   <p>${post.content}</p>
                   <ul>
                `;
                post.tags.forEach(tag => html += `<li>${tag}</li>`);
                html += '</ul></div>';
            } else {
                html += `
                <div>
                   <h1>Non trovato</h1>
                </div>`
            }
                
            res.send(html);
    
        },
        json: () => {
            if (post) {
                res.json(post);
            } else {
                res.status(404).json({
                    error: 'Not Found',
                    describe: `Non esiste una pizza ${slug}`
                });
            }
        }
    })
};

const create = (req, res) => { 
    res.format({
        html: () => {
            let html;
            html += "<h1>Creazione nuovo post</h1>"
            res.send(html);
        },
        json: () => { 
            res.status(406).json({
                error: 'Not Accetable',
            });
        }
    })
}

const download = (req, res) => { 
    const slug = req.params.slug;
    const post = posts.find(post => post.slug === slug);
    if (post) {
        const file = path.join(__dirname + '/../public/imgs/posts/' + post.image)
        res.download(file); 
    } else {
        res.send("<h1>Non esiste</h1>")
    }
}

module.exports = {
    index,
    show,
    create,
    download 
}