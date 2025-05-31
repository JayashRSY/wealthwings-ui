import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h1 className="text-9xl font-bold text-primary">404</h1>
      <div className="absolute rotate-12 rounded-full bg-muted/30 px-2 text-sm font-medium">
        Page Not Found
      </div>
      <div className="mt-16 text-xl">
        Oops! The page you're looking for doesn't exist.
      </div>
      <p className="mb-8 mt-4 text-muted-foreground">
        The page you requested could not be found. It might have been removed, 
        renamed, or did not exist in the first place.
      </p>
      <Button asChild>
        <Link to="/">
          Return to Home
        </Link>
      </Button>
    </div>
  );
};

export default NotFound;