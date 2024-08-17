import { createServer } from "node:http";
import { createSchema, createYoga } from "graphql-yoga";
import db from "./db";
import { Book, RootBookResolvers } from "./src/resolvers/BookResolvers";
import gql from "graphql-tag";
import { RootAuthorResolver } from "./src/resolvers/AutorResolvers";
import { RootCommentResolvers } from "./src/resolvers/CommentResolvers";

const typeDefs = gql`
  type Query {
    getBooks(first: Int! = 10, offset: Int! = 0): [Book!]!
    getAuthor(id: ID!): Author
    getBook(id: ID!): Book
    getComments: [Comment!]!
  }

  type Book {
    id: ID!
    title: String!
    authors: [Author!]!
    comments(filterByApproved: Boolean = false): [Comment!]!
  }

  type Author {
    id: ID!
    firstName: String!
    lastName: String!
  }

  type Comment {
    id: ID!
    content: String!
    bookId: ID!
    approved: Boolean
  }
`;

const resolvers = {
  Query: {
    ...RootBookResolvers,
    ...RootAuthorResolver,
    ...RootCommentResolvers,
  },
  Book,
};

const yoga = createYoga({
  schema: createSchema({ typeDefs, resolvers }),
  context() {
    return { db } as any;
  },
});

const server = createServer(yoga);

server.listen(4000, () => {
  console.info("Server is running on http://localhost:4000/graphql");
});
