const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const { allowedNodeEnvironmentFlags } = require('process');

const app = express();
app.use(bodyParser.json());


//Data Structure for this internal memory
//Key will be post id 
//Value will be an array with a id of a comment and his content
const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    // || [] garantees that always send back an array
    res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {

    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;

    //req.params.id fetch this :id in the URL
    // || [] means if commentsByPostId[req.params.id] was undefined then by default return an empty array 
    const comments = commentsByPostId[req.params.id] || [];

    comments.push( { id: commentId, content } );

    commentsByPostId[req.params.id] = comments;

    res.status(201).send(commentsByPostId[req.params.id]);

});

app.listen(4001, () => {
   console.log('Listening on 4001'); 
});