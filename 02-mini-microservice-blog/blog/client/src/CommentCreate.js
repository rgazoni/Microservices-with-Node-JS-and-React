import React, { useState } from 'react';
import axios from "axios";

//CommentCreate needs to recieve a postId prop from the respective post,
//in order to be able to link the comment to the post itself.
//The post method for the API needs the Id property
const CommentCreate = ( { postId } ) => {
    const [content, setContent] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();

        await axios.post(`http://posts.com/posts/${postId}/comments`, {
            content
        })

        setContent('');
    };
   
    return (
    <div>
        <form onSubmit={onSubmit}>
            <div className='form-group'>
                <label>New comment</label>
                <input value={content}
                onChange={e => setContent(e.target.value)}
                className='form-control' />
            </div>
            <button className='btn btn-primary'>Submit</button>
        </form>
    </div>
    );
};

export default CommentCreate;