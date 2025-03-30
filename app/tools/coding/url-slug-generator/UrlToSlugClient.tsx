"use client"

import React, { useState, useEffect } from 'react'
import {
  Button,
  Card,
  CardBody,
  Input,
  Switch,
  Select,
  SelectItem,
  Slider,
  Tooltip,

} from "@nextui-org/react"
import { Toaster, toast } from 'react-hot-toast'
import { BookOpen,  Info, Lightbulb, Download, Eye, EyeOff, AlertTriangle, Shield, Settings, RefreshCcw, Upload, Clipboard } from 'lucide-react'
import ToolLayout from '@/components/ToolLayout'
import Image from 'next/image'
import { FaMagic } from 'react-icons/fa'

const separators = [
  { value: 'hyphen', label: 'Hyphen (-)', char: '-' },
  { value: 'underscore', label: 'Underscore (_)', char: '_' },
  { value: 'dot', label: 'Dot (.)', char: '.' },
  { value: 'none', label: 'None', char: '' },
  { value: 'custom', label: 'Custom', char: '' },
]

const casings = [
  { value: 'lowercase', label: 'Lowercase' },
  { value: 'uppercase', label: 'Uppercase' },
  { value: 'capitalize', label: 'Capitalize' },
  { value: 'camelCase', label: 'camelCase' },
]

const transliterationOptions = [
  { value: 'none', label: 'None' },
  { value: 'latin', label: 'Latin' },
  { value: 'cyrillic', label: 'Cyrillic' },
  { value: 'greek', label: 'Greek' },
]

export default function URLSlugCreator() {
  const [input, setInput] = useState('')
  const [slug, setSlug] = useState('')
  const [separator, setSeparator] = useState('hyphen')
  const [customSeparator, setCustomSeparator] = useState('')
  const [casing, setCasing] = useState('lowercase')
  const [maxLength, setMaxLength] = useState(50)
  const [removeStopWords, setRemoveStopWords] = useState(true)
  const [customReplacements,] = useState('')
  const [preserveNumbers, setPreserveNumbers] = useState(true)
  const [transliteration, setTransliteration] = useState('none')
  const [showPassword, setShowPassword] = useState(false)

  const stopWords = ['a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by']

  useEffect(() => {
    generateSlug()
  }, [input, separator, customSeparator, casing, maxLength, removeStopWords, customReplacements, preserveNumbers, transliteration])

  const generateSlug = () => {
    let result = input.toLowerCase()
    const separatorChar = separator === 'custom' ? customSeparator : separators.find(sep => sep.value === separator)?.char || ''
  
    // Remove HTML tags
    result = result.replace(/<[^>]*>/g, '')
  
    // Handle custom replacements
    const replacements = customReplacements.split('\n').filter(line => line.includes(':'))
    replacements.forEach(replacement => {
      const [from, to] = replacement.split(':').map(s => s.trim())
      result = result.replace(new RegExp(from, 'g'), to)
    })
  
    // Remove stop words
    if (removeStopWords) {
      result = result.split(' ').filter(word => !stopWords.includes(word)).join(' ')
    }
  
    // Transliteration
    if (transliteration !== 'none') {
      result = transliterateText(result, transliteration)
    }
  
    // Replace non-alphanumeric characters with separator
    const regex = preserveNumbers ? /[^a-z0-9]+/g : /[^a-z]+/g
    result = result.replace(regex, separatorChar)
  
    // Remove leading/trailing separators
    if (separatorChar) {
      result = result.replace(new RegExp(`^${escapeRegExp(separatorChar)}+|${escapeRegExp(separatorChar)}+$`, 'g'), '')
    }
  
    // Apply casing
    if (casing === 'uppercase') {
      result = result.toUpperCase()
    } else if (casing === 'capitalize') {
      result = result.split(separatorChar).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(separatorChar)
    } else if (casing === 'camelCase') {
      result = result.split(separatorChar).map((word, index) => 
        index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
      ).join('')
    }
  
    // Truncate to max length
    if (result.length > maxLength) {
      result = result.slice(0, maxLength)
      if (separatorChar) {
        result = result.replace(new RegExp(`${escapeRegExp(separatorChar)}+$`), '')
      }
    }
  
    setSlug(result)
  }
  
  const escapeRegExp = (string: string): string => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  }

  const transliterateText = (text: string, type: string): string => {
    const latinMap: { [key: string]: string } = {'á':'a', 'é':'e', 'í':'i', 'ó':'o', 'ú':'u', 'ñ':'n'}
    const cyrillicMap: { [key: string]: string } = {'а':'a', 'б':'b', 'в':'v', 'г':'g', 'д':'d', 'е':'e', 'ё':'yo', 'ж':'zh', 'з':'z', 'и':'i', 'й':'y', 'к':'k', 'л':'l', 'м':'m', 'н':'n', 'о':'o', 'п':'p', 'р':'r', 'с':'s', 'т':'t', 'у':'u', 'ф':'f', 'х':'h', 'ц':'ts', 'ч':'ch', 'ш':'sh', 'щ':'sch', 'ъ':'', 'ы':'y', 'ь':'', 'э':'e', 'ю':'yu', 'я':'ya'}
    const greekMap: { [key: string]: string } = {'α':'a', 'β':'b', 'γ':'g', 'δ':'d', 'ε':'e', 'ζ':'z', 'η':'i', 'θ':'th', 'ι':'i', 'κ':'k', 'λ':'l', 'μ':'m', 'ν':'n', 'ξ':'ks', 'ο':'o', 'π':'p', 'ρ':'r', 'σ':'s', 'τ':'t', 'υ':'y', 'φ':'f', 'χ':'x', 'ψ':'ps', 'ω':'o'}
    
    let map: { [key: string]: string }
    switch(type) {
      case 'latin':
        map = latinMap
        break
      case 'cyrillic':
        map = cyrillicMap
        break
      case 'greek':
        map = greekMap
        break
      default:
        return text
    }
    
    return text.replace(/[^A-Za-z0-9\s]/g, a => map[a] || a)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(slug).then(() => {
      toast.success('Slug copied to clipboard!')
    }).catch(() => {
      toast.error('Failed to copy slug. Please try again.')
    })
  }

  const handleRandomize = () => {
    const randomWords = ['quick', 'brown', 'fox', 'jumps', 'over', 'lazy', 'dog', 'lorem', 'ipsum', 'dolor', 'sit', 'amet']
    const randomInput = Array.from({ length: 5 }, () => randomWords[Math.floor(Math.random() * randomWords.length)]).join(' ')
    setInput(randomInput)
  }

  const handleDownload = () => {
    const element = document.createElement('a')
    const file = new Blob([slug], {type: 'text/plain'})
    element.href = URL.createObjectURL(file)
    element.download = 'url_slug.txt'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
    toast.success('Slug downloaded successfully!')
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const content = e.target?.result as string
        setInput(content)
        toast.success('File uploaded successfully!')
      }
      reader.readAsText(file)
    }
  }

  return (
    <ToolLayout
      title="URL Slug Creator"
      description="Convert any text into a clean, SEO-friendly URL slug"
      toolId="678f382e26f06f912191bcb7"
    >
      <Toaster position="top-right" />
      <div className="flex flex-col gap-6">
   {/* Input and Slug Generation Section */}
   <Card className="w-full bg-default-50/70 dark:bg-default-100/70 backdrop-blur-sm border border-default-200/50">
        <CardBody className="space-y-6 p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-default-700 flex items-center">
                <FaMagic className="w-6 h-6 mr-2 text-primary" />
                Slug Generator
              </h2>
              <Button 
                size="sm" 
                color="success" 
                variant="flat" 
                onPress={handleRandomize}
                className="flex items-center"
              >
                <RefreshCcw className="w-4 h-4 mr-2" />
                Randomize
              </Button>
            </div>

            {/* Input Section */}
            <div className="space-y-2">
              <label className="text-default-700 font-medium">Input Text</label>
              <div className="relative">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  variant="bordered"
                  placeholder="Enter text to convert to a slug"
                  type={showPassword ? "text" : "password"}
                  className="w-full"
                  classNames={{
                    input: "placeholder:text-default-400/70",
                    
                  }}
                  endContent={
                    <button 
                      onClick={() => setShowPassword(!showPassword)} 
                      className="text-default-400 hover:text-primary transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  }
                />
              </div>
            </div>

            {/* Slug Output Section */}
            <div className="space-y-2">
              <label className="text-default-700 font-medium">Generated Slug</label>
              <div className="flex space-x-2">
                <Input 
                  value={slug} 
                  variant="bordered" 
                  readOnly 
                  className="flex-grow"
                  classNames={{
                    input: "text-primary font-mono",
                    
                  }}
                />
                <Button 
                  color="primary" 
                  variant="solid" 
                  isIconOnly
                  onPress={copyToClipboard}
                  aria-label="Copy Slug"
                >
                  <Clipboard className="w-5 h-5" />
                </Button>
                <Button 
                  color="secondary" 
                  variant="solid" 
                  isIconOnly
                  onPress={handleDownload}
                  aria-label="Download Slug"
                >
                  <Download className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Configuration Section */}
      <Card className="w-full bg-default-50/70 dark:bg-default-100/70 backdrop-blur-sm border border-default-200/50">
        <CardBody className="space-y-6 p-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-default-700 flex items-center">
              <Settings className="w-6 h-6 mr-2 text-primary" />
              Slug Configuration
            </h2>

            {/* Configuration Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Separator Configuration */}
              <div className="space-y-2">
                <label className="text-default-700 font-medium">Separator</label>
                <Select
                  selectedKeys={[separator]}
                  variant='bordered'
                  onChange={(e) => setSeparator(e.target.value)}
                >
                  {separators.map((sep) => (
                    <SelectItem key={sep.value} value={sep.value} className="text-default-700">
                      {sep.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>

              {/* Custom Separator (if selected) */}
              {separator === 'custom' && (
                <div className="space-y-2">
                  <label className="text-default-700 font-medium">Custom Separator</label>
                  <Input
                    value={customSeparator}
                    variant='bordered'
                    onChange={(e) => setCustomSeparator(e.target.value)}
                    placeholder="Enter custom separator"
                 
                  />
                </div>
              )}

              {/* Casing */}
              <div className="space-y-2">
                <p className="text-default-700 mb-2">Casing</p>
                <Select
                  selectedKeys={[casing]}
                  variant='bordered'
                  onChange={(e) => setCasing(e.target.value)}
                >
                  {casings.map((c) => (
                    <SelectItem key={c.value} value={c.value} className="text-default-700">
                      {c.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>

              {/* Transliteration */}
              <div className="space-y-2">
                <p className="text-default-700 mb-2">Transliteration</p>
                <Select
                  selectedKeys={[transliteration]}
                  variant='bordered'
                  onChange={(e) => setTransliteration(e.target.value)}
                >
                  {transliterationOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="text-default-700">
                      {option.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            </div>
  
            {/* Maximum Length Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <p className="text-default-700">Maximum Length: {maxLength}</p>
                <span className="text-default-500 text-sm">(10-100 characters)</span>
              </div>
              <Slider
                aria-label="Maximum Length"
                step={1}
                maxValue={100}
                minValue={10}
                value={maxLength}
                onChange={(value) => setMaxLength(value as number)}
         
              />
            </div>
  
            {/* Toggle Switches */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Switch
                    isSelected={removeStopWords}
                    onValueChange={setRemoveStopWords}
                    color="primary"
                  />
                  <label className="text-default-700">Remove Stop Words</label>
                </div>
                <Tooltip content="Removes common words like 'and', 'the', 'is' from text." className="text-default-700">
                  <Info className="text-default-400 w-4 h-4 cursor-pointer" />
                </Tooltip>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Switch
                    isSelected={preserveNumbers}
                    onValueChange={setPreserveNumbers}
                    color="primary"
                  />
                  <label className="text-default-700">Preserve Numbers</label>
                </div>
                <Tooltip content="Keeps numbers in the text instead of filtering them out." className="text-default-700">
                  <Info className="text-default-400 w-4 h-4 cursor-pointer" />
                </Tooltip>
              </div>
            </div>
  
            {/* File Upload */}
            <div className="space-y-2">
              <p className="text-default-700 mb-2">Upload File</p>
              <label className="flex flex-col items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary transition">
                <input 
                  type="file" 
                  className="hidden" 
                  onChange={handleFileUpload} 
                />
                <Upload className="h-6 w-6 text-gray-500" />
                <span className="text-gray-500 text-sm mt-2">Choose a file</span>
              </label>
            </div>
          </div>
        </CardBody>
      </Card>
     

       {/* Info Section */}
        <Card className="bg-default-50 dark:bg-default-100">
        <CardBody className="p-6">
        <div className="rounded-xl  p-2 md:p-4 max-w-4xl mx-auto">
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 flex items-center">
            <Info className="w-6 h-6 mr-2" />
            What is the URL Slug Creator?
            </h2>
            <p className="text-sm md:text-base text-default-600 mb-4">
            The URL slug creator is an advanced tool designed to convert any text into a clean, SEO-friendly URL slug. It offers a wide range of adapt options to meet the needs of various slug generation, making it ideal for any web application requiring material management systems, blogs, e-commerce platforms and URL-friendly text conversion.
            </p>
            <p className="text-sm md:text-base text-default-600 mb-4">
            With support for many dividers, covering options, and advanced features such as translitation and custom replacement, it is like a Swiss army knife for the URL generation on your fingers. Say goodbye to manual slug creations and hello to efficiency!
            </p>

            <div className="my-8">
            <Image
                src="/Images/InfosectionImages/URLSlugPreview.png?height=400&width=600"
                alt="Screenshot of the URL Slug Creator interface"
                width={600}
                height={400}
                className="rounded-lg shadow-lg w-full h-auto"
            />
            </div>

            <h2 id="how-to-use" className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
            <BookOpen className="w-6 h-6 mr-2" />
            How to Use the URL Slug Creator?
            </h2>
            <p className="text-sm md:text-base text-default-600 mb-4">
            Using our URL Slug Creator is as easy as 1-2-3. Here's a quick guide to get you started:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-sm md:text-base">
            <li>Enter or paste your text in the input field, or upload a file containing the text.</li>
            <li>The slug is automatically generated based on your settings.</li>
            <li>Customize your slug with the following options:</li>
            <ul className="list-disc list-inside ml-6">
                <li>Select a separator character or use a custom separator.</li>
                <li>Choose the desired casing style.</li>
                <li>Set the maximum length for the slug.</li>
                <li>Toggle options like removing stop words and preserving numbers.</li>
                <li>Select a transliteration option if needed.</li>
                <li>Add custom replacements for specific characters or words.</li>
            </ul>
            <li>Use the "Randomize" button to generate a random slug for testing.</li>
            <li>Click "Copy" to copy the slug to your clipboard or "Download" to save it as a file.</li>
            <li>For sensitive content, use the password visibility toggle to protect your input.</li>
            </ol>

            <h2 id="key-features" className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
            <Settings className="w-6 h-6 mr-2" />
            Key Features
            </h2>
            <ul className="list-disc list-inside space-y-2 text-xs md:text-sm">
            <li><strong>Convert any text input into URL-friendly slugs</strong>: Easily transform any text into a clean, URL-friendly format.</li>
            <li><strong>Multiple separator options</strong>: Choose from hyphen, underscore, dot, none, or even a custom separator.</li>
            <li><strong>Casing options</strong>: Select from lowercase, uppercase, capitalize, or camelCase for your slugs.</li>
            <li><strong>Adjustable maximum length</strong>: Set a limit to keep your slugs concise and manageable.</li>
            <li><strong>Remove common stop words</strong>: Clean up your slugs by automatically removing unnecessary words.</li>
            <li><strong>Custom character/word replacement</strong>: Replace specific characters or words to meet your needs.</li>
            <li><strong>Preserve numbers</strong>: Keep numeric content intact when generating slugs.</li>
            <li><strong>Transliteration support</strong>: Handle Latin, Cyrillic, and Greek characters seamlessly.</li>
            <li><strong>Random input generation</strong>: Test the tool with random inputs for quick experimentation.</li>
            <li><strong>One-click copy to clipboard</strong>: Easily copy your generated slug for immediate use.</li>
            <li><strong>Download as a text file</strong>: Save your slugs for later use or bulk processing.</li>
            <li><strong>File upload support</strong>: Process multiple slugs at once by uploading a file.</li>
            <li><strong>Password visibility toggle</strong>: Protect sensitive content with a password toggle feature.</li>
            </ul>

            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
            <Lightbulb className="w-6 h-6 mr-2" />
            Best Practices and Tips
            </h2>
            <ul className="list-disc list-inside space-y-2 text-xs md:text-sm">
            <li><strong>Use hyphens as separators</strong>: Search engines prefer hyphens for better SEO.</li>
            <li><strong>Keep slugs concise</strong>: Remove stop words and set a reasonable maximum length.</li>
            <li><strong>Use lowercase for consistency</strong>: Lowercase slugs are easier to read and maintain.</li>
            <li><strong>Preserve numbers when necessary</strong>: Keep numbers in slugs when they carry significant meaning (e.g., product codes, years).</li>
            <li><strong>Utilize transliteration</strong>: Improve global accessibility by converting non-Latin characters.</li>
            <li><strong>Test with different inputs</strong>: Ensure your slugs work well for various content types.</li>
            <li><strong>Use custom replacements wisely</strong>: Maintain brand consistency by replacing specific characters or words (e.g., "&" with "and").</li>
            <li><strong>Consider camelCase for programming-related content</strong>: Use camelCase when separators are undesired.</li>
            </ul>

            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
            <AlertTriangle className="w-6 h-6 mr-2" />
            Common Pitfalls and How to Avoid Them
            </h2>
            <ul className="list-disc list-inside space-y-2 text-xs md:text-sm">
            <li><strong>Overly long slugs</strong>: Set a reasonable maximum length to keep URLs manageable.</li>
            <li><strong>Loss of meaning</strong>: Be cautious when removing stop words or shortening slugs to maintain context.</li>
            <li><strong>Duplicate slugs</strong>: Implement a system to handle duplicate slugs (e.g., by appending numbers).</li>
            <li><strong>Inconsistent formatting</strong>: Stick to a consistent style across your website for better user experience.</li>
            <li><strong>Ignoring international characters</strong>: Use transliteration to handle non-Latin alphabets effectively.</li>
            <li><strong>Overuse of custom replacements</strong>: Keep replacements minimal and meaningful to avoid confusion.</li>
            </ul>

            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
            <Shield className="w-6 h-6 mr-2" />
            Security Considerations
            </h2>
            <ul className="list-disc list-inside space-y-2 text-xs md:text-sm">
            <li><strong>Sanitize input</strong>: Prevent XSS attacks by sanitizing input when displaying slugs in web applications.</li>
            <li><strong>Validate file uploads</strong>: Implement proper validation to prevent security risks with file uploads.</li>
            <li><strong>Use password visibility toggle wisely</strong>: Protect sensitive content with the password toggle feature.</li>
            <li><strong>Implement rate limiting</strong>: Prevent abuse of the slug generation API by adding rate limits.</li>
            <li><strong>Regular updates</strong>: Maintain the tool to address potential security vulnerabilities.</li>
            </ul>

            <p className="text-sm md:text-base text-default-600 mt-4">
            The URL Slug Creator is a powerful tool for generating clean, SEO-friendly URLs. By understanding its features and following best practices, you can create effective slugs that improve your website's usability and search engine performance. Remember to always consider your specific use case and adjust the settings accordingly for optimal results.
            </p>
        </div>
        </CardBody>
        </Card>
        </div>
    </ToolLayout>
  )
}
