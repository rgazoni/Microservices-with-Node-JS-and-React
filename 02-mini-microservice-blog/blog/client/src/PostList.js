import React, { useState, useEffect } from 'react';
import axios from "axios";
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

//useEffect hook run some code at a very specific points 
//of time in a lifetime of a component 

const PostList = () => {
    const [posts, setPosts] = useState({});

    const fetchPosts = async () => {
        //Always when we make a request with axios, we get back an response object
        //that contains our data in a data property
        const res = await axios.get("http://localhost:4000/posts");
        
        setPosts(res.data);
    };

    //useEffect hook run some code at a very specific points 
    //of time in a lifetime of a component 
    //Empty array tells React to only run this func one time
    useEffect(() => {
        fetchPosts();
    }, []);
    
    //Object.values -> An inside func of JS that transforms posts into an array of posts
    //Map pick each one of the posts in the array and return the HTML content.
    const renderedPosts = Object.values(posts).map(post => {

        //Because we are generating a list of posts, React expets us to place
        //a key property on each to elements that we're creating
        return (
        <div 
        className="card" 
        style={{ width: '30%', marginBottom: '20px'}}
        key={post.id} 
        >
            <div className='card-body'>
                <h3>{post.title}</h3>
                <CommentList postId={post.id} />
                <CommentCreate postId={post.id} />
            </div>
        </div>
        )
    });

    //Return renderedPosts object with some bootstrap style
    return (
        <div className='d-flex flex-row flex-wrap justify-content-between'>
            {renderedPosts}
        </div>
    );
};

export default PostList;