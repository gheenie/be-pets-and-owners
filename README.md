# Pets and Owners

To get your tasks head to: 
https://l2c.northcoders.com/courses/be

If you are pairing you will need to share your user ids with your partner (dont forget to confirm that you are paired)



Pets and Owners

​ Express.js is a web application framework for Node.js. It is designed for building web applications and APIs. ​ nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected. ​ Remember to npm init before installing these two packages, and to setup your .gitignore file so that you don't commit your node_modules! ​
Tools

​

    Insomnia to preview your requests ​

Objectives

​

    Learn how to get a simple web server up and running using express
    Learn handling simple GET requests on your server
    Learn to read queries from the request your sever receives
    Learn to use the body of POST/PATCH requests ​

Intro

​ This sprint will help you get used to express as well as recap over the use of the file system module. ​
Tasks

​ Now you will need to create a new express server, In this sprint, we are going to create a fully functioning server that can handle the following requests: ​

    GET
    POST
    PATCH
    DELETE ​ All of these routes should start with /api/ as we are creating an API. Make them restful! ​ Remember to use nodemon so that you do not have to keep manually restarting your express server! Once nodemon is installed, add a script to your package.json to make use of it. ​

"scripts": {
   "dev": "nodemon app.js"
}

​ To start your server, instead of running directly with node (node app.js) use your dev script npm run dev. ​



Task 1
GETting Owners by Id

Build the following endpoint:
GET /owners/:id

Considerations:

    responds with the relevant owner's data



Task 2
GETting Owners

Build the following endpoint:
GET /owners

Considerations:

    responds with an array containing the data of every owner (hint: you will need to use fs.readdir to read all of the file names in the owners folder)



Task 3
GETting the Pets for an owner

Build the following endpoint:
GET /owners/:id/pets

Considerations:

    responds with an array containing the data of all pets belonging to the relevant owner



Task 4
GETting the Pets

Build the following endpoint:
GET /pets

Considerations:

    responds with an array containing all of the pets' data.
    This endpoint should accept a query of temperament so that users can filter pets by their temperament, e.g. GET /api/pets?temperament=grumpy responds with an array containing all the pets with a temperament of grumpy



Task 5
GETting a single Pet

Build the following endpoint:
GET /pets/:id

Considerations:

    responds with the data of the relevant pet



Task 6
PATCHing an Owner

This is the first time you will need to process the request body... don't forget to use express.json() to access the request body!

In the next set of tasks you will have to think about what an appropriate url should be for this endpoint

Build the following endpoint:
PATCH

Considerations:​

    Update an owners name and age
    What does a request need
    What should a response look like



Task 7
POSTing a new owner

Build the following endpoint:
POST: add an owner

Considerations:

    Must be the same format as the existing data (contain the same information), you should check the other owner files for this.
    Use a timestamp for the id (Date.now() might be useful), affixed with the relevant letter, "o" to avoid overwriting an existing file



Task 8
POSTing a pet to an owner

Build the following endpoint:
POST: add a pet to an owner - /owners/:id/pets

Considerations:

    An owner must exist to be able to post a pet to them
    Data must be the same format as the existing data (contain the same information), you should check the other pet files for this.
    Use a timestamp for the id (Date.now() might be useful), affixed with the relevant letter, "p" to avoid overwriting an existing file



Task 9
DELETEing Pets

Build the following endpoint:
DELETE: remove a pet from the data

Considerations:

    Which pet should be removed?
    What should a response look like?



Task 10
DELETEing an owner

Build the following endpoint:
DELETE: remove an owner

Considerations:

    you should also remove any of their pets



Task 11
Creating a log

Take some time to read the documents and then work on the functionality
Build some logging middleware

Take some time to read about application middleware

Create log.txt file in the root directory and a logger middleware function that writes the following to the bottom of the log file:

    request method
    requested url
    time of the request



Task 12
Error handling

Read about Error Handling.
Add some error handling

Add some error handling to your routes. Think about how the user could make a bad request to your endpoints and respond with an appropriate status code.

Considerations:

    Think about where you get input from the users and how this could lead to problems



Task 13
New Features

Lets add some more complexity to some of the things you have already done.
Amendments to the all pets endpoint

Update the all pets endpoint (task 4) and allow it to accept the following queries

    sort_by - user can choose to order the pets by:
        id - should default to this when no query is given.
        age
        name
    order - can accept asc or desc (defaults to asc when the query isn't given.)
    max_age - user can choose to only bring pets younger than passed query
    min_age - user can choose to only bring pets older than passed query
    search - user can pass a searchTerm that will filter pets to only include those who have the searchTerm in any of their properties



Task 14
Views

Now its time to add some views to your application
Templating Engines

Add some views to your application to present your data in a more user friendly format. The express docs have a guide on templating engines which is a nice place to start. Do some research into the available options and think about the different endpoints you have available.
