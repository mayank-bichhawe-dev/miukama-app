# Node.js, Express and MongoDB Project Structure

This is a basic project structure to help you to start building your own RESTful web APIs (for Android, IOS, or JavaScript framworks) using Express framework and MongoDB with a good structure practices based on clean MVC Architecture.

# Features

- Fundamental of Express: routing, middleware, sending response and more
- Fundamental of Mongoose: Data models, data validation and middleware
- RESTful API including pagination,sorting and limiting fields
- CRUD operations with MongoDB
- Security: encyption, sanitization and more
- Authentication with JWT : login and signup
- Authorization (User roles and permissions)
- Error handling
- Enviroment Varaibles
- handling error outside Express
- Catching Uncaught Exception

# Project Structure

- server.js : Responsible for connecting the MongoDB and starting the server.
- app.js : Configure everything that has to do with Express application.
- config.env: for Enviroment Varaiables
- routes -> userRoutes.js: The goal of the route is to guide the request to the correct handler function which will be in one of the controllers
- controllers -> userController.js: Handle the application request, interact with models and send back the response to the client
- models -> userModel.js: (Business logic) related to business rules, how the business works and business needs ( Creating new user in the database, checking if the user password is correct, validating user input data)

Ec2-links-
https://devopscube.com/install-configure-postgresql-amazon-linux/
http://howto.philippkeller.com/2022/05/03/How-to-install-postgres-on-amazon-linux-2/

https://phoenixnap.com/kb/how-to-connect-postgresql-database-command-line
scp -i ./miukama-api/miukama-pem.pem miukama-api.zip ec2-user@ec2-65-2-80-171.ap-south-1.compute.amazonaws.com:~/.

ssh -i ./miukama-pem.pem ec2-user@ec2-65-2-80-171.ap-south-1.compute.amazonaws.com
