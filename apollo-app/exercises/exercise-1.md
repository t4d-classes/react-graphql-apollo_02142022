# Exercise 1

1. Create an object type for a car (look in the `db.json` file to see the definiton of a car). For the numeric fields, use Int and Float as the type as appropriate.

2. Implement a resolver for cars to return all cars from the REST API.

3. Write a GraphQL query in the GraphQL Client to query all of the cars. For each car, query the make and price.

4. Implement a resolver to query all cars by make. Add some additional cars to the `db.json` file so multiple cars will have the same make value. Be sure to stop the server and start it again so the updated `db.json` file is re-read. For documentation on how to query the REST api for a specific field review the documentation here: [https://github.com/typicode/json-server](https://github.com/typicode/json-server).

5. Write a GraphQL query in the GraphQL Client to query cars by make. For each car, query the model and price.

6. Ensure it works!