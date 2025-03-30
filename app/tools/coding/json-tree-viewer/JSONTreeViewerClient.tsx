'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardBody, Button, Select, SelectItem, Textarea, Switch } from "@nextui-org/react";
import Image from 'next/image';
import { RefreshCw, Download, Info, BookOpen, Lightbulb, Code, Eye, Edit, Palette, Plus, Trash, Copy, AlertTriangle, Settings, Target } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import TreeView from './Treeview';
import ToolLayout from '@/components/ToolLayout';

type Theme = {
  background: string;
  string: string;
  number: string;
  boolean: string;
  null: string;
  key: string;
  size: string;
  type: string;
  group: string;
};

type JsonValue = string | number | boolean | null | JsonObject | JsonArray;
interface JsonObject {
  [key: string]: JsonValue;
}
type JsonArray = JsonValue[];


const themes: Record<string, Theme> = {
    'monokai': {
        background: 'bg-content1',
        string: 'text-success',
        number: 'text-primary',
        boolean: 'text-warning',
        null: 'text-danger',
        key: 'text-secondary',
        size: 'text-default-500',
        type: 'text-default-500',
        group: 'text-default-500',
      },
      'dracula': {
        background: 'bg-content2',
        string: 'text-success-400',
        number: 'text-secondary-400',
        boolean: 'text-warning-400',
        null: 'text-danger-400',
        key: 'text-primary-400',
        size: 'text-default-500',
        type: 'text-default-500',
        group: 'text-default-500',
      },
      'night-owl': {
        background: 'bg-background',
        string: 'text-success-300',
        number: 'text-primary-300',
        boolean: 'text-warning-300',
        null: 'text-danger-300',
        key: 'text-secondary-300',
        size: 'text-default-500',
        type: 'text-default-500',
        group: 'text-default-500',
      },
      'solarized-dark': {
        background: 'bg-content3',
        string: 'text-success-600',
        number: 'text-primary-600',
        boolean: 'text-warning-600',
        null: 'text-danger-600',
        key: 'text-secondary-600',
        size: 'text-default-600',
        type: 'text-default-600',
        group: 'text-default-600',
      },
      'github-dark': {
        background: 'bg-default-100',
        string: 'text-success-500',
        number: 'text-primary-500',
        boolean: 'text-warning-500',
        null: 'text-danger-500',
        key: 'text-secondary-500',
        size: 'text-default-500',
        type: 'text-default-500',
        group: 'text-default-500',
      },
      'nord': {
        background: 'bg-primary-900',
        string: 'text-success-400',
        number: 'text-primary-400',
        boolean: 'text-warning-400',
        null: 'text-danger-400',
        key: 'text-secondary-400',
        size: 'text-default-400',
        type: 'text-default-400',
        group: 'text-default-400',
      },
      'material-palenight': {
        background: 'bg-secondary-900',
        string: 'text-success-400',
        number: 'text-warning-400',
        boolean: 'text-warning-400',
        null: 'text-danger-400',
        key: 'text-primary-400',
        size: 'text-default-400',
        type: 'text-default-400',
        group: 'text-default-400',
      },
      'tokyo-night': {
        background: 'bg-primary-800',
        string: 'text-success-300',
        number: 'text-secondary-300',
        boolean: 'text-warning-300',
        null: 'text-danger-300',
        key: 'text-primary-300',
        size: 'text-default-400',
        type: 'text-default-400',
        group: 'text-default-400',
      },
      'high-contrast': {
        background: 'bg-default',
        string: 'text-foreground',
        number: 'text-warning-300',
        boolean: 'text-warning-300',
        null: 'text-warning-300',
        key: 'text-foreground',
        size: 'text-foreground',
        type: 'text-foreground',
        group: 'text-foreground',
      },
      'cyberpunk': {
        background: 'bg-secondary-800',
        string: 'text-success-400',
        number: 'text-secondary-400',
        boolean: 'text-warning-400',
        null: 'text-danger-400',
        key: 'text-primary-400',
        size: 'text-default-400',
        type: 'text-default-400',
        group: 'text-default-400',
      },
      'light': {
        background: 'bg-background',
        string: 'text-success-600',
        number: 'text-primary-600',
        boolean: 'text-warning-600',
        null: 'text-danger-600',
        key: 'text-secondary-600',
        size: 'text-default-600',
        type: 'text-default-600',
        group: 'text-default-600',
      }
    // Add more themes as needed
  }

export default function JSONViewerEditor() {
  const [jsonInput, setJsonInput] = useState<string>('');
  const [parsedJson, setParsedJson] = useState<JsonValue | null>(null);
  const [error, setError] = useState<string>('');
  const [theme, setTheme] = useState<keyof typeof themes>('monokai');
  const [iconStyle, setIconStyle] = useState<'triangle' | 'circle' | 'square' | 'arrow'>('triangle');
  const [indentWidth, setIndentWidth] = useState<0 | 1 | 2 | 3 | 4>(2);
  const [collapseBranches, setCollapseBranches] = useState<"don't collapse" | "collapse all" | "collapse after one branch" | "collapse after two branches">("don't collapse");
  const [collapseStringsAfterLength, setCollapseStringsAfterLength] = useState<number>(50);
  const [groupArraysAfterLength, setGroupArraysAfterLength] = useState(100);
  const [displayObjectSize, setDisplayObjectSize] = useState<boolean>(true);
  const [displayDataTypes, setDisplayDataTypes] = useState<boolean>(true);
  const [enableClipboard, setEnableClipboard] = useState<boolean>(true);
  const [enableEdit, setEnableEdit] = useState<boolean>(false);
  const [enableDelete, setEnableDelete] = useState<boolean>(false);
  const [enableAdd, setEnableAdd] = useState<boolean>(false);

  useEffect(() => {
    try {
      if (jsonInput) {
        const parsed = JSON.parse(jsonInput);
        setParsedJson(parsed);
        setError('');
      } else {
        setParsedJson(null);
      }
    } catch (err) {
      setError('Invalid JSON: ' + (err as Error).message);
      setParsedJson(null);
    }
  }, [jsonInput]);

  const handleEdit = (path: string[], value: JsonValue) => {
    const newData = JSON.parse(JSON.stringify(parsedJson));
    let current: JsonObject | JsonArray = newData;
  
    for (let i = 0; i < path.length - 1; i++) {
      if (typeof current === 'object' && current !== null) {
        current = (current as JsonObject)[path[i]] as JsonObject | JsonArray;
      } else {
        throw new Error("Invalid path; encountered a non-object/non-array element in the path.");
      }
    }
  
    if (typeof current === 'object' && current !== null) {
      (current as JsonObject)[path[path.length - 1]] = value;
    }
    setJsonInput(JSON.stringify(newData, null, 2));
  };

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTheme = event.target.value as keyof typeof themes;
    
    // Add a safety check to ensure the selected theme exists in the themes object
    if (themes[selectedTheme]) {
      setTheme(selectedTheme);
    } else {
      // Fallback to default theme if somehow an invalid theme is selected
      console.warn(`Theme ${selectedTheme} not found. Defaulting to monokai.`);
      setTheme('monokai');
    }
  };
  
  const handleDelete = (path: string[]) => {
    const newData = JSON.parse(JSON.stringify(parsedJson));
    let current: JsonObject | JsonArray = newData;
  
    for (let i = 0; i < path.length - 1; i++) {
      if (typeof current === 'object' && current !== null) {
        current = (current as JsonObject)[path[i]] as JsonObject | JsonArray;
      } else {
        throw new Error("Invalid path; encountered a non-object/non-array element in the path.");
      }
    }
  
    if (Array.isArray(current)) {
      current.splice(parseInt(path[path.length - 1]), 1);
    } else if (typeof current === 'object' && current !== null) {
      delete (current as JsonObject)[path[path.length - 1]];
    }
    setJsonInput(JSON.stringify(newData, null, 2));
  };
  
  const handleAdd = (path: string[], key: string, value: JsonValue) => {
    const newData = JSON.parse(JSON.stringify(parsedJson));
    let current: JsonObject | JsonArray = newData;
  
    for (const pathPart of path) {
      if (typeof current === 'object' && current !== null) {
        current = (current as JsonObject)[pathPart] as JsonObject | JsonArray;
      } else {
        throw new Error("Invalid path; encountered a non-object/non-array element in the path.");
      }
    }
  
    if (Array.isArray(current)) {
      current.push(value);
    } else if (typeof current === 'object' && current !== null) {
      (current as JsonObject)[key] = value;
    }
    setJsonInput(JSON.stringify(newData, null, 2));
  };

  return (
    <ToolLayout
      title="JSON Tree Viewer and Editor"
      description="A powerful tool to view, edit, and format JSON data with customizable options."
      toolId='678f383026f06f912191bcc9'
    >
      <Toaster position="top-right" />
      <div className="flex flex-col gap-8">
        {/* Input Section */}
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <Textarea
              value={jsonInput}
              label="Input JSON"
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder="Enter raw JSON data..."
              minRows={4}
              size="lg"
              className="mb-4"
              variant="bordered"
            />
            <div className="flex gap-4">
              <Button onClick={() => setJsonInput('')} color="danger" startContent={<RefreshCw className="h-5 w-5" />}>
                Reset
              </Button>
              <Button
                onClick={() => {
                  const element = document.createElement('a');
                  const file = new Blob([jsonInput], { type: 'application/json' });
                  element.href = URL.createObjectURL(file);
                  element.download = 'data.json';
                  document.body.appendChild(element);
                  element.click();
                  document.body.removeChild(element);
                }}
                color="primary"
                startContent={<Download className="h-5 w-5" />}
              >
                Download JSON
              </Button>
            </div>
            {error && <div className="text-red-500 mt-4">{error}</div>}
          </CardBody>
        </Card>

        {/* JSON Viewer Section */}
        {parsedJson && (
          <Card className="bg-default-50 dark:bg-default-100">
            <CardBody className="p-6">
              <div className={`rounded-md p-4 border border-default-200 overflow-auto max-h-[600px] ${themes[theme].background}`}>
                <TreeView
                  data={parsedJson}
                  theme={themes[theme]}
                  iconStyle={iconStyle}
                  indentWidth={indentWidth}
                  collapseBranches={collapseBranches}
                  collapseStringsAfterLength={collapseStringsAfterLength}
                  groupArraysAfterLength={groupArraysAfterLength}
                  displayObjectSize={displayObjectSize}
                  displayDataTypes={displayDataTypes}
                  enableClipboard={enableClipboard}
                  enableEdit={enableEdit}
                  enableDelete={enableDelete}
                  enableAdd={enableAdd}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onAdd={handleAdd}
                />
              </div>
            </CardBody>
          </Card>
        )}

        {/* Settings Section */}
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Select
                label="Theme"
                selectedKeys={[theme]}
                variant='bordered'
                onChange={handleThemeChange}
                className="w-full"
              >
                {Object.keys(themes).map((themeName) => (
                  <SelectItem 
                    key={themeName} 
                    value={themeName} 
                    className="text-default-700"
                  >
                    {themeName}
                  </SelectItem>
                ))}
              </Select>

              <Select
                label="Icon Style"
                selectedKeys={[iconStyle]}
                variant='bordered'
                onChange={(e) => setIconStyle(e.target.value as 'triangle' | 'circle')}
                className="w-full"
              >
                {['triangle', 'circle', 'square', 'arrow'].map((style) => (
                  <SelectItem key={style} value={style} className="text-default-700">
                    {style.charAt(0).toUpperCase() + style.slice(1)}
                  </SelectItem>
                ))}
              </Select>
              <Select
                id="indent-width"
                label="Indent Width"
                placeholder="Select indent width..."
                selectedKeys={new Set([indentWidth.toString()])}
                onSelectionChange={(keys) => {
                    const selected = Array.from(keys)[0];
                    setIndentWidth(Number(selected) as 0 | 1 | 2 | 3 | 4);
                }}
                className="max-w-xs"
                variant="bordered"
                listboxProps={{
                    className: "max-h-[200px] overflow-y-auto", // Control dropdown scrolling
                }}
                classNames={{
                    trigger: "bg-default-100 data-[hover=true]:bg-default-200",
                    listbox: "overflow-y-auto", // Ensure dropdown scrolling
                }}
                >
                {[0, 1, 2, 3, 4].map((width) => (
                    <SelectItem
                    key={width.toString()}
                    value={width.toString()}
                    textValue={width.toString()}
                    className="text-default-700 dark:text-default-600 hover:bg-default-100 dark:hover:bg-default-200"
                    >
                    {width}
                    </SelectItem>
                ))}
                </Select>

              <Select
                label="Collapse Branches"
                selectedKeys={[collapseBranches]}
                variant='bordered'
                onChange={(e) =>
                  setCollapseBranches(
                    e.target.value as "don't collapse" | "collapse all" | "collapse after one branch" | "collapse after two branches"
                  )
                }
                className="w-full"
              >
                {[
                  { value: "don't collapse", label: "Don't Collapse" },
                  { value: "collapse all", label: "Collapse All" },
                  { value: "collapse after one branch", label: "Collapse After One Branch" },
                  { value: "collapse after two branches", label: "Collapse After Two Branches" },
                ].map((option) => (
                  <SelectItem key={option.value} value={option.value} className="text-default-700">
                    {option.label}
                  </SelectItem>
                ))}
              </Select>
              <Select
                    id="group-arrays-after-length"
                    label="Group Arrays After Length"
                    placeholder="Select array group length..."
                    selectedKeys={new Set([groupArraysAfterLength.toString()])}
                    onSelectionChange={(keys) => {
                        const selected = Array.from(keys)[0];
                        setGroupArraysAfterLength(Number(selected));
                    }}
                    className="max-w-xs"
                    variant="bordered"
                    listboxProps={{
                        className: "max-h-[200px] overflow-y-auto", // Control dropdown scrolling
                    }}
                    classNames={{
                        trigger: "bg-default-100 data-[hover=true]:bg-default-200",
                        listbox: "overflow-y-auto", // Ensure dropdown scrolling
                    }}
                    >
                    {[10, 50, 100, 500, 1000].map((num) => (
                        <SelectItem
                        key={num.toString()}
                        value={num.toString()}
                        textValue={num.toString()}
                        className="text-default-700 dark:text-default-600 hover:bg-default-100 dark:hover:bg-default-200"
                        >
                        {num}
                        </SelectItem>
                    ))}
                    </Select>
                    <Select
                        id="collapse-strings-after-length"
                        label="Collapse Strings After Length"
                        placeholder="Select length..."
                        selectedKeys={new Set([collapseStringsAfterLength.toString()])}
                        onSelectionChange={(keys) => {
                            const selected = Array.from(keys)[0];
                            setCollapseStringsAfterLength(Number(selected));
                        }}
                        className="max-w-xs"
                        variant="bordered"
                        listboxProps={{
                            className: "max-h-[200px] overflow-y-auto", // Enable dropdown scrolling
                        }}
                        classNames={{
                            trigger: "bg-default-100 data-[hover=true]:bg-default-200",
                            listbox: "overflow-y-auto", // Ensure dropdown scrolling
                        }}
                        >
                        {[0, 5, 10, 15, 20].map((length) => (
                            <SelectItem
                            key={length.toString()}
                            value={length.toString()}
                            textValue={length.toString()}
                            className="text-default-700 dark:text-default-600 hover:bg-default-100 dark:hover:bg-default-200"
                            >
                            {length}
                            </SelectItem>
                        ))}
                        </Select>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              <Switch isSelected={displayObjectSize} onValueChange={setDisplayObjectSize}>
                Display Object Size
              </Switch>
              <Switch isSelected={displayDataTypes} onValueChange={setDisplayDataTypes}>
                Display Data Types
              </Switch>
              <Switch isSelected={enableClipboard} onValueChange={setEnableClipboard}>
                Enable Clipboard
              </Switch>
              <Switch isSelected={enableEdit} onValueChange={setEnableEdit}>
                Enable Edit
              </Switch>
              <Switch isSelected={enableDelete} onValueChange={setEnableDelete}>
                Enable Delete
              </Switch>
              <Switch isSelected={enableAdd} onValueChange={setEnableAdd}>
                Enable Add
              </Switch>
            </div>
          </CardBody>
        </Card>

        {/* Info Section */}
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <div className="rounded-xl p-2 md:p-4 max-w-4xl mx-auto">
              <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 flex items-center">
                <Info className="w-6 h-6 mr-2" />
                What is the JSON Tree Viewer and Editor?
              </h2>
              <p className="text-sm md:text-base text-default-600 mb-4">
              JSON Tree Viewer and Editor are a powerful tool that converts complex JSON data into an interactive, hierarchical tree view. This helps develop the developers, data analysts, and anyone working with JSON to easily imagine, navigate, and modify JSON structures with intuitive controls and adaptable performance options.
              </p>
              <p className="text-sm md:text-base text-default-600 mb-4">
              Whether you are debaging API reactions, checking configuration files, or creating JSON data structures from scratch, this tool offers user -friendly interfaces with comprehensive adaptation options to suit your specific requirements and preferences.
              </p>

              <div className="my-8">
                <Image
                src="/Images/InfosectionImages/JSONTreeViewerPreview.png?height=400&width=600"
                  alt="JSON Tree Viewer Interface showing a complex JSON structure with expandable nodes and syntax highlighting"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </div>

              <h2 id="how-to-use" className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <BookOpen className="w-6 h-6 mr-2" />
                How to Use the JSON Tree Viewer and Editor
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-sm md:text-base text-default-600">
                <li>Enter or paste your JSON data into the input text area.</li>
                <li>The tool automatically validates and parses your JSON, displaying any syntax errors if present.</li>
                <li>Once valid, your JSON appears as an interactive tree structure below the input area.</li>
                <li>Use the expand/collapse icons to navigate through nested objects and arrays.</li>
                <li>Customize the display using the settings panel to adjust themes, icons, and behavior.</li>
                <li>Enable editing features to modify, add, or delete properties directly in the tree view.</li>
                <li>Download your modified JSON data with a single click when finished.</li>
              </ol>

              <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Lightbulb className="w-6 h-6 mr-2" />
                Key Features
              </h2>
              <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-default-600">
                <li>
                  <Eye className="w-4 h-4 inline-block mr-1" /> <strong>Interactive Tree Visualization:</strong> Navigate
                  complex JSON structures with expandable/collapsible nodes
                </li>
                <li>
                  <Palette className="w-4 h-4 inline-block mr-1" /> <strong>Multiple Themes:</strong> Choose from 11 different
                  color schemes including Monokai, Dracula, Night Owl, and more
                </li>
                <li>
                  <Edit className="w-4 h-4 inline-block mr-1" /> <strong>In-place Editing:</strong> Modify JSON values directly
                  within the tree view
                </li>
                <li>
                  <Plus className="w-4 h-4 inline-block mr-1" /> <strong>Structure Modification:</strong> Add new properties or
                  array items to your JSON
                </li>
                <li>
                  <Trash className="w-4 h-4 inline-block mr-1" /> <strong>Property Deletion:</strong> Remove unwanted elements
                  from your JSON structure
                </li>
                <li>
                  <Copy className="w-4 h-4 inline-block mr-1" /> <strong>Clipboard Integration:</strong> Copy values or entire
                  branches to your clipboard
                </li>
                <li>
                  <Download className="w-4 h-4 inline-block mr-1" /> <strong>Export Functionality:</strong> Download your JSON
                  data as a file
                </li>
                <li>
                  <AlertTriangle className="w-4 h-4 inline-block mr-1" /> <strong>Real-time Validation:</strong> Instant
                  feedback on JSON syntax errors
                </li>
              </ul>

              <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Settings className="w-6 h-6 mr-2" />
                Customization Options
              </h2>
              <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-default-600">
                <li>
                  <strong>Visual Themes:</strong> Select from 11 different color schemes to match your preference or environment
                </li>
                <li>
                  <strong>Icon Styles:</strong> Choose between triangle, circle, square, or arrow icons for tree navigation
                </li>
                <li>
                  <strong>Indentation Width:</strong> Adjust the spacing between nested levels (0-4 spaces)
                </li>
                <li>
                  <strong>Branch Collapsing:</strong> Configure how deeply nested structures are initially expanded
                </li>
                <li>
                  <strong>String Handling:</strong> Set thresholds for when long strings should be collapsed
                </li>
                <li>
                  <strong>Array Grouping:</strong> Define when large arrays should be grouped for better performance
                </li>
                <li>
                  <strong>Display Options:</strong> Toggle visibility of object sizes and data types
                </li>
                <li>
                  <strong>Editing Features:</strong> Enable or disable editing, deletion, and addition capabilities
                </li>
              </ul>

              <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Code className="w-6 h-6 mr-2" />
                Technical Capabilities
              </h2>
              <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-default-600">
                <li>
                  <strong>Deep Object Traversal:</strong> Handles deeply nested JSON structures with ease
                </li>
                <li>
                  <strong>Large Dataset Support:</strong> Efficiently processes and displays large JSON files
                </li>
                <li>
                  <strong>Type-Aware Display:</strong> Visually distinguishes between strings, numbers, booleans, and null
                  values
                </li>
                <li>
                  <strong>Path Tracking:</strong> Maintains accurate path information for precise editing and navigation
                </li>
                <li>
                  <strong>Structural Preservation:</strong> Maintains your JSON structure during editing operations
                </li>
                <li>
                  <strong>Performance Optimizations:</strong> Implements smart rendering for large arrays and objects
                </li>
              </ul>

              <h2 className="text-xl md:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Target className="w-6 h-6 mr-2" />
                Practical Applications
              </h2>
              <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-default-600">
                <li>
                  <strong>API Development:</strong> Inspect and debug API responses with clarity
                </li>
                <li>
                  <strong>Configuration Management:</strong> Edit complex configuration files with confidence
                </li>
                <li>
                  <strong>Data Analysis:</strong> Explore and understand JSON data structures visually
                </li>
                <li>
                  <strong>Documentation:</strong> Generate clear visualizations of JSON schemas
                </li>
                <li>
                  <strong>Learning Tool:</strong> Understand JSON structure and hierarchy through visual representation
                </li>
                <li>
                  <strong>Quality Assurance:</strong> Validate and verify JSON data before implementation
                </li>
              </ul>

              <p className="text-sm md:text-base text-default-600 mt-6">
                Whether you're a developer working with APIs, a data analyst exploring JSON datasets, or anyone who needs to
                work with JSON data, our JSON Tree Viewer and Editor provides the perfect balance of powerful features and
                user-friendly design. Try it today to transform how you interact with JSON data!
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    </ToolLayout>
  );
}