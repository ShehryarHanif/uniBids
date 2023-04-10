# uniBids

## Business Need

A common scenario we have observed in university is that when students want to give away second-hand items, others who are interested in the items do not have an instant access to the information. The result is that people are throwing away second-hand items that are wanted by other people. Our solution is a web application for bidding that allows sellers to earn profits on their second-hand items and brings buyers instant information about their interested items.

The deployment of the app would lead to an increase in the demand for second-hand items, which would create a positive impact on the environment. At the end of every academic year, campuses are flooded with second-hand items left behind by seniors who graduate, most of which are useful to the underclassmen but are never in their radar. These items would take resources to dispose of while they could actually be re-used by other students.

## About

uniBids is essentially a bidding web application. The main functionalities are a bidding application between sellers and buyers. Users register and log in to the application to look for items they want to buy or bid items they want to sell.

## Installation

### Clone the repository

```bash
git clone https://github.com/ShehryarHanif/uniBids.git
```

### Installing dependencies

```bash
server user$ cd server && npm install // navigate to server folder install dependencies
client user$ cd client && npm install // navigate to client folder install dependencies
```

### Start the development environment

```bash
uniBids user$ npm run dev // navigate to the root directory and start the development environment
```

## Usage

### Use Cases

The application can support several use cases:

- **Register**: User provides details like name, email, address, and password and submit the form to record their account details into the database
- **Log In**: User provides their log in information and submit the form to be checked and authenticated for permission to enter the web page
- **Search for Products**: User can search for specific listings and is able to customize or filter the results
- **Make Sales Listing**: User can create listing of a new product and add them to database for bidding marketplace
- **Bidding**: User can bid for a product if they desire so they can buy the product if they have the highest bid after the allocated time runs out

## File Structure

### Backend

- **Controllers**: These are functions that resolve requests from the client by working with the database and respond with fulfilled details or errors
- **db**: These are schemas for the important objects that we store in mongodb such as user, payment, item, etc.
- **routes**: This is where we route the HTTP requests to the correct methods: action, authentication, router.

### Frontend

In **/src/App**, the frontend is implemented by using React's framework:

- **APICalls**: One file manages the API for login, so that the website state is different for a logged-in user
- **Components**: Reusable components can be used for the pages, so that the structure is better
- **Context**: Manage global context for the React pages
- **Pages** Individual routes on the website correspond to different routes

## Tools and Technologies used in the project
The project uses a range of full-stack technologies.

### Frontend (Client-side)
The Frontend develops the interface for the application. Here,the user interface and experience of the product are developed using the following tools:
- **React**
- **JavaScript**
- **HTML**
- **CSS**
- **Bootstrap**
- **Material UI**
- **Axios**
- **React Contexts**

### Backend (Server-side)
In the backend, the main logic of the application is implemented. This runs the server side of the program and creates the REST API that helps perform CRUD operations and other program logic. It provides an API for the client-side application to interact with.
- **Node.js**
- **Express.js**
- **Javascript**
- **Bcrypt**
- **Mongoose**
- **Heroku**

### Database
Here are the Data Management and Database technologies that allow us to host and manage the data.
The database services we use are:
- **MongoDB**
- **Mongo Atlas**
- **Mongoose**


## License

[MIT](https://choosealicense.com/licenses/mit/)
