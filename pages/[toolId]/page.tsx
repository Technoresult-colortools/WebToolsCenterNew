import { generateToolId, parseToolId } from '@/utils/toolUtils';
import FavoriteButton from '@/components/FavoriteButton';
import CommentSection from '@/components/CommentSection';
import { notFound } from 'next/navigation';

// Assuming allTools is fetched from a database or static data
const allTools = [
  {
    category: 'Web Development',
    name: 'React',
    description: 'A JavaScript library for building user interfaces.',
  },
  {
    category: 'Web Development',
    name: 'Next.js',
    description: 'A React framework for building web applications.',
  },
  {
    category: 'Mobile Development',
    name: 'React Native',
    description: 'A framework for building native mobile apps using React.',
  },
];

export default function ToolPage({ params }: { params: { toolId: string } }) {
  const { category, name } = parseToolId(params.toolId);
  const tool = allTools.find(t => 
    t.category.toLowerCase() === category.toLowerCase() &&
    t.name.toLowerCase() === name.toLowerCase()
  );

  if (!tool) {
    notFound();
  }

  const uniqueToolId = generateToolId(tool);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{tool.name}</h1>
        <FavoriteButton toolId={uniqueToolId} />
      </div>
      <p className="text-gray-600 mb-8">{tool.description}</p>
      <CommentSection toolId={uniqueToolId} />
    </div>
  );
}
