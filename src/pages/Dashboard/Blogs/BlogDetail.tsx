import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { RootState } from '@/store';
import { fetchBlogBySlug, fetchCommentsByBlog, createComment, updateBlogLikes } from '@/features/blog/blogSlice';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CalendarIcon, Edit, Heart, MessageSquare, Share2, ThumbsUp } from 'lucide-react';
import { format } from 'date-fns';
import * as blogApi from '@/api/blogApi';
import { IComment } from '@/interfaces/IBlogTypes';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';

const BlogDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentBlog, comments, loading, error } = useAppSelector((state: RootState) => state.blog);
  const { user } = useAppSelector((state: RootState) => state.auth);
  
  const [commentContent, setCommentContent] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [submittingComment, setSubmittingComment] = useState(false);
  const [submittingLike, setSubmittingLike] = useState(false);

  useEffect(() => {
    if (slug) {
      dispatch(fetchBlogBySlug(slug));
    }
  }, [dispatch, slug]);

  useEffect(() => {
    if (currentBlog) {
      // Fetch comments for the blog
      dispatch(fetchCommentsByBlog({ blogId: currentBlog._id }));
      
      // Set initial likes count
      setLikesCount(currentBlog.likesCount);
      
      // Check if user has liked this blog
      if (user) {
        const checkLikeStatus = async () => {
          try {
            const response = await blogApi.getUserLikeStatus({
              entityId: currentBlog._id,
              entityType: 'blog'
            });
            setIsLiked(response.data.liked);
          } catch (error) {
            console.error('Error checking like status:', error);
          }
        };
        
        checkLikeStatus();
      }
    }
  }, [dispatch, currentBlog, user]);

  // Format date
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMMM d, yyyy h:mm a');
  };

  // Handle comment submission
  const handleCommentSubmit = async () => {
    if (!user) {
      toast.error('Please log in to comment');
      return;
    }
    
    if (!commentContent.trim()) {
      toast.error('Comment cannot be empty');
      return;
    }
    
    if (!currentBlog) return;
    
    setSubmittingComment(true);
    
    try {
      await dispatch(createComment({
        blogId: currentBlog._id,
        content: commentContent
      })).unwrap();
      
      setCommentContent('');
      toast.success('Comment added successfully');
    } catch (error) {
      toast.error('Failed to add comment');
      console.error('Error adding comment:', error);
    } finally {
      setSubmittingComment(false);
    }
  };

  // Handle like toggle
  const handleLikeToggle = async () => {
    if (!user) {
      toast.error('Please log in to like this blog');
      return;
    }
    
    if (!currentBlog) return;
    
    setSubmittingLike(true);
    
    try {
      const response = await blogApi.toggleLike({
        entityId: currentBlog._id,
        entityType: 'blog'
      });
      
      // Update local state
      setIsLiked(response.data.liked);
      setLikesCount(response.data.likesCount);
      
      // Update Redux store
      dispatch(updateBlogLikes({
        blogId: currentBlog._id,
        likesCount: response.data.likesCount,
        liked: response.data.liked
      }));
      
      toast.success(response.data.liked ? 'Blog liked' : 'Blog unliked');
    } catch (error) {
      toast.error('Failed to update like status');
      console.error('Error toggling like:', error);
    } finally {
      setSubmittingLike(false);
    }
  };

  // Handle edit blog
  const handleEditBlog = () => {
    if (currentBlog) {
      navigate(`/dashboard/blogs/edit/${currentBlog._id}`);
    }
  };

  // Handle share blog
  const handleShareBlog = () => {
    if (navigator.share && currentBlog) {
      navigator.share({
        title: currentBlog.title,
        text: `Check out this blog: ${currentBlog.title}`,
        url: window.location.href
      }).catch(err => {
        console.error('Error sharing:', err);
      });
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard');
    }
  };

  // Render comment item
  const renderComment = (comment: IComment) => {
    return (
      <div key={comment._id} className="py-4">
        <div className="flex items-start gap-4">
          <Avatar>
            <AvatarFallback>{comment?.userId?.email?.substring(0, 1).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{comment?.userId?.email}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDate(comment.createdAt)}
                  {comment.isEdited && <span className="ml-2">(edited)</span>}
                </p>
              </div>
              {user && user._id === comment.userId.toString() && (
                <Button variant="ghost" size="sm">
                  <Edit className="h-3 w-3" />
                </Button>
              )}
            </div>
            <p className="text-sm">{comment.content}</p>
            <div className="flex items-center gap-4 pt-1">
              <Button variant="ghost" size="sm" className="h-8 px-2">
                <ThumbsUp className="h-3 w-3 mr-1" />
                <span className="text-xs">{comment.likesCount}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading && !currentBlog) {
    return (
      <div className="container mx-auto py-12 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error && !currentBlog) {
    return (
      <div className="container mx-auto py-12">
        <Card>
          <CardContent className="py-12">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold text-destructive">Error Loading Blog</h2>
              <p className="text-muted-foreground">{error}</p>
              <Button onClick={() => navigate('/dashboard/blogs')}>Back to Blogs</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!currentBlog) {
    return (
      <div className="container mx-auto py-12">
        <Card>
          <CardContent className="py-12">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold">Blog Not Found</h2>
              <p className="text-muted-foreground">The blog you're looking for doesn't exist or has been removed.</p>
              <Button onClick={() => navigate('/dashboard/blogs')}>Back to Blogs</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <Button 
        variant="outline" 
        onClick={() => navigate('/dashboard/blogs')}
        className="mb-4"
      >
        Back to Blogs
      </Button>

      <Card className="overflow-hidden">
        {currentBlog.coverImage && (
          <div className="w-full h-64 md:h-96 relative">
            <img 
              src={currentBlog.coverImage} 
              alt={currentBlog.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle className="text-3xl">{currentBlog.title}</CardTitle>
              <CardDescription className="flex items-center gap-2 mt-2">
                <CalendarIcon className="h-4 w-4" />
                {formatDate(currentBlog.createdAt)}
                <Badge variant={currentBlog.status === 'published' ? 'default' : 'outline'}>
                  {currentBlog.status === 'published' ? 'Published' : 'Draft'}
                </Badge>
              </CardDescription>
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleShareBlog}
                className="flex items-center gap-1"
              >
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              
              {user && user._id === currentBlog.authorId && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleEditBlog}
                  className="flex items-center gap-1"
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
              )}
            </div>
          </div>
          
          {currentBlog.tags && currentBlog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {currentBlog.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardHeader>
        
        <CardContent>
          <div 
            className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: currentBlog.content }}
          />
        </CardContent>
        
        <CardFooter className="flex justify-between items-center border-t p-4">
          <div className="flex items-center gap-6">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLikeToggle}
              disabled={submittingLike || !user}
              className={`flex items-center gap-2 ${isLiked ? 'text-primary' : ''}`}
            >
              <Heart className={`h-5 w-5 ${isLiked ? 'fill-primary' : ''}`} />
              <span>{likesCount}</span>
            </Button>
            
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              <span>{currentBlog.commentsCount}</span>
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground">
            {currentBlog.updatedAt !== currentBlog.createdAt && (
              <span>Updated on {formatDate(currentBlog.updatedAt)}</span>
            )}
          </div>
        </CardFooter>
      </Card>

      {/* Comments section */}
      <Card>
        <CardHeader>
          <CardTitle>Comments ({currentBlog.commentsCount})</CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Add comment form */}
          {user ? (
            <div className="space-y-4">
              <Textarea 
                placeholder="Write a comment..."
                value={commentContent}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCommentContent(e.target.value)}
                rows={3}
              />
              <Button 
                onClick={handleCommentSubmit}
                disabled={submittingComment || !commentContent.trim()}
              >
                {submittingComment ? 'Posting...' : 'Post Comment'}
              </Button>
            </div>
          ) : (
            <div className="bg-muted p-4 rounded-md text-center">
              <p className="text-sm text-muted-foreground">Please log in to comment on this blog.</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2"
                onClick={() => navigate('/login')}
              >
                Log In
              </Button>
            </div>
          )}
          
          <Separator className="my-6" />
          
          {/* Comments list */}
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : comments.length > 0 ? (
            <div className="space-y-1">
              {comments.map((comment, index) => (
                <div key={comment._id}>
                  {renderComment(comment)}
                  {index < comments.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No comments yet. Be the first to comment!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogDetailPage;