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

GETting Owners by Id

Build the following endpoint:
GET /owners/:id

Considerations:

    responds with the relevant owner's data

GETting Owners

Build the following endpoint:
GET /owners

Considerations:

    responds with an array containing the data of every owner (hint: you will need to use fs.readdir to read all of the file names in the owners folder)
