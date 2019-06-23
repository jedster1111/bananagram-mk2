# Bananagram-frontend

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Docker

The production version of the frontend should be served using an NGINX server. The dockerfile can be found [in this Dockerfile](./Dockerfile).<br>
It uses [multi-stage builds](https://docs.docker.com/develop/develop-images/multistage-build/) in order to only keep the necessary static files in the resulting Docker image.<br>

In order to create and run the containerised version of the frontend, from the `bananagram-frontend` directory run:

### `docker build -t bananagram-frontend .`

Creates the image.

### `docker run --rm -d --name bananagram_frontend -p 80:80/tcp bananagram-frontend:latest`

Creates and runs a container based on the image.

### `docker stop bananagram_frontend`

Stops and removes (as long as you ran it with the `--rm` flag) the container with the specified name.<br>
Can use `docker ps` to find the id of the container to remove.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
