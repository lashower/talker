# talker
Simple NodeJS and Mongo based chat client.

## Authentication
It utilizes passport for all of the user setup, but utilizes local mongo db instance.

## Mongo version
This was tested with mongoDB version 2.4.14. That is the latest available for a 32-bit Raspberry Pi.


## How to install
git clone https://github.com/lashower/talker.git
npm install
node server.js

## How do messages work?
This utilzes web sockets for cross communications. Mostly handled through the express-ws node module, but my internal hooks are located in app/websocket.js
