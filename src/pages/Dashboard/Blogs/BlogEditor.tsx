import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { RootState } from '@/store';
import { fetchBlogById, createBlog, updateBlog, toggleBlogStatus } from '@/features/blog/blogSlice';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/Input";
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, Check, Loader2, Plus, Save, X } from 'lucide-react';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';

const BlogEditor = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentBlog, loading, error } = useAppSelector((state: RootState) => state.blog);
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const isEditMode = !!id;

  useEffect(() => {
    if (isEditMode && id) {
      dispatch(fetchBlogById(id));
    }
  }, [dispatch, id, isEditMode]);

  useEffect(() => {
    if (currentBlog && isEditMode) {
      setTitle(currentBlog.title);
      setContent(currentBlog.content);
      setCoverImage(currentBlog.coverImage || '');
      setTags(currentBlog.tags || []);
      setStatus(currentBlog.status);
    }
  }, [currentBlog, isEditMode]);

  // Handle tag input
  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setTagInput('');
    }
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error('Title is required');
      return;
    }
    
    if (!content.trim()) {
      toast.error('Content is required');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      if (isEditMode && id) {
        await dispatch(updateBlog({
          id,
          blog: {
            title,
            content,
            tags,
            coverImage: coverImage || undefined
          }
        })).unwrap();
        
        toast.success('Blog updated successfully');
      } else {
        const result = await dispatch(createBlog({
          title,
          content,
          tags,
          coverImage: coverImage || undefined,
          status
        })).unwrap();
        
        toast.success('Blog created successfully');
        navigate(`/dashboard/blogs/${result.slug}`);
        return; // Exit early to prevent the navigate below
      }
      
      navigate(`/dashboard/blogs`);
    } catch (error: any) {
      toast.error(error.message || 'Failed to save blog');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle publish/unpublish
  const handleToggleStatus = async () => {
    if (!isEditMode || !id || !currentBlog) return;
    
    const newStatus = currentBlog.status === 'published' ? 'draft' : 'published';
    
    try {
      await dispatch(toggleBlogStatus({
        id,
        status: newStatus
      })).unwrap();
      
      setStatus(newStatus);
      toast.success(`Blog ${newStatus === 'published' ? 'published' : 'unpublished'} successfully`);
    } catch (error: any) {
      toast.error(error.message || `Failed to ${newStatus === 'published' ? 'publish' : 'unpublish'} blog`);
    }
  };

  if (loading && isEditMode && !currentBlog) {
    return (
      <div className="container mx-auto py-12 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error && isEditMode && !currentBlog) {
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

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">
          {isEditMode ? 'Edit Blog' : 'Create New Blog'}
        </h1>
        <Button 
          variant="outline" 
          onClick={() => navigate('/dashboard/blogs')}
        >
          Cancel
        </Button>
      </div>

      <Card>
        <CardHeader>
          <Tabs defaultValue="edit" value={previewMode ? 'preview' : 'edit'}>
            <TabsList>
              <TabsTrigger 
                value="edit" 
                onClick={() => setPreviewMode(false)}
              >
                Edit
              </TabsTrigger>
              <TabsTrigger 
                value="preview" 
                onClick={() => setPreviewMode(true)}
                disabled={!title || !content}
              >
                Preview
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        
        <CardContent>
          {previewMode ? (
            <div className="space-y-6">
              {coverImage && (
                <div className="w-full h-64 relative rounded-md overflow-hidden">
                  <img 
                    src={coverImage} 
                    alt={title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div>
                <h2 className="text-3xl font-bold">{title}</h2>
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              
              <div 
                className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input 
                  id="title" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter blog title"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="coverImage">Cover Image URL (optional)</Label>
                <Input 
                  id="coverImage" 
                  value={coverImage} 
                  onChange={(e) => setCoverImage(e.target.value)}
                  placeholder="Enter image URL"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea 
                  id="content" 
                  value={content} 
                  onChange={(e: any) => setContent(e.target.value)}
                  placeholder="Write your blog content here..."
                  rows={15}
                  required
                />
                <p className="text-xs text-muted-foreground">You can use HTML for formatting.</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <div className="flex gap-2">
                  <Input 
                    id="tags" 
                    value={tagInput} 
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTagInput(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                    placeholder="Add a tag and press Enter"
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleAddTag}
                    disabled={!tagInput.trim()}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <button 
                          type="button" 
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-1 rounded-full hover:bg-muted p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              
              {!isEditMode && (
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="status" 
                    checked={status === 'published'}
                    onCheckedChange={(checked) => setStatus(checked ? 'published' : 'draft')}
                  />
                  <Label htmlFor="status">
                    {status === 'published' ? 'Publish immediately' : 'Save as draft'}
                  </Label>
                </div>
              )}
              
              <div className="flex justify-end gap-4">
                <Button 
                  type="submit" 
                  disabled={isSubmitting || !title.trim() || !content.trim()}
                  className="flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Save {isEditMode ? 'Changes' : 'Blog'}
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
        
        {isEditMode && currentBlog && (
          <CardFooter className="flex justify-between border-t p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Current status: <Badge variant="outline">{currentBlog.status}</Badge>
              </span>
            </div>
            
            <Button 
              variant={currentBlog.status === 'published' ? 'destructive' : 'default'}
              onClick={handleToggleStatus}
              className="flex items-center gap-2"
            >
              {currentBlog.status === 'published' ? (
                <>
                  <X className="h-4 w-4" />
                  Unpublish
                </>
              ) : (
                <>
                  <Check className="h-4 w-4" />
                  Publish
                </>
              )}
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default BlogEditor;