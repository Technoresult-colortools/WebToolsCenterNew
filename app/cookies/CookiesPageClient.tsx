"use client"

import React, { useState, useEffect } from "react"
import { Card, CardBody, Button, Switch, Accordion, AccordionItem } from "@nextui-org/react"
import { Shield, Cookie, Settings, Info } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { useCookieConsent } from "@/hooks/useCookieConsent"
import type { CookieConsent } from "@/hooks/useCookieConsent"

const cookieTypes = [
  {
    id: "necessary",
    title: "Essential Cookies",
    description: "Required for the website to function properly. These cannot be disabled.",
    required: true
  },
  {
    id: "functional",
    title: "Functional Cookies",
    description: "Enable personalized features and remember your preferences."
  },
  {
    id: "analytics",
    title: "Analytics Cookies",
    description: "Help us understand how visitors use our website to improve its functionality."
  },
  {
    id: "marketing",
    title: "Marketing Cookies",
    description: "Used for targeted advertising and marketing purposes."
  }
]

export default function CookiesPage() {
  const { consent, updateConsent, acceptAll, declineAll } = useCookieConsent()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleConsentChange = (type: keyof CookieConsent, checked: boolean) => {
    updateConsent({ [type]: checked })
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <section className="pt-16 pb-8 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/5 animate-gradient-xy" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div
          className={`max-w-6xl mx-auto text-center transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Cookie <span className="text-primary">Settings</span>
          </h1>
          <p className="text-xl text-default-600 mb-6 max-w-2xl mx-auto">
            Manage your cookie preferences and understand how we use them to improve your experience.
          </p>
        </div>
      </section>

      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <Card className="mb-8">
          <CardBody>
            <div className="flex items-center gap-4 mb-6">
              <Cookie className="w-8 h-8 text-primary" />
              <div>
                <h2 className="text-xl font-bold">Cookie Preferences</h2>
                <p className="text-default-600">Choose which cookies you want to accept</p>
              </div>
            </div>

            <div className="space-y-6">
              {cookieTypes.map((type) => (
                <div key={type.id} className="p-4 bg-default-100 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{type.title}</h3>
                    <Switch
                      isSelected={consent[type.id as keyof CookieConsent]}
                      isDisabled={type.required}
                      onValueChange={(checked) => 
                        handleConsentChange(type.id as keyof CookieConsent, checked)
                      }
                      size="sm"
                    />
                  </div>
                  <p className="text-sm text-default-600">{type.description}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button variant="flat" onPress={declineAll}>
                Decline All
              </Button>
              <Button color="primary" onPress={acceptAll}>
                Accept All
              </Button>
            </div>
          </CardBody>
        </Card>

        <Accordion>
          <AccordionItem
            key="what-are-cookies"
            title="What are cookies?"
            startContent={<Info className="text-primary" />}
          >
            <p className="text-default-600">
              Cookies are small text files stored on your device that help us provide and improve our services. 
              They're used for technical functionality, analytics, and personalization.
            </p>
          </AccordionItem>

          <AccordionItem
            key="how-we-use"
            title="How we use cookies"
            startContent={<Settings className="text-primary" />}
          >
            <ul className="list-disc list-inside space-y-2 text-default-600">
              <li>Essential cookies help our website function properly</li>
              <li>Analytics cookies help us understand how visitors use our site</li>
              <li>Functional cookies remember your preferences</li>
              <li>Marketing cookies help us deliver relevant advertisements</li>
            </ul>
          </AccordionItem>

          <AccordionItem
            key="your-rights"
            title="Your rights and choices"
            startContent={<Shield className="text-primary" />}
          >
            <p className="text-default-600">
              You can change your cookie preferences at any time. You can also clear cookies from your browser 
              settings, though this may affect your browsing experience. We honor "Do Not Track" browser settings.
            </p>
          </AccordionItem>
        </Accordion>
      </main>

      <Footer />
    </div>
  )
}