# Forza_Favorites

This app will allow users to search the forza api for pictures of cars and save their favorites to a list.  They will be able to write comments on their favorite cars.

# Link

https://forza-favorites.herokuapp.com/

# Installation instructions

+ Fork and clone this repository
+ you will need a .env file to store your API_KEY and your ENC_KEY
+ this app uses the forza api
+ you will need to use nodemon to consistently restart your app
+ npm i to install dependencies

# Wireframes

![wireframe](./images/home.png)
![wireframe](./images/cars.png)
![wireframe](./images/favorites.png)

# RESTful routes

![table](./images/table.png)

# Erd

![erd](./images/e.png)

# Mvp

+ user should be able to sign up and login
+ user should be able to view list of randomly generated cars
+ user should be able to add a car to their favorites list
+ user should be able to comment on their favorites
+ user should be able to delete car from favorites

# Stretch goals

+ style site
+ user can comment on cars that are not on their list

# Technologies used

This app was built using Express to handle routes, SQL for the database and EJS.  Async functions are used in the routes.  The app was styled using basic CSS.

# Approach

I wanted the user to enjoy browsing for new cars, so adding functionality that would allow them to press a button and view a fresh batch of randomly generated cars was an important step.  The plan for the routes was to keep everything as streamlined as possible, one user can have many favorites and each favorite can have one comment.  Once the database was set up, I began building out the routes so that a user could add an account, chooose some favorites and comment on why they like them.

# Post project

Building this app was a great learning experience.  I found that solvinf problems with my routes was slow going.. Some of the time problems took hours and days to solve rather than minutes.  This project really helped strengthen my understanding of the relationship between a database and the routes it needs to communicate.

# Sources

I used the mdn documentation for Express
