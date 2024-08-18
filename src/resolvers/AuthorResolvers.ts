import { AuthorType } from "./types/Author.type";
import { ContextType } from "./types/Context.type";
import { v4 as uuidv4 } from "uuid";

type RootAuthorResolverType = {
  getAuthor: (
    parent: unknown,
    args: { id: string },
    context: ContextType
  ) => AuthorType;
};

type RootMutationResolverType = {
  addAuthor: (
    parent: unknown,
    args: { author: { firstName: string; lastName: string } },
    context: ContextType
  ) => AuthorType;
};

export const RootAuthorResolver: NonNullable<RootAuthorResolverType> = {
  getAuthor: (_, { id }, { db }) => {
    return db.authors.find((author) => author.id === id);
  },
};

export const RootMutationAuthorResolver: NonNullable<RootMutationResolverType> =
  {
    addAuthor: (_, { author }, { db }) => {
      const id = uuidv4();

      const authorDb = {
        id,
        firstName: author.firstName,
        lastName: author.lastName,
      };

      db.authors.push(authorDb);

      return authorDb;
    },
  };
