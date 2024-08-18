import { BookType } from "./types/Book.type";
import { CommentType } from "./types/Comment.type";
import { ContextType } from "./types/Context.type";
import { v4 as uuidv4 } from "uuid";

type RootCommentResolverType = {
  getComments: (parent: BookType, context: ContextType) => CommentType[];
};

type RootMutationCommentResolverType = {
  addComment: (
    parent: unknown,
    args: {
      commentInput: { bookId: string; content: string; approved: boolean };
    },
    context: ContextType
  ) => CommentType;
  updateComment: (
    parent: unknown,
    args: {
      id: string;
      commentInput: { bookId: string; content: string; approved: boolean };
    },
    context: ContextType
  ) => CommentType;
};

export const RootCommentResolvers: NonNullable<RootCommentResolverType> = {
  getComments: (_, { db }) => {
    return db.comments;
  },
};

export const RootMutationCommentResolver: NonNullable<RootMutationCommentResolverType> =
  {
    addComment: (_, { commentInput }, { db }) => {
      const id = uuidv4();

      const newComment = {
        id,
        ...commentInput,
      };

      db.comments.push(newComment);

      return newComment;
    },
    updateComment: (_, { id, commentInput }, { db }) => {
      const commentIndex = db.comments.findIndex(
        (comment) => comment.id === id
      );
      const existingComment = db.comments[commentIndex];

      const updatedComment = {
        ...existingComment,
        ...commentInput,
      };

      db.comments[commentIndex] = updatedComment;

      return updatedComment;
    },
  };
