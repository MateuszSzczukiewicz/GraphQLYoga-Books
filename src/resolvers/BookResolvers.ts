import { AuthorType } from "./types/Author.type";
import { v4 as uuidv4 } from "uuid";
import { BookType } from "./types/Book.type";
import { CommentType } from "./types/Comment.type";
import { ContextType } from "./types/Context.type";
import {
  RootAuthorResolver,
  RootMutationAuthorResolver,
} from "./AuthorResolvers";

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

type RootMutationBookResolverType = {
  addBook: (
    parent: unknown,
    args: {
      bookInput: {
        title: string;
        authors: {
          connect: { ids: string[] } | null;
          create: { firstName: string; lastName: string } | null;
        };
      };
    },
    context: ContextType
  ) => BookType;
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

export const RootMutationBookResolver: NonNullable<RootMutationBookResolverType> =
  {
    addBook: (_, { bookInput }, { db }) => {
      const id = uuidv4();
      const { title, authors } = bookInput;

      let resolvedAuthors = [];

      if (authors.connect && authors.connect.ids.length) {
        resolvedAuthors = authors.connect.ids.map((id) => {
          const author = RootAuthorResolver.getAuthor(null, { id }, { db });
          return author && author.id;
        });
      }

      if (authors.create) {
        const addedAuthor = RootMutationAuthorResolver.addAuthor(
          null,
          { author: authors.create },
          { db }
        );
        resolvedAuthors = [addedAuthor.id];
      }

      const book: BookType = {
        id,
        title,
        authors: [],
      };

      db.books.push(book);

      return book;
    },
  };
