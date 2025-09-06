import { IUser } from './IApiTypes';

export interface IBlog {
  _id: string;
  title: string;
  slug: string;
  content: string;
  authorId: string;
  author?: IUser;
  tags: string[];
  coverImage?: string;
  likesCount: number;
  commentsCount: number;
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

export interface IBlogResponse {
  success: boolean;
  message: string;
  data: IBlog;
}

export interface IBlogsResponse {
  success: boolean;
  message: string;
  data: {
    blogs: IBlog[];
    total: number;
    page: number;
    limit: number;
  };
}

export interface IComment {
  _id: string;
  blogId: string;
  userId: {
    _id: string;
    email: string;
    name: string;
  };
  user?: IUser;
  parentCommentId?: string | null;
  content: string;
  likesCount: number;
  isEdited: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICommentsResponse {
  success: boolean;
  message: string;
  data: {
    comments: IComment[];
    total: number;
    page: number;
    limit: number;
  };
}

export interface ICommentResponse {
  success: boolean;
  message: string;
  data: IComment;
}

export interface ILike {
  _id: string;
  userId: string;
  entityType: 'blog' | 'comment';
  entityId: string;
  createdAt: string;
}

export interface ILikeResponse {
  success: boolean;
  message: string;
  data: {
    liked: boolean;
    likesCount: number;
  };
}

export interface ILikeStatusResponse {
  success: boolean;
  message: string;
  data: {
    liked: boolean;
  };
}