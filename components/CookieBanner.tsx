// components/CookieBanner.tsx
'use client'
import { useState } from 'react';
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Switch } from "@nextui-org/react";
import { Cookie, Shield, Settings } from 'lucide-react';
import { useCookieConsent } from '@/hooks/useCookieConsent';
import { CookieConsent, CookieSettings } from '@/types/cookies';

const cookieSettings: CookieSettings[] = [
  {
    id: 'necessary',
    type: 'necessary',
    title: 'Necessary Cookies',
    description: 'Required for the website to function properly.',
    required: true,
  },
  {
    id: 'functional',
    type: 'functional',
    title: 'Functional Cookies',
    description: 'Enable personalized features and preferences.',
  },
  {
    id: 'analytics',
    type: 'analytics',
    title: 'Analytics Cookies',
    description: 'Help us understand how visitors use our website.',
  },
  {
    id: 'marketing',
    type: 'marketing',
    title: 'Marketing Cookies',
    description: 'Used for targeted advertising and marketing.',
  },
];

export function CookieBanner() {
  const { consent, showBanner, updateConsent, acceptAll, declineAll } = useCookieConsent();
  const [showSettings, setShowSettings] = useState(false);

  if (!showBanner) return null;

  const handleUpdateConsent = (type: keyof CookieConsent, checked: boolean) => {
    updateConsent({ [type]: checked });
  };

  return (
    <>
      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 bg-content1 border-t border-divider shadow-lg p-4 z-50">
        <div className="container mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1 flex items-center gap-3">
            <Cookie className="w-5 h-5 text-primary" />
            <p className="text-sm text-default-600">
              We use cookies to enhance your browsing experience and analyze our traffic.
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="flat"
              className="font-medium"
              onClick={() => setShowSettings(true)}
              startContent={<Settings className="w-4 h-4" />}
            >
              Cookie Settings
            </Button>
            <Button
              variant="flat"
              className="font-medium"
              onClick={declineAll}
            >
              Decline All
            </Button>
            <Button
              color="primary"
              className="font-medium"
              onClick={acceptAll}
            >
              Accept All
            </Button>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      <Modal
        isOpen={showSettings}
        onOpenChange={setShowSettings}
        backdrop="blur"
        placement="center"
        classNames={{
          base: "bg-content1",
          header: "border-b border-divider",
          body: "py-6",
          footer: "border-t border-divider"
        }}
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
                  <Shield className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-semibold text-foreground">Cookie Settings</h3>
                </div>
              </ModalHeader>
              <ModalBody>
                <div className="space-y-6">
                  <p className="text-default-500 text-sm">
                    Manage your cookie preferences. Some cookies are necessary for the website to function properly and cannot be disabled.
                  </p>
                  
                  {cookieSettings.map((setting) => (
                    <div key={setting.id} className="p-4 bg-default-100 dark:bg-default-50 rounded-lg space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-foreground">{setting.title}</h4>
                        <Switch
                          isSelected={consent[setting.type]}
                          isDisabled={setting.required}
                          onValueChange={(checked) => 
                            handleUpdateConsent(setting.type, checked)
                          }
                          size="sm"
                        />
                      </div>
                      <p className="text-sm text-default-500">{setting.description}</p>
                    </div>
                  ))}

                  <div className="p-4 bg-default-100 dark:bg-default-50 rounded-lg">
                    <h4 className="text-sm font-medium text-foreground mb-2">
                      About our cookies:
                    </h4>
                    <ul className="text-sm text-default-500 space-y-2">
                      <li className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center">
                          <span className="text-success text-xs">✓</span>
                        </div>
                        Secure and encrypted storage
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center">
                          <span className="text-success text-xs">✓</span>
                        </div>
                        Regular privacy audits
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center">
                          <span className="text-success text-xs">✓</span>
                        </div>
                        GDPR compliant
                      </li>
                    </ul>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  variant="flat"
                  onPress={onClose}
                  className="font-medium"
                >
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    acceptAll();
                    onClose();
                  }}
                  className="font-medium"
                >
                  Save Preferences
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}