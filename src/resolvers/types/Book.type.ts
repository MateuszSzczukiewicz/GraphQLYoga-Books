import { AuthorType } from "./Author.type";
import { CommentType } from "./Comment.type";

export type BookType = {
  id: string;
  title: string;
  authors: AuthorType[];
  comments?: CommentType[];
};
