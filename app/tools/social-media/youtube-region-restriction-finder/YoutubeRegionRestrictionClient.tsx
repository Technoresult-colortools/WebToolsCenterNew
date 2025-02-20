"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import {
  Search,
  RefreshCw,
  AlertCircle,
  Globe,
  Info,
  Lightbulb,
  BookOpen,
  Share2,
  History,
  Youtube,
  Shield,
} from "lucide-react"
import { Button, Card, CardBody, CardHeader, Input, Tooltip, Image } from "@nextui-org/react"
import { toast, } from "react-hot-toast"
import ToolLayout from "@/components/ToolLayout"
import CountryList from "./CountryList"
import NextImage from 'next/image'

interface RegionAvailability {
  [key: string]: {
    available: boolean
    lastChecked: string
  }
}

interface VideoDetails {
  title: string
  thumbnail: string
  channelTitle: string
  viewCount: string
  publishedAt: string
}

// Import the full list of countries from a separate file
import { countries } from "./countries"

export default function YouTubeRegionRestrictionFinder() {
  const [videoUrl, setVideoUrl] = useState("")
  const [availability, setAvailability] = useState<RegionAvailability | null>(null)
  const [videoDetails, setVideoDetails] = useState<VideoDetails | null>(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const history = localStorage.getItem("searchHistory")
    if (history) {
      setSearchHistory(JSON.parse(history))
    }
  }, [])

  const extractVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  const fetchVideoDetails = async (videoId: string) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`,
      )
      const data = await response.json()

      if (data.items && data.items.length > 0) {
        const item = data.items[0]
        return {
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.medium.url,
          channelTitle: item.snippet.channelTitle,
          viewCount: Number.parseInt(item.statistics.viewCount).toLocaleString(),
          publishedAt: new Date(item.snippet.publishedAt).toLocaleDateString(),
        }
      }
      return null
    } catch (err) {
      console.error("Error fetching video details:", err)
      return null
    }
  }

  const checkAvailability = async () => {
    setError("")
    setAvailability(null)
    setVideoDetails(null)
    setLoading(true)

    const videoId = extractVideoId(videoUrl)
    if (!videoId) {
      setError("Invalid YouTube URL")
      setLoading(false)
      return
    }

    try {
      // Fetch video details
      const details = await fetchVideoDetails(videoId)
      if (!details) {
        setError("Video not found or API error")
        setLoading(false)
        return
      }
      setVideoDetails(details)

      // Check region availability
      const availabilityData: RegionAvailability = {}
      const checkPromises = countries.map(async (country) => {
        try {
          const response = await fetch(
            `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoId}&regionCode=${country.code}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`,
          )
          const data = await response.json()
          availabilityData[country.code] = {
            available: data.items && data.items.length > 0,
            lastChecked: new Date().toISOString(),
          }
        } catch (err) {
          availabilityData[country.code] = {
            available: false,
            lastChecked: new Date().toISOString(),
          }
        }
      })

      await Promise.all(checkPromises)
      setAvailability(availabilityData)

      // Update search history
      const newHistory = [videoUrl, ...searchHistory.slice(0, 9)]
      setSearchHistory(newHistory)
      localStorage.setItem("searchHistory", JSON.stringify(newHistory))

      toast.success("Region availability checked successfully!")
    } catch (err) {
      setError("Failed to check region availability. Please try again.")
    }

    setLoading(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    checkAvailability()
  }

  const handleReset = () => {
    setVideoUrl("")
    setAvailability(null)
    setVideoDetails(null)
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

  const clearSearchHistory = () => {
    setSearchHistory([])
    localStorage.removeItem("searchHistory")
    toast.success("Search history cleared!")
  }

  return (
    <ToolLayout
      title="YouTube Region Restriction Finder"
      description="Check the availability of a YouTube video across different regions"
      toolId="678f383226f06f912191bcd9"
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
              <Tooltip content="Check video availability in multiple regions">
                <Button
                  color="primary"
                  type="submit"
                  isLoading={loading}
                  startContent={loading ? <RefreshCw className="animate-spin" /> : <Search />}
                >
                  {loading ? "Checking..." : "Check Availability"}
                </Button>
              </Tooltip>
              <Button color="danger" onClick={handleReset} startContent={<RefreshCw />}>
                Reset
              </Button>
              {videoUrl && (
                <Button color="success" onClick={handleShare} startContent={<Share2 />}>
                  Share
                </Button>
              )}
            </div>
          </form>

          {error && (
            <div className="bg-danger text-white p-4 rounded-md mt-4 flex items-center">
              <AlertCircle className="mr-2 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {videoDetails && (
            <Card className="mt-6">
              <CardBody>
                <div className="flex flex-col md:flex-row gap-4">
                  <Image
                    src={videoDetails.thumbnail || "/placeholder.svg"}
                    alt={videoDetails.title}
                    className="rounded-lg w-full md:w-48 object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{videoDetails.title}</h3>
                    <p className="text-default-500 mb-1">Channel: {videoDetails.channelTitle}</p>
                    <p className="text-default-500 mb-1">Views: {videoDetails.viewCount}</p>
                    <p className="text-default-500">Published: {videoDetails.publishedAt}</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          )}

          {availability && (
            <>

            <Card className="mt-6">
            <CardHeader>
                <div className="flex flex-col">
                <h3 className="text-xl font-semibold">Detailed Country Availability</h3>
                <p className="text-default-500 mt-1 text-sm">
                    Comprehensive list of video availability by country
                </p>
                </div>
            </CardHeader>
            <CardBody>
                <CountryList availability={availability} countries={countries} />
            </CardBody>
            </Card>

            </>
          )}

          {!availability && !error && (
            <div className="text-center text-default-500 py-12">
              <Globe size={48} className="mx-auto mb-4" />
              <p>Enter a YouTube video URL to check region availability</p>
            </div>
          )}

          {searchHistory.length > 0 && (
            <Card className="mt-6">
              <CardHeader className="flex justify-between items-center">
                <div className="flex items-center">
                  <History className="mr-2" />
                  <h3 className="text-xl font-semibold">Recent Searches</h3>
                </div>
                <Button color="danger" variant="light" size="sm" onClick={clearSearchHistory}>
                  Clear History
                </Button>
              </CardHeader>
              <CardBody>
                <div className="space-y-2">
                  {searchHistory.map((url, index) => (
                    <Button
                      key={index}
                      onClick={() => setVideoUrl(url)}
                      variant="flat"
                      className="w-full justify-start"
                    >
                      {url}
                    </Button>
                  ))}
                </div>
              </CardBody>
            </Card>
          )}
        </CardBody>
      </Card>

      <Card className=" bg-default-50 dark:bg-default-100 p-4 md:p-8">
      
            <div className="rounded-xl p-2 md:p-4 max-w-4xl mx-auto">
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 flex items-center">
                <Info className="w-6 h-6 mr-2" />
                About YouTube Region Restriction Finder
            </h2>
            <p className="text-sm md:text-base text-default-600 mb-4">
                Our YouTube Region Restriction Finder is a powerful and comprehensive tool designed to help content creators, 
                marketers, researchers, and viewers understand the global availability of YouTube videos. This innovative tool 
                allows you to check the accessibility of any YouTube video across numerous countries worldwide, providing 
                valuable insights into content distribution and potential region restrictions.
            </p>

            <div className="my-8">
                <NextImage
                src="/Images/YoutubeMetadataPreview3.png"
                alt="Screenshot of the YouTube Region Restriction Finder interface"
                width={600}
                height={400}
                className="rounded-lg shadow-lg w-full h-auto"
                />
            </div>

            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Lightbulb className="w-6 h-6 mr-2" />
                Key Features
            </h2>
            <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
                <li>Check video availability across multiple regions by simply entering the video URL.</li>
                <li>Interactive world map visualization of video accessibility.</li>
                <li>Comprehensive list of all countries with their respective availability status.</li>
                <li>Detailed video information including title, channel, view count, and publish date.</li>
                <li>Color-coded availability status for easy interpretation (green for available, red for restricted).</li>
                <li>Search history feature for quick access to previously checked videos.</li>
                <li>Share functionality to easily distribute your findings.</li>
                <li>User-friendly interface with responsive design for all devices.</li>
                <li>Fast and efficient API-based checking process.</li>
            </ul>

            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <BookOpen className="w-6 h-6 mr-2" />
                How to Use YouTube Region Restriction Finder
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-sm md:text-base">
                <li>Copy the URL of the YouTube video you want to analyze.</li>
                <li>Paste the URL into the input field of the YouTube Region Restriction Finder.</li>
                <li>Click the "Check Availability" button to start the process.</li>
                <li>
                View the results in the interactive interface:
                <ul className="list-disc list-inside ml-6">
                    <li>World Map: See a visual representation of video availability.</li>
                    <li>Country List: Check detailed availability status for each country.</li>
                    <li>Video Details: View information about the checked video.</li>
                </ul>
                </li>
                <li>Use additional features like Reset, Share, and Recent Searches as needed.</li>
            </ol>

            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Share2 className="w-6 h-6 mr-2" />
                Applications and Use Cases
            </h2>
            <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
                <li>Global Content Strategy: Optimize your content distribution for international audiences.</li>
                <li>Copyright Compliance: Ensure your content adheres to regional copyright laws and licensing agreements.</li>
                <li>Market Research: Analyze the global reach of viral videos or trending content.</li>
                <li>Competitive Analysis: Compare your video availability with competitors in key markets.</li>
                <li>Localization Planning: Identify regions where your content is restricted to plan localized versions.</li>
                <li>Troubleshooting: Quickly identify and address region-specific playback issues.</li>
                <li>Educational Research: Study the impact of region restrictions on the spread of educational content.</li>
                <li>Marketing Campaigns: Ensure promotional videos are accessible in target markets before launching campaigns.</li>
            </ul>

            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Shield className="w-6 h-6 mr-2" />
                Final Thoughts
            </h2>
            <p className="text-sm md:text-base text-default-600">
                The YouTube Region Restriction Finder is an invaluable tool for anyone working with YouTube content on a global scale. 
                It provides crucial insights into content availability, helping you make informed decisions about your video distribution strategy. 
                Whether you're a content creator, marketer, researcher, or simply a curious viewer, this tool offers a window into the complex world 
                of international content distribution on YouTube. Start exploring the global reach of YouTube videos today and unlock new opportunities 
                for your content!
            </p>
            </div>

        </Card>

    </div>  
    </ToolLayout>
  )
}

