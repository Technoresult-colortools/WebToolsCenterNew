'use client'
import React, { useState, useRef, useEffect } from 'react';
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
  BookOpen
} from 'lucide-react';
import { 
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Tabs,
  Tab,
  Image,

  Chip,
  Tooltip,
} from "@nextui-org/react";
import { toast } from 'react-hot-toast';
import NextImage from 'next/image'
import ToolLayout from '@/components/ToolLayout';


interface VideoData {
  tags: string[];
  title: string;
  description: string;
  thumbnail: string;
  viewCount: string;
  likeCount: string;
  commentCount: string;
  publishedAt: string;
}

export default function YouTubeKeywordTagExtractor() {
  const [videoUrl, setVideoUrl] = useState('');
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const history = localStorage.getItem('searchHistory');
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  }, []);

  const extractVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const fetchVideoData = async () => {
    setError('');
    setVideoData(null);
    setLoading(true);

    const videoId = extractVideoId(videoUrl);
    if (!videoId) {
      setError('Invalid YouTube URL');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
      );
      const data = await response.json();

      if (data.items && data.items.length > 0) {
        const item = data.items[0];
        const snippet = item.snippet;
        const statistics = item.statistics;
        const videoData: VideoData = {
          tags: snippet.tags || [],
          title: snippet.title,
          description: snippet.description,
          thumbnail: snippet.thumbnails.high.url,
          viewCount: statistics.viewCount,
          likeCount: statistics.likeCount,
          commentCount: statistics.commentCount,
          publishedAt: new Date(snippet.publishedAt).toLocaleDateString()
        };

        setVideoData(videoData);
        updateSearchHistory(videoUrl);
        toast.success('Video data extracted successfully!');
      } else {
        setError('No data found for this video');
      }
    } catch {
      setError('Failed to fetch video data. Please try again.');
    }

    setLoading(false);
  };

  const updateSearchHistory = (url: string) => {
    const newHistory = [url, ...searchHistory.slice(0, 9)];
    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchVideoData();
  };

  const handleReset = () => {
    setVideoUrl('');
    setVideoData(null);
    setError('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const downloadTags = () => {
    if (!videoData) return;
    const tagText = videoData.tags.join('\n');
    const blob = new Blob([tagText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'youtube_tags.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success('Tags downloaded!');
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
    toast.success('Search history cleared!');
  };

  return (
    <ToolLayout
      title="YouTube Keyword Tag Extractor"
      description="Extract keyword tags and metadata from any YouTube video"
      toolId='678f383126f06f912191bcd7'
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
                    startContent={<Youtube className="text-danger" />}
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
                    <Button
                    color="danger"
                    size="md"
                    onClick={handleReset}
                    startContent={<RotateCcw size={20} />}
                    >
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

            {!videoData && ( // Hide this when video loads
            <div className="text-center text-default-500 py-12">
                <ImageIcon size={48} className="mx-auto mb-4" />
                <p>Enter a YouTube video URL to fetch thumbnails</p>
            </div>
            )}

   
        </CardBody>
        </Card>
        {/* Results Section */}
        {videoData && (
        <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-default-50 dark:bg-default-100 h-[460px]">
            <CardHeader className="flex gap-2">
                <Youtube className="text-danger" />
                <div className="overflow-hidden">
                <h2 className="text-xl font-bold truncate">{videoData.title}</h2>
                <p className="text-default-600">Published on {videoData.publishedAt}</p>
                </div>
            </CardHeader>
            <CardBody>
                <div className="flex flex-col h-full">
                <Image
                    src={videoData.thumbnail}
                    alt={videoData.title}
                    className="w-full rounded-lg mb-4 object-cover"
                />
                <div className="grid grid-cols-3 gap-4 mt-auto">
                    <Tooltip content="Total Views">
                    <div className="flex items-center gap-2">
                        <Eye className="text-default-500" />
                        <span>{parseInt(videoData.viewCount).toLocaleString()}</span>
                    </div>
                    </Tooltip>
                    <Tooltip content="Total Likes">
                    <div className="flex items-center gap-2">
                        <ThumbsUp className="text-default-500" />
                        <span>{parseInt(videoData.likeCount).toLocaleString()}</span>
                    </div>
                    </Tooltip>
                    <Tooltip content="Total Comments">
                    <div className="flex items-center gap-2">
                        <MessageSquare className="text-default-500" />
                        <span>{parseInt(videoData.commentCount).toLocaleString()}</span>
                    </div>
                    </Tooltip>
                </div>
                </div>
            </CardBody>
            </Card>

            <Card className="bg-default-50 dark:bg-default-100 h-[460px]">
            <CardBody className="p-0"> {/* Remove default padding */}
                <Tabs 
                aria-label="Video metadata" 
                className="flex flex-col h-full"
                classNames={{
                    panel: "flex-1 p-4", // Add padding to panel instead
                    tabList: "p-4 pb-0", // Add padding to tab list
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
                        {videoData.tags.map((tag, index) => (
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
                        onClick={downloadTags}
                    >
                        Download Tags
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
                    <div className="whitespace-pre-wrap text-default-600">
                        {videoData.description}
                    </div>
                    </div>
                </Tab>
                </Tabs>
            </CardBody>
            </Card>
        </div>
        )}

      {/* Search History */}
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


        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8">
   
            <div className="rounded-xl p-2 md:p-4 max-w-4xl mx-auto">
            
            {/* About YouTube Keyword Tag Extractor */}
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 flex items-center">
                <Info className="w-6 h-6 mr-2" />
                About YouTube Keyword Tag Extractor
            </h2>
            <p className="text-sm md:text-base text-default-600 mb-4">
            Our YouTube keyword tag is a powerful tool designed to help the creators, sellets, researchers and youtube enthusiasts, who remove and analyze the valuable metadata from YouTube video. This video goes beyond simple tag extraction by offering a broad suit of features to enhance understanding understanding and customize YouTube strategies.
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
                <li>Video Metadata Analysis: Gather crucial information such as view count, like count, comment count, and publish date.</li>
                <li>Visual Tag Cloud: Generate an interactive tag cloud for easy visualization of keyword prominence.</li>
                <li>Description Analysis: Access and analyze the full video description for additional context and keywords.</li>
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
                <li>Click the "Extract" button to fetch the video's metadata and tags.</li>
                <li>Explore the extracted data in the tabbed interface:
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
  );
}