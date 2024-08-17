import { AuthorType } from "./Author.type";
import { BookType } from "./Book.type";
import { CommentType } from "./Comment.type";

export type ContextType = {
  db: {
    books: BookType[];
    comments: CommentType[];
    authors: AuthorType[];
  };
};
