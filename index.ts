import { createServer } from "node:http";
import { createSchema, createYoga } from "graphql-yoga";
import db from "./db";
import {
  Book,
  RootBookResolvers,
  RootMutationBookResolver,
} from "./src/resolvers/BookResolvers";
import gql from "graphql-tag";
import {
  RootAuthorResolver,
  RootMutationAuthorResolver,
} from "./src/resolvers/AuthorResolvers";
import {
  RootCommentResolvers,
  RootMutationCommentResolver,
} from "./src/resolvers/CommentResolvers";

const typeDefs = gql`
  type Query {
    getBooks(first: Int! = 10, offset: Int! = 0): [Book!]!
    getAuthor(id: ID!): Author
    getBook(id: ID!): Book
    getComments: [Comment!]!
  }

  type Mutation {
    addAuthor(author: AuthorInput!): Author
    addBook(bookInput: BookInput!): Book
    addComment(commentInput: CommentInput): Comment
    updateComment(id: ID!, commentInput: CommentInput): Comment
  }

  input CommentInput {
    bookId: ID
    content: String!
    approved: Boolean = false
  }

  input BookInput {
    title: String!
    authors: AuthorConnectionInput!
  }

  input AuthorConnectionInput {
    create: AuthorInput!
    connect: AuthorConnectInput!
  }

  input AuthorConnectInput {
    ids: [String!]!
  }

  input AuthorInput {
    firstName: String!
    lastName: String!
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
  Mutation: {
    ...RootMutationAuthorResolver,
    ...RootMutationBookResolver,
    ...RootMutationCommentResolver,
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
