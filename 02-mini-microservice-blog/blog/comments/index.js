const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const { allowedNodeEnvironmentFlags } = require('process');
//Help us to get around some policys issues domains
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

//Data Structure for this internal memory
//Key will be post id 
//Value will be an array with a id of a comment and his content
const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    // || [] garantees that always send back an array
    res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {

    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;

    //req.params.id fetch this :id in the URL
    // || [] means if commentsByPostId[req.params.id] was undefined then by default return an empty array 
    const comments = commentsByPostId[req.params.id] || [];

    comments.push( { id: commentId, content, status:'pending' } );

    commentsByPostId[req.params.id] = comments;

    await axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content: content,
            postId: req.params.id,
            status: 'pending'
        }
    });

    res.status(201).send(commentsByPostId[req.params.id]);

});

app.post('/events', async (req, res) => {
    console.log('Recieved event', req.body.type);
    
    const { type, data } = req.body;
    
    if (type === 'CommentModerated') {
        const { postId, id, status, content } = data;
        
        const comments = commentsByPostId[postId];

        //We don't have to insert it back cause is an addr
        //Search more about how this works'
        const comment = comments.find( comment => {
            return comment.id === id;
        });
        comment.status = status;

        await axios.post('http://localhost:4005/events', {
            type: 'CommentUpdated',
            data: {
                id,
                status,
                postId,
                content
            }
        });
    }

    res.send({});
});

app.listen(4001, () => {
   console.log('Listening on 4001'); 
});