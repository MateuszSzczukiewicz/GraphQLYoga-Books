import { AuthorType } from "./types/Author.type";
import { BookType } from "./types/Book.type";
import { CommentType } from "./types/Comment.type";
import { ContextType } from "./types/Context.type";

type RootBookResolverType = {
  getBooks: (
    parent: unknown,
    args: { first: number; offset: number },
    context: ContextType
  ) => BookType[];
  getBook: (
    parent: unknown,
    args: { id: string },
    context: ContextType
  ) => BookType;
};

type BookResolverType = {
  authors: (
    parent: { authors: AuthorType["id"] },
    args: unknown,
    context: ContextType
  ) => AuthorType[];
  comments: (
    parent: BookType,
    args: { filterByApproved: boolean },
    context: ContextType
  ) => CommentType[];
};

export const RootBookResolvers: NonNullable<RootBookResolverType> = {
  getBooks: (_, { first, offset }, { db }) => {
    return db.books.slice(offset, first + offset);
  },
  getBook: (_, { id }, { db }) => {
    return db.books.find((book: BookType) => book.id === id);
  },
};

export const Book: NonNullable<BookResolverType> = {
  authors: ({ authors }, _, { db }) => {
    return db.authors.filter((author: AuthorType) =>
      authors.includes(author.id)
    );
  },
  comments: ({ id }, { filterByApproved }, { db }) => {
    return db.comments.filter((comment: CommentType) => {
      const basicFilter = (comment: CommentType) => comment.bookId === id;

      if (!filterByApproved) {
        return basicFilter(comment);
      } else {
        return basicFilter && comment.approved;
      }
    });
  },
};
