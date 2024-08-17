import { BookType } from "./types/Book.type";
import { CommentType } from "./types/Comment.type";
import { ContextType } from "./types/Context.type";

type RootCommentResolverType = {
  getComments: (parent: BookType, context: ContextType) => CommentType[];
};

export const RootCommentResolvers: NonNullable<RootCommentResolverType> = {
  getComments: (_, { db }) => {
    return db.comments;
  },
};
