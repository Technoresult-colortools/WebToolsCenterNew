'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Card, CardBody, Button, Select, SelectItem, Textarea, Switch } from "@nextui-org/react";
import { Copy, Download, Info, Lightbulb, BookOpen, RefreshCw, Upload, Link, Unlink, Check, FileText, AlertTriangle, Shield, X } from 'lucide-react';
import { toast } from 'react-hot-toast';
import ToolLayout from '@/components/ToolLayout';
import Image from 'next/image';

const MAX_FILE_SIZE_MB = 5; // 5MB limit

export default function URLEncoderDecoder() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [activeTab, setActiveTab] = useState("encode");
  const [fileName, setFileName] = useState("");
  const [encodeMode, setEncodeMode] = useState<'standard' | 'all' | 'component'>('standard');
  const [decodeMode, setDecodeMode] = useState<'standard' | 'plus' | 'component'>('standard');
  const [autoTrim, setAutoTrim] = useState(true);
  const [preserveLineBreaks, setPreserveLineBreaks] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (activeTab === 'encode') {
      handleEncode();
    } else {
      handleDecode();
    }
  }, [inputText, encodeMode, decodeMode, autoTrim, preserveLineBreaks]);

  const handleEncode = useCallback(() => {
    try {
      let encoded = inputText;
      if (autoTrim) {
        encoded = encoded.trim();
      }
      
      const lines = preserveLineBreaks ? encoded.split('\n') : [encoded];
      const encodedLines = lines.map(line => {
        if (encodeMode === 'all') {
          return encodeURIComponent(line);
        } else if (encodeMode === 'component') {
          return encodeURIComponent(line).replace(/%20/g, '+');
        } else {
          return line.replace(/[^a-zA-Z0-9-._~]/g, (char) => {
            return '%' + char.charCodeAt(0).toString(16).padStart(2, '0').toUpperCase();
          });
        }
      });

      setOutputText(encodedLines.join(preserveLineBreaks ? '\n' : ''));
    } catch {
      toast.error('Error encoding URL. Please check your input.');
    }
  }, [inputText, encodeMode, autoTrim, preserveLineBreaks]);

  const handleDecode = useCallback(() => {
    try {
      let decoded = inputText;
      if (autoTrim) {
        decoded = decoded.trim();
      }

      const lines = preserveLineBreaks ? decoded.split('\n') : [decoded];
      const decodedLines = lines.map(line => {
        if (decodeMode === 'plus') {
          line = line.replace(/\+/g, ' ');
        } else if (decodeMode === 'component') {
          return decodeURIComponent(line.replace(/\+/g, '%20'));
        }
        return decodeURIComponent(line);
      });

      setOutputText(decodedLines.join(preserveLineBreaks ? '\n' : ''));
    } catch {
      toast.error('Error decoding URL. Please check your input.');
    }
  }, [inputText, decodeMode, autoTrim, preserveLineBreaks]);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        toast.error(`File is too large. Maximum size is ${MAX_FILE_SIZE_MB}MB.`);
        return;
      }
  
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === 'string') {
          setInputText(result);
          detectEncoding(result);
          toast.success('File uploaded successfully!');
        }
      };
      reader.onerror = () => {
        toast.error('Error reading file. Please try again.');
      };
      reader.readAsText(file);
    }
  }, []);

  const detectEncoding = useCallback((text: string) => {
    const encodedRegex = /%[0-9A-Fa-f]{2}/;
    if (encodedRegex.test(text)) {
      setActiveTab('decode');
    } else {
      setActiveTab('encode');
    }
  }, []);

  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  }, []);

  const handleReset = useCallback(() => {
    setInputText("");
    setOutputText("");
    setFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    toast.success('All fields have been reset.');
  }, []);

  const validateURL = useCallback(() => {
    const urls = inputText.split('\n').filter(url => url.trim() !== '');
    const validUrls = urls.filter(url => {
      try {
        new URL(url);
        return true;
      } catch {
        return false;
      }
    });
    toast.success(`${validUrls.length} out of ${urls.length} URLs are valid.`);
  }, [inputText]);

  const handleDownload = useCallback(() => {
    const element = document.createElement('a');
    const file = new Blob([outputText], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${activeTab === 'encode' ? 'encoded' : 'decoded'}_urls.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success(`${activeTab === 'encode' ? 'Encoded' : 'Decoded'} URLs downloaded!`);
  }, [outputText, activeTab]);

  return (
    <ToolLayout
      title="URL Encoder/Decoder"
      description="Convert special characters in URLs into their encoded forms and vice versa"
      toolId='678f382f26f06f912191bcbb'
    >
      <div className="flex flex-col gap-8">
        {/* Input Section */}
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <div className="flex gap-4 mb-4">
              <Button
                onClick={() => setActiveTab('encode')}
                color={activeTab === 'encode' ? 'primary' : 'default'}
                startContent={<Link className="h-4 w-4" />}
              >
                Encode
              </Button>
              <Button
                onClick={() => setActiveTab('decode')}
                color={activeTab === 'decode' ? 'primary' : 'default'}
                startContent={<Unlink className="h-4 w-4" />}
              >
                Decode
              </Button>
            </div>

            <label className="block text-lg font-medium text-default-700 mb-2">
              {activeTab === 'encode' ? 'URL(s) to Encode' : 'Encoded URL(s) to Decode'}
            </label>
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={activeTab === 'encode' ? 'Enter URL(s) to encode...' : 'Enter encoded URL(s) to decode...'}
              minRows={4}
              size="lg"
              className="mb-4"
              variant="bordered"
            />

            <label className="block text-lg font-medium text-default-700 mb-2">
              {activeTab === 'encode' ? 'Encoded URL(s)' : 'Decoded URL(s)'}
            </label>
            <Textarea
              value={outputText}
              isReadOnly
              minRows={4}
              size="lg"
              className="mb-4"
              variant="bordered"
            />

            <div className="flex gap-4 mt-4">
              <Select
                label={activeTab === 'encode' ? 'Encode Mode' : 'Decode Mode'}
                className="flex-1"
                variant="bordered"
                selectedKeys={[activeTab === 'encode' ? encodeMode : decodeMode]}
                onChange={(e) => activeTab === 'encode' ? setEncodeMode(e.target.value as 'standard' | 'all' | 'component') : setDecodeMode(e.target.value as 'standard' | 'plus' | 'component')}
                classNames={{
                  trigger: "bg-default-100 data-[hover=true]:bg-default-200",
                }}
              >
                {activeTab === 'encode' ? (
                  <>
                    <SelectItem key="standard" value="standard" className="text-default-700">
                      Standard (RFC 3986)
                    </SelectItem>
                    <SelectItem key="all" value="all" className="text-default-700">
                      Encode All Characters
                    </SelectItem>
                    <SelectItem key="component" value="component" className="text-default-700">
                      Encode URI Component
                    </SelectItem>
                  </>
                ) : (
                  <>
                    <SelectItem key="standard" value="standard" className="text-default-700">
                      Standard
                    </SelectItem>
                    <SelectItem key="plus" value="plus" className="text-default-700">
                      Decode '+' as Space
                    </SelectItem>
                    <SelectItem key="component" value="component" className="text-default-700">
                      Decode URI Component
                    </SelectItem>
                  </>
                )}
              </Select>
            </div>

            <div className="flex gap-4 mt-4">
              <Switch
                isSelected={autoTrim}
                onValueChange={setAutoTrim}
                className="flex-1"
              >
                Auto Trim Whitespace
              </Switch>
              <Switch
                isSelected={preserveLineBreaks}
                onValueChange={setPreserveLineBreaks}
                className="flex-1"
              >
                Preserve Line Breaks
              </Switch>
            </div>
          </CardBody>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          <Button color="primary" onClick={() => copyToClipboard(outputText)} startContent={<Copy className="h-4 w-4" />}>
            Copy
          </Button>
          <Button color="primary" onClick={handleDownload} startContent={<Download className="h-4 w-4" />}>
            Download
          </Button>
          <Button color="danger" onClick={handleReset} startContent={<RefreshCw className="h-4 w-4" />}>
            Reset
          </Button>
          <Button color="primary" onClick={validateURL} startContent={<Check className="h-4 w-4" />}>
            Validate URL(s)
          </Button>
        </div>

        {/* File Upload Section */}
        <Card className="bg-default-50 dark:bg-default-100">
            <CardBody className="p-6">
                <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-default-700">
                    Upload File to Encode/Decode
                    </h3>
                    {fileName && (
                    <Button 
                        size="sm" 
                        variant="light" 
                        onClick={() => {
                        if (fileInputRef.current) fileInputRef.current.value = '';
                        }}
                        startContent={<X className="h-4 w-4" />}
                    >
                        Clear
                    </Button>
                    )}
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="w-full sm:w-3/4 relative">
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".txt,.html,.htm,.xml,.json"
                        onChange={handleFileUpload}
                        className="hidden"
                    />
                    <div className="w-full min-h-unit-16 flex items-center justify-center border-2 border-dashed border-default-200 rounded-lg hover:border-primary transition-colors duration-150 cursor-pointer p-4"
                        onClick={() => fileInputRef.current?.click()}>
                        <div className="flex flex-col items-center space-y-2">
                        <Upload className="w-8 h-8 text-default-400" />
                        <p className="text-default-600 text-sm">
                            Drag & drop or click to upload
                        </p>
                        </div>
                    </div>
                    </div>

                    <Button 
                    color="primary" 
                    className="w-full sm:w-auto"
                    onClick={() => fileInputRef.current?.click()}
                    startContent={<FileText className="h-4 w-4" />}
                    >
                    Select File
                    </Button>
                </div>

                {fileName && (
                    <div className="flex items-center gap-2 p-3 bg-default-100 rounded-lg">
                    <FileText className="h-5 w-5 text-primary" />
                    <span className="text-default-700 text-sm font-medium">
                        {fileName}
                    </span>
                    </div>
                )}

                <div className="flex flex-col gap-2 text-sm text-default-400">
                    <div className="flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    <span>Maximum file size: {MAX_FILE_SIZE_MB}MB</span>
                    </div>
                    <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>Supported formats: .txt, .html, .htm, .xml, .json</span>
                    </div>
                </div>
                </div>
            </CardBody>
            </Card>
      </div>

      {/* Info Section */}
      <Card className="mt-8 bg-default-50 dark:bg-default-100 p-4 md:p-8">
      <div className="rounded-xl p-2 md:p-4 max-w-4xl mx-auto">
        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 flex items-center">
          <Info className="w-6 h-6 mr-2" />
          About URL Encoder/Decoder
        </h2>
        <p className="text-sm md:text-base text-default-600 mb-4">
          The URL Encoder/Decoder is an advanced tool designed to convert special characters in URLs into their encoded forms (URL encoding) or decode them back into readable characters. URL encoding is essential for making URLs compatible with different browsers and ensuring safe transmission over the web.
        </p>

        <div className="my-8">
          <Image 
            src="/Images/URLEncoderPreview.png?height=400&width=600"  
            alt="Screenshot of the URL Encoder/Decoder interface" 
            width={600} 
            height={400}
            className="rounded-lg shadow-lg w-full h-auto"
          />
        </div>

        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <BookOpen className="w-6 h-6 mr-2" />
          How to Use URL Encoder/Decoder?
        </h2>
        <ol className="list-decimal list-inside space-y-2 text-sm md:text-base">
          <li>Choose between Encode and Decode tabs based on your needs.</li>
          <li>Enter your URL(s) or encoded URL(s) in the input area for processing.</li>
          <li>The tool will automatically process your input in real-time.</li>
          <li>To upload a file, click the "Upload File" button and select a text file (max 5MB) containing URLs or encoded content.</li>
          <li>Adjust your settings for encoding/decoding:</li>
          <ul className="list-disc list-inside ml-6">
            <li>Toggle "Auto Trim Whitespace" to clean up input.</li>
            <li>Toggle "Preserve Line Breaks" to maintain input structure.</li>
            <li>Select between "Standard", "Encode All Characters", or "Encode URI Component" modes for encoding.</li>
            <li>Select between "Standard", "Decode '+' as Space", or "Decode URI Component" modes for decoding.</li>
          </ul>
          <li>Use the "Validate URL(s)" button to check the validity of your URLs.</li>
          <li>Click the "Copy" button to quickly copy the result to your clipboard.</li>
          <li>Use the "Download Result" button to save the processed URLs as a text file.</li>
          <li>Click the "Reset" button to clear all inputs and start over.</li>
        </ol>

        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Lightbulb className="w-6 h-6 mr-2" />
          Tips and Best Practices
        </h2>
        <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
          <li>Use the "Auto Trim Whitespace" feature to ensure clean input, especially when pasting URLs from other sources.</li>
          <li>Enable "Preserve Line Breaks" when working with multiple URLs to maintain the structure of your input.</li>
          <li>For security purposes, always validate URLs before using them in production environments.</li>
          <li>Use the "Encode All Characters" mode to safely encode special characters not normally encoded by default.</li>
          <li>When decoding, enable the "Decode '+' as Space" option for URLs where '+' represents a space character (common in query parameters).</li>
          <li>Use the "Encode/Decode URI Component" modes when working with specific parts of a URL, such as query parameters.</li>
          <li>Utilize bulk processing for large lists of URLs to save time.</li>
          <li>Check the encoding format of files you upload to ensure proper decoding of special characters.</li>
        </ul>

        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <AlertTriangle className="w-6 h-6 mr-2" />
          Common Pitfalls and How to Avoid Them
        </h2>
        <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
          <li>Double encoding: Be cautious not to encode already encoded URLs. This can lead to issues when decoding.</li>
          <li>Incomplete decoding: Ensure you're using the correct decoding mode, especially when dealing with '+' characters or URI components.</li>
          <li>Ignoring character encoding: Be aware of the character encoding of your input, especially when uploading files.</li>
          <li>Overlooking URL structure: Remember that different parts of a URL (path, query, fragment) may require different encoding approaches.</li>
          <li>Forgetting to validate: Always validate your URLs after encoding to ensure they remain functional.</li>
        </ul>

        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
          <Shield className="w-6 h-6 mr-2" />
          Security Considerations
        </h2>
        <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
          <li>Be cautious when decoding unknown URLs, as they may contain malicious content or script injections.</li>
          <li>Always validate and sanitize URLs before using them in your applications, especially if they come from user input.</li>
          <li>Be aware of potential security vulnerabilities when handling encoded URLs in your application logic.</li>
          <li>Implement proper input validation and sanitization before processing URLs to prevent XSS attacks.</li>
          <li>Use appropriate encoding methods based on where the URL will be used (HTML context, JavaScript context, etc.).</li>
          <li>Consider implementing rate limiting when using the tool in production environments to prevent abuse.</li>
          <li>Keep your URL processing libraries and dependencies up to date to protect against known vulnerabilities.</li>
          <li>Implement proper error handling to prevent exposure of sensitive information in error messages.</li>
        </ul>
      </div>
    </Card>
    </ToolLayout>
  );
}
