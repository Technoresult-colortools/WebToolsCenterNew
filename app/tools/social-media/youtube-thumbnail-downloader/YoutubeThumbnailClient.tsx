"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Select,
  SelectItem,
  Progress,
  Chip,
  Tooltip,
} from "@nextui-org/react"
import {
  Search,
  RefreshCw,
  AlertCircle,
  Clock,
  Info,
  Lightbulb,
  BookOpen,
  Download,
  Clipboard,
  Check,
  Youtube,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { toast } from "react-hot-toast"
import ToolLayout from "@/components/ToolLayout"
import Image from "next/image"

interface ThumbnailQuality {
  url: string
  width: number
  height: number
}

const extractVideoId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : null
}

const fetchThumbnails = async (videoId: string): Promise<ThumbnailQuality[]> => {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`,
  )
  const data = await response.json()

  if (data.items && data.items.length > 0) {
    const thumbnailsData = data.items[0].snippet.thumbnails
    return Object.values(thumbnailsData)
      .map((thumb) => {
        const thumbnail = thumb as { url: string; width: number; height: number }
        return {
          url: thumbnail.url,
          width: thumbnail.width,
          height: thumbnail.height,
        }
      })
      .sort((a, b) => b.width - a.width)
  } else {
    throw new Error("No thumbnail found for this video")
  }
}

const ThumbnailGrid = ({ thumbnails, videoTitle }: { thumbnails: ThumbnailQuality[]; videoTitle?: string }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [downloadFormat, setDownloadFormat] = useState("jpg")

  const copyToClipboard = (url: string, index: number) => {
    navigator.clipboard.writeText(url).then(() => {
      setCopiedIndex(index)
      toast.success("URL copied to clipboard!")
      setTimeout(() => setCopiedIndex(null), 2000)
    })
  }

  const downloadThumbnail = async (url: string, quality: string) => {
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const blobUrl = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = blobUrl
      const filename = videoTitle
        ? `${videoTitle.replace(/[^a-z0-9]/gi, "_").toLowerCase()}_${quality}.${downloadFormat}`
        : `youtube_thumbnail_${quality}.${downloadFormat}`
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(blobUrl)
      toast.success(`Thumbnail downloaded as ${downloadFormat.toUpperCase()}!`)
    } catch {
      toast.error("Failed to download thumbnail")
    }
  }

  return (
    <div className="mt-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <h2 className="text-xl font-bold">Available Thumbnails</h2>
        <Select
          label="Download Format"
          className="max-w-xs mt-2 md:mt-0"
          selectedKeys={[downloadFormat]}
          variant="bordered"
          onChange={(e) => setDownloadFormat(e.target.value)}
        >
          <SelectItem key="jpg" value="jpg" className="text-default-700">
            JPG
          </SelectItem>
          <SelectItem key="png" value="png" className="text-default-700">
            PNG
          </SelectItem>
          <SelectItem key="webp" value="webp" className="text-default-700">
            WebP
          </SelectItem>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {thumbnails.map((thumb, index) => (
          <Card key={index} className="shadow-md border-none bg-default-50/50 backdrop-blur-sm dark:bg-default-100/50">
            <CardBody className="p-4">
              <div className="relative mb-4 rounded-lg overflow-hidden">
                <Image
                  src={thumb.url || "/placeholder.svg"}
                  alt={`Thumbnail ${thumb.width}x${thumb.height}`}
                  width={thumb.width}
                  height={thumb.height}
                  className="w-full h-auto rounded-lg"
                />
                <Chip
                  className="absolute top-2 right-2"
                  color="danger"
                  variant="shadow"
                  startContent={<Youtube size={14} />}
                >
                  YouTube
                </Chip>
                <Chip className="absolute bottom-2 right-2" color="primary" variant="shadow">
                  {thumb.width}x{thumb.height}
                </Chip>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  color="success"
                  onClick={() => downloadThumbnail(thumb.url, `${thumb.width}x${thumb.height}`)}
                  startContent={<Download size={16} />}
                  className="bg-gradient-to-r from-green-500 to-green-600"
                >
                  Download {downloadFormat.toUpperCase()}
                </Button>
                <Button
                  color="secondary"
                  onClick={() => copyToClipboard(thumb.url, index)}
                  startContent={copiedIndex === index ? <Check size={16} /> : <Clipboard size={16} />}
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white"
                >
                  {copiedIndex === index ? "Copied!" : "Copy URL"}
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default function YouTubeThumbnailDownloader() {
  const [videoUrl, setVideoUrl] = useState("")
  const [thumbnails, setThumbnails] = useState<ThumbnailQuality[]>([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const [showHistory, setShowHistory] = useState(false)
  const [videoTitle, setVideoTitle] = useState<string | undefined>(undefined)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const history = localStorage.getItem("thumbnailSearchHistory")
    if (history) {
      setSearchHistory(JSON.parse(history))
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setThumbnails([])
    setVideoTitle(undefined)
    setLoading(true)

    const videoId = extractVideoId(videoUrl)
    if (!videoId) {
      setError("Invalid YouTube URL")
      setLoading(false)
      return
    }

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`,
      )
      const data = await response.json()

      if (data.items && data.items.length > 0) {
        const thumbnailData = await fetchThumbnails(videoId)
        setThumbnails(thumbnailData)
        setVideoTitle(data.items[0].snippet.title)
        updateSearchHistory(videoUrl)
        toast.success("Thumbnails fetched successfully!")
      } else {
        setError("No data found for this video")
      }
    } catch (err) {
      setError("Failed to fetch thumbnails. Please try again.")
      console.error(err)
    }

    setLoading(false)
  }

  const updateSearchHistory = (url: string) => {
    const newHistory = [url, ...searchHistory.filter((item) => item !== url).slice(0, 9)]
    setSearchHistory(newHistory)
    localStorage.setItem("thumbnailSearchHistory", JSON.stringify(newHistory))
  }

  const clearSearchHistory = () => {
    setSearchHistory([])
    localStorage.removeItem("thumbnailSearchHistory")
    toast.success("Search history cleared!")
  }


  const handleReset = () => {
    setVideoUrl("")
    setThumbnails([])
    setError("")
    setVideoTitle(undefined)
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <ToolLayout
      title="YouTube Thumbnail Downloader"
      description="Download high-quality thumbnails from any YouTube video"
      toolId="678f383126f06f912191bcd6"
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
                <Tooltip content="Fetch thumbnails from this YouTube video" className="text-default-700">
                  <Button
                    color="danger"
                    type="submit"
                    isLoading={loading}
                    startContent={loading ? <RefreshCw className="animate-spin" /> : <Search />}
                    className="bg-gradient-to-r from-red-500 to-red-600"
                    size="lg"
                  >
                    {loading ? "Fetching..." : "Fetch Thumbnails"}
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
                <p className="text-white/70 mb-2">Fetching thumbnails...</p>
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

        {videoTitle && thumbnails.length > 0 && (
          <Card className="shadow-md border-none bg-default-50/50 backdrop-blur-sm dark:bg-default-100/50">
            <CardBody>
              <h3 className="text-xl font-bold mb-3">{videoTitle}</h3>
              <p className="text-default-500 text-sm">
                {thumbnails.length} thumbnail{thumbnails.length !== 1 ? "s" : ""} available for download
              </p>
            </CardBody>
          </Card>
        )}

        {thumbnails.length > 0 && (
          <Card className="shadow-md border-none bg-default-50/50 backdrop-blur-sm dark:bg-default-100/50">
            <CardBody>
              <ThumbnailGrid thumbnails={thumbnails} videoTitle={videoTitle} />
            </CardBody>
          </Card>
        )}

        {!thumbnails.length && !error && !loading && (
          <div className="text-center text-default-500 py-12">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-default-100 flex items-center justify-center">
            <Youtube size={48} className="text-red-500" />
            </div>
            <p className="text-lg">Enter a YouTube video URL to fetch thumbnails</p>
            <p className="text-sm mt-2 max-w-md mx-auto">
              This tool extracts high-quality thumbnails from YouTube videos in various resolutions for download.
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
                <Clock className="mr-2" />
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

        {/* Info Section */}
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8">
          <div className="rounded-xl p-2 md:p-4 max-w-4xl mx-auto">
            {/* About YouTube Thumbnail Downloader */}
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 flex items-center">
              <Info className="w-6 h-6 mr-2" />
              About YouTube Thumbnail Downloader
            </h2>
            <p className="text-sm md:text-base text-default-600 mb-4">
              Our YouTube Thumbnail Downloader is a powerful and user-friendly device designed to help creators,
              marketers, researchers and YouTube enthusiasts easily access and download high-quality thumbnails from any
              YouTube video. This versatile tool goes beyond simple thumbnail extraction, offering several features to
              enhance your YouTube-related projects and workflows.
            </p>

            {/* Image Preview */}
            <div className="my-8">
              <Image
                src="/Images/InfosectionImages/YoutubeThumbnailPreview.png?height=400&width=600"
                alt="Screenshot of the YouTube Thumbnail Downloader interface showing thumbnail extraction options"
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
              <li>Instant thumbnail extraction from any YouTube video URL.</li>
              <li>Support for multiple thumbnail resolutions (HD, max resolution).</li>
              <li>One-click download for easy saving of thumbnails.</li>
              <li>Copy thumbnail URL functionality for quick sharing or embedding.</li>
              <li>Preview of all available thumbnail qualities.</li>
              <li>Recent search history for convenient access to previously fetched videos.</li>
              <li>Clean and intuitive user interface.</li>
              <li>Mobile-responsive design for on-the-go use.</li>
              <li>No login required - use the tool directly in your browser.</li>
              <li>Fast and efficient API-based thumbnail fetching.</li>
            </ul>

            {/* How to Use YouTube Thumbnail Downloader */}
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
              <BookOpen className="w-6 h-6 mr-2" />
              How to Use YouTube Thumbnail Downloader?
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-sm md:text-base">
              <li>Copy the URL of the YouTube video whose thumbnail you want to download.</li>
              <li>Paste the URL into the input field of the YouTube Thumbnail Downloader.</li>
              <li>Click the "Fetch Thumbnails" button to retrieve available thumbnails.</li>
              <li>Browse through the different thumbnail qualities displayed.</li>
              <li>Click "Download" to save the desired thumbnail to your device.</li>
              <li>Alternatively, use "Copy URL" to get the direct link to the thumbnail.</li>
              <li>Use the recent search history for quick access to previously fetched videos.</li>
            </ol>

            {/* Tips for Effective Use */}
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
              <Lightbulb className="w-6 h-6 mr-2" />
              Tips for Effective Use
            </h2>
            <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
              <li>Always download the highest resolution thumbnail available for best quality.</li>
              <li>Use the copy URL feature to quickly embed thumbnails in your projects.</li>
              <li>Analyze thumbnails of popular videos in your niche for design inspiration.</li>
              <li>Experiment with different thumbnail styles to see what works best for your audience.</li>
              <li>Regularly update your thumbnails to keep your content fresh and engaging.</li>
              <li>Use the search history feature to track changes in thumbnails over time.</li>
              <li>Combine thumbnail analysis with other YouTube metrics for comprehensive content strategy.</li>
            </ul>

            {/* Legal and Ethical Considerations */}
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
              <Info className="w-6 h-6 mr-2" />
              Legal and Ethical Considerations
            </h2>
            <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
              <li>Respect copyright laws when using downloaded thumbnails.</li>
              <li>Always credit the original content creator when using thumbnails for reference or analysis.</li>
              <li>Be aware of YouTube's terms of service regarding the use of their content.</li>
              <li>Use thumbnails ethically and avoid misleading practices.</li>
              <li>Consider seeking permission for commercial use of downloaded thumbnails.</li>
            </ul>
          </div>
        </Card>
      </div>
    </ToolLayout>
  )
}
