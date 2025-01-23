import { useEffect, useState } from 'react';
import { Card, CardBody, CardFooter, Button, Link, Spinner } from '@nextui-org/react';
import { Heart, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';

interface FavoritesListProps {
  userId?: string | null;
}

interface Favorite {
  toolId: string;
  tool: {
    name: string;
    href: string;
    description: string;
    category: string;
  };
}

export function FavoritesList({ userId }: FavoritesListProps) {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [removingId, setRemovingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!userId) {
        setIsLoading(false);
        return;
      }
  
      try {
        const response = await fetch('/api/favorites');
        if (!response.ok) throw new Error('Failed to fetch favorites');
        const data = await response.json();
        setFavorites(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    const handleFavoritesUpdate = () => {
      console.log('Received favoritesUpdated event');
      fetchFavorites();
    };
  
    // Initial fetch
    fetchFavorites();
  
    // Subscribe to favorites updates
    window.addEventListener('favoritesUpdated', handleFavoritesUpdate);
  
    // Cleanup
    return () => {
      window.removeEventListener('favoritesUpdated', handleFavoritesUpdate);
    };
  }, [userId]);
  

  const handleRemoveFavorite = async (toolId: string) => {
    setRemovingId(toolId);
    try {
      const response = await fetch('/api/favorites', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toolId }),
      });
      
      if (!response.ok) throw new Error('Failed to remove favorite');
      
      setFavorites((prev) => prev.filter((fav) => fav.toolId !== toolId));
      window.dispatchEvent(new CustomEvent('favoritesUpdated'));
    } catch (error) {
      console.error('Error removing favorite:', error);
      toast.error('Failed to remove favorite');
    } finally {
      setRemovingId(null);
    }
  };

  if (!userId) {
    return (
      <Card className="bg-content1/50 dark:bg-content1/20">
        <CardBody>
          <p className="text-default-500">Please log in to view favorites.</p>
        </CardBody>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="bg-content1/50 dark:bg-content1/20">
        <CardBody className="flex justify-center">
          <Spinner size="lg" color="primary" />
        </CardBody>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-content1/50 dark:bg-content1/20">
        <CardBody>
          <p className="text-danger">Error: {error}</p>
        </CardBody>
      </Card>
    );
  }

  if (favorites.length === 0) {
    return (
      <Card className="bg-content1/50 dark:bg-content1/20">
        <CardBody>
          <p className="text-default-500">No favorite tools yet.</p>
        </CardBody>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {favorites.map(({ toolId, tool }) => (
        <Card
          key={tool.href}
          className="bg-content1/50 dark:bg-content1/20 hover:bg-content2/50 dark:hover:bg-content2/20 transition-all"
        >
          <CardBody className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-4 h-4 text-danger fill-danger" />
              <h3 className="text-md font-semibold text-foreground">{tool.name}</h3>
            </div>
            <p className="text-sm text-default-500">{tool.description}</p>
          </CardBody>
          <CardFooter className="justify-between">
            <Button
              as={Link}
              href={tool.href}
              variant="flat"
              color="primary"
              size="sm"
              endContent={<ExternalLink className="w-4 h-4" />}
            >
              Open Tool
            </Button>
            <Button
              variant="flat"
              color="danger"
              size="sm"
              onClick={() => handleRemoveFavorite(toolId)}
            >
              Remove
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default FavoritesList;
