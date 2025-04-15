// components/LogoTab.tsx
import React, { useRef, useState } from "react";
import { Card, CardBody, Button, Slider, Tabs, Tab } from "@nextui-org/react";
import { Upload, Trash } from "lucide-react";

// Social media logo templates - replace with your actual paths
const socialMediaLogos = [
  { name: "Facebook", url: "/Images/logos/facebook.png" },
  { name: "Instagram", url: "/Images/logos/instagram.png" },
  { name: "Twitter", url: "/Images/logos/twitter.png" },
  { name: "LinkedIn", url: "/Images/logos/linkedin.png" },
  { name: "YouTube", url: "/Images/logos/youtube.png" },
  { name: "TikTok", url: "/Images/logos/tiktok.png" },
  { name: "WhatsApp", url: "/Images/logos/whatsapp.png" },
  { name: "Pinterest", url: "/Images/logos/pinterest.png" },
  { name: "Snapchat", url: "/Images/logos/snapchat.png" }
];

interface LogoTabProps {
  logoUrl: string;
  setLogoUrl: (url: string) => void;
  logoSize: number;
  setLogoSize: (size: number) => void;
}

export const LogoTab: React.FC<LogoTabProps> = ({ 
  logoUrl, 
  setLogoUrl, 
  logoSize, 
  setLogoSize 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState("upload");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a local URL for the file
      const objectUrl = URL.createObjectURL(file);
      setLogoUrl(objectUrl);
    }
  };

  const handleRemoveLogo = () => {
    setLogoUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const selectSocialLogo = (logoUrl: string) => {
    setLogoUrl(logoUrl);
  };

  return (
    <div className="space-y-6">
      <Tabs 
        aria-label="Logo Options" 
        selectedKey={activeTab} 
        onSelectionChange={(key) => setActiveTab(key as string)}
      >
        <Tab key="upload" title="Upload Logo">
          <Card>
            <CardBody className="space-y-4">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              
              <Button
                color="primary"
                variant="bordered"
                startContent={<Upload size={18} />}
                onClick={() => fileInputRef.current?.click()}
                className="w-full"
              >
                Upload Logo
              </Button>
              
              {logoUrl && activeTab === "upload" && (
                <div className="flex flex-col items-center">
                  <div className="relative w-24 h-24 mb-4 border border-default-200 rounded-md overflow-hidden">
                    <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                      <img
                        src={logoUrl}
                        alt="Logo Preview"
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </div>
                  <Button
                    size="sm"
                    color="danger"
                    variant="light"
                    startContent={<Trash size={16} />}
                    onClick={handleRemoveLogo}
                  >
                    Remove Logo
                  </Button>
                </div>
              )}
            </CardBody>
          </Card>
        </Tab>
        
        <Tab key="social" title="Social Media Logos">
          <Card>
            <CardBody>
              <div className="grid grid-cols-3 gap-3">
                {socialMediaLogos.map((logo) => (
                  <div 
                    key={logo.name}
                    className={`
                      border rounded-md p-2 cursor-pointer flex flex-col items-center
                      ${logoUrl === logo.url ? 'border-primary bg-primary-50' : 'border-default-200 hover:border-primary'}
                    `}
                    onClick={() => selectSocialLogo(logo.url)}
                  >
                    <div className="w-12 h-12 flex items-center justify-center">
                      <img 
                        src={logo.url} 
                        alt={`${logo.name} logo`} 
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <p className="text-xs mt-1 text-center">{logo.name}</p>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>

      {logoUrl && (
        <div>
          <h3 className="text-md font-semibold mb-2">Logo Size</h3>
          <Card>
            <CardBody className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Size: {logoSize}%</span>
                <span className="text-xs text-default-500">(Recommended: 15-25%)</span>
              </div>
              <Slider
                step={5}
                maxValue={50}
                minValue={5}
                value={logoSize}
                onChange={(value) => setLogoSize(value as number)}
                className="max-w-md"
              />
              <div className="text-xs text-default-500 mt-2">
                Larger logos may make the QR code harder to scan. We recommend keeping the logo small and ensuring your QR code has a high error correction level.
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      <div>
        <h3 className="text-md font-semibold mb-2">Logo Tips</h3>
        <Card>
          <CardBody className="space-y-2 text-sm">
            <p>• Use high error correction (H or Q) when adding a logo</p>
            <p>• Transparent background logos work best</p>
            <p>• Keep the logo simple and recognizable</p>
            <p>• Center placement provides optimal scannability</p>
            <p>• Always test your QR code after adding a logo</p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};