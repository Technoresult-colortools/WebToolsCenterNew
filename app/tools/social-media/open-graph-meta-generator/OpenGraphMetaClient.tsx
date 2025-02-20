"use client"

import { useState } from "react"
import {
  Copy,
  RefreshCw,
  Share2,
  Globe,
  Newspaper,
  Book,
  User,
  Music,
  Film,
  Tv,
  Radio,
  PlayCircle,
  FileText,
  Info,
  Lightbulb,
  BookOpen,
  Eye,
} from "lucide-react"
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Textarea,
  Switch,
  Select,
  SelectItem,
  Image,
} from "@nextui-org/react"
import { toast, } from "react-hot-toast"
import NextImage from 'next/image'
import ToolLayout from "@/components/ToolLayout"

const ogTypes = [
  { value: "website", label: "Website", icon: Globe },
  { value: "article", label: "Article", icon: Newspaper },
  { value: "book", label: "Book", icon: Book },
  { value: "profile", label: "Profile", icon: User },
  { value: "music.song", label: "Song", icon: Music },
  { value: "music.album", label: "Album", icon: Music },
  { value: "music.playlist", label: "Playlist", icon: Music },
  { value: "music.radio_station", label: "Radio Station", icon: Radio },
  { value: "video.movie", label: "Movie", icon: Film },
  { value: "video.episode", label: "Episode", icon: PlayCircle },
  { value: "video.tv_show", label: "TV Show", icon: Tv },
  { value: "video.other", label: "Other Video", icon: Film },
]

export default function OpenGraphGenerator() {
  const [type, setType] = useState("website")
  const [metadata, setMetadata] = useState({
    title: "",
    url: "",
    image: "",
    description: "",
    siteName: "",
    locale: "en_US",
    determiner: "auto",
    videoUrl: "",
    audioUrl: "",
    // Article specific
    author: "",
    publishedTime: "",
    modifiedTime: "",
    section: "",
    tags: "",
    // Book specific
    isbn: "",
    bookReleaseDate: "",
    bookAuthor: "",
    // Profile specific
    firstName: "",
    lastName: "",
    username: "",
    gender: "",
    // Music specific
    musicDuration: "",
    album: "",
    musician: "",
    // Video specific
    actors: "",
    director: "",
    writer: "",
    videoDuration: "",
    videoReleaseDate: "",
    series: "",
  })
  const [showOptional, setShowOptional] = useState(false)

  const handleChange = (name: string, value: string) => {
    setMetadata((prev) => ({ ...prev, [name]: value }))
  }

  const generateMetaTags = () => {
    let tags = `<meta property="og:type" content="${type}" />\n`
    tags += `<meta property="og:title" content="${metadata.title}" />\n`
    tags += `<meta property="og:url" content="${metadata.url}" />\n`
    tags += `<meta property="og:image" content="${metadata.image}" />\n`

    if (metadata.description) {
      tags += `<meta property="og:description" content="${metadata.description}" />\n`
    }
    if (metadata.siteName) {
      tags += `<meta property="og:site_name" content="${metadata.siteName}" />\n`
    }
    if (metadata.locale) {
      tags += `<meta property="og:locale" content="${metadata.locale}" />\n`
    }
    if (metadata.determiner !== "auto") {
      tags += `<meta property="og:determiner" content="${metadata.determiner}" />\n`
    }
    if (metadata.videoUrl) {
      tags += `<meta property="og:video" content="${metadata.videoUrl}" />\n`
    }
    if (metadata.audioUrl) {
      tags += `<meta property="og:audio" content="${metadata.audioUrl}" />\n`
    }

    // Type-specific meta tags
    switch (type) {
      case "article":
        if (metadata.author) tags += `<meta property="article:author" content="${metadata.author}" />\n`
        if (metadata.publishedTime)
          tags += `<meta property="article:published_time" content="${metadata.publishedTime}" />\n`
        if (metadata.modifiedTime)
          tags += `<meta property="article:modified_time" content="${metadata.modifiedTime}" />\n`
        if (metadata.section) tags += `<meta property="article:section" content="${metadata.section}" />\n`
        if (metadata.tags) {
          metadata.tags.split(",").forEach((tag) => {
            tags += `<meta property="article:tag" content="${tag.trim()}" />\n`
          })
        }
        break
      case "book":
        if (metadata.isbn) tags += `<meta property="book:isbn" content="${metadata.isbn}" />\n`
        if (metadata.bookReleaseDate)
          tags += `<meta property="book:release_date" content="${metadata.bookReleaseDate}" />\n`
        if (metadata.bookAuthor) tags += `<meta property="book:author" content="${metadata.bookAuthor}" />\n`
        break
      case "profile":
        if (metadata.firstName) tags += `<meta property="profile:first_name" content="${metadata.firstName}" />\n`
        if (metadata.lastName) tags += `<meta property="profile:last_name" content="${metadata.lastName}" />\n`
        if (metadata.username) tags += `<meta property="profile:username" content="${metadata.username}" />\n`
        if (metadata.gender) tags += `<meta property="profile:gender" content="${metadata.gender}" />\n`
        break
      case "video.movie":
      case "video.episode":
      case "video.tv_show":
      case "video.other":
        if (metadata.actors) tags += `<meta property="video:actor" content="${metadata.actors}" />\n`
        if (metadata.director) tags += `<meta property="video:director" content="${metadata.director}" />\n`
        if (metadata.videoDuration) tags += `<meta property="video:duration" content="${metadata.videoDuration}" />\n`
        if (metadata.videoReleaseDate)
          tags += `<meta property="video:release_date" content="${metadata.videoReleaseDate}" />\n`
        if (metadata.series) tags += `<meta property="video:series" content="${metadata.series}" />\n`
        break
      case "music.song":
      case "music.album":
      case "music.playlist":
        if (metadata.musician) tags += `<meta property="music:musician" content="${metadata.musician}" />\n`
        if (metadata.musicDuration) tags += `<meta property="music:duration" content="${metadata.musicDuration}" />\n`
        if (metadata.album) tags += `<meta property="music:album" content="${metadata.album}" />\n`
        break
    }

    return tags
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateMetaTags())
    toast.success("Meta tags copied to clipboard!")
  }

  const resetForm = () => {
    setMetadata({
      title: "",
      url: "",
      image: "",
      description: "",
      siteName: "",
      locale: "en_US",
      determiner: "auto",
      videoUrl: "",
      audioUrl: "",
      author: "",
      publishedTime: "",
      modifiedTime: "",
      section: "",
      tags: "",
      isbn: "",
      bookReleaseDate: "",
      bookAuthor: "",
      firstName: "",
      lastName: "",
      username: "",
      gender: "",
      musicDuration: "",
      album: "",
      musician: "",
      actors: "",
      director: "",
      writer: "",
      videoDuration: "",
      videoReleaseDate: "",
      series: "",
    })
    setType("website")
    toast.success("Form reset successfully!")
  }

  return (
    <ToolLayout
      title="Open Graph Meta Generator"
      description="Generate Open Graph meta tags for your website to control how your content appears when shared on social media"
      toolId="678f383226f06f912191bcda"
    >
      <div className="max-w-4xl mx-auto space-y-8">
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Select label="Content Type" variant="bordered" selectedKeys={[type]} onChange={(e) => setType(e.target.value)}>
                  {ogTypes.map(({ value, label, icon: Icon }) => (
                    <SelectItem key={value} value={value} startContent={<Icon className="w-4 h-4" />} className="text-default-700">
                      {label}
                    </SelectItem>
                  ))}
                </Select>
              </div>

              <Input
                label="Title"
                value={metadata.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="Enter title"
                isRequired
                variant="bordered"
              />

              <Input
                label="URL"
                value={metadata.url}
                onChange={(e) => handleChange("url", e.target.value)}
                placeholder="https://example.com"
                isRequired
                variant="bordered"
              />

              <Input
                label="Image URL"
                value={metadata.image}
                onChange={(e) => handleChange("image", e.target.value)}
                placeholder="https://example.com/image.jpg"
                isRequired
                variant="bordered"
              />

              <Textarea
                label="Description"
                value={metadata.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Enter description"
                className="md:col-span-2"
                variant="bordered"
              />

              <div className="md:col-span-2 flex items-center space-x-2">
                <Switch checked={showOptional} onChange={(e) => setShowOptional(e.target.checked)} />
                <span className="text-sm">{showOptional ? "Hide" : "Show"} Optional Fields</span>
              </div>

              {showOptional && (
                <>
                  <Input
                    label="Site Name"
                    value={metadata.siteName}
                    onChange={(e) => handleChange("siteName", e.target.value)}
                    placeholder="Your Site Name"
                    variant="bordered"
                  />
                  <Input
                    label="Locale"
                    value={metadata.locale}
                    onChange={(e) => handleChange("locale", e.target.value)}
                    placeholder="en_US"
                    variant="bordered"
                  />
                  <Select
                    label="Determiner"
                    selectedKeys={[metadata.determiner]}
                    onChange={(e) => handleChange("determiner", e.target.value)}
                    variant="bordered"
                  >
                    <SelectItem key="auto" value="auto" className="text-default-700">
                      Auto
                    </SelectItem>
                    <SelectItem key="a" value="a" className="text-default-700">
                      A
                    </SelectItem>
                    <SelectItem key="an" value="an" className="text-default-700">
                      An
                    </SelectItem>
                    <SelectItem key="the" value="the" className="text-default-700">
                      The
                    </SelectItem>
                  </Select>
                  <Input
                    label="Video URL"
                    value={metadata.videoUrl}
                    onChange={(e) => handleChange("videoUrl", e.target.value)}
                    placeholder="https://example.com/video.mp4"
                    variant="bordered"
                  />
                  <Input
                    label="Audio URL"
                    value={metadata.audioUrl}
                    onChange={(e) => handleChange("audioUrl", e.target.value)}
                    placeholder="https://example.com/audio.mp3"
                    variant="bordered"
                  />
                  <Input
                    label="Section"
                    value={metadata.section}
                    onChange={(e) => handleChange("section", e.target.value)}
                    variant="bordered"
                    />
                    
                    <Input
                    label="Tags (comma-separated)"
                    value={metadata.tags}
                    onChange={(e) => handleChange("tags", e.target.value)}
                    placeholder="tag1, tag2, tag3"
                    
                    variant="bordered"
                    />
                  
                </>
              )}

              {/* Conditional fields based on type */}
              {type === "article" && (
                <div className="flex flex-col gap-4">
                    <Input
                    label="Author"
                    value={metadata.author}
                    onChange={(e) => handleChange("author", e.target.value)}
                    variant="bordered"
                    />
                    
                    {/* Published & Modified Time - Labels Outside */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-default-700">Published Time</label>
                        <Input
                        type="datetime-local"
                        value={metadata.publishedTime}
                        onChange={(e) => handleChange("publishedTime", e.target.value)}
                        variant="bordered"
                        size="lg"
                        />
                    </div>
                    
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-default-700">Modified Time</label>
                        <Input
                        type="datetime-local"
                        value={metadata.modifiedTime}
                        onChange={(e) => handleChange("modifiedTime", e.target.value)}
                        variant="bordered"
                        size="lg"
                        />
                    </div>
                    </div>
                    
                    
                </div>
                )}


              {/* Add more conditional fields for other types */}
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button color="danger" variant="flat" onPress={resetForm} startContent={<RefreshCw />}>
                Reset
              </Button>
              <Button color="primary" onPress={copyToClipboard} startContent={<Copy />}>
                Copy Meta Tags
              </Button>
            </div>

            <Card>
              <CardBody>
                <pre className="text-sm whitespace-pre-wrap bg-default-100 p-4 rounded-lg overflow-x-auto">
                  {generateMetaTags()}
                </pre>
              </CardBody>
            </Card>
          </CardBody>
        </Card>

        <Card className="bg-default-50 dark:bg-default-100">
          <CardHeader>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <FileText className="w-6 h-6" />
              Preview
            </h2>
          </CardHeader>
          <CardBody>
            <div className="border border-default-200 rounded-lg p-4 space-y-4">
              {metadata.image && (
                <Image
                  src={metadata.image || "/placeholder.svg"}
                  alt="OG Preview"
                  className="w-full max-w-lg mx-auto rounded-lg"
                
                />
              )}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">{metadata.title || "Your Title Here"}</h3>
                <p className="text-sm text-default-600">
                  {metadata.description || "Your description will appear here"}
                </p>
                <p className="text-xs text-default-500">{metadata.url || "https://example.com"}</p>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* About section */}
        <Card className="mt-8 bg-default-50 dark:bg-default-100 p-4 md:p-8">
        <div className="rounded-xl p-2 md:p-4 max-w-4xl mx-auto">
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 flex items-center">
            <Info className="w-6 h-6 mr-2" />
            About Open Graph Meta Generator
            </h2>
            <p className="text-sm md:text-base text-default-600 mb-4">
            The Open Graph Meta Generator is a powerful tool designed to help you create accurate and comprehensive Open Graph meta tags for your web content. These meta tags control how your content appears when shared on social media platforms, ensuring your links look great and attract more clicks.
            </p>

            <div className="my-8">
            <NextImage
                src="/Images/OpenGraphMetaPreview.png"
                alt="Screenshot of the Open Graph Meta Generator interface showing input fields and preview"
                width={600}
                height={400}
                className="rounded-lg shadow-lg w-full h-auto"
            />
            </div>

            <h2 id="key-features" className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
            <Lightbulb className="w-6 h-6 mr-2" />
            Key Features
            </h2>
            <ul className="list-disc list-inside space-y-2 text-xs md:text-sm">
            <li>Support for various content types including websites, articles, books, profiles, music, and videos.</li>
            <li>Easy-to-use interface for inputting essential Open Graph properties.</li>
            <li>Optional fields for more detailed meta tags.</li>
            <li>Real-time preview of how your content will appear when shared.</li>
            <li>One-click copying of generated meta tags.</li>
            <li>Responsive design for use on any device.</li>
            </ul>

            <h2 id="how-to-use" className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
            <BookOpen className="w-6 h-6 mr-2" />
            How to Use the Open Graph Meta Generator?
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-sm md:text-base">
            <li>Select the content type that best matches your page from the dropdown menu.</li>
            <li>Fill in the required fields: Title, URL, and Image URL. These are marked as required.</li>
            <li>Add a description to provide context for your shared content.</li>
            <li>Toggle the "Show Optional Fields" switch to access additional properties like Site Name, Locale, and more.</li>
            <li>Fill in any relevant optional fields based on your content type.</li>
            <li>Watch the preview update in real-time to see how your content will appear when shared.</li>
            <li>Review the generated meta tags in the code box below the form.</li>
            <li>Click the "Copy Meta Tags" button to copy the generated tags to your clipboard.</li>
            <li>Paste the meta tags into the &lt;head&gt; section of your HTML document.</li>
            <li>Use the "Reset" button to clear all fields and start over if needed.</li>
            </ol>

            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
            <Eye className="w-6 h-6 mr-2" />
            Tips for Effective Open Graph Tags
            </h2>
            <ul className="list-disc list-inside space-y-2 text-xs md:text-sm">
            <li>Use high-quality, relevant images (at least 1200x630 pixels) for best results on social platforms.</li>
            <li>Keep your title concise and compelling, ideally under 60 characters.</li>
            <li>Write clear, informative descriptions summarizing your content in 2-4 sentences.</li>
            <li>Use the appropriate content type for the most relevant meta tags.</li>
            <li>Include optional fields like site name and locale for better representation.</li>
            <li>Regularly update your Open Graph tags, especially for dynamic content.</li>
            <li>Test your tags using social media platform debugging tools.</li>
            </ul>

            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
            <Share2 className="w-6 h-6 mr-2" />
            Applications and Use Cases
            </h2>
            <ul className="list-disc list-inside space-y-2 text-xs md:text-sm">
            <li><strong>Social Media Marketing</strong>: Enhance the appearance of shared links.</li>
            <li><strong>SEO Optimization</strong>: Improve click-through rates from social media.</li>
            <li><strong>E-commerce</strong>: Create attractive product previews.</li>
            <li><strong>Content Marketing</strong>: Ensure blog posts and articles look engaging.</li>
            <li><strong>Personal Branding</strong>: Customize how your personal site appears in shares.</li>
            <li><strong>Event Promotion</strong>: Create eye-catching previews for events.</li>
            <li><strong>App Marketing</strong>: Improve the appearance of app store links.</li>
            <li><strong>Video Content</strong>: Customize video previews for better engagement.</li>
            <li><strong>News and Media</strong>: Ensure news articles are presented attractively.</li>
            <li><strong>Educational Resources</strong>: Improve visibility for online courses or content.</li>
            </ul>

            <p className="text-sm md:text-base text-default-600 mt-4">
            The Open Graph Meta Generator is an essential tool for anyone looking to optimize their web content for social media sharing. By creating accurate and comprehensive Open Graph meta tags, you can significantly improve how your content appears across various platforms, leading to increased engagement and traffic. Start using this tool today to ensure your content stands out in the crowded social media landscape!
            </p>
        </div>
        </Card>

      </div>
    </ToolLayout>
  )
}

