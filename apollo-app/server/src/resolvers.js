import fetch from 'node-fetch';

export const resolvers = {
  Query: {
    message() {
      return "Welcome to React and GraphQL with Apollo";
    },
    age() {
      return 34;
    },
    price() {
      return 9.99;
    },
    nums() {
      return [1,2,3,4,5];
    },
    async color(_, args) {
      const colorId = encodeURIComponent(args.colorId);
      const res = await fetch(`http://localhost:5050/colors/${colorId}`);
      return await res.json();
    },
    async colors() {
      const res = await fetch("http://localhost:5050/colors");
      return await res.json();
    },
    async cars(_, { make }) {
      
      let url = "http://localhost:5050/cars";

      if (make) {
        const makeParam = encodeURIComponent(make);
        url = `${url}?make=${makeParam}`;
      }

      const res = await fetch(url);
      return await res.json();
    },
    async books() {
      const res = await fetch("http://localhost:5050/books");
      return await res.json();
    },    
  },
  Mutation: {
    async appendColor(_, { color }, { restUrl }) {

      const res = await fetch(`${restUrl}/colors`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(color),
      });

      return await res.json();
    },
  },
  Car: {
    formattedPrice(car, args) {
      console.log(args);
      return car.price + " " + args.currencyCode;
    }
  },
  Color: {
    // default resolver for all fields
    // id(color) {
    //   return color.id;
    // },

    hexcode(color) {
      return color.hexcode.toUpperCase();
    }
  }
};
