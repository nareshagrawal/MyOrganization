# INFO-6150

## Backend

### Objective

Create a Nodejs/Express REST API for a Myorganization app

### Technology Stack

- Nodejs
- Express
- JavaScript
- MongoDB

### Prerequisites

- Node.js
- Express
- npm
- MongoDB
- IDE

### Running application locally

- Navigate to server folder

```
$ cd server
$ npm install
```

- For Development enviroment

```
$ npm run watch:dev
```

- For Production enviroment

```
$ npm run watch:prod
```

The application should be running and listening for HTTP requests on port 8081 on localhost.
http://localhost:8081/

### API Endpoints

<table>
    <thead>
      <tr>
        <th>End Points</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
        <tr>
            <td>GET http://localhost:8081/events </td>
            <td>Get all the events </td>
        </tr>
        <tr>
            <td>POST http://localhost:8081/event </td>
            <td>Add new event </td>
        </tr>
         <tr>
            <td>PUT http://localhost:8081/event </td>
            <td>Update an event </td>
        </tr>
         <tr>
            <td>DELETE http://localhost:8081/event </td>
            <td>Delete an event</td>
        </tr>
        <tr>
            <td>GET http://localhost:8081/googleEvents </td>
            <td>Get all the googleEvents </td>
        </tr>
        <tr>
            <td>POST http://localhost:8081/googleEvent </td>
            <td>Add new google event </td>
        </tr>
         <tr>
            <td>PUT http://localhost:8081/googleEvent </td>
            <td>Update  googleEvent </td>
        </tr>
         <tr>
            <td>DELETE http://localhost:8081/googleEvent </td>
            <td>Delete  googleEvent</td>
        </tr>
         <tr>
            <td>GET http://localhost:8081/getUsers </td>
            <td>Get all the users </td>
        </tr>
         <tr>
            <td>GET http://localhost:8081/org </td>
            <td>Get organization detail </td>
        </tr>
         <tr>
            <td>GET http://localhost:8081/mymessages </td>
            <td>Get messages </td>
        </tr>
         <tr>
            <td>GET/PUT/POST http://localhost:8081/mymessages </td>
            <td>Get/update/add messages </td>
        </tr>
    </tbody>
</table>
