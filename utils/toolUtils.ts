export function generateToolId(tool: { category: string; name: string }) {
    return `${encodeURIComponent(tool.category.toLowerCase())}/${encodeURIComponent(tool.name.toLowerCase().replace(/ /g, '-'))}`;
  }
  
  export function parseToolId(toolId: string) {
    const [category, ...nameParts] = toolId.split('/').map(part => decodeURIComponent(part));
    return {
      category,
      name: nameParts.join('/').replace(/-/g, ' ')
    };
  }
  
  export function findToolById(tools: any[], toolId: string) {
    const { category, name } = parseToolId(toolId);
    return tools.find(tool => 
      tool.category.toLowerCase() === category.toLowerCase() &&
      tool.name.toLowerCase() === name.toLowerCase().replace(/-/g, ' ')
    );
  }
  