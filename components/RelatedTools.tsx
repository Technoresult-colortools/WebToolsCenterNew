import React from 'react';
import { Card, CardBody, Button } from "@nextui-org/react";
import { Link as NextUILink } from "@nextui-org/react";
import { Tool, allTools } from '@/data/tools';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface RelatedToolsProps {
  toolId: string;  // We'll still accept this for compatibility
  toolName?: string; // Make this optional
  maxTools?: number;
}

const RelatedTools = ({ toolId, toolName, maxTools = 3 }: RelatedToolsProps) => {
  // First try to find the current tool by name
  let currentTool = allTools.find(tool => 
    toolName && tool.name.toLowerCase() === toolName.toLowerCase()
  );
  
  // If not found by name, try using the path from toolId
  if (!currentTool && toolId) {
    // Extract potential path from toolId
    const toolPath = `/tools/${toolId.split('/').pop()}`;
    currentTool = allTools.find(tool => tool.href.includes(toolPath));
    
    // If still not found, just find it by checking if href contains any part of toolId
    if (!currentTool) {
      currentTool = allTools.find(tool => 
        toolId.includes(tool.name.toLowerCase().replace(/\s+/g, '-')) ||
        tool.href.includes(toolId.toLowerCase().replace(/\s+/g, '-'))
      );
    }
  }
  
  // Last resort - just use the first tool from the same category indicated in toolId
  if (!currentTool && toolId) {
    const pathParts = toolId.split('/');
    if (pathParts.length >= 2) {
      const categoryFromPath = pathParts[pathParts.length - 2];
      currentTool = allTools.find(tool => 
        tool.category.toLowerCase().replace(/\s+/g, '-') === categoryFromPath
      );
    }
  }
  
  if (!currentTool) {
    // Return empty div instead of null for consistent rendering
    return <div className="hidden"></div>;
  }

  const getRelatedTools = (): Tool[] => {
    // Get tools from the same category
    const sameCategory = allTools.filter(tool => 
      tool.name !== currentTool?.name && 
      tool.category === currentTool?.category
    );

    if (sameCategory.length < maxTools) {
      // If we need more tools, find semantically related ones
      const otherTools = allTools.filter(tool =>
        tool.name !== currentTool?.name &&
        tool.category !== currentTool?.category &&
        (tool.description.toLowerCase().includes(currentTool?.name.toLowerCase() || '') ||
         currentTool?.description.toLowerCase().includes(tool.name.toLowerCase()))
      );

      // Use consistent sorting (alphabetical) instead of random
      return [...sameCategory, ...otherTools]
        .sort((a, b) => a.name.localeCompare(b.name))
        .slice(0, maxTools);
    }

    // Use consistent sorting (alphabetical) instead of random
    return sameCategory
      .sort((a, b) => a.name.localeCompare(b.name))
      .slice(0, maxTools);
  };

  const relatedTools = getRelatedTools();

  if (relatedTools.length === 0) {
    return <div className="hidden"></div>;
  }

  // Handle navigation with both Next.js routing and direct href
  const handleNavigation = (href: string) => {
    if (typeof window !== 'undefined') {
      window.location.href = href;
    }
  };

  return (
    <div className="mt-8 w-full px-4">
      <h3 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        Related Tools
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {relatedTools.map((tool) => (
          <Card 
            key={tool.href}
            className="w-full h-full bg-content1 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <CardBody className="p-4">
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex-shrink-0 p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                      <FontAwesomeIcon 
                        icon={tool.icon} 
                        className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="font-semibold text-lg text-default-700 group-hover:text-primary transition-colors duration-300">
                      {tool.name}
                    </h3>
                  </div>
                  <p className="text-sm text-default-500 mb-4">
                    {tool.description}
                  </p>
                </div>
                
                {/* Simple button that works on both mobile and desktop */}
                <div className="mt-auto">
                  <Button
                    as={NextUILink}
                    href={tool.href}
                    onClick={() => handleNavigation(tool.href)}
                    className="w-full bg-primary text-white"
                    size="sm"
                    variant="flat"
                  >
                    Open
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RelatedTools;