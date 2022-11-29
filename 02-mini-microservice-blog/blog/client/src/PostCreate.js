import React, { useState } from 'react';
import axios from "axios";

const PostCreate = () => {
    //To learn more about useState -> https://reactjs.org/docs/hooks-state.html
    const [title, setTitle] = useState("");

    const onSubmit = async (event) => {
        //This prevent a default action
        event.preventDefault();
        
        //Axios uses XMLHttpRequest in the back to make a call to our API endpoint
        await axios.post("http://posts.com/posts/create", {
          title,
        });
    
        //This sets the title of the input field to "", after submitting it
        setTitle("");
    };
    
    //Bootstrap is being used to help styling
    return (
        <div>
            <form onSubmit={onSubmit}>
            <div className="form-group">
                <label>Title</label>
                <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-control"
                />
            </div>
            <button className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default PostCreate;