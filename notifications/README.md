# Notifications API demo

1. Enter frontend dir and run `yarn start` to start the React app
2. Enter backend and run `node index.js` to start the node server

http://localhost:3000 should now be available and should show 4 buttons to work with notifications

http://localhost:4000 should now show 'Hello world' indicating that the node server is working

See https://medium.com/izettle-engineering/beginners-guide-to-web-push-notifications-using-service-workers-cb3474a17679 for detailed implementation explanations

## To reset the project

1. Remove localhost:3000 from list of allowed notification domains
2. Kill all serviceWorkers in frontend app through inspector

Contact me through twitter or email with any questions!
