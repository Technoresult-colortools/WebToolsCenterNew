import React from 'react';
import { Card, CardBody } from "@nextui-org/react";
import Link from 'next/link';
import { Tool, allTools } from '@/data/tools';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface RelatedToolsProps {
  toolId: string;
  toolName: string;
  maxTools?: number;
}

const RelatedTools = ({ toolName, maxTools = 3 }: RelatedToolsProps) => {
  const currentTool = allTools.find(tool => 
    tool.name.toLowerCase() === toolName.toLowerCase()
  );
  
  if (!currentTool) {
    console.log('Current tool not found:', toolName);
    return null;
  }

  const getRelatedTools = (): Tool[] => {
    // Get tools from the same category
    const sameCategory = allTools.filter(tool => 
      tool.name !== currentTool.name && 
      tool.category === currentTool.category
    );

    // If we don't have enough tools from the same category,
    // add tools from other categories that might be related
    if (sameCategory.length < maxTools) {
      const otherTools = allTools.filter(tool =>
        tool.name !== currentTool.name &&
        tool.category !== currentTool.category &&
        (tool.description.toLowerCase().includes(currentTool.name.toLowerCase()) ||
         currentTool.description.toLowerCase().includes(tool.name.toLowerCase()))
      );

      // Sort tools by name for consistency
      const combinedTools = [...sameCategory, ...otherTools]
        .sort((a, b) => a.name.localeCompare(b.name))
        .slice(0, maxTools);

      return combinedTools;
    }

    // Sort by name and take first maxTools items instead of random selection
    return sameCategory
      .sort((a, b) => a.name.localeCompare(b.name))
      .slice(0, maxTools);
  };

  const relatedTools = getRelatedTools();

  if (relatedTools.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 max-w-4xl mx-auto">
      <h3 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        Related Tools
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedTools.map((tool) => (
          <Link 
            key={tool.href} 
            href={tool.href}
            className="no-underline"
          >
            <Card 
              className="hover:scale-105 transition-transform duration-200 cursor-pointer h-full bg-content1"
              isPressable
            >
              <CardBody className="p-4">
                <div className="flex items-start gap-4">
                    <div className="p-2 rounded-md bg-primary/20 dark:bg-primary/30">
                    <FontAwesomeIcon 
                        icon={tool.icon} 
                        className="h-5 w-5 text-primary"
                    />
                    </div>
                    <div>
                    <h3 className="font-medium text-default-700">{tool.name}</h3>
                    <p className="text-sm text-default-500 line-clamp-2 mt-1">
                        {tool.description}
                    </p>
                    </div>
                </div>
                </CardBody>


            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedTools;