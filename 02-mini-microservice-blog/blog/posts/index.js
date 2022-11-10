const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
//Help us to get around some policys issues domains
const cors = require('cors');

const posts = {};

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/posts', (req, res) => {
    res.send(posts);
});


app.post('/posts', (req, res) => {

    const id = randomBytes(4).toString('hex');
    const { title } = req.body;

    posts[id] = {
        id, title
    }

    //Status 201 -> Resource created successfully
    res.status(201).send(posts[id]);
});


app.listen(4000, () => {
    console.log('Listening on port 4000');
});
