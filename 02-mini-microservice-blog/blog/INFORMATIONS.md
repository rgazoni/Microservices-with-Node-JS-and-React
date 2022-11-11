# Commit [22d0f26: Comment List feature]

At this point we have a functional application.

## App architecture

<img src='./resources/App-arch.png' alt='Application Architecture' width="400"/>

--------

## React Components
<img src='./resources/React-components.png' alt='React Components' width="400"/>

--------

## Current services architecture

For now, it was developed a Post site focused on two different services, comments and posts. As it can be seen bellow one of them is responsible for maintaining post creation and list and another one focused on comments.

<img src='./resources/Post-service.png' alt='Post Service' width="400"/>


<img src='./resources/Comment-service.png' alt='Comment Service' width="400"/>

--------

## Problem with approach seen above

For each post, the implementation that was done will need to make 1 request to the comments services, in order to fetch their contents. This is a problem of scalability,imagine milions of users making a handfull of requests to fetch comments for every single post in his screen.

<img src='./resources/example-problem.png' alt='Comment Service'/>

--------------------------------

## The solution

As the course is focused on Microservices, the solution need to be microservices-based. So following the principles, the solution will be an async Communication shown bellow.

<img src='./resources/Async-con.png' alt='Comment Service' width="700"/>


A Query service will be created to handle comments and post events that will be thrown on a event-bus. It will store the data emitted by other servives into a internal data structure.

The event-bus also will be created to focuse on recieving events from services and routing to other desired parties. For example, when a Post Service create a post, it throws an event inside the event bus and then this event will be directed query service.
