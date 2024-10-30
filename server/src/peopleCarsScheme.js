import find from 'lodash.find'
import remove from 'lodash.remove'

const people = [
  {
    id: '1',
    firstName: 'Bill',
    lastName: 'Gates'
  },
  {
    id: '2',
    firstName: 'Steve',
    lastName: 'Jobs'
  },
  {
    id: '3',
    firstName: 'Linux',
    lastName: 'Torvalds'
  },
  {
    id: '4',
    firstName: 'Bhawleen',
    lastName: 'Deol'
  }
]

const cars = [
  {
    id: '1',
    year: '2019',
    make: 'Toyota',
    model: 'Corolla',
    price: '40000',
    personId: '1'
  },
  {
    id: '2',
    year: '2018',
    make: 'Lexus',
    model: 'LX 600',
    price: '13000',
    personId: '1'
  },
  {
    id: '3',
    year: '2017',
    make: 'Honda',
    model: 'Civic',
    price: '20000',
    personId: '1'
  },
  {
    id: '4',
    year: '2019',
    make: 'Acura ',
    model: 'MDX',
    price: '60000',
    personId: '2'
  },
  {
    id: '5',
    year: '2018',
    make: 'Ford',
    model: 'Focus',
    price: '35000',
    personId: '2'
  },
  {
    id: '6',
    year: '2017',
    make: 'Honda',
    model: 'Pilot',
    price: '45000',
    personId: '2'
  },
  {
    id: '7',
    year: '2019',
    make: 'Volkswagen',
    model: 'Golf',
    price: '40000',
    personId: '3'
  },
  {
    id: '8',
    year: '2018',
    make: 'Kia',
    model: 'Sorento',
    price: '45000',
    personId: '3'
  },
  {
    id: '9',
    year: '2017',
    make: 'Volvo',
    model: 'XC40',
    price: '55000',
    personId: '3'
  }
]


// const typeDefs = `
//   type Person {
//     id: String
//     firstName: String
//     lastName: String
//   }

//   type Query {
//   person(id:String!):Person
//     People: [Person]
//   }
    
//   type Mutation {
//     addPerson(id:String!, firstName: String!, lastName: String!): Person
//     updatePerson(id:String!,firstName: String!, lastName: String!): Person
//     removePerson(id: String!): Person
//   }
// `

const typeDefs = `
  type Car {
    id: String
    year: String
    make: String
    model: String
    price: String
    personId: String
  }

  type Person {
    id: String
    firstName: String
    lastName: String
    cars: [Car]
  }

  type Query {
    person(id: String!): Person
    People: [Person]
     personWithCars(id: String!): Person
  }

  type Mutation {
    addPerson(id: String!, firstName: String!, lastName: String!): Person
    updatePerson(id: String!, firstName: String!, lastName: String!): Person
    removePerson(id: String!): Person
  }
`;


const resolvers = {
  Person: {
    cars: (parent) => cars.filter(car => car.personId === parent.id),
  },

  Query: {
    People: () => people,
    person: (root, { id }) => find(people, { id }),
  },
  Mutation: {
    addPerson: (root, args) => {
      const newPerson = {
        id: args.id,
        firstName: args.firstName,
        lastName: args.lastName
      }

      people.push(newPerson)
      return newPerson
    },
    updatePerson: (root, args) => {
      const person = find(people, {id:args.id})

      if (!person) {
        throw new Error(`Couldn't find person with firstname ${args.firstName} lastName ${args.lastName}`)
      }

      person.firstName = args.firstName
      person.lastName = args.lastName

      return person
    },
    // removePerson: (root, args) => {
    //   const removedPerson = find(people, {firstName: args.firstName, lastName:args.lastName })

    //   if (!removedPerson) {
    //     throw new Error(`Couldn't find person with firstname ${args.firstName} lastName ${args.lastName}`)
    //   }

    //   remove(people, c => {
    //     return (c.firstName === removedPerson.firstName, c.lastName === removedPerson.lastName);
    //   })

    //   return removedPerson
    // }

    removePerson: (root, args) => {
      const removedPerson = find(people, { id: args.id });
   
      if (!removedPerson) {
        throw new Error(`Couldn't find person with id ${args.id}`);
      }
   
      remove(people, (c) => c.id === args.id);
   
      return removedPerson;
   }
   
  }
}

export { typeDefs, resolvers }