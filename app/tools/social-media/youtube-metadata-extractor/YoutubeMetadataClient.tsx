"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import {
  Search,
  RotateCcw,
  AlertCircle,
  Youtube,
  Tag,
  Info,
  Eye,
  ThumbsUp,
  MessageSquare,
  History,
  Trash2,
  Download,
  Lightbulb,
  Share2,
  ImageIcon,
  BookOpen,
} from "lucide-react"
import { Button, Card, CardBody, CardHeader, Input, Tabs, Tab, Image, Chip, Tooltip } from "@nextui-org/react"
import { toast, } from "react-hot-toast"
import NextImage from 'next/image'
import ToolLayout from "@/components/ToolLayout"
import Link from "next/link"

interface VideoMetadata {
  tags: string[]
  title: string
  description: string
  thumbnail: string
  publishedAt: string
  viewCount: string
  likeCount: string
  commentCount: string
  channelTitle: string
  channelId: string
  duration: string
  definition: string
  caption: string
  licensedContent: boolean
  privacyStatus: string
}

export default function YouTubeMetadataExtractor() {
  const [videoUrl, setVideoUrl] = useState("")
  const [metadata, setMetadata] = useState<VideoMetadata | null>(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const history = localStorage.getItem("metadataSearchHistory")
    if (history) {
      setSearchHistory(JSON.parse(history))
    }
  }, [])

  const extractVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  const fetchVideoMetadata = async () => {
    setError("")
    setMetadata(null)
    setLoading(true)

    const videoId = extractVideoId(videoUrl)
    if (!videoId) {
      setError("Invalid YouTube URL")
      setLoading(false)
      return
    }

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails,status&id=${videoId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`,
      )
      const data = await response.json()

      if (data.items && data.items.length > 0) {
        const { snippet, statistics, contentDetails, status } = data.items[0]
        setMetadata({
          tags: snippet.tags || [],
          title: snippet.title,
          description: snippet.description,
          thumbnail: snippet.thumbnails.high.url,
          publishedAt: new Date(snippet.publishedAt).toLocaleDateString(),
          viewCount: statistics.viewCount,
          likeCount: statistics.likeCount,
          commentCount: statistics.commentCount,
          channelTitle: snippet.channelTitle,
          channelId: snippet.channelId,
          duration: contentDetails.duration,
          definition: contentDetails.definition,
          caption: contentDetails.caption,
          licensedContent: contentDetails.licensedContent,
          privacyStatus: status.privacyStatus,
        })
        updateSearchHistory(videoUrl)
        toast.success("Video metadata extracted successfully!")
      } else {
        setError("No data found for this video")
      }
    } catch (err) {
      setError("Failed to fetch video metadata. Please try again.")
    }

    setLoading(false)
  }

  const updateSearchHistory = (url: string) => {
    const newHistory = [url, ...searchHistory.filter((item) => item !== url).slice(0, 9)]
    setSearchHistory(newHistory)
    localStorage.setItem("metadataSearchHistory", JSON.stringify(newHistory))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    fetchVideoMetadata()
  }

  const handleReset = () => {
    setVideoUrl("")
    setMetadata(null)
    setError("")
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const downloadMetadata = () => {
    if (!metadata) return
    const metadataText = JSON.stringify(metadata, null, 2)
    const blob = new Blob([metadataText], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "youtube_metadata.json"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    toast.success("Metadata downloaded!")
  }

  const clearSearchHistory = () => {
    setSearchHistory([])
    localStorage.removeItem("metadataSearchHistory")
    toast.success("Search history cleared!")
  }

  const formatDuration = (duration: string): string => {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/)
    if (!match) return "00:00"

    const hours = match[1] ? Number.parseInt(match[1].slice(0, -1)) : 0
    const minutes = match[2] ? Number.parseInt(match[2].slice(0, -1)) : 0
    const seconds = match[3] ? Number.parseInt(match[3].slice(0, -1)) : 0

    const paddedMinutes = minutes.toString().padStart(2, "0")
    const paddedSeconds = seconds.toString().padStart(2, "0")

    return hours > 0 ? `${hours}:${paddedMinutes}:${paddedSeconds}` : `${paddedMinutes}:${paddedSeconds}`
  }

  return (
    <ToolLayout
      title="YouTube Metadata Extractor"
      description="Extract comprehensive metadata from any YouTube video"
      toolId="678f383126f06f912191bcd8"
    >

      <div className="flex flex-col gap-8">
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <Input
                  ref={inputRef}
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="Paste YouTube video URL here..."
                  size="md"
                  variant="bordered"
                  startContent={<Youtube className="text-default-400" />}
                  className="flex-1"
                />
                <div className="flex gap-2">
                  <Button
                    color="primary"
                    type="submit"
                    size="md"
                    isLoading={loading}
                    startContent={!loading && <Search size={20} />}
                  >
                    {loading ? "Extracting..." : "Extract"}
                  </Button>
                  <Button color="danger" size="md" onClick={handleReset} startContent={<RotateCcw size={20} />}>
                    Reset
                  </Button>
                </div>
              </div>
            </form>

            {error && (
              <div className="mt-4 p-4 bg-danger-50 text-danger rounded-lg flex items-center gap-2">
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}

            {!metadata && (
              <div className="text-center text-default-500 py-12">
                <ImageIcon size={48} className="mx-auto mb-4" />
                <p>Enter a YouTube video URL to extract metadata</p>
              </div>
            )}
          </CardBody>
        </Card>

        {metadata && (
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-default-50 dark:bg-default-100 h-[460px]">
              <CardHeader className="flex gap-2">
                <Youtube className="text-danger" />
                <div className="overflow-hidden">
                  <h2 className="text-xl font-bold truncate">{metadata.title}</h2>
                  <p className="text-default-600">Published on {metadata.publishedAt}</p>
                </div>
              </CardHeader>
              <CardBody>
                <div className="flex flex-col h-full">
                  <Image
                    src={metadata.thumbnail || "/placeholder.svg"}
                    alt={metadata.title}
                    className="w-full rounded-lg mb-4 object-cover"
                  />
                  <div className="grid grid-cols-3 gap-4 mt-auto">
                    <Tooltip content="Total Views">
                      <div className="flex items-center gap-2">
                        <Eye className="text-default-500" />
                        <span>{Number.parseInt(metadata.viewCount).toLocaleString()}</span>
                      </div>
                    </Tooltip>
                    <Tooltip content="Total Likes">
                      <div className="flex items-center gap-2">
                        <ThumbsUp className="text-default-500" />
                        <span>{Number.parseInt(metadata.likeCount).toLocaleString()}</span>
                      </div>
                    </Tooltip>
                    <Tooltip content="Total Comments">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="text-default-500" />
                        <span>{Number.parseInt(metadata.commentCount).toLocaleString()}</span>
                      </div>
                    </Tooltip>
                  </div>
                </div>
              </CardBody>
            </Card>

            <Card className="bg-default-50 dark:bg-default-100 h-[460px]">
              <CardBody className="p-0">
                <Tabs
                  aria-label="Video metadata"
                  className="flex flex-col h-full"
                  classNames={{
                    panel: "flex-1 p-4",
                    tabList: "p-4 pb-0",
                    cursor: "bg-primary",
                    tab: "max-w-fit px-4",
                  }}
                >
                  <Tab
                    key="tags"
                    title={
                      <div className="flex items-center gap-2">
                        <Tag size={18} />
                        <span>Tags</span>
                      </div>
                    }
                  >
                    <div className="flex flex-col h-full overflow-hidden">
                      <div className="flex-1 overflow-y-auto mb-4">
                        <div className="flex flex-wrap gap-2">
                          {metadata.tags.map((tag, index) => (
                            <Chip key={index} variant="flat" size="sm">
                              {tag}
                            </Chip>
                          ))}
                        </div>
                      </div>
                      <Button
                        color="success"
                        className="w-full"
                        startContent={<Download size={18} />}
                        onClick={downloadMetadata}
                      >
                        Download Metadata
                      </Button>
                    </div>
                  </Tab>
                  <Tab
                    key="description"
                    title={
                      <div className="flex items-center gap-2">
                        <Info size={18} />
                        <span>Description</span>
                      </div>
                    }
                  >
                    <div className="h-full overflow-y-auto">
                      <div className="whitespace-pre-wrap text-default-600">{metadata.description}</div>
                    </div>
                  </Tab>
                  <Tab
                    key="details"
                    title={
                      <div className="flex items-center gap-2">
                        <Info size={18} />
                        <span>Details</span>
                      </div>
                    }
                  >
                    <div className="h-full overflow-y-auto">
                      <div className="space-y-2 text-default-600">
                        <p>
                          <strong>Channel:</strong> {metadata.channelTitle}
                        </p>
                        <p>
                          <strong>Duration:</strong> {formatDuration(metadata.duration)}
                        </p>
                        <p>
                          <strong>Definition:</strong> {metadata.definition}
                        </p>
                        <p>
                          <strong>Caption:</strong> {metadata.caption}
                        </p>
                        <p>
                          <strong>Licensed Content:</strong> {metadata.licensedContent ? "Yes" : "No"}
                        </p>
                        <p>
                          <strong>Privacy Status:</strong> {metadata.privacyStatus}
                        </p>
                      </div>
                    </div>
                  </Tab>
                </Tabs>
              </CardBody>
            </Card>
          </div>
        )}

        {searchHistory.length > 0 && (
          <Card>
            <CardHeader className="flex justify-between">
              <div className="flex items-center gap-2">
                <History size={20} />
                <h3 className="text-xl font-bold">Recent Searches</h3>
              </div>
              <Button
                color="danger"
                variant="flat"
                size="sm"
                startContent={<Trash2 size={16} />}
                onClick={clearSearchHistory}
              >
                Clear History
              </Button>
            </CardHeader>
            <CardBody>
              <div className="space-y-2">
                {searchHistory.map((url, index) => (
                  <Button
                    key={index}
                    variant="flat"
                    className="w-full justify-start"
                    onClick={() => setVideoUrl(url)}
                    startContent={<Youtube className="text-danger" />}
                  >
                    {url}
                  </Button>
                ))}
              </div>
            </CardBody>
          </Card>
        )}
    </div> 

     {/* Info Section */}
    <Card className="mt-8 bg-default-50 dark:bg-default-100 p-4 md:p-8">
    <div className="rounded-xl p-2 md:p-4 max-w-4xl mx-auto">
        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 flex items-center">
        <Info className="w-6 h-6 mr-2" />
        What is the YouTube Metadata Extractor?
        </h2>
        <p className="text-sm md:text-base text-default-600 mb-4">
        The YouTube Metadata Extractor is a powerful tool designed for content creators, marketers, researchers, and YouTube enthusiasts. It allows you to extract and analyze valuable metadata from any YouTube video, providing insights that can help optimize your content strategy, improve SEO, and understand video performance. With a <Link href="#how-to-use" className="text-primary hover:underline">user-friendly interface</Link>, this tool makes it easy to access and analyze video metadata in just a few clicks.
        </p>
        <p className="text-sm md:text-base text-default-600 mb-4">
        Whether you're analyzing your own videos or studying competitors, the YouTube Metadata Extractor offers a comprehensive suite of features to help you make data-driven decisions and enhance your YouTube strategy.
        </p>
        
        <div className="my-8">
        <NextImage
            src="/Images/YoutubeMetadataPreview.png"
            alt="Screenshot of the YouTube Metadata Extractor interface showing metadata extraction options"
            width={600}
            height={400}
            className="rounded-lg shadow-lg w-full h-auto"
        />
        </div>

        <h2 id="how-to-use" className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
        <BookOpen className="w-6 h-6 mr-2" />
        How to Use the YouTube Metadata Extractor?
        </h2>
        <p className="text-sm md:text-base text-default-600 mb-4">
        Using the YouTube Metadata Extractor is simple and straightforward. Follow these steps to get started:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-sm md:text-base">
        <li>Enter the URL of the YouTube video you want to analyze in the input field.</li>
        <li>Click the "Extract" button to fetch the video's metadata.</li>
        <li>
            Explore the extracted data in the tabbed interface:
            <ul className="list-disc pl-6 mt-2 space-y-1">
            <li><strong>Tags</strong>: View all associated tags for SEO analysis.</li>
            <li><strong>Description</strong>: Access and analyze the full video description.</li>
            <li><strong>Details</strong>: Access technical and additional metadata like duration, definition, and privacy status.</li>
            </ul>
        </li>
        <li>Use the additional metadata (views, likes, comments) to gauge video performance.</li>
        <li>Download the complete metadata set as a JSON file for further analysis or record-keeping.</li>
        <li>Leverage the search history feature for quick access to previously analyzed videos.</li>
        </ol>

        <h2 id="key-features" className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
        <Lightbulb className="w-6 h-6 mr-2" />
        Key Features
        </h2>
        <p className="text-sm md:text-base text-default-600 mb-4">
        The YouTube Metadata Extractor comes packed with features to help you get the most out of YouTube video metadata:
        </p>
        <ul className="list-disc list-inside space-y-2 text-xs md:text-sm">
        <li><strong>Comprehensive Metadata Extraction</strong>: Extract all available metadata from any YouTube video.</li>
        <li><strong>Video Statistics Analysis</strong>: Gather crucial information like view count, like count, comment count, and publish date.</li>
        <li><strong>Tag Extraction</strong>: Access all tags associated with the video for SEO analysis.</li>
        <li><strong>Description Analysis</strong>: Analyze the full video description for additional context and keywords.</li>
        <li><strong>Thumbnail Preview</strong>: View the high-quality thumbnail of the analyzed video.</li>
        <li><strong>Channel Information</strong>: Get details about the video's channel, including title and ID.</li>
        <li><strong>Technical Details</strong>: Access information like video duration, definition, caption availability, and privacy status.</li>
        <li><strong>One-Click Download</strong>: Easily download all extracted metadata as a JSON file.</li>
        <li><strong>Search History</strong>: Keep track of your recently analyzed videos for quick reference.</li>
        <li><strong>User-Friendly Interface</strong>: Intuitive design with tabs for organized data presentation.</li>
        </ul>

        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
        <Share2 className="w-6 h-6 mr-2" />
        Benefits and Applications
        </h2>
        <p className="text-sm md:text-base text-default-600 mb-4">
        The YouTube Metadata Extractor is a versatile tool with numerous applications:
        </p>
        <ul className="list-disc list-inside space-y-2 text-xs md:text-sm">
        <li><strong>Content Strategy</strong>: Analyze successful videos in your niche to identify effective metadata practices.</li>
        <li><strong>SEO Optimization</strong>: Improve your video's searchability by studying high-performing video metadata.</li>
        <li><strong>Competitor Analysis</strong>: Study the metadata strategies of top-performing channels in your industry.</li>
        <li><strong>Trend Identification</strong>: Track changes in metadata usage over time to spot emerging trends.</li>
        <li><strong>Content Ideation</strong>: Use popular tags and descriptions as inspiration for new video topics.</li>
        <li><strong>Audience Research</strong>: Gain insights into what content resonates with your target audience.</li>
        <li><strong>Marketing Campaigns</strong>: Align your video metadata with ongoing marketing initiatives.</li>
        <li><strong>Educational Research</strong>: Study metadata patterns across different types of educational content.</li>
        <li><strong>Legal Compliance</strong>: Verify licensing and privacy status for content usage or partnerships.</li>
        </ul>

        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
        <Lightbulb className="w-6 h-6 mr-2" />
        Tips for Effective Use
        </h2>
        <p className="text-sm md:text-base text-default-600 mb-4">
        Make the most of the YouTube Metadata Extractor with these tips:
        </p>
        <ul className="list-disc list-inside space-y-2 text-xs md:text-sm">
        <li>Regularly analyze top-performing videos in your niche to stay updated on effective metadata strategies.</li>
        <li>Compare metadata across multiple videos to identify consistent patterns of success.</li>
        <li>Use the extracted tags to optimize your own video's discoverability.</li>
        <li>Study the relationship between video titles, descriptions, and tags for comprehensive optimization.</li>
        <li>Analyze your own videos' metadata to refine your content strategy over time.</li>
        <li>Pay attention to technical details like duration and definition to understand their impact on performance.</li>
        <li>Use the search history feature to track changes in metadata for specific videos over time.</li>
        <li>Combine metadata analysis with viewer engagement metrics for a holistic understanding of video performance.</li>
        </ul>

        <p className="text-sm md:text-base text-default-600 mt-4">
        The YouTube Metadata Extractor is a powerful tool that opens up a world of possibilities for understanding and leveraging YouTube content. Whether you're a content creator, marketer, researcher, or just curious about video metrics, this tool provides valuable insights at your fingertips. Start exploring the wealth of information hidden in YouTube videos today!
        </p>
    </div>
    </Card>
 
    </ToolLayout>
  )
}

