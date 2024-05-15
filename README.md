# Sttacked

A chat site made using React, ShadcnUI, Node, Socket.io, Postgres, Sequelize, etc.

## Features
 - Private and Group chats
 - Custom avatars
 - Notifications
 - Realtime Messages

## Setup

Clone the repo using `git clone https://github.com/ttejas16/chat-app-frontend.git .`  
Run `npm install` to install required dependencies  
Change the `baseURL` to a preferrable one at which the Node server is running  
Start the server  
Run `npm run dev` to start the development server  
View the site at `http://localhost:5173`  

## What I learnt from this?
 - Basics of Socket.io like emitting events, listening to events, concept of rooms, acknowledgements.
 - Synchronizing the socket connections using Effects
 - Deployment basics
 - Sequelize ORM
 - JOINS on tables
 - Handling file uploads (specifically images) using Multer.js and storing them in a bucket