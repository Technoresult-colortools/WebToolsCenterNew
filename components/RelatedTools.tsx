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
    const sameCategory = allTools.filter(tool => 
      tool.name !== currentTool.name && 
      tool.category === currentTool.category
    );

    if (sameCategory.length < maxTools) {
      const otherTools = allTools.filter(tool =>
        tool.name !== currentTool.name &&
        tool.category !== currentTool.category &&
        (tool.description.toLowerCase().includes(currentTool.name.toLowerCase()) ||
         currentTool.description.toLowerCase().includes(tool.name.toLowerCase()))
      );

      const combinedTools = [...sameCategory, ...otherTools]
        .sort((a, b) => a.name.localeCompare(b.name))
        .slice(0, maxTools);

      return combinedTools;
    }

    return sameCategory
      .sort((a, b) => a.name.localeCompare(b.name))
      .slice(0, maxTools);
  };

  const relatedTools = getRelatedTools();

  if (relatedTools.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 max-w-4xl mx-auto px-4">
      <h3 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        Related Tools
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedTools.map((tool) => (
          <Link 
            key={tool.href} 
            href={tool.href}
            className="no-underline group"
          >
            <Card 
              className="h-full bg-content1 group-hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1"
              isPressable
            >
              <CardBody className="p-6 flex flex-col h-full">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                    <FontAwesomeIcon 
                      icon={tool.icon} 
                      className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 min-h-[120px]">
                    <h3 className="font-semibold text-lg text-default-700 mb-2 group-hover:text-primary transition-colors duration-300">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-default-500 line-clamp-3">
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