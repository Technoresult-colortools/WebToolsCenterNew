"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import {
  Search,
  RefreshCw,
  AlertCircle,
  Youtube,
  Tag,
  Info,
  Eye,
  ThumbsUp,
  MessageSquare,
  History,
  Download,
  Lightbulb,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Share2,
  Clock,
  Clipboard,
} from "lucide-react"
import { Button, Card, CardBody, CardHeader, Input, Image, Chip, Tooltip, Progress } from "@nextui-org/react"
import { toast } from "react-hot-toast"
import NextImage from "next/image"
import ToolLayout from "@/components/ToolLayout"

interface VideoData {
  tags: string[]
  title: string
  description: string
  thumbnail: string
  viewCount: string
  likeCount: string
  commentCount: string
  publishedAt: string
}

export default function YouTubeKeywordTagExtractor() {
  const [videoUrl, setVideoUrl] = useState("")
  const [videoData, setVideoData] = useState<VideoData | null>(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const [showHistory, setShowHistory] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const history = localStorage.getItem("tagSearchHistory")
    if (history) {
      setSearchHistory(JSON.parse(history))
    }
  }, [])

  const extractVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  const fetchVideoData = async () => {
    setError("")
    setVideoData(null)
    setLoading(true)

    const videoId = extractVideoId(videoUrl)
    if (!videoId) {
      setError("Invalid YouTube URL")
      setLoading(false)
      return
    }

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`,
      )
      const data = await response.json()

      if (data.items && data.items.length > 0) {
        const item = data.items[0]
        const snippet = item.snippet
        const statistics = item.statistics
        const videoData: VideoData = {
          tags: snippet.tags || [],
          title: snippet.title,
          description: snippet.description,
          thumbnail: snippet.thumbnails.high.url,
          viewCount: statistics.viewCount,
          likeCount: statistics.likeCount,
          commentCount: statistics.commentCount,
          publishedAt: new Date(snippet.publishedAt).toLocaleDateString(),
        }

        setVideoData(videoData)
        updateSearchHistory(videoUrl)
        toast.success("Video data extracted successfully!")
      } else {
        setError("No data found for this video")
      }
    } catch {
      setError("Failed to fetch video data. Please try again.")
    }

    setLoading(false)
  }

  const updateSearchHistory = (url: string) => {
    const newHistory = [url, ...searchHistory.filter((item) => item !== url).slice(0, 9)]
    setSearchHistory(newHistory)
    localStorage.setItem("tagSearchHistory", JSON.stringify(newHistory))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    fetchVideoData()
  }

  const handleReset = () => {
    setVideoUrl("")
    setVideoData(null)
    setError("")
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const handleShare = () => {
    if (videoUrl) {
      navigator.clipboard.writeText(window.location.origin + "?video=" + encodeURIComponent(videoUrl))
      toast.success("Link copied to clipboard!")
    }
  }

  const downloadTags = () => {
    if (!videoData) return
    const tagText = videoData.tags.join("\n")
    const blob = new Blob([tagText], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${videoData.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}_tags.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    toast.success("Tags downloaded!")
  }

  const clearSearchHistory = () => {
    setSearchHistory([])
    localStorage.removeItem("tagSearchHistory")
    toast.success("Search history cleared!")
  }

  const copyAllTags = () => {
    if (!videoData || !videoData.tags.length) return
    navigator.clipboard.writeText(videoData.tags.join(", "))
    toast.success("All tags copied to clipboard!")
  }

  return (
    <ToolLayout
      title="YouTube Keyword Tag Extractor"
      description="Extract keyword tags and metadata from any YouTube video"
      toolId="678f383126f06f912191bcd7"
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
                <Tooltip content="Extract tags from this YouTube video" className="text-default-700">
                  <Button
                    color="danger"
                    type="submit"
                    isLoading={loading}
                    startContent={loading ? <RefreshCw className="animate-spin" /> : <Search />}
                    className="bg-gradient-to-r from-red-500 to-red-600"
                    size="lg"
                  >
                    {loading ? "Extracting..." : "Extract Tags"}
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
                <p className="text-white/70 mb-2">Extracting video tags and metadata...</p>
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

        {/* Results Section */}
        {videoData && (
          <>
            <Card className="shadow-md border-none bg-default-50/50 backdrop-blur-sm dark:bg-default-100/50">
              <CardBody>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="relative rounded-lg overflow-hidden min-w-64">
                    <Image
                      src={videoData.thumbnail || "/placeholder.svg"}
                      alt={videoData.title}
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
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3">{videoData.title}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                          <Clock size={14} className="text-indigo-600 dark:text-indigo-300" />
                        </div>
                        <p className="text-default-500">
                          Published: <span className="font-medium text-default-700">{videoData.publishedAt}</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                          <Eye size={14} className="text-indigo-600 dark:text-indigo-300" />
                        </div>
                        <p className="text-default-500">
                          Views:{" "}
                          <span className="font-medium text-default-700">
                            {Number.parseInt(videoData.viewCount).toLocaleString()}
                          </span>
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                          <ThumbsUp size={14} className="text-indigo-600 dark:text-indigo-300" />
                        </div>
                        <p className="text-default-500">
                          Likes:{" "}
                          <span className="font-medium text-default-700">
                            {Number.parseInt(videoData.likeCount).toLocaleString()}
                          </span>
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                          <MessageSquare size={14} className="text-indigo-600 dark:text-indigo-300" />
                        </div>
                        <p className="text-default-500">
                          Comments:{" "}
                          <span className="font-medium text-default-700">
                            {Number.parseInt(videoData.commentCount).toLocaleString()}
                          </span>
                        </p>
                      </div>
                      <div className="flex items-center gap-2 md:col-span-2 mt-2">
                        <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                          <Tag size={14} className="text-indigo-600 dark:text-indigo-300" />
                        </div>
                        <p className="text-default-500">
                          Tags:{" "}
                          <span className="font-medium text-default-700">
                            {videoData.tags.length > 0 ? videoData.tags.length : "No tags found"}
                          </span>
                        </p>
                      </div>
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
                    {videoData.description || "No description available."}
                  </div>
                </CardBody>
              </Card>

              <Card className="shadow-md border-none bg-default-50/50 backdrop-blur-sm dark:bg-default-100/50">
                <CardHeader className="pb-0">
                  <h3 className="text-xl font-semibold">Tag Actions</h3>
                </CardHeader>
                <CardBody>
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 backdrop-blur-sm">
                      <h4 className="text-lg font-medium mb-3 flex items-center gap-2">
                        <Tag size={18} />
                        Tag Statistics
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-default-600">Total Tags:</span>
                          <Chip color="primary" variant="flat" size="sm">
                            {videoData.tags.length}
                          </Chip>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-default-600">Average Length:</span>
                          <Chip color="primary" variant="flat" size="sm">
                            {videoData.tags.length > 0
                              ? Math.round(
                                  videoData.tags.reduce((sum, tag) => sum + tag.length, 0) / videoData.tags.length,
                                )
                              : 0}{" "}
                            chars
                          </Chip>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button
                        color="success"
                        className="w-full"
                        startContent={<Download size={18} />}
                        onClick={downloadTags}
                        disabled={!videoData.tags.length}
                      >
                        Download Tags
                      </Button>
                      <Button
                        color="secondary"
                        className="w-full"
                        startContent={<Clipboard size={18} />}
                        onClick={copyAllTags}
                        disabled={!videoData.tags.length}
                      >
                        Copy All Tags
                      </Button>
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
                  {videoData.tags && videoData.tags.length > 0 ? (
                    videoData.tags.map((tag, index) => (
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

        {!videoData && !error && !loading && (
          <div className="text-center text-default-500 py-12">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-default-100 flex items-center justify-center">
              <Tag size={48} className="text-default-400" />
            </div>
            <p className="text-lg">Enter a YouTube video URL to extract tags</p>
            <p className="text-sm mt-2 max-w-md mx-auto">
              This tool extracts keyword tags and metadata from YouTube videos to help you analyze and optimize your
              content.
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
                {showHistory ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
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

        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8">
          <div className="rounded-xl p-2 md:p-4 max-w-4xl mx-auto">
            {/* About YouTube Keyword Tag Extractor */}
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 flex items-center">
              <Info className="w-6 h-6 mr-2" />
              About YouTube Keyword Tag Extractor
            </h2>
            <p className="text-sm md:text-base text-default-600 mb-4">
              Our YouTube Keyword Tag Extractor is a powerful tool designed to help creators, marketers, researchers,
              and YouTube enthusiasts uncover and analyze valuable metadata from YouTube videos. This tool goes beyond
              simple tag extraction by offering a comprehensive suite of features to enhance understanding and optimize
              YouTube strategies.
            </p>

            {/* Image Preview */}
            <div className="my-8">
              <NextImage
                src="/Images/InfosectionImages/YoutubeKewordTagPreview.png?height=400&width=600"
                alt="Screenshot of the YouTube Keyword Tag Extractor interface showing keyword extraction options"
                width={600}
                height={400}
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>

            {/* Key Features */}
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
              <Lightbulb className="w-6 h-6 mr-2" />
              Key Features
            </h2>
            <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
              <li>Keyword Tag Extraction: Instantly extract all tags associated with any YouTube video.</li>
              <li>
                Video Metadata Analysis: Gather crucial information such as view count, like count, comment count, and
                publish date.
              </li>
              <li>Visual Tag Cloud: Generate an interactive tag cloud for easy visualization of keyword prominence.</li>
              <li>
                Description Analysis: Access and analyze the full video description for additional context and keywords.
              </li>
              <li>Thumbnail Preview: View the high-quality thumbnail of the analyzed video.</li>
              <li>One-Click Copy and Download: Easily copy tags to clipboard or download them as a text file.</li>
              <li>Search History: Keep track of your recently analyzed videos for quick reference.</li>
              <li>User-Friendly Interface: Intuitive design with tabs for organized data presentation.</li>
            </ul>

            {/* How to Use YouTube Keyword Tag Extractor */}
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
              <BookOpen className="w-6 h-6 mr-2" />
              How to Use YouTube Keyword Tag Extractor?
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-sm md:text-base">
              <li>Enter the URL of the YouTube video which you want to analyze in the input field.</li>
              <li>Click the "Extract Tags" button to fetch the video's metadata and tags.</li>
              <li>
                Explore the extracted data in the tabbed interface:
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Tags: View all associated tags and copy or download them.</li>
                  <li>Description: Read the full video description.</li>
                  <li>Tag Cloud: Visualize tag prominence in an interactive cloud.</li>
                </ul>
              </li>
              <li>Use the additional metadata (views, likes, comments) to gauge video performance.</li>
              <li>You can access Previously accessed Videos using the Search History feature.</li>
            </ol>
          </div>
        </Card>
      </div>
    </ToolLayout>
  )
}
