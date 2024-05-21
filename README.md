# Kpop Capstone Project 2
Project Title: Kpop Explorer
URL: https://kpopexplorer-jhanna.surge.sh/

# Description
The Kpop Fan Site is a web application dedicated to fans of Kpop music. It allows users to explore various Kpop artists and group profiles with detailed information about them. Users can also create an account that will provide them with a profile that shows the user's favorite groups, members, and songs. Users can update this profile to their current favorites as long as they are logged in. The site also has a videos section allowing users to search for a video they want to see. If the video is not in the database the user can add it by filling out the form and providing a YouTube link to the music video. Users can also do this with the idol section of the website. The site aims to create an engaging and interactive experience for Kpop enthusiasts.

# Features
Individual Idol Profiles: Users can view detailed profiles of various Kpop artists.
Group Profiles Profiles: Users can view detailed profiles of various Kpop groups.
User Authentication: Secure login and registration for users to personalize their experience and profile, authentication also allows a user to delete their profile if they want.
Search Functionality: A powerful search feature that allows users to quickly find their favorite idols, groups or music videos.
Responsive Design: The site is fully responsive, ensuring a seamless experience on both desktop and mobile devices.
Reason for Feature Selection
These features were chosen to provide a comprehensive and engaging experience for users. By offering detailed idols and group profiles, user authentication, and the ability to search videos the site ensures that fans have access to a wealth of information and can personalize their interaction with the site.

# User Flow
Landing Page: Users arrive at the landing page, which features a welcome message and lets users know they can explore the site.
Explore Artists: Users can navigate to the idols section to browse and search for their favorite Kpop idols. If the Idol is not there they can fill out a form and add the idol to the database. 
View Idol Profile: Upon selecting an artist, users are taken to a profile page with information about the individual Idol, more features to be added later, like social media links, song names, etc...
Authentication: Users can register for an account or log in to access a personalized profile that shows their information. Users are also allowed to update and change this information as long as they are logged in.
Videos: Users can search for their favorite Kpop videos and use the links to go to YouTube to see them. Adding the videos to the site will also be added later so the user stays on our site and isn't redirected to another site.
Video Add: If a user searches for a video and it isn't there they are allowed to add that video by filling out a form and adding the video to the database. 
Groups: Users can also search for their favorite groups and view a profile of them. An "add group" form will be added in later implementations so that a user can add a group that may not be in the database.

# Database
All information that would become my seed file for my PSQL DB came from - https://www.kaggle.com/datasets/kimjihoo/kpopdb

# Technology Stack
Frontend: React, Redux, JavaScript, HTML, CSS
Backend: Node.js, Express.js, PostgreSQL
Testing: Jest, React Testing Library
Deployment: ElephantSQL for the DB, Render for the backend, Surge for the Frontend

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
