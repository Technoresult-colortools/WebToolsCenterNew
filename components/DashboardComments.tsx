import { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Card, CardBody, Spinner } from "@nextui-org/react";
import { MessageSquare } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';

interface Tool {
  id: string;
  name: string;
  href: string;
}

interface Comment {
  id: string;
  content: string;
  toolId: string;
  createdAt: string;
  user: {
    name: string;
  };
}

export const DashboardComments = () => {
  const { user } = useUser();
  const [comments, setComments] = useState<Comment[]>([]);
  const [tools, setTools] = useState<Record<string, Tool>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserComments = async () => {
      try {
        // Fetch comments
        const commentsResponse = await fetch(`/api/comments/user`);
        if (!commentsResponse.ok) {
          throw new Error('Failed to fetch comments');
        }
        const commentsData = await commentsResponse.json();
        setComments(commentsData);

        // Get unique tool IDs
        const toolIds = [...new Set(commentsData.map((comment: Comment) => comment.toolId))];
        
        // Fetch tools information
        const toolsResponse = await fetch(`/api/tools?ids=${toolIds.join(',')}`);
        if (toolsResponse.ok) {
          const toolsData = await toolsResponse.json();
          // Create a map of toolId to tool info
          const toolsMap = toolsData.reduce((acc: Record<string, Tool>, tool: Tool) => {
            acc[tool.id] = tool;
            return acc;
          }, {});
          setTools(toolsMap);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching comments');
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchUserComments();
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-danger">
        <p>{error}</p>
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="p-8 text-center">
        <MessageSquare className="w-12 h-12 text-default-300 mx-auto mb-4" />
        <p className="text-default-500 text-lg">No comments yet</p>
        <p className="text-default-400 text-sm mt-2">
          Start engaging with tools to see your comments here
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 p-4">
      {comments.map((comment) => {
        const tool = tools[comment.toolId];
        
        return (
          <Card key={comment.id} className="bg-content1/50">
            <CardBody>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    {tool ? (
                      <Link 
                        href={tool.href || `/tools/${comment.toolId}`}
                        className="text-primary hover:underline font-medium"
                      >
                        {tool.name}
                      </Link>
                    ) : (
                      <span className="text-default-500">Tool</span>
                    )}
                    <span className="text-tiny text-default-500">
                      {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                </div>
                <p className="text-default-700 whitespace-pre-wrap">{comment.content}</p>
              </div>
            </CardBody>
          </Card>
        );
      })}
    </div>
  );
};