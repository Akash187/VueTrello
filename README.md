# Vue Trello
---
A simple trello clone using Vue.js as Frontend Framework and Firebase as a backend.

## Features and Tools Used:

1. Vue.js as Front-End Framework
2. Vuex for state management
3. SCSS for styling
4. Responsive UI
4. Animation
5. Local Storage for storing Favourites
6. vue-carousel
7. vue-youtube
9. vue-js-modal


## How to Load the App

You can run a hosted version of the app at [https://vuemovies.netlify.com/](https://vuemovies.netlify.com/)

The project uses Node.js and the vue cli 3. If you do not have Node >= 6.x installed, you can download it here: [Node.js](https://nodejs.org/en/)

Once Node is installed, navigate to the directory where you want to store the app

```
git clone https://github.com/Akash187/vue-cinema.git
yarn install
```

Once all of the dependencies have been installed you have to create a .env file in root of folder and store API key that you have to get from [TheMovieDB API](https://www.themoviedb.org) 

```
VUE_APP_API_KEY=00a92b6389f4uhgr45d35d33c3b1c282
```

After setting up .env file you can run project by below command

```
yarn serve
```

A new browser window should automatically open displaying the app. If it doesn't, navigate to [http://localhost:8080/](http://localhost:8080/) in your browser# vue-cinema

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).