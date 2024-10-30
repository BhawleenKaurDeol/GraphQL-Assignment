// import { gql } from '@apollo/client'

// export const GET_CONTACTS = gql`
//   {
//     contacts {
//       firstName
//       id
//       lastName
//     }
//   }
// `

// export const ADD_CONTACT = gql`
//   mutation AddContact($id: String!, $firstName: String!, $lastName: String!) {
//     addContact(id: $id, firstName: $firstName, lastName: $lastName) {
//       id
//       firstName
//       lastName
//     }
//   }
// `.

// export const REMOVE_CONTACT = gql`
//   mutation RemoveContact($id: String!) {
//     removeContact(id: $id) {
//       id
//       firstName
//       lastName
//     }
//   }
// `

// export const UPDATE_CONTACT = gql`
//   mutation UpdateContact($id: String!, $firstName: String!, $lastName: String!) {
//     addContact(id: $id, firstName: $firstName, lastName: $lastName) {
//       id
//       firstName
//       lastName
//     }
//   }
// `


import { gql } from "@apollo/client";

export const ADD_PERSON = gql`
  mutation InsertPerson($id: String!, $firstName: String!, $lastName: String!) {
    addPerson(id:$id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`;

// export const UPDATE_PERSON = gql`
//   mutation UpdatePerson($id: String!, $firstName: String!, $lastName: String!) {
//     updatePerson(id: $id, firstName: $firstName, lastName: $lastName) {
//       id
//       firstName
//       lastName
//     }
//   }
// `;

export const UPDATE_PERSON = gql`
  mutation updatePerson($id:String!,  $firstName: String!, $lastName: String!) {
    updatePerson( id:$id, firstName: $firstName, lastName: $lastName) {
    id
      firstName
      lastName
    }
  }
`;

export const REMOVE_PERSON = gql`
  mutation removePerson($id: String!) {
    removePerson(id: $id) {
      id
      firstName
      lastName
    }
  }
`;

// export const GET_PERSON_WITH_CARS = gql`
//   query GetPeopleWithCars {
//     peopleWithCars {
//       person {
//         id
//         firstName
//         lastName
//       }
//       cars {
//         id
//         year
//         make
//         model
//         price
//       }
//     }
//   }
// `;



export const GET_PERSON_WITH_CARS = gql`
  query GetPersonWithCars($id: String!)  {
    person(id: $id) {
    id
    firstName
    lastName
    cars {
      id
      year
      make
      model
      price
    }
  }
  }
`;



export const GET_PERSON_ONLY = gql`
  query GetPeople {
    peopleWithCars {
      person {
        id
        firstName
        lastName
      }
    }
  }
`;

export const GET_PEOPLE = gql`
  query {
    People {
    id
      firstName
      lastName
    }
  }
`;

export const GET_CARS = gql`
  query {
    cars {
      id
      year
      make
      model
      price
    }
  }
`;

export const CREATE_CAR = gql`
  mutation InsertCar(
    $id: String!
    $year: String!
    $make: String!
    $model: String!
    $price: String!
    $personId: String!
  ) {
    addCar(
      id: $id
      year: $year
      make: $make
      model: $model
      price: $price
      personId: $personId
    ) {
      id
      year
      make
      model
      price
      personId
    }
  }
`;

export const UPDATE_CAR = gql`
  mutation UpdateCar(
    $id: String!
    $year: String!
    $make: String!
    $model: String!
    $price: String!
    $personId: String!
  ) {
    updateCar(
      id: $id
      year: $year
      make: $make
      model: $model
      price: $price
      personId: $personId
    ) {
      id
      year
      make
      model
      price
      personId
    }
  }
`;

export const DELETE_CAR = gql`
  mutation RemoveCar($id: String!) {
    removeCar(id: $id) {
      id
      year
      make
      model
      price
      personId
    }
  }
`;

// export const GET_USER_WITH_CARS = gql`
//   query GetPersonWithCars($id: String!) {
//     personWithCars(id: $id) {
//       person {
//         id
//         firstName
//         lastName
//       }
//       cars {
//         id
//         year
//         make
//         model
//         price
//       }
//     }
//   }
// `;