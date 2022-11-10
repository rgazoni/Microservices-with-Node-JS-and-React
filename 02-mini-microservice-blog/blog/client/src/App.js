import React from "react";
import PostCreate from "./PostCreate";
import PostList from "./PostList";

//Notice that each component has its own file to them.
//These componenets were mapped on README.md.

const App = () => {
  return (
    <div className="container">
      <h1>Create Post</h1>
      <PostCreate />  
      <hr />
      <h1>Posts</h1>
      <PostList />
    </div>
  );
};

export default App;