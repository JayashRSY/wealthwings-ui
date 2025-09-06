import axiosInstance from "@/lib/api/axiosInstance";
import { IBlogResponse, IBlogsResponse, ICommentResponse, ICommentsResponse, ILikeResponse, ILikeStatusResponse } from "@/interfaces/IBlogTypes";

// Blog APIs
export const getBlogs = async (params?: { page?: number; limit?: number; tag?: string; status?: string }) => {
  const response = await axiosInstance.get<IBlogsResponse>('/blogs', { params });
  return response.data;
};

export const getBlogById = async (id: string) => {
  const response = await axiosInstance.get<IBlogResponse>(`/blogs/${id}`);
  return response.data;
};

export const getBlogBySlug = async (slug: string) => {
  const response = await axiosInstance.get<IBlogResponse>(`/blogs/slug/${slug}`);
  return response.data;
};

export const getUserBlogs = async (params?: { page?: number; limit?: number; status?: string }) => {
  const response = await axiosInstance.get<IBlogsResponse>('/blogs/user/me', { params });
  return response.data;
};

export const createBlog = async (blog: { title: string; content: string; tags?: string[]; coverImage?: string; status?: 'draft' | 'published' }) => {
  const response = await axiosInstance.post<IBlogResponse>('/blogs', blog);
  return response.data;
};

export const updateBlog = async (id: string, blog: { title?: string; content?: string; tags?: string[]; coverImage?: string }) => {
  const response = await axiosInstance.put<IBlogResponse>(`/blogs/${id}`, blog);
  return response.data;
};

export const deleteBlog = async (id: string) => {
  const response = await axiosInstance.delete<{ success: boolean; message: string }>(`/blogs/${id}`);
  return response.data;
};

export const toggleBlogStatus = async (id: string, status: 'draft' | 'published') => {
  const response = await axiosInstance.patch<IBlogResponse>(`/blogs/${id}/status`, { status });
  return response.data;
};

export const likeBlog = async (id: string) => {
  const response = await axiosInstance.post<ILikeResponse>(`/blogs/${id}/like`);
  return response.data;
};

// Comment APIs
export const getCommentsByBlog = async (blogId: string, params?: { page?: number; limit?: number }) => {
  const response = await axiosInstance.get<ICommentsResponse>(`/comments/blog/${blogId}`, { params });
  return response.data;
};

export const createComment = async (comment: { blogId: string; content: string; parentCommentId?: string }) => {
  const response = await axiosInstance.post<ICommentResponse>('/comments', comment);
  return response.data;
};

export const updateComment = async (id: string, content: string) => {
  const response = await axiosInstance.put<ICommentResponse>(`/comments/${id}`, { content });
  return response.data;
};

export const deleteComment = async (id: string) => {
  const response = await axiosInstance.delete<{ success: boolean; message: string }>(`/comments/${id}`);
  return response.data;
};

// Like APIs
export const toggleLike = async (data: { entityType: 'blog' | 'comment'; entityId: string }) => {
  const response = await axiosInstance.post<ILikeResponse>('/likes/toggle', data);
  return response.data;
};

export const getUserLikeStatus = async (data: { entityType: 'blog' | 'comment'; entityId: string }) => {
  const response = await axiosInstance.get<ILikeStatusResponse>('/likes/status', { params: data });
  return response.data;
};