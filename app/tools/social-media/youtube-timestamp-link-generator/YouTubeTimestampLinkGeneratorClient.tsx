"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Progress,
  Chip,
  Tooltip,
  Divider,
  Checkbox,
} from "@nextui-org/react"
import {
  Search,
  RefreshCw,
  AlertCircle,
  Clock,
  Check,
  Youtube,
  ChevronDown,
  ChevronUp,
  Link,
  Trash2,
  PlayCircle,
  Copy,
  PlusCircle,
} from "lucide-react"
import { toast } from "react-hot-toast"
import ToolLayout from "@/components/ToolLayout"
import YouTube from 'react-youtube'; // <-- Import the YouTube component
import type { YouTubePlayer } from 'react-youtube'; // <-- Import type for player instance
import InfoSectionYoutubeTimestampGenerator from "./info-section"

// ... (keep existing interfaces: Timestamp, VideoDetails)
interface Timestamp {
  id: string
  hours: string
  minutes: string
  seconds: string
  label: string
  color: string
}

interface VideoDetails {
  id: string
  title: string
  channelTitle: string
  thumbnail: string
  duration: string // Keep duration if needed, or remove if player handles it
}

// ... (keep existing constants and helper functions: COLORS, parseYouTubeUrl, convertTimeToSeconds, convertSecondsToTimeFormat, formatTimestamp)
const COLORS = [
  "primary",
  "secondary",
  "success",
  "warning",
  "danger",
];

const parseYouTubeUrl = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)

  const videoId = match && match[2].length === 11 ? match[2] : null

  // Check for timestamp in URL
  let timestamp = null
  if (url.includes('t=')) {
    const timeMatch = url.match(/[?&]t=([0-9hms]+)/)
    if (timeMatch && timeMatch[1]) {
      timestamp = timeMatch[1]
    }
  }

  return { videoId, timestamp }
}

const convertTimeToSeconds = (hours: string, minutes: string, seconds: string): number => {
  return (
    parseInt(hours || "0") * 3600 +
    parseInt(minutes || "0") * 60 +
    parseInt(seconds || "0")
  )
}

const convertSecondsToTimeFormat = (totalSeconds: number): { hours: string, minutes: string, seconds: string } => {
  totalSeconds = Math.floor(totalSeconds); // Ensure whole seconds
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return {
    hours: hours.toString().padStart(2, '0'),
    minutes: minutes.toString().padStart(2, '0'),
    seconds: seconds.toString().padStart(2, '0')
  }
}

const formatTimestamp = (hours: string, minutes: string, seconds: string, includeHours = true): string => {
  if (includeHours || parseInt(hours || "0") > 0) {
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`
  }
  return `${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`
}


export default function YouTubeTimestampLinkGenerator() {
  const [videoUrl, setVideoUrl] = useState("")
  const [timestamps, setTimestamps] = useState<Timestamp[]>([])
  const [videoDetails, setVideoDetails] = useState<VideoDetails | null>(null)
  const [error, setError] = useState("")
  const [loadingVideo, setLoadingVideo] = useState(false)
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const [showHistory, setShowHistory] = useState(false)
  const [savedTimestamps, setSavedTimestamps] = useState<Record<string, Timestamp[]>>({})
  const [generatedLink, setGeneratedLink] = useState("")
  const [copiedLink, setCopiedLink] = useState(false)
  const [includeLabels, setIncludeLabels] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)
  const [player, setPlayer] = useState<YouTubePlayer | null>(null); // <-- State for the player instance

  // ... (useEffect for history and saved timestamps remains the same)
  useEffect(() => {
    const history = localStorage.getItem("timestampSearchHistory")
    if (history) {
      setSearchHistory(JSON.parse(history))
    }

    const saved = localStorage.getItem("savedTimestamps")
    if (saved) {
      setSavedTimestamps(JSON.parse(saved))
    }
  }, [])

  // ... (fetchVideoDetails remains the same)
  const fetchVideoDetails = async (videoId: string) => {
    setLoadingVideo(true)
    setError("")
    setPlayer(null); // Reset player when fetching new video

    try {
      // Make sure NEXT_PUBLIC_YOUTUBE_API_KEY is set in your .env.local
      if (!process.env.NEXT_PUBLIC_YOUTUBE_API_KEY) {
        setError("YouTube API Key is not configured.");
        setLoadingVideo(false);
        return null;
      }
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
      )
      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        setError(`Failed to fetch video details: ${errorData.error?.message || response.statusText}`);
        setLoadingVideo(false);
        return null;
      }

      const data = await response.json()

      if (data.items && data.items.length > 0) {
        const videoData = data.items[0]
        const details: VideoDetails = {
          id: videoId,
          title: videoData.snippet.title,
          channelTitle: videoData.snippet.channelTitle,
          thumbnail: videoData.snippet.thumbnails.high.url,
          duration: videoData.contentDetails.duration, // Duration from API
        }
        setVideoDetails(details)
        updateSearchHistory(videoUrl)
        toast.success("Video details fetched successfully!")
        return details
      } else {
        setError("No video found with this ID.")
        return null
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(`Failed to fetch video details. ${err.message || 'Please try again.'}`)
      console.error(err)
      return null
    } finally {
      setLoadingVideo(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setTimestamps([]) // Clear previous timestamps for new video
    setGeneratedLink("") // Clear generated link

    const { videoId, timestamp: urlTimestamp } = parseYouTubeUrl(videoUrl)
    if (!videoId) {
      setError("Invalid YouTube URL")
      return
    }

    // Load video details first
    const videoInfo = await fetchVideoDetails(videoId)
    if (!videoInfo) return

    // Check if we have saved timestamps for this video *after* fetching details
    if (savedTimestamps[videoId]) {
      setTimestamps(savedTimestamps[videoId])
      toast.success("Loaded saved timestamps for this video!")
    } else {
      setTimestamps([]) // Ensure timestamps are empty if none saved
    }


    // If there was a timestamp in the URL, add it automatically *after* checking saved
    if (urlTimestamp && (!savedTimestamps[videoId] || savedTimestamps[videoId].length === 0)) { // Only add if no saved stamps
      // Handle various timestamp formats
      let timeInSeconds = 0
      if (urlTimestamp.includes('h') || urlTimestamp.includes('m') || urlTimestamp.includes('s')) {
        // Format like 1h2m3s
        const hourMatch = urlTimestamp.match(/(\d+)h/)
        const minuteMatch = urlTimestamp.match(/(\d+)m/)
        const secondMatch = urlTimestamp.match(/(\d+)s/)

        const hours = hourMatch ? hourMatch[1] : "0"
        const minutes = minuteMatch ? minuteMatch[1] : "0"
        const seconds = secondMatch ? secondMatch[1] : "0"

        addTimestamp(hours, minutes, seconds, "Timestamp from URL")
      } else {
        // Format like t=123 (seconds)
        timeInSeconds = parseInt(urlTimestamp)
        if (!isNaN(timeInSeconds)) {
          const { hours, minutes, seconds } = convertSecondsToTimeFormat(timeInSeconds)
          addTimestamp(hours, minutes, seconds, "Timestamp from URL")
        }
      }
    }

  }

  // --- NEW: Handler for when the YouTube player is ready ---
  const onPlayerReady = (event: { target: YouTubePlayer }) => {
    setPlayer(event.target);
    // You could potentially seek to the first timestamp here if desired
    // if (timestamps.length > 0 && event.target) {
    //   const firstTsSeconds = convertTimeToSeconds(timestamps[0].hours, timestamps[0].minutes, timestamps[0].seconds);
    //   event.target.seekTo(firstTsSeconds, true);
    // }
  };

  // --- NEW: Function to pick the current time from the player ---
  const handlePickCurrentTime = () => {
    if (player && typeof player.getCurrentTime === 'function') {
      const currentTime = player.getCurrentTime();
      if (typeof currentTime === 'number') {
        const { hours, minutes, seconds } = convertSecondsToTimeFormat(currentTime);
        const formattedTime = formatTimestamp(hours, minutes, seconds, parseInt(hours) > 0);
        addTimestamp(hours, minutes, seconds, `Timestamp at ${formattedTime}`);
        toast.success(`Timestamp added at ${formattedTime}`);
      } else {
        toast.error("Couldn't get current time from player.");
        console.warn("player.getCurrentTime() did not return a number:", currentTime);
      }
    } else {
      toast.error("Player not available or ready.");
      console.warn("Player object or getCurrentTime method missing:", player);
    }
  };

  // --- Modified addTimestamp to optionally prevent duplicates at the exact same second ---
  const addTimestamp = (hours = "00", minutes = "00", seconds = "00", label = "Untitled Timestamp") => {
    const totalSeconds = convertTimeToSeconds(hours, minutes, seconds);

    // Optional: Check if a timestamp at this exact second already exists
    const existingTimestamp = timestamps.find(ts => convertTimeToSeconds(ts.hours, ts.minutes, ts.seconds) === totalSeconds);
    if (existingTimestamp) {
      toast.error(`Timestamp at ${formatTimestamp(hours, minutes, seconds)} already exists.`);
      return; // Don't add duplicate
    }


    const newTimestamp: Timestamp = {
      id: Date.now().toString(),
      hours: hours.padStart(2, '0'),
      minutes: minutes.padStart(2, '0'),
      seconds: seconds.padStart(2, '0'),
      label,
      color: COLORS[timestamps.length % COLORS.length], // Cycle through colors
    }

    setTimestamps(prev => {
      // Add and sort immediately
      const updated = [...prev, newTimestamp].sort((a, b) => {
        const aSeconds = convertTimeToSeconds(a.hours, a.minutes, a.seconds);
        const bSeconds = convertTimeToSeconds(b.hours, b.minutes, b.seconds);
        return aSeconds - bSeconds;
      });

      // Save to localStorage if we have a videoId
      if (videoDetails?.id) {
        const updatedSaved = {
          ...savedTimestamps,
          [videoDetails.id]: updated,
        }
        localStorage.setItem("savedTimestamps", JSON.stringify(updatedSaved))
        setSavedTimestamps(updatedSaved)
      }
      return updated
    })
  }

  // ... (updateTimestamp, removeTimestamp remain the same)
  const updateTimestamp = (id: string, field: keyof Timestamp, value: string) => {
    setTimestamps(prev => {
      const updated = prev.map(ts =>
        ts.id === id ? { ...ts, [field]: field.includes('hours') || field.includes('minutes') || field.includes('seconds') ? value.padStart(2, '0') : value } : ts
      )

      // Save to localStorage if we have a videoId
      if (videoDetails?.id) {
        const updatedSaved = {
          ...savedTimestamps,
          [videoDetails.id]: updated,
        }
        localStorage.setItem("savedTimestamps", JSON.stringify(updatedSaved))
        setSavedTimestamps(updatedSaved)
      }

      return updated
    })
  }

  const removeTimestamp = (id: string) => {
    setTimestamps(prev => {
      const updated = prev.filter(ts => ts.id !== id)

      // Save to localStorage if we have a videoId
      if (videoDetails?.id) {
        const updatedSaved = {
          ...savedTimestamps,
          [videoDetails.id]: updated,
        }
        localStorage.setItem("savedTimestamps", JSON.stringify(updatedSaved))
        setSavedTimestamps(updatedSaved)
      }

      return updated
    })
  }


  // ... (generateLink remains mostly the same, uses already sorted timestamps)
  const generateLink = () => {
    if (!videoDetails) return

    const baseUrl = `https://www.youtube.com/watch?v=${videoDetails.id}`

    if (timestamps.length === 0) {
      setGeneratedLink(baseUrl)
      toast("No timestamps added, generated base video link.");
      return
    }

    // Timestamps are now sorted when added/updated
    const sortedTimestamps = timestamps; // Already sorted

    // Generate description with timestamps
    let description = ""
    if (includeLabels) {
      description = sortedTimestamps
        .map(ts => {
          const totalSeconds = convertTimeToSeconds(ts.hours, ts.minutes, ts.seconds)
          // Format timestamp appropriately (HH:MM:SS or MM:SS)
          const formattedTime = formatTimestamp(ts.hours, ts.minutes, ts.seconds, parseInt(ts.hours || "0") > 0);
          return `${formattedTime} - ${ts.label} (https://youtu.be/${videoDetails.id}?t=${totalSeconds})`
        })
        .join('\n')
    }

    // Add &t= parameter for the first timestamp
    const firstTimestamp = sortedTimestamps[0]
    const firstTotalSeconds = convertTimeToSeconds(firstTimestamp.hours, firstTimestamp.minutes, firstTimestamp.seconds)

    // Construct the final output: Link to first timestamp + optional description
    let finalOutput = `${baseUrl}&t=${firstTotalSeconds}`
    if (description) {
      finalOutput += `\n\n-- Timestamps --\n${description}` // Add header for clarity
    }

    setGeneratedLink(finalOutput)
    setCopiedLink(false)
    toast.success("Link and description generated!")
  }


  // ... (updateSearchHistory, clearSearchHistory, handleShare, copyToClipboard remain the same)
  const updateSearchHistory = (url: string) => {
    const newHistory = [url, ...searchHistory.filter((item) => item !== url).slice(0, 9)]
    setSearchHistory(newHistory)
    localStorage.setItem("timestampSearchHistory", JSON.stringify(newHistory))
  }

  const clearSearchHistory = () => {
    setSearchHistory([])
    localStorage.removeItem("timestampSearchHistory")
    toast.success("Search history cleared!")
  }

  const handleShare = () => {
    if (!generatedLink) {
      toast.error("Please generate the link first!");
      return;
    }
    navigator.clipboard.writeText(generatedLink)
    setCopiedLink(true)
    toast.success("Generated link and description copied to clipboard!")
    setTimeout(() => setCopiedLink(false), 3000)

  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard!")
  }


  // --- Modified handleReset to also clear player ---
  const handleReset = () => {
    setVideoUrl("")
    setTimestamps([])
    setVideoDetails(null)
    setError("")
    setGeneratedLink("")
    setPlayer(null); // Clear player instance
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  // --- Modified getTimestampUrl to use videoDetails ---
  const getTimestampUrl = (timestamp: Timestamp) => {
    if (!videoDetails) return ""
    const totalSeconds = convertTimeToSeconds(timestamp.hours, timestamp.minutes, timestamp.seconds)
    return `https://youtu.be/${videoDetails.id}?t=${totalSeconds}`
  }

  // --- NEW/Modified: Function to seek the player to a timestamp ---
  const playTimestampInPlayer = (timestamp: Timestamp) => {
    if (player && typeof player.seekTo === 'function') {
      const totalSeconds = convertTimeToSeconds(timestamp.hours, timestamp.minutes, timestamp.seconds);
      player.seekTo(totalSeconds, true); // true = allow seek ahead
      player.playVideo(); // Start playing from that point
    } else if (videoDetails) {
      // Fallback: open in new tab if player isn't ready
      const url = getTimestampUrl(timestamp)
      window.open(url, "_blank")
    } else {
      toast.error("Player not ready or video not loaded.");
    }
  }

  // --- Player Options ---
  const playerOptions = {
    height: '390', // Adjust as needed
    width: '100%', // Make it responsive
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0, // Don't autoplay initially
      controls: 1, // Show default YouTube controls
    },
  };


  return (
    <ToolLayout
      title="YouTube Timestamp Link Generator"
      description="Create and share timestamped links for YouTube videos with custom labels, now with interactive time picking!"
      toolId="678f383226f06f912191bcdb"
    >
      <div className="flex flex-col gap-6">
        {/* Header Card (Form) */}
        <Card className="bg-gradient-to-r from-blue-950 to-purple-900 text-white shadow-lg">
          {/* ... (CardBody with form remains largely the same) ... */}
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
                  aria-label="YouTube Video URL"
                />
                <Tooltip content="Fetch video details" className="text-default-700">
                  <Button
                    color="danger"
                    type="submit"
                    isLoading={loadingVideo}
                    startContent={loadingVideo ? <RefreshCw className="animate-spin" /> : <Search />}
                    className="bg-gradient-to-r from-red-500 to-red-600"
                    size="lg"
                    isDisabled={!videoUrl.trim()}
                  >
                    {loadingVideo ? "Fetching..." : "Load Video"}
                  </Button>
                </Tooltip>
                <Button
                  variant="flat"
                  onClick={handleReset}
                  startContent={<RefreshCw />}
                  className="bg-white/10 text-white hover:bg-white/20"
                  size="lg"
                  aria-label="Reset Tool"
                >
                  Reset
                </Button>
                {/* Share button moved below generated link for better flow */}
              </div>
            </form>

            {error && (
              <div className="bg-red-500/80 backdrop-blur-sm text-white p-4 rounded-xl mt-4 flex items-center">
                <AlertCircle className="mr-2 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {loadingVideo && (
              <div className="mt-6">
                <p className="text-white/70 mb-2">Fetching video details...</p>
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

        {/* Video Details & Player Section */}
        {videoDetails && (
          <Card className="shadow-md border-none bg-default-50/50 backdrop-blur-sm dark:bg-default-100/50">
            <CardHeader>
              <h2 className="text-xl font-bold">{videoDetails.title}</h2>
            </CardHeader>
            <Divider />
            <CardBody className="p-4">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Left Column: Player */}
                <div className="w-full lg:w-1/2">
                  <p className="text-default-500 mb-2">Channel: {videoDetails.channelTitle}</p>
                  <div className="aspect-video bg-black rounded-lg overflow-hidden mb-4">
                    <YouTube
                      videoId={videoDetails.id}
                      opts={playerOptions}
                      onReady={onPlayerReady}
                      onError={(err) => { console.error("YT Player Error:", err); toast.error("Error loading YouTube player."); }}
                      className="w-full h-full" // Ensure iframe fills container
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 items-center">
                    <Tooltip content="Add a timestamp based on the video's current playback time" className="text-default-700">
                      <Button
                        color="warning"
                        onClick={handlePickCurrentTime}
                        startContent={<Clock size={18} />}
                        isDisabled={!player} // Disabled until player is ready
                        className="bg-gradient-to-r from-orange-500 to-amber-500"
                      >
                        Pick Current Time
                      </Button>
                    </Tooltip>
                    <Tooltip content="Manually add a timestamp entry below" className="text-default-700">
                      <Button
                        color="primary"
                        onClick={() => addTimestamp()} // Adds a blank one to fill manually
                        startContent={<PlusCircle size={18} />}
                        className="bg-gradient-to-r from-blue-500 to-indigo-500"
                      >
                        Add Manual Timestamp
                      </Button>
                    </Tooltip>
                  </div>
                </div>

                {/* Right Column: Timestamp List Actions & Generation */}
                <div className="w-full lg:w-1/2">
                  <h3 className="text-lg font-semibold mb-3">Timestamp Controls</h3>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap gap-2 justify-between items-center">
                      <Button
                        color="secondary"
                        onClick={generateLink}
                        startContent={<Link size={18} />}
                        className="bg-gradient-to-r from-purple-500 to-violet-500"
                        isDisabled={timestamps.length === 0}
                      >
                        Generate Link & Description
                      </Button>
                      <Checkbox
                        isSelected={includeLabels}
                        onValueChange={setIncludeLabels}
                        color="secondary"
                        size="sm"
                      >
                        Include labels in description
                      </Checkbox>
                    </div>

                    {/* Info about the list */}
                    {timestamps.length > 0 && (
                      <p className="text-sm text-default-500 mt-2">
                        You have {timestamps.length} timestamp{timestamps.length !== 1 ? 's' : ''}. Use the list below to edit or delete them.
                      </p>
                    )}
                    {timestamps.length === 0 && (
                      <p className="text-sm text-default-400 mt-2">
                        Use the buttons above to add timestamps interactively or manually.
                      </p>
                    )}

                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        )}

        {/* Timestamps Table/List */}
        {videoDetails && timestamps.length > 0 && ( // Only show if there are timestamps
          <Card className="shadow-md border-none bg-default-50/50 backdrop-blur-sm dark:bg-default-100/50">
            <CardHeader>
              <h2 className="text-xl font-bold">Edit Timestamps</h2>
            </CardHeader>
            <Divider />
            <CardBody className="p-4">
              <div className="space-y-3">
                {timestamps.map((timestamp) => (
                  <Card key={timestamp.id} className="w-full bg-white/70 dark:bg-black/30">
                    <CardBody className="p-3">
                      <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-start md:items-center">
                        {/* Time Display & Input */}
                        <div className="flex flex-col items-start w-full md:w-auto mb-2 md:mb-0">
                          <Chip
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            color={timestamp.color as any}
                            variant="shadow"
                            className="min-w-20 justify-center mb-1"
                          >
                            {formatTimestamp(timestamp.hours, timestamp.minutes, timestamp.seconds)}
                          </Chip>
                          <div className="flex gap-1 items-center">
                            <Input
                              aria-label="Hours"
                              size="sm"
                              placeholder="HH"
                              value={timestamp.hours}
                              onChange={(e) => updateTimestamp(timestamp.id, "hours", e.target.value.replace(/\D/g, ''))} // Allow only digits
                              className="w-12"
                              type="number"
                              min="0"
                            />
                            <span className="text-default-500">:</span>
                            <Input
                              aria-label="Minutes"
                              size="sm"
                              placeholder="MM"
                              value={timestamp.minutes}
                              onChange={(e) => updateTimestamp(timestamp.id, "minutes", e.target.value.replace(/\D/g, ''))}
                              className="w-12"
                              type="number"
                              min="0"
                              max="59"
                            />
                            <span className="text-default-500">:</span>
                            <Input
                              aria-label="Seconds"
                              size="sm"
                              placeholder="SS"
                              value={timestamp.seconds}
                              onChange={(e) => updateTimestamp(timestamp.id, "seconds", e.target.value.replace(/\D/g, ''))}
                              className="w-12"
                              type="number"
                              min="0"
                              max="59"
                            />
                          </div>
                        </div>

                        {/* Label Input */}
                        <Input
                          aria-label="Timestamp Label"
                          size="sm"
                          placeholder="Label (e.g., Introduction, Key Point)"
                          value={timestamp.label}
                          onChange={(e) => updateTimestamp(timestamp.id, "label", e.target.value)}
                          className="flex-grow" // Takes remaining space
                        />

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-1 mt-2 md:mt-0 justify-end shrink-0">
                          <Tooltip content="Play video from this timestamp" className="text-default-700">
                            <Button
                              isIconOnly
                              size="sm"
                              variant="flat"
                              color="success"
                              onClick={() => playTimestampInPlayer(timestamp)} // Use new function
                              aria-label={`Play from ${formatTimestamp(timestamp.hours, timestamp.minutes, timestamp.seconds)}`}
                            >
                              <PlayCircle size={16} />
                            </Button>
                          </Tooltip>
                          <Tooltip content="Copy link for this timestamp" className="text-default-700">
                            <Button
                              isIconOnly
                              size="sm"
                              variant="flat"
                              color="primary"
                              onClick={() => copyToClipboard(getTimestampUrl(timestamp))}
                              aria-label={`Copy link for ${formatTimestamp(timestamp.hours, timestamp.minutes, timestamp.seconds)}`}
                            >
                              <Copy size={16} />
                            </Button>
                          </Tooltip>
                          <Tooltip content="Delete this timestamp" className="text-default-700">
                            <Button
                              isIconOnly
                              size="sm"
                              variant="flat"
                              color="danger"
                              onClick={() => removeTimestamp(timestamp.id)}
                              aria-label={`Delete timestamp ${formatTimestamp(timestamp.hours, timestamp.minutes, timestamp.seconds)}`}
                            >
                              <Trash2 size={16} />
                            </Button>
                          </Tooltip>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </CardBody>
          </Card>
        )}

        {/* Message when no timestamps exist yet */}
        {videoDetails && timestamps.length === 0 && (
          <Card className="shadow-md border-none bg-default-50/50 backdrop-blur-sm dark:bg-default-100/50">
            <CardBody className="text-center p-10 text-default-400">
              <Clock size={48} className="mx-auto mb-4 opacity-50" />
              <p>No timestamps added yet.</p> {/* This one is okay as it only contains text */}
              {/* 👇 Changed from <p> to <div> */}
              <div className="text-sm mt-2"> {/* Added mt-2 for spacing, adjust if needed */}
                Use the <Chip color="warning" size="sm" className="mx-1 align-baseline">Pick Current Time</Chip> button while playing the video, or <Chip color="primary" size="sm" className="mx-1 align-baseline">Add Manual Timestamp</Chip> to create your first one.
              </div>
            </CardBody>
          </Card>
        )}


        {/* Generated Link Output */}
        {generatedLink && (
          <Card className="shadow-md border-none bg-default-50/50 backdrop-blur-sm dark:bg-default-100/50">
            <CardHeader>
              <h2 className="text-xl font-bold">Generated Link & Description</h2>
            </CardHeader>
            <Divider />
            <CardBody className="p-4">
              <div className="flex flex-col gap-4">
                <div className="relative">
                  <p className="text-sm text-default-500 mb-2">Copy the text below to share the link and timestamp list:</p>
                  <div className="bg-default-100 p-4 rounded-lg max-h-60 overflow-y-auto whitespace-pre-wrap font-mono text-sm">
                    {generatedLink}
                  </div>
                  <Button
                    className="absolute top-2 right-2 z-10" // Ensure button is clickable over text area edge
                    size="sm"
                    color={copiedLink ? "success" : "primary"}
                    variant="flat"
                    onClick={handleShare} // Use handleShare which already copies generatedLink
                    startContent={copiedLink ? <Check size={16} /> : <Copy size={16} />}
                  >
                    {copiedLink ? "Copied!" : "Copy All"}
                  </Button>
                </div>

                <Button
                  color="danger" // Changed color to match YouTube
                  onClick={() => window.open(generatedLink.split('\n')[0], "_blank")} // Open only the first line (the URL)
                  startContent={<Youtube size={18} />}
                  className="bg-gradient-to-r from-red-500 to-red-600 text-white"
                >
                  Open Link in YouTube (Starts at First Timestamp)
                </Button>
              </div>
            </CardBody>
          </Card>
        )}

        {/* If no video is loaded (Initial State) */}
        {!videoDetails && !error && !loadingVideo && (
          <div className="text-center text-default-500 py-12">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-default-100 flex items-center justify-center">
              <Youtube size={48} className="text-red-500" />
            </div>
            <p className="text-lg font-semibold">Enter a YouTube video URL to get started</p>
            <p className="text-sm mt-2 max-w-md mx-auto">
              This tool helps you create timestamped YouTube links interactively or manually.
            </p>
          </div>
        )}

        {/* Search History (remains the same) */}
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
              <div className="flex items-center gap-2">
                <Button
                  color="danger"
                  variant="light"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation() // Prevent CardHeader click
                    clearSearchHistory()
                  }}
                  startContent={<Trash2 size={14} />}
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
                      onClick={() => {
                        setVideoUrl(url);
                        // Optionally trigger submit automatically after setting URL
                        // handleSubmit(new Event('submit') as any); // You might need to polyfill Event or handle differently
                        toast("URL loaded. Click 'Load Video' to fetch.", { icon: '➡️' });
                      }}
                      variant="flat"
                      className="w-full justify-start text-left truncate"
                      startContent={<Youtube className="text-red-500 flex-shrink-0" />}
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
      <InfoSectionYoutubeTimestampGenerator />
    </ToolLayout>
  )
}