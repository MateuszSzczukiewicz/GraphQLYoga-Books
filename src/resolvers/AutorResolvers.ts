import { AuthorType } from "./types/Author.type";
import { ContextType } from "./types/Context.type";

type RootAuthorResolverType = {
  getAuthor: (
    parent: { authors: AuthorType["id"] },
    args: { id: string },
    context: ContextType
  ) => AuthorType[];
};

export const RootAuthorResolver: NonNullable<RootAuthorResolverType> = {
  getAuthor: ({ authors }, { id }, { db }) => {
    return db.authors.filter((author: AuthorType) =>
      authors.includes(author.id)
    );
  },
};
