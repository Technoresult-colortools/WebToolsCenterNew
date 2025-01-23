// comments.ts

export interface Comment {
  id: string;
  content: string;
  toolId: string;
  userId: string;
  user: {
    name: string;
    picture?: string;
  };
  createdAt: string;
  updatedAt: string;
}