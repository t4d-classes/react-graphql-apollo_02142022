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
