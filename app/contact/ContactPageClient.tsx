"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardBody, Input, Textarea, Button, Link } from "@nextui-org/react"
import { Send, MessageCircle } from "lucide-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebookF, faTwitter, faInstagram, faGithub } from "@fortawesome/free-brands-svg-icons"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import toast, { Toaster } from "react-hot-toast"

export default function ContactPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Preparing form data for Web3Forms
    const formSubmission = new FormData(e.target as HTMLFormElement)
    formSubmission.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "")

    const object = Object.fromEntries(formSubmission)
    const json = JSON.stringify(object)

    // Submitting to Web3Forms
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      })
      const result = await response.json()

      if (result.success) {
        console.log("Form successfully submitted:", result)
        toast.success("Thank you for your message. We will get back to you soon!")
        setFormData({ name: "", email: "", message: "" }) // Reset form
      } else {
        console.error("Form submission failed:", result)
        toast.error("Something went wrong. Please try again later.")
      }
    } catch (error) {
      console.error("Error:", error)
      toast.error("Error submitting the form. Please try again later.")
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <Toaster position="top-right" reverseOrder={false} />

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/5 animate-gradient-xy" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div
          className={`max-w-6xl mx-auto text-center transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
           <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Get in <span className="text-primary">Touch</span>
            <span className="inline-block ml-3">
              <MessageCircle className="w-8 h-8 text-warning animate-pulse" />
            </span>
          </h1>
          <p className="text-xl text-default-600 mb-8 max-w-2xl mx-auto">
            We'd love to hear from you! Send us a message or connect with us on social media.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact Form */}
          <Card className="lg:col-span-3 bg-content2/50 backdrop-blur-sm">
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <MessageCircle className="mr-3 text-primary" />
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  type="text"
                  id="name"
                  name="name"
                  label="Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  variant="bordered"
                />
                <Input
                  type="email"
                  id="email"
                  name="email"
                  label="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                  variant="bordered"
                />
                <Textarea
                  id="message"
                  name="message"
                  label="Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Your message here..."
                  variant="bordered"
                  minRows={4}
                />
                <Button type="submit" color="primary" className="w-full" endContent={<Send size={18} />}>
                  Send Message
                </Button>
              </form>
            </CardBody>
          </Card>

          {/* Follow Us Section */}
          <Card className="lg:col-span-2 bg-content2/50 backdrop-blur-sm">
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Follow Us</h2>
              <p className="text-default-600 mb-6">
                Stay connected with us on social media for the latest updates, tips, and community discussions.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <Link
                  href="https://www.facebook.com/people/Webtoolscenter/61567103137363/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  <FontAwesomeIcon icon={faFacebookF} className="w-6 h-6 mr-3" />
                  <span>Facebook</span>
                </Link>
                <Link
                  href="https://www.instagram.com/webtoolscenter/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 rounded-lg bg-pink-600 text-white hover:bg-pink-700 transition-colors"
                >
                  <FontAwesomeIcon icon={faInstagram} className="w-6 h-6 mr-3" />
                  <span>Instagram</span>
                </Link>
                <Link
                  href="https://github.com/Technoresult-colortools/WebToolsCenterNew"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 rounded-lg bg-gray-800 text-white hover:bg-gray-900 transition-colors"
                >
                  <FontAwesomeIcon icon={faGithub} className="w-6 h-6 mr-3" />
                  <span>GitHub</span>
                </Link>
                <Link
                  href="https://x.com/webtoolscenter"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 rounded-lg bg-blue-400 text-white hover:bg-blue-500 transition-colors"
                >
                  <FontAwesomeIcon icon={faTwitter} className="w-6 h-6 mr-3" />
                  <span>Twitter</span>
                </Link>
              
              </div>
            </CardBody>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}

