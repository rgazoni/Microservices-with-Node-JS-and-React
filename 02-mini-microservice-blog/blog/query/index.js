const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};
// Posts collection structure:
// { 
//     '1231231': {
//         id: '1231231',
//         title: 'title',
//         comments: [
//             {
//                 id: '867876',
//                 content: 'content'    
//             },
//             {
//                 id: '345345',
//                 content: 'another content'    
//             },
//         ]
//     },
//     ...
// }


app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/events', (req, res) => {

    const { type, data } = req.body;

    if (type === 'PostCreated'){
        const { id, title } = data;
        //Initializing comments as an empty array
        posts[id] = { id, title, comments: [] };
    }
    if (type === 'CommentCreated'){
        const { id, content, postId } = data;
        
        const post = posts[postId];
        post.comments.push({ id, content });
    }
    
    console.log('Recieved event', req.body.type);
    res.send({});
});

app.listen(4002, () => {
    console.log('Listening on 4002');
});