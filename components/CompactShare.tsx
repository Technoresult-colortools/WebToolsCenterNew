import React, { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, Button, ButtonGroup, Tooltip, Tabs, Tab } from "@nextui-org/react";
import { Share2, Facebook, Twitter, Linkedin, Mail, Copy, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Key } from 'react';

interface CompactShareProps {
  toolName: string;
  isOpen: boolean;
  onOpenChange: () => void;
}

interface ShareButtonProps {
  platform: string;
  icon: React.ElementType;
  color: string;
  onClick: () => void;
}

const CompactShare = ({ toolName, isOpen, onOpenChange }: CompactShareProps) => {
  const [selected, setSelected] = useState<Key | null>("tool");
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const websiteUrl = typeof window !== 'undefined' ? window.location.origin : '';

  const getShareLinks = (title: string, url: string) => ({
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
    email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this tool: ${url}`)}`
  });

  const handleShare = (platform: string, url: string) => {
    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard!', {
        className: '!bg-content1 !dark:bg-content1 !text-foreground !dark:text-foreground'
      });
      return;
    }

    const title = selected === 'tool' 
      ? `Check out this ${toolName} tool!` 
      : 'Check out this amazing web tools collection!';
    const links = getShareLinks(title, url);
    window.open(links[platform as keyof typeof links], '_blank');
    toast.success(`Sharing on ${platform}`, {
      className: '!bg-content1 !dark:bg-content1 !text-foreground !dark:text-foreground'
    });
  };

  const ShareButton: React.FC<ShareButtonProps> = ({ platform, icon: Icon, color, onClick }) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="w-full"
    >
      <Button
        onClick={onClick}
        className={`h-20 w-full ${color} transition-all duration-300`}
      >
        <div className="flex flex-col items-center gap-2">
          <Icon className="h-6 w-6" />
          <span className="text-xs font-medium">{platform}</span>
        </div>
      </Button>
    </motion.div>
  );

  return (
    <>
      <Tooltip 
        content="Share Tool"
        className="bg-content2 dark:bg-content2 text-foreground dark:text-foreground"
      >
        <Button
          isIconOnly
          variant="flat"
          onClick={onOpenChange}
          className="bg-default-100 hover:bg-default-200 dark:bg-default-100/20 dark:hover:bg-default-200/30"
        >
          <Share2 className="h-4 w-4 text-default-500 dark:text-default-400" />
        </Button>
      </Tooltip>

      <Modal 
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
        placement="center"
        classNames={{
          base: "bg-content1 dark:bg-content1",
          header: "border-b border-divider",
          body: "py-6",
        }}
        size="md"
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut"
              }
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn"
              }
            }
          }
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-primary" />
                  <h3 className="text-xl font-semibold text-foreground">Share</h3>
                </div>
              </ModalHeader>
              <ModalBody>
                <Tabs 
                  selectedKey={selected?.toString() || null} 
                  onSelectionChange={setSelected}
                  aria-label="Share options"
                  color="primary"
                  variant="underlined"
                  classNames={{
                    tabList: "gap-6",
                    cursor: "w-full bg-primary",
                    tab: "max-w-fit px-2 h-12",
                    tabContent: "group-data-[selected=true]:text-primary"
                  }}
                >
                  <Tab
                    key="tool"
                    title={
                      <div className="flex items-center gap-2">
                        <ExternalLink className="w-4 h-4" />
                        <span>Share Tool</span>
                      </div>
                    }
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="pt-4"
                    >
                      <div className="text-center mb-6">
                        <h4 className="text-lg font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                          {toolName}
                        </h4>
                        <p className="text-sm text-default-500">Share this tool with others</p>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <ShareButton
                          platform="Facebook"
                          icon={Facebook}
                          color="bg-blue-500/10 hover:bg-blue-500/20 text-blue-500"
                          onClick={() => handleShare('facebook', currentUrl)}
                        />
                        <ShareButton
                          platform="Twitter"
                          icon={Twitter}
                          color="bg-sky-500/10 hover:bg-sky-500/20 text-sky-500"
                          onClick={() => handleShare('twitter', currentUrl)}
                        />
                        <ShareButton
                          platform="LinkedIn"
                          icon={Linkedin}
                          color="bg-blue-600/10 hover:bg-blue-600/20 text-blue-600"
                          onClick={() => handleShare('linkedin', currentUrl)}
                        />
                        <ShareButton
                          platform="Email"
                          icon={Mail}
                          color="bg-red-500/10 hover:bg-red-500/20 text-red-500"
                          onClick={() => handleShare('email', currentUrl)}
                        />
                        <ShareButton
                          platform="Copy Link"
                          icon={Copy}
                          color="bg-primary/10 hover:bg-primary/20 text-primary col-span-2"
                          onClick={() => handleShare('copy', currentUrl)}
                        />
                      </div>
                    </motion.div>
                  </Tab>
                  <Tab
                    key="website"
                    title={
                      <div className="flex items-center gap-2">
                        <Share2 className="w-4 h-4" />
                        <span>Share Website</span>
                      </div>
                    }
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="pt-4"
                    >
                      <div className="text-center mb-6">
                        <h4 className="text-lg font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                          WebToolsCenter.com
                        </h4>
                        <p className="text-sm text-default-500">Share our collection of tools</p>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <ShareButton
                          platform="Facebook"
                          icon={Facebook}
                          color="bg-blue-500/10 hover:bg-blue-500/20 text-blue-500"
                          onClick={() => handleShare('facebook', websiteUrl)}
                        />
                        <ShareButton
                          platform="Twitter"
                          icon={Twitter}
                          color="bg-sky-500/10 hover:bg-sky-500/20 text-sky-500"
                          onClick={() => handleShare('twitter', websiteUrl)}
                        />
                        <ShareButton
                          platform="LinkedIn"
                          icon={Linkedin}
                          color="bg-blue-600/10 hover:bg-blue-600/20 text-blue-600"
                          onClick={() => handleShare('linkedin', websiteUrl)}
                        />
                        <ShareButton
                          platform="Email"
                          icon={Mail}
                          color="bg-red-500/10 hover:bg-red-500/20 text-red-500"
                          onClick={() => handleShare('email', websiteUrl)}
                        />
                        <ShareButton
                          platform="Copy Link"
                          icon={Copy}
                          color="bg-primary/10 hover:bg-primary/20 text-primary col-span-2"
                          onClick={() => handleShare('copy', websiteUrl)}
                        />
                      </div>
                    </motion.div>
                  </Tab>
                </Tabs>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CompactShare;