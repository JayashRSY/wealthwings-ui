import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { RootState } from '@/store';
import { fetchBlogs, setCurrentPage } from '@/features/blog/blogSlice';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarIcon, Edit, Plus, Search } from 'lucide-react';
import { format } from 'date-fns';

const BlogsPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { blogs, loading, error, totalBlogs, currentPage, limit } = useAppSelector((state: RootState) => state.blog);
  const { user } = useAppSelector((state: RootState) => state.auth);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [activeTab, setActiveTab] = useState('all');

  // Calculate total pages
  const totalPages = Math.ceil(totalBlogs / limit);

  useEffect(() => {
    // Fetch blogs based on current filters
    const params: { page?: number; limit?: number; tag?: string; status?: string } = {
      page: currentPage,
      limit: itemsPerPage,
    };

    if (selectedTag) {
      params.tag = selectedTag;
    }

    if (activeTab === 'published') {
      params.status = 'published';
    } else if (activeTab === 'drafts') {
      params.status = 'draft';
    }

    dispatch(fetchBlogs(params));
  }, [dispatch, currentPage, itemsPerPage, selectedTag, activeTab]);

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      dispatch(setCurrentPage(page));
    }
  };

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Searching for:', searchTerm);
  };

  // Handle tag selection
  const handleTagClick = (tag: string) => {
    setSelectedTag(tag === selectedTag ? null : tag);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM d, yyyy');
  };

  // Get unique tags from all blogs
  const allTags = Array.from(new Set(blogs.flatMap(blog => blog.tags || [])));

  // Create a new blog
  const handleCreateBlog = () => {
    navigate('/dashboard/blogs/create');
  };

  // Edit a blog
  const handleEditBlog = (blogId: string) => {
    navigate(`/dashboard/blogs/edit/${blogId}`);
  };

  // View a blog
  const handleViewBlog = (slug: string) => {
    navigate(`/dashboard/blogs/${slug}`);
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blogs</h1>
          <p className="text-muted-foreground">Discover financial insights and knowledge.</p>
        </div>
        {user && (
          <Button onClick={handleCreateBlog} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Blog
          </Button>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start">
        {/* Search and filters */}
        <div className="w-full md:w-64 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Search</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="flex gap-2">
                <Input
                  placeholder="Search blogs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" size="icon" variant="outline">
                  <Search className="h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTag === tag ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handleTagClick(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
                {allTags.length === 0 && (
                  <p className="text-sm text-muted-foreground">No tags available</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Blog list */}
        <div className="flex-1">
          <Card>
            <CardHeader>
              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="all">All Blogs</TabsTrigger>
                  <TabsTrigger value="published">Published</TabsTrigger>
                  {user && <TabsTrigger value="drafts">My Drafts</TabsTrigger>}
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : error ? (
                <div className="text-center py-8 text-destructive">
                  <p>{error}</p>
                </div>
              ) : blogs.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No blogs found</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {blogs.map((blog) => (
                    <Card key={blog._id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row">
                        {blog.coverImage && (
                          <div className="w-full md:w-1/4 h-48 md:h-auto">
                            <img 
                              src={blog.coverImage} 
                              alt={blog.title} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className={`flex-1 flex flex-col ${blog.coverImage ? 'md:w-3/4' : 'w-full'}`}>
                          <CardHeader>
                            <div className="flex justify-between items-start">
                              <div>
                                <CardTitle 
                                  className="cursor-pointer hover:text-primary transition-colors"
                                  onClick={() => handleViewBlog(blog.slug)}
                                >
                                  {blog.title}
                                </CardTitle>
                                <CardDescription className="flex items-center gap-1 mt-1">
                                  <CalendarIcon className="h-3 w-3" />
                                  {formatDate(blog.createdAt)}
                                </CardDescription>
                              </div>
                              <Badge variant={blog.status === 'published' ? 'default' : 'outline'}>
                                {blog.status === 'published' ? 'Published' : 'Draft'}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="line-clamp-2 text-sm text-muted-foreground">
                              {blog?.content?.replace(/<[^>]*>/g, '')?.substring(0, 150)}...
                            </p>
                            <div className="flex flex-wrap gap-2 mt-3">
                              {blog.tags?.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                          <CardFooter className="flex justify-between items-center mt-auto">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span>{blog.likesCount} likes</span>
                              <span>•</span>
                              <span>{blog.commentsCount} comments</span>
                            </div>
                            {user && user._id === blog.authorId && (
                              <div className="flex gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => handleEditBlog(blog._id)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </div>
                            )}
                          </CardFooter>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
            {totalPages > 1 && (
              <CardFooter className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Items per page:</span>
                  <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
                    <SelectTrigger className="w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="25">25</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => handlePageChange(currentPage - 1)}
                        className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: totalPages }).map((_, i) => {
                      const page = i + 1;
                      // Show first page, last page, and pages around current page
                      if (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      ) {
                        return (
                          <PaginationItem key={page}>
                            <PaginationLink
                              isActive={page === currentPage}
                              onClick={() => handlePageChange(page)}
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      }
                      
                      // Show ellipsis for gaps
                      if (page === 2 || page === totalPages - 1) {
                        return (
                          <PaginationItem key={page}>
                            <PaginationEllipsis />
                          </PaginationItem>
                        );
                      }
                      
                      return null;
                    })}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => handlePageChange(currentPage + 1)}
                        className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BlogsPage;