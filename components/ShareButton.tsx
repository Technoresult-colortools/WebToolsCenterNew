import type React from "react"
import { Button, Popover, PopoverTrigger, PopoverContent } from "@nextui-org/react"
import { Share2, Facebook, Twitter, Linkedin } from "lucide-react"

interface ShareButtonProps {
  onShare: (platform: "facebook" | "twitter" | "linkedin") => void
  className?: string
}

export const ShareButton: React.FC<ShareButtonProps> = ({ onShare, className }) => {
  return (
    <Popover placement="bottom">
      <PopoverTrigger>
        <Button className={className}>
          <Share2 size={16} className="mr-2" />
          Share
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2">
          <div className="text-small font-bold text-default-700 mb-2">Share on Social Media</div>
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={() => onShare("facebook")}
              className="bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300"
            >
              <Facebook className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              onClick={() => onShare("twitter")}
              className="bg-sky-500 text-white hover:bg-sky-600 transition-colors duration-300"
            >
              <Twitter className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              onClick={() => onShare("linkedin")}
              className="bg-blue-700 text-white hover:bg-blue-800 transition-colors duration-300"
            >
              <Linkedin className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

