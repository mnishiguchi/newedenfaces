# New eden faces

In this repo, I learn React, Node.js, MongoDB and Socket.IO, following the tutorial "[
Create a character voting app using React, Node.js, MongoDB and Socket.IO](http://sahatyalkabov.com/create-a-character-voting-app-using-react-nodejs-mongodb-and-socketio/#overview)" by Sahat Yalkabov.

[Source code](https://github.com/sahat/newedenfaces-react)


## Get started

Build the app, concatenate vendor files, compile LESS stylesheets and watch for file changes.

```
gulp
```

Start the Node.js server and automatically restart the process on file changes.

```
npm run watch
```

Visit [http://localhost:3000](http://localhost:3000)


## Dependencies

- alt
  + Flux library for React.
- async   
  + For managing asynchronous flow.
- body-parser
  + For parsing POST request data.
- colors  
  + Pretty console output messages.
- compression
  + Gzip compression.
- express
  + Web framework for Node.js.
- history
  + Manage session history in browsers, used by react-router.
- mongoose    
  + MongoDB ODM with validation and schema support.
- morgan  
  + HTTP request logger.
- react   
  + React.
- react-dom   
  + React rendering, it is no longer bundled with React.
- react-router   
  + Routing library for React.
- request
  + For making HTTP requests to EVE Online API.
- serve-favicon   
  + For serving favicon.png icon.
- socket.io   
  + To display how many users are online in real-time.
- swig    
  + To render the initial HTML template.
- underscore  
  + Helper JavaScript utilities.
- xml2js  
  + For parsing XML response from EVE Online API.


## 'view/index.html'

- Client-side
  + A rendered HTML markup is inserted into `<div id="app"></div>`
- Server-side
  + A rendered HTML markup is sent to the `index.html` template where
it is inserted into `<div id="app">{{ html|safe }}</div>` by the
Swig template engine.

## Notification

- Notification can be one of the few areas that should not be handled by React (along with tooltips)
- It is far easier to display a notification imperatively from any part of our application than having to declaratively render notification component based on the current state.
