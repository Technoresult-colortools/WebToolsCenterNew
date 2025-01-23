import { useState, useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Button, Input, Avatar, Card, CardBody } from '@nextui-org/react';
import { formatDistanceToNow } from 'date-fns';
import { useRouter } from 'next/navigation';
import type { Comment } from '@/types/comments';

interface CommentSectionProps {
  toolId: string;
  comments?: Comment[];
}

export default function CommentSection({ 
  toolId, 
  comments: initialComments = []
}: CommentSectionProps) {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Fetch comments on mount
  useEffect(() => {
    fetchComments();
  }, [toolId]);

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/comments?toolId=${toolId}`);
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!content.trim()) {
      setError('Comment cannot be empty');
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          toolId,
          content: content.trim(),
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || 'Failed to post comment');
      }
  
      setComments([data, ...comments]);
      setContent('');
    } catch (err) {
      console.error('Error submitting comment:', err);
      setError(err instanceof Error ? err.message : 'Failed to post comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogin = () => {
    // Store the current URL in localStorage before redirecting
    localStorage.setItem('redirectTo', window.location.pathname);
    router.push('/login');
  };

  if (isLoading) {
    return (
      <div className="mt-8 max-w-4xl mx-auto">
        <h3 className="text-2xl font-semibold mb-6">Comments</h3>
        <Card>
          <CardBody>
            <div className="flex justify-center items-center p-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div className="mt-8 max-w-4xl mx-auto">
      <h3 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Comments</h3>
      
      {user ? (
        <Card className="mb-8">
          <CardBody>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar 
                  src={user?.picture ?? undefined}
                  name={user?.name ?? undefined}
                  size="sm"
                />
                <span className="text-sm font-medium">{user?.name}</span>
              </div>
              
              <Input
                placeholder="Share your thoughts..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                variant="bordered"
                maxLength={1000}
                isInvalid={!!error}
                errorMessage={error}
                disabled={isSubmitting}
              />
              
              <div className="flex justify-between items-center">
                <span className="text-small text-default-500">
                  {1000 - content.length} characters remaining
                </span>
                <Button 
                  type="submit" 
                  color="primary"
                  isLoading={isSubmitting}
                  disabled={isSubmitting || !content.trim()}
                >
                  {isSubmitting ? 'Posting...' : 'Post Comment'}
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      ) : (
        <Card className="mb-8">
          <CardBody className="text-center">
            <p className="mb-4">Join the conversation by signing in.</p>
            <Button 
              color="primary" 
              variant="flat"
              onPress={handleLogin}
            >
              Sign In
            </Button>
          </CardBody>
        </Card>
      )}

      <div className="space-y-6">
        {comments.length === 0 ? (
          <p className="text-center text-default-500 py-8">
            Be the first to comment!
          </p>
        ) : (
          comments.map((comment) => (
            <Card key={comment.id} className="bg-content1">
              <CardBody>
                <div className="flex items-start gap-4">
                  <Avatar
                    src={comment.user.picture}
                    name={comment.user.name}
                    size="sm"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{comment.user.name}</span>
                      <span className="text-tiny text-default-500">
                        {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                      </span>
                    </div>
                    <p className="text-default-700 whitespace-pre-wrap">{comment.content}</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}