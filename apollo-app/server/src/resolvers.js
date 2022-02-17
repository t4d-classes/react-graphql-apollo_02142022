import fetch from 'node-fetch';
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();

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
    async flights(_, { offset, limit }, { airlineRestUrl }) {
      const page = (!offset || !limit) ? 1 : Math.floor(offset / limit) + 1;
      const res = await fetch(
        `${airlineRestUrl}/flights?_page=${page}&_limit=${limit ?? 10}`);
      const flightResults = await res.json();
      return flightResults.map(flight => ({
        id: flight.flNum + "-" + flight.origin + "-" + flight.dest,
        tailNum: flight.tailNum,
        origin: flight.origin,
        destination: flight.dest,
        departureTime: flight.depTime,
        arrivalTime: flight.arrTime,
      }));
    }       
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
    async appendCar(_, { car }, { restUrl }) {

      // throw new Error("something went wrong...");

      const res = await fetch(`${restUrl}/cars`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(car),
      });

      const appendedCar = await res.json();

      pubsub.publish('CAR_APPENDED', {
        carAppended: appendedCar,
      });

      return appendedCar;
    },
    async replaceCar(_, { car }, { restUrl }) {

      const carId = encodeURIComponent(car.id);

      await fetch(`${restUrl}/cars/${carId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(car),
      });

      const res = await fetch(`${restUrl}/cars/${carId}`);

      return await res.json();
    },
    async removeCar(_, { carId }, { restUrl }) {

      const encodedCarId = encodeURIComponent(carId);
      const elementUrl = `${restUrl}/cars/${encodedCarId}`;

      const res = await fetch(elementUrl);
      const deletedCar = await res.json();

      await fetch(elementUrl, {
        method: 'DELETE',
      });

      return deletedCar;
    },
  },
  Subscription: {
    carAppended: {
      subscribe: () => {
        return pubsub.asyncIterator(['CAR_APPENDED'])
      },
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
