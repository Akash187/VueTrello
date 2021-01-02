# Vue Trello
---
A simple trello clone using Vue.js as Frontend Framework and Firebase as a backend.

## Features and Tools Used:

1. Vue.js as Front-End Framework
2. Vuex for state management
3. bootstrap-vue for styling
4. Firebase as backend
5. vue-smooth-dnd
6. Vue Router


## How to Load the App

You can run a hosted version of the app at [https://vuetrello.netlify.com/](https://vuetrello.netlify.com/)

The project uses Node.js and the vue cli 3. If you do not have Node >= 6.x installed, you can download it here: [Node.js](https://nodejs.org/en/)

Once Node is installed, navigate to the directory where you want to store the app

```
git clone https://github.com/Akash187/VueTrello.git
yarn install
```

Create a Firebase App and put the keys and secret in a .env file in the root of project. See the example below.
```
REACT_APP_FIREBASE_API_KEY=AIzaSyBjuzodfdsjkKDFfkdk2oJYUX9dEaU
REACT_APP_FIREBASE_AUTH_DOMAIN=client-panel-12e45.firebaseapp.com
REACT_APP_FIREBASE_DATABASE_URL=https://client-panel-12e45.firebaseio.com
REACT_APP_FIREBASE_PROJECT_ID=client-panel-12e45
REACT_APP_FIREBASE_STORAGE_BUCKET=client-panel-12e45.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=2412e4546937
```

After setting up .env file you can run project by below command

```
yarn serve
```

A new browser window should automatically open displaying the app. If it doesn't, navigate to [http://localhost:8080/](http://localhost:8080/) in your browser# vue-cinema


### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
