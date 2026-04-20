"use client"

import { useState, useRef, useEffect } from "react"
import {
  Search,
  RefreshCw,
  AlertCircle,
  Globe,
  Info,
  History,
  Youtube,
  Share2,
  MapPin,
  ChevronDown,
  ChevronUp,
  PieChart,
} from "lucide-react"
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Tooltip,
  Image,
  Progress,
  Chip,
} from "@nextui-org/react"
import { toast } from "react-hot-toast"
import ToolLayout from "@/components/ToolLayout"
import CountryList from "./CountryList"
import WorldMap from "./WorldMap"
import InfoSectionYoutubeRegionRestriction from "./info-section"

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
  const [userLocation, setUserLocation] = useState<string | null>(null)
  const [availabilityStats, setAvailabilityStats] = useState<{ available: number, unavailable: number }>({ available: 0, unavailable: 0 })
  const [showHistory, setShowHistory] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Load search history from local storage
    const history = localStorage.getItem("searchHistory")
    if (history) {
      setSearchHistory(JSON.parse(history))
    }

    // Get user's location
    fetch('https://ipapi.co/json/')
      .then(response => response.json())
      .then(data => {
        setUserLocation(data.country_code)
      })
      .catch(err => {
        console.error("Failed to get user location:", err)
      })
  }, [])

  useEffect(() => {
    // Calculate availability statistics when availability changes
    if (availability) {
      const stats = {
        available: 0,
        unavailable: 0
      }

      Object.values(availability).forEach(status => {
        if (status.available) {
          stats.available++
        } else {
          stats.unavailable++
        }
      })

      setAvailabilityStats(stats)
    }
  }, [availability])

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
        } catch {
          availabilityData[country.code] = {
            available: false,
            lastChecked: new Date().toISOString(),
          }
        }
      })

      await Promise.all(checkPromises)
      setAvailability(availabilityData)

      // Update search history
      const newHistory = [videoUrl, ...searchHistory.filter(url => url !== videoUrl).slice(0, 9)]
      setSearchHistory(newHistory)
      localStorage.setItem("searchHistory", JSON.stringify(newHistory))

      toast.success("Region availability checked successfully!")
    } catch (error) {
      console.error("Error checking availability:", error)
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
                    input: "text-white"
                  }}
                />
                <Tooltip content="Check video availability in multiple regions" className="text-default-700">
                  <Button
                    color="danger"
                    type="submit"
                    isLoading={loading}
                    startContent={loading ? <RefreshCw className="animate-spin" /> : <Search />}
                    className="bg-gradient-to-r from-red-500 to-red-600"
                    size="lg"
                  >
                    {loading ? "Checking..." : "Check Availability"}
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
                    onPress={handleShare}
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
                <p className="text-white/70 mb-2">Checking video availability across {countries.length} countries...</p>
                <Progress
                  size="md"
                  isIndeterminate
                  aria-label="Loading..."
                  className="max-w-full"
                  classNames={{
                    indicator: "bg-gradient-to-r from-indigo-500 to-purple-500"
                  }}
                />
              </div>
            )}

            {userLocation && !availability && !loading && (
              <div className="mt-6 flex items-center gap-2 text-white/80">
                <MapPin size={16} />
                <span>Your detected location: {countries.find(c => c.code === userLocation)?.name || userLocation}</span>
                <div className="ml-2 text-xs bg-white/20 py-1 px-2 rounded-full">{countries.find(c => c.code === userLocation)?.flag}</div>
              </div>
            )}
          </CardBody>
        </Card>

        {videoDetails && (
          <Card className="border-none bg-default-50 dark:bg-default-100 backdrop-blur-sm">
            <CardBody>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="relative rounded-lg overflow-hidden min-w-64">
                  <Image
                    src={videoDetails.thumbnail || "/placeholder.svg"}
                    alt={videoDetails.title}
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
                  <h3 className="text-xl font-bold mb-3">{videoDetails.title}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                        <Info size={14} className="text-indigo-600 dark:text-indigo-300" />
                      </div>
                      <p className="text-default-500">Channel: <span className="font-medium text-default-700">{videoDetails.channelTitle}</span></p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                        <PieChart size={14} className="text-indigo-600 dark:text-indigo-300" />
                      </div>
                      <p className="text-default-500">Views: <span className="font-medium text-default-700">{videoDetails.viewCount}</span></p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                        <History size={14} className="text-indigo-600 dark:text-indigo-300" />
                      </div>
                      <p className="text-default-500">Published: <span className="font-medium text-default-700">{videoDetails.publishedAt}</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        )}

        {availability && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 border-none bg-default-50 dark:bg-default-100 backdrop-blur-sm">
                <CardHeader className="pb-0 flex-col items-start">
                  <div className="flex flex-col items-start">
                    <h3 className="text-xl font-semibold">Global Availability Map</h3>
                    <p className="text-default-500 text-sm mt-1">
                      Visual representation of video availability by country
                    </p>
                  </div>



                  {/* Legend */}
                  <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-0.5">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-sm bg-emerald-500" />
                      <span className="text-sm">Your Location</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-sm bg-emerald-400" />
                      <span className="text-sm">Available</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-sm bg-red-500" />
                      <span className="text-sm">Unavailable</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-sm bg-gray-300 dark:bg-gray-600" />
                      <span className="text-sm">Unknown / Default</span>
                    </div>
                  </div>
                </CardHeader>

                <CardBody>
                  <div className="h-96 w-full md:h-[500px]">
                    <WorldMap
                      availability={availability}
                      userLocation={userLocation}
                    />
                  </div>
                </CardBody>
              </Card>

              <Card className=" border-none bg-default-50 dark:bg-default-100 backdrop-blur-sm">
                <CardHeader className="pb-0">
                  <h3 className="text-xl font-semibold">Availability Stats</h3>
                </CardHeader>
                <CardBody>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Available in {availabilityStats.available} countries</span>
                        <span className="font-semibold text-green-500">
                          {((availabilityStats.available / (availabilityStats.available + availabilityStats.unavailable)) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <Progress
                        value={availabilityStats.available}
                        maxValue={availabilityStats.available + availabilityStats.unavailable}
                        color="success"
                        className="h-2"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Unavailable in {availabilityStats.unavailable} countries</span>
                        <span className="font-semibold text-red-500">
                          {((availabilityStats.unavailable / (availabilityStats.available + availabilityStats.unavailable)) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <Progress
                        value={availabilityStats.unavailable}
                        maxValue={availabilityStats.available + availabilityStats.unavailable}
                        color="danger"
                        className="h-2"
                      />
                    </div>

                    {userLocation && (
                      <div className="mt-8 p-4 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 backdrop-blur-sm">
                        <h4 className="text-lg font-medium mb-3">Your Location</h4>
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{countries.find(c => c.code === userLocation)?.flag}</div>
                          <div>
                            <p className="font-medium">{countries.find(c => c.code === userLocation)?.name}</p>
                            <Chip
                              color={availability[userLocation]?.available ? "success" : "danger"}
                              variant="flat"
                              size="sm"
                              className="mt-1"
                            >
                              {availability[userLocation]?.available ? "Available" : "Unavailable"}
                            </Chip>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CardBody>
              </Card>
            </div>

            <Card className="border-none bg-default-50 dark:bg-default-100 backdrop-blur-sm">
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

        {!availability && !error && !loading && (
          <div className="text-center text-default-500 py-12">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-default-100 flex items-center justify-center">
              <Globe size={48} className="text-default-400" />
            </div>
            <p className="text-lg">Enter a YouTube video URL to check region availability</p>
            <p className="text-sm mt-2 max-w-md mx-auto">This tool checks if a YouTube video is available across different countries and regions due to regional restrictions.</p>
          </div>
        )}

        {searchHistory.length > 0 && (
          <Card className="border-none bg-default-50 dark:bg-default-100 backdrop-blur-sm">
            <CardHeader className="flex justify-between items-center cursor-pointer" onClick={() => setShowHistory(!showHistory)}>
              <div className="flex items-center">
                <History className="mr-2" />
                <h3 className="text-xl font-semibold">Recent Searches</h3>
              </div>
              <div className="flex items-center">
                <Button color="danger" variant="light" size="sm" onClick={(e) => {
                  e.stopPropagation();
                  clearSearchHistory();
                }}>
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

      <InfoSectionYoutubeRegionRestriction />


    </ToolLayout>
  )
}

