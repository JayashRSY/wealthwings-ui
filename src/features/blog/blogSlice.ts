import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IBlog, IComment } from '@/interfaces/IBlogTypes';
import * as blogApi from '@/api/blogApi';

export interface BlogState {
  blogs: IBlog[];
  currentBlog: IBlog | null;
  comments: IComment[];
  loading: boolean;
  error: string | null;
  totalBlogs: number;
  currentPage: number;
  limit: number;
}

const initialState: BlogState = {
  blogs: [],
  currentBlog: null,
  comments: [],
  loading: false,
  error: null,
  totalBlogs: 0,
  currentPage: 1,
  limit: 10,
};

// Async thunks
const fetchBlogs = createAsyncThunk(
  'blog/fetchBlogs',
  async (params: { page?: number; limit?: number; tag?: string; status?: string } = {}, { rejectWithValue }) => {
    try {
      const response = await blogApi.getBlogs(params);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch blogs');
    }
  }
);

const fetchBlogById = createAsyncThunk(
  'blog/fetchBlogById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await blogApi.getBlogById(id);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch blog');
    }
  }
);

const fetchBlogBySlug = createAsyncThunk(
  'blog/fetchBlogBySlug',
  async (slug: string, { rejectWithValue }) => {
    try {
      const response = await blogApi.getBlogBySlug(slug);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch blog');
    }
  }
);

const fetchUserBlogs = createAsyncThunk(
  'blog/fetchUserBlogs',
  async (params: { page?: number; limit?: number; status?: string } = {}, { rejectWithValue }) => {
    try {
      const response = await blogApi.getUserBlogs(params);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch user blogs');
    }
  }
);

const createBlog = createAsyncThunk(
  'blog/createBlog',
  async (blog: { title: string; content: string; tags?: string[]; coverImage?: string; status?: 'draft' | 'published' }, { rejectWithValue }) => {
    try {
      const response = await blogApi.createBlog(blog);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create blog');
    }
  }
);

const updateBlog = createAsyncThunk(
  'blog/updateBlog',
  async ({ id, blog }: { id: string; blog: { title?: string; content?: string; tags?: string[]; coverImage?: string } }, { rejectWithValue }) => {
    try {
      const response = await blogApi.updateBlog(id, blog);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update blog');
    }
  }
);

const deleteBlog = createAsyncThunk(
  'blog/deleteBlog',
  async (id: string, { rejectWithValue }) => {
    try {
      await blogApi.deleteBlog(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete blog');
    }
  }
);

const toggleBlogStatus = createAsyncThunk(
  'blog/toggleBlogStatus',
  async ({ id, status }: { id: string; status: 'draft' | 'published' }, { rejectWithValue }) => {
    try {
      const response = await blogApi.toggleBlogStatus(id, status);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to toggle blog status');
    }
  }
);

const fetchCommentsByBlog = createAsyncThunk(
  'blog/fetchCommentsByBlog',
  async ({ blogId, params }: { blogId: string; params?: { page?: number; limit?: number } }, { rejectWithValue }) => {
    try {
      const response = await blogApi.getCommentsByBlog(blogId, params);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch comments');
    }
  }
);

const createComment = createAsyncThunk(
  'blog/createComment',
  async (comment: { blogId: string; content: string; parentCommentId?: string }, { rejectWithValue }) => {
    try {
      const response = await blogApi.createComment(comment);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create comment');
    }
  }
);

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    clearCurrentBlog: (state) => {
      state.currentBlog = null;
      state.comments = [];
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    updateBlogLikes: (state, action: PayloadAction<{ blogId: string; likesCount: number; liked: boolean }>) => {
      if (state.currentBlog && state.currentBlog._id === action.payload.blogId) {
        state.currentBlog.likesCount = action.payload.likesCount;
      }
      // Also update in blogs list if present
      const blogIndex = state.blogs.findIndex(blog => blog._id === action.payload.blogId);
      if (blogIndex !== -1) {
        state.blogs[blogIndex].likesCount = action.payload.likesCount;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch blogs
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload.blogs;
        state.totalBlogs = action.payload.total;
        state.currentPage = action.payload.page;
        state.limit = action.payload.limit;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch blog by ID
      .addCase(fetchBlogById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBlog = action.payload;
      })
      .addCase(fetchBlogById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch blog by slug
      .addCase(fetchBlogBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBlog = action.payload;
      })
      .addCase(fetchBlogBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch user blogs
      .addCase(fetchUserBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload.blogs;
        state.totalBlogs = action.payload.total;
        state.currentPage = action.payload.page;
        state.limit = action.payload.limit;
      })
      .addCase(fetchUserBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Create blog
      .addCase(createBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs.unshift(action.payload);
        state.currentBlog = action.payload;
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Update blog
      .addCase(updateBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.currentBlog = action.payload;
        const index = state.blogs.findIndex(blog => blog._id === action.payload._id);
        if (index !== -1) {
          state.blogs[index] = action.payload;
        }
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Delete blog
      .addCase(deleteBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = state.blogs.filter(blog => blog._id !== action.payload);
        if (state.currentBlog && state.currentBlog._id === action.payload) {
          state.currentBlog = null;
        }
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Toggle blog status
      .addCase(toggleBlogStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleBlogStatus.fulfilled, (state, action) => {
        state.loading = false;
        if (state.currentBlog && state.currentBlog._id === action.payload._id) {
          state.currentBlog = action.payload;
        }
        const index = state.blogs.findIndex(blog => blog._id === action.payload._id);
        if (index !== -1) {
          state.blogs[index] = action.payload;
        }
      })
      .addCase(toggleBlogStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Fetch comments by blog
      .addCase(fetchCommentsByBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommentsByBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload.comments;
      })
      .addCase(fetchCommentsByBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Create comment
      .addCase(createComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments.unshift(action.payload);
        if (state.currentBlog) {
          state.currentBlog.commentsCount += 1;
        }
      })
      .addCase(createComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentBlog, setCurrentPage, updateBlogLikes } = blogSlice.actions;

export default blogSlice.reducer;

export {
  fetchBlogs,
  fetchBlogById,
  fetchBlogBySlug,
  fetchUserBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  toggleBlogStatus,
  fetchCommentsByBlog,
  createComment,
};