"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import {
  Search,
  RefreshCw,
  AlertCircle,
  Youtube,
  Tag,
  Eye,
  ThumbsUp,
  MessageSquare,
  History,
  Download,
  Share2,
  Clock,
  Calendar,
  User,
  Film,
  Shield,
  Settings,
  Layers,
  Info,
  BookOpen,
  Lightbulb,
} from "lucide-react"
import { Button, Card, CardBody, CardHeader, Input, Image, Chip, Tooltip, Progress } from "@nextui-org/react"
import { toast } from "react-hot-toast"
import NextImage from 'next/image'
import ToolLayout from "@/components/ToolLayout"

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
  const [showHistory, setShowHistory] = useState(false)
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
    } catch {
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

  const handleShare = () => {
    if (videoUrl) {
      navigator.clipboard.writeText(window.location.origin + "?video=" + encodeURIComponent(videoUrl))
      toast.success("Link copied to clipboard!")
    }
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
      <div className="flex flex-col gap-6">
        <Card className="bg-gradient-to-r from-blue-950 to-purple-900 text-white shadow-lg">
          <CardBody className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <Input
                  ref={inputRef}
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="Paste YouTube video URL here..."
                  size="lg"
                  variant="bordered"
                  startContent={<Youtube className="text-red-500" />}
                  className="flex-1 text-white"
                  classNames={{
                    inputWrapper: "bg-black/30 backdrop-blur-sm border-white/20",
                    input: "text-white",
                  }}
                />
                <Tooltip content="Extract metadata from this YouTube video" className="text-default-700">
                  <Button
                    color="danger"
                    type="submit"
                    isLoading={loading}
                    startContent={loading ? <RefreshCw className="animate-spin" /> : <Search />}
                    className="bg-gradient-to-r from-red-500 to-red-600"
                    size="lg"
                  >
                    {loading ? "Extracting..." : "Extract Metadata"}
                  </Button>
                </Tooltip>
                <Button
                  variant="flat"
                  onClick={handleReset}
                  startContent={<RefreshCw />}
                  className="bg-white/10 text-white hover:bg-white/20"
                  size="lg"
                >
                  Reset
                </Button>
                {videoUrl && (
                  <Button
                    color="success"
                    onClick={handleShare}
                    startContent={<Share2 />}
                    className="bg-gradient-to-r from-green-500 to-green-600"
                    size="lg"
                  >
                    Share
                  </Button>
                )}
              </div>
            </form>

            {error && (
              <div className="bg-red-500/80 backdrop-blur-sm text-white p-4 rounded-xl mt-4 flex items-center">
                <AlertCircle className="mr-2 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {loading && (
              <div className="mt-6">
                <p className="text-white/70 mb-2">Extracting video metadata...</p>
                <Progress
                  size="md"
                  isIndeterminate
                  aria-label="Loading..."
                  className="max-w-full"
                  classNames={{
                    indicator: "bg-gradient-to-r from-indigo-500 to-purple-500",
                  }}
                />
              </div>
            )}
          </CardBody>
        </Card>

        {metadata && (
          <>
            <Card className="shadow-md border-none bg-default-50/50 backdrop-blur-sm dark:bg-default-100/50">
              <CardBody>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="relative rounded-lg overflow-hidden min-w-64">
                    <Image
                      src={metadata.thumbnail || "/placeholder.svg"}
                      alt={metadata.title}
                      className="w-full md:w-64 object-cover rounded-lg"
                      radius="lg"
                      shadow="md"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                      <Chip
                        className="absolute top-2 right-2"
                        color="danger"
                        variant="shadow"
                        startContent={<Youtube size={14} />}
                      >
                        YouTube
                      </Chip>
                      <Chip
                        className="absolute bottom-2 right-2"
                        color="primary"
                        variant="shadow"
                        startContent={<Clock size={14} />}
                      >
                        {formatDuration(metadata.duration)}
                      </Chip>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3">{metadata.title}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                          <User size={14} className="text-indigo-600 dark:text-indigo-300" />
                        </div>
                        <p className="text-default-500">
                          Channel: <span className="font-medium text-default-700">{metadata.channelTitle}</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                          <Eye size={14} className="text-indigo-600 dark:text-indigo-300" />
                        </div>
                        <p className="text-default-500">
                          Views:{" "}
                          <span className="font-medium text-default-700">
                            {Number.parseInt(metadata.viewCount).toLocaleString()}
                          </span>
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                          <Calendar size={14} className="text-indigo-600 dark:text-indigo-300" />
                        </div>
                        <p className="text-default-500">
                          Published: <span className="font-medium text-default-700">{metadata.publishedAt}</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                          <ThumbsUp size={14} className="text-indigo-600 dark:text-indigo-300" />
                        </div>
                        <p className="text-default-500">
                          Likes:{" "}
                          <span className="font-medium text-default-700">
                            {Number.parseInt(metadata.likeCount).toLocaleString()}
                          </span>
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                          <Film size={14} className="text-indigo-600 dark:text-indigo-300" />
                        </div>
                        <p className="text-default-500">
                          Definition:{" "}
                          <span className="font-medium text-default-700">{metadata.definition.toUpperCase()}</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                          <MessageSquare size={14} className="text-indigo-600 dark:text-indigo-300" />
                        </div>
                        <p className="text-default-500">
                          Comments:{" "}
                          <span className="font-medium text-default-700">
                            {Number.parseInt(metadata.commentCount).toLocaleString()}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button color="success" startContent={<Download size={18} />} onClick={downloadMetadata}>
                        Download Metadata
                      </Button>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 shadow-md border-none bg-default-50/50 backdrop-blur-sm dark:bg-default-100/50">
                <CardHeader className="pb-0">
                  <div className="w-full">
                    <h3 className="text-xl font-semibold">Video Description</h3>
                    <p className="text-default-500 text-sm mt-1">Full description text from the video</p>
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="max-h-96 overflow-y-auto p-4 bg-default-100 rounded-lg whitespace-pre-wrap text-default-600">
                    {metadata.description || "No description available."}
                  </div>
                </CardBody>
              </Card>

              <Card className="shadow-md border-none bg-default-50/50 backdrop-blur-sm dark:bg-default-100/50">
                <CardHeader className="pb-0">
                  <h3 className="text-xl font-semibold">Technical Details</h3>
                </CardHeader>
                <CardBody>
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 backdrop-blur-sm">
                      <h4 className="text-lg font-medium mb-3 flex items-center gap-2">
                        <Shield size={18} />
                        Content Status
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-default-600">Privacy Status:</span>
                          <Chip
                            color={metadata.privacyStatus === "public" ? "success" : "warning"}
                            variant="flat"
                            size="sm"
                          >
                            {metadata.privacyStatus.charAt(0).toUpperCase() + metadata.privacyStatus.slice(1)}
                          </Chip>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-default-600">Licensed Content:</span>
                          <Chip color={metadata.licensedContent ? "success" : "default"} variant="flat" size="sm">
                            {metadata.licensedContent ? "Yes" : "No"}
                          </Chip>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-default-600">Captions:</span>
                          <Chip color={metadata.caption === "true" ? "success" : "default"} variant="flat" size="sm">
                            {metadata.caption === "true" ? "Available" : "None"}
                          </Chip>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h4 className="text-lg font-medium mb-3 flex items-center gap-2">
                        <Settings size={18} />
                        Video Settings
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-default-600">Duration:</span>
                          <span className="font-medium">{formatDuration(metadata.duration)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-default-600">Definition:</span>
                          <Chip color={metadata.definition === "hd" ? "primary" : "default"} variant="flat" size="sm">
                            {metadata.definition.toUpperCase()}
                          </Chip>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>

            <Card className="shadow-md border-none bg-default-50/50 backdrop-blur-sm dark:bg-default-100/50">
              <CardHeader>
                <div className="flex flex-col">
                  <h3 className="text-xl font-semibold">Video Tags</h3>
                  <p className="text-default-500 mt-1 text-sm">
                    Keywords associated with this video for search optimization
                  </p>
                </div>
              </CardHeader>
              <CardBody>
                <div className="flex flex-wrap gap-2">
                  {metadata.tags && metadata.tags.length > 0 ? (
                    metadata.tags.map((tag, index) => (
                      <Chip
                        key={index}
                        variant="flat"
                        color="primary"
                        startContent={<Tag size={14} />}
                        className="bg-primary-100 dark:bg-primary-900/30"
                      >
                        {tag}
                      </Chip>
                    ))
                  ) : (
                    <p className="text-default-500">No tags found for this video.</p>
                  )}
                </div>
              </CardBody>
            </Card>
          </>
        )}

        {!metadata && !error && !loading && (
          <div className="text-center text-default-500 py-12">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-default-100 flex items-center justify-center">
              <Layers size={48} className="text-default-400" />
            </div>
            <p className="text-lg">Enter a YouTube video URL to extract metadata</p>
            <p className="text-sm mt-2 max-w-md mx-auto">
              This tool extracts comprehensive metadata from YouTube videos, including tags, description, statistics,
              and technical details.
            </p>
          </div>
        )}

        {searchHistory.length > 0 && (
          <Card className="shadow-md border-none bg-default-50/50 backdrop-blur-sm dark:bg-default-100/50">
            <CardHeader
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setShowHistory(!showHistory)}
            >
              <div className="flex items-center">
                <History className="mr-2" />
                <h3 className="text-xl font-semibold">Recent Searches</h3>
              </div>
              <div className="flex items-center">
                <Button
                  color="danger"
                  variant="light"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    clearSearchHistory()
                  }}
                >
                  Clear History
                </Button>
              </div>
            </CardHeader>
            {showHistory && (
              <CardBody>
                <div className="space-y-2">
                  {searchHistory.map((url, index) => (
                    <Button
                      key={index}
                      onClick={() => setVideoUrl(url)}
                      variant="flat"
                      className="w-full justify-start"
                      startContent={<Youtube className="text-red-500" />}
                    >
                      {url}
                    </Button>
                  ))}
                </div>
              </CardBody>
            )}
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
        YouTube metadetta extractor material is a powerful tool designed for creators, abstracts, researchers and youtube enthusiasts. This allows you to extract and analyze valuable metadata from any YouTube video that provides insight that can help customize your content strategy, improve SEO and understand video performance. With a user friendly interface, this device makes it easy to use and analyze video metadata in a few clicks.
        </p>
        <p className="text-sm md:text-base text-default-600 mb-4">
        Whether you are analyzing your own videos or studying contestants, YouTube Matadetta Extractor offers you a comprehensive suit of features to make data-operated decisions and help you increase your YouTube strategy.
        </p>
        
        <div className="my-8">
        <NextImage
            src="/Images/InfosectionImages/YoutubeMetadataPreview.png?height=400&width=600" 
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

