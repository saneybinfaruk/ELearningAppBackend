export const typeDefs = `#graphql

type Course {
    id: Int!
    courseType: String!
    courseName: String!
    instructorName: String!
    rating: Float!
    price: Float!
    description: String!
    imageUrl: String!
    courseDuration: String!
    discountAmount: String!
    skills: [String!]!
    lessons: [Lesson!]!
    reviews: [Review!]!
  }
 
 # Define Lesson type
  type Lesson {
    id: Int!
    question: String!
    answer: String!
    course: Course
  }

  # Define Review type
  type Review {
    id: Int!
    userName: String!
    userOccupation: String!
    review: String!
    rating: Float!
    courseId: Int!
  }

  # Define Queries
  type Query {
    courseTypes: [String!]!
    courses: [Course!]!
    course(id: Int!): Course
    coursesByType(courseType: String!): [Course!]!
    skills: [String!]!
  }

 
 

`;
