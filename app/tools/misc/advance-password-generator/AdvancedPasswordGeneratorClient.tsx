"use client"

import React, { useState, useCallback, useEffect } from "react"
import {
  Card,
  CardBody,
  Button,
  Input,
  Slider,
  Checkbox,
  Tabs,
  Tab,
  Select,
  SelectItem,
  Divider,
} from "@nextui-org/react"
import {
  RefreshCw,
  Copy,
  Shield,
  Info,
  Key,
  Sliders,
  Settings,
  Zap,
  CheckCircle,
  BookOpen,
  Lightbulb,
} from "lucide-react"
import { toast } from "react-hot-toast"
import ToolLayout from "@/components/ToolLayout"
import Image from 'next/image';

const CHAR_SETS = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
}

export default function FuturisticPasswordGenerator() {
  const [password, setPassword] = useState("")
  const [length, setLength] = useState(16)
  const [useLowercase, setUseLowercase] = useState(true)
  const [useUppercase, setUseUppercase] = useState(true)
  const [useNumbers, setUseNumbers] = useState(true)
  const [useSymbols, setUseSymbols] = useState(true)
  const [excludeSimilar, setExcludeSimilar] = useState(false)
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false)
  const [requireEveryType, setRequireEveryType] = useState(true)
  const [beginWithLetter, setBeginWithLetter] = useState(false)
  const [noConsecutive, setNoConsecutive] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState("")
  const [customCharSet, setCustomCharSet] = useState("")
  const [useCustomCharSet, setUseCustomCharSet] = useState(false)
  const [excludedChars, setExcludedChars] = useState("")
  const [passwordCount, setPasswordCount] = useState(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [copied, setCopied] = useState(false)

  const generatePassword = useCallback(() => {
    try {
      setIsGenerating(true)
      
      // Simulate generation time for the animation to be visible
      setTimeout(() => {
        let charset = ""
        if (useLowercase) charset += CHAR_SETS.lowercase
        if (useUppercase) charset += CHAR_SETS.uppercase
        if (useNumbers) charset += CHAR_SETS.numbers
        if (useSymbols) charset += CHAR_SETS.symbols
        if (useCustomCharSet && customCharSet) charset += customCharSet

        if (charset.length === 0) {
          toast.error("Please select at least one character type")
          setIsGenerating(false)
          return
        }

        if (excludeSimilar) {
          charset = charset.replace(/[ilLI|`1oO0]/g, "")
        }

        if (excludeAmbiguous) {
          charset = charset.replace(/[{}[\]()/\\'"~,;.<>]/g, "")
        }

        if (excludedChars) {
          const excludeSet = new Set(excludedChars)
          charset = charset
            .split("")
            .filter((char) => !excludeSet.has(char))
            .join("")
        }

        if (charset.length === 0) {
          toast.error("No characters available after applying exclusions")
          setIsGenerating(false)
          return
        }

        const generateSinglePassword = () => {
          let result = ""
          const charsetArray = charset.split("")
          const getRandomChar = () => charsetArray[Math.floor(Math.random() * charsetArray.length)]

          if (beginWithLetter) {
            const letters = (CHAR_SETS.lowercase + CHAR_SETS.uppercase).split("")
            if (letters.length === 0) {
              toast.error("No letters available for password beginning")
              return ""
            }
            result += letters[Math.floor(Math.random() * letters.length)]
          }

          while (result.length < length) {
            const char = getRandomChar()
            if (noConsecutive && result[result.length - 1] === char) {
              continue
            }
            result += char
          }

          if (requireEveryType) {
            const types = [
              { condition: useLowercase, charset: CHAR_SETS.lowercase },
              { condition: useUppercase, charset: CHAR_SETS.uppercase },
              { condition: useNumbers, charset: CHAR_SETS.numbers },
              { condition: useSymbols, charset: CHAR_SETS.symbols },
            ]

            types.forEach((type) => {
              if (type.condition && !new RegExp(`[${type.charset}]`).test(result)) {
                const index = Math.floor(Math.random() * result.length)
                const char = type.charset[Math.floor(Math.random() * type.charset.length)]
                result = result.substring(0, index) + char + result.substring(index + 1)
              }
            })
          }

          return result
        }

        const passwords = Array.from({ length: passwordCount }, generateSinglePassword)
        setPassword(passwords.join("\n"))
        setIsGenerating(false)
      }, 600) // Reduce delay for better UX
    } catch (error) {
      console.error("Password generation error:", error)
      toast.error("An error occurred while generating the password")
      setIsGenerating(false)
    }
  }, [
    length,
    useLowercase,
    useUppercase,
    useNumbers,
    useSymbols,
    excludeSimilar,
    excludeAmbiguous,
    requireEveryType,
    beginWithLetter,
    noConsecutive,
    customCharSet,
    useCustomCharSet,
    excludedChars,
    passwordCount,
  ])

  useEffect(() => {
    generatePassword()
  }, [generatePassword])

  const calculatePasswordStrength = useCallback((pwd: string): string => {
    if (!pwd) return "N/A"

    const hasLower = /[a-z]/.test(pwd)
    const hasUpper = /[A-Z]/.test(pwd)
    const hasNumber = /\d/.test(pwd)
    const hasSymbol = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pwd)
    const length = pwd.length

    let strength = 0
    if (hasLower) strength += 1
    if (hasUpper) strength += 1
    if (hasNumber) strength += 1
    if (hasSymbol) strength += 1
    if (length >= 12) strength += 1
    if (length >= 16) strength += 1

    switch (strength) {
      case 0:
      case 1:
        return "Very Weak"
      case 2:
        return "Weak"
      case 3:
        return "Moderate"
      case 4:
        return "Strong"
      case 5:
      case 6:
        return "Very Strong"
      default:
        return "Unknown"
    }
  }, [])

  useEffect(() => {
    setPasswordStrength(calculatePasswordStrength(password.split("\n")[0]))
  }, [password, calculatePasswordStrength])

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(password)
      setCopied(true)
      toast.success("Password copied to clipboard!")
      
      // Reset copy state after animation
      setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch (error) {
      console.error("Copy failed:", error)
      toast.error("Failed to copy password")
    }
  }

  // Get color based on password strength
  const getStrengthColor = () => {
    switch (passwordStrength) {
      case "Very Strong":
        return "bg-success"
      case "Strong":
        return "bg-success-400"
      case "Moderate":
        return "bg-warning"
      case "Weak":
        return "bg-danger-400"
      case "Very Weak":
        return "bg-danger"
      default:
        return "bg-default-300"
    }
  }

  const getStrengthTextColor = () => {
    switch (passwordStrength) {
      case "Very Strong":
        return "text-success"
      case "Strong":
        return "text-success-400" 
      case "Moderate":
        return "text-warning"
      case "Weak":
        return "text-danger-400"
      case "Very Weak":
        return "text-danger"
      default:
        return "text-default-500"
    }
  }

  return (
    <ToolLayout
      title="Password Generator"
      description="Generate secure and customizable passwords quickly and effortlessly"
      toolId="678f383026f06f912191bccb"
    >
      <div className="flex flex-col gap-8">
        {/* Futuristic Password Display */}
        <Card className="bg-gradient-to-br from-default-800 to-default-900 border border-default-700 shadow-xl overflow-hidden">
          <CardBody className="p-0">
            {/* Top status bar */}
            <div className="w-full h-2">
              <div 
                className={`h-full ${getStrengthColor()} transition-all duration-500 ease-in-out`}
                style={{ 
                  width: passwordStrength === "N/A" ? "0%" : 
                        passwordStrength === "Very Weak" ? "20%" :
                        passwordStrength === "Weak" ? "40%" :
                        passwordStrength === "Moderate" ? "60%" :
                        passwordStrength === "Strong" ? "80%" : "100%" 
                }}
              />
            </div>
            
            {/* Main content */}
            <div className="p-8 flex flex-col items-center justify-center min-h-64">
              {/* Security status indicator */}
              <div className="flex items-center gap-2 mb-4">
                <Shield className={`${getStrengthTextColor()} h-5 w-5`} />
                <span className={`${getStrengthTextColor()} font-bold text-lg`}>{passwordStrength}</span>
              </div>
              
              {/* Futuristic password display */}
              <div className="w-full relative flex justify-center items-center">
                {isGenerating ? (
                  <div className="flex flex-col items-center py-12">
                    <RefreshCw className="h-12 w-12 text-primary animate-spin mb-4" />
                    <p className="text-default-400 font-medium animate-pulse">Generating secure password...</p>
                  </div>
                ) : (
                  <>
                    {/* Glowing effect behind the password */}
                    <div className="absolute inset-0 bg-primary/5 blur-xl rounded-full"></div>
                    
                    {/* Password display */}
                    <div className="relative z-10 w-full overflow-hidden">
                      {passwordCount === 1 ? (
                        <div className="font-mono text-4xl md:text-5xl text-center text-default-100 break-all tracking-wider py-12 px-4 select-all">
                          {password}
                        </div>
                      ) : (
                        <div className="font-mono text-xl md:text-2xl text-center text-default-100 break-all tracking-wider py-8 px-4 select-all overflow-auto max-h-64">
                          {password.split('\n').map((pass, index) => (
                            <div key={index} className="mb-4">{pass}</div>
                          ))}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
              
              {/* Action buttons */}
              <div className="flex gap-4 mt-8">
                <Button
                  onClick={handleCopyToClipboard}
                  color="primary"
                  variant="shadow"
                  size="lg"
                  className="font-medium text-base px-8 transition-all duration-300"
                  startContent={copied ? <CheckCircle className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                  disabled={isGenerating}
                >
                  {copied ? "Copied!" : "Copy"}
                </Button>
                <Button
                  onClick={generatePassword}
                  color="success"
                  variant="shadow"
                  size="lg"
                  className="font-medium text-base px-8 transition-all duration-300"
                  startContent={<Zap className={`h-5 w-5 ${isGenerating ? 'animate-pulse' : ''}`} />}
                  isLoading={isGenerating}
                  spinner={<RefreshCw className="h-5 w-5 animate-spin" />}
                >
                  Generate
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Settings Section */}
        <Card className="bg-default-50 dark:bg-default-100 border border-default-200 dark:border-default-700">
          <CardBody className="p-6">
            <h2 className="text-xl font-bold text-default-700 mb-6 flex items-center">
              <Sliders className="h-5 w-5 mr-2 text-primary" />
              Password Settings
            </h2>

            <Tabs aria-label="Password settings" color="primary" variant="underlined" className="w-full">
              <Tab
                key="basic"
                title={
                  <div className="flex items-center space-x-2">
                    <Key className="h-4 w-4" />
                    <span>Basic</span>
                  </div>
                }
              >
                <div className="mt-6 space-y-8">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label htmlFor="length-slider" className="text-default-700 font-medium">
                        Password Length
                      </label>
                      <span className="px-3 py-1 bg-default-200 dark:bg-default-800 rounded-full text-default-700 dark:text-default-200 font-medium">
                        {length} characters
                      </span>
                    </div>
                    <Slider
                      aria-label="Password length"
                      step={1}
                      maxValue={64}
                      minValue={8}
                      color="primary"
                      value={length}
                      onChange={(value) => setLength(value as number)}
                      className="max-w-full"
                      showSteps={true}
                      marks={[
                        { value: 8, label: "8" },
                        { value: 16, label: "16" },
                        { value: 32, label: "32" },
                        { value: 64, label: "64" },
                      ]}
                    />
                  </div>

                  <Divider className="my-4" />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Checkbox isSelected={useLowercase} onValueChange={setUseLowercase} color="primary">
                      Include Lowercase (a-z)
                    </Checkbox>
                    <Checkbox isSelected={useUppercase} onValueChange={setUseUppercase} color="primary">
                      Include Uppercase (A-Z)
                    </Checkbox>
                    <Checkbox isSelected={useNumbers} onValueChange={setUseNumbers} color="primary">
                      Include Numbers (0-9)
                    </Checkbox>
                    <Checkbox isSelected={useSymbols} onValueChange={setUseSymbols} color="primary">
                      Include Symbols (!@#$%)
                    </Checkbox>
                  </div>
                </div>
              </Tab>
              <Tab
                key="advanced"
                title={
                  <div className="flex items-center space-x-2">
                    <Sliders className="h-4 w-4" />
                    <span>Advanced</span>
                  </div>
                }
              >
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Checkbox isSelected={requireEveryType} onValueChange={setRequireEveryType} color="primary">
                    Require Every Character Type
                  </Checkbox>
                  <Checkbox isSelected={beginWithLetter} onValueChange={setBeginWithLetter} color="primary">
                    Begin With a Letter
                  </Checkbox>
                  <Checkbox isSelected={noConsecutive} onValueChange={setNoConsecutive} color="primary">
                    No Consecutive Characters
                  </Checkbox>
                  <Checkbox isSelected={excludeSimilar} onValueChange={setExcludeSimilar} color="primary">
                    Exclude Similar Characters (i,l,1,L,o,0,O)
                  </Checkbox>
                  <Checkbox isSelected={excludeAmbiguous} onValueChange={setExcludeAmbiguous} color="primary">
                    Exclude Ambiguous Characters ({`{}[]()/\\'"~,;.<>`})
                  </Checkbox>
                </div>
              </Tab>
              <Tab
                key="custom"
                title={
                  <div className="flex items-center space-x-2">
                    <Settings className="h-4 w-4" />
                    <span>Custom</span>
                  </div>
                }
              >
                <div className="mt-4 space-y-6">
                  <div>
                    <label htmlFor="password-count" className="block text-default-700">
                      Number of Passwords
                    </label>
                    <div className="min-h-[56px] overflow-hidden">
                      <Select
                        id="password-count"
                        label="Select Password Count"
                        placeholder="Select the Password count..."
                        selectedKeys={new Set([passwordCount.toString()])}
                        onSelectionChange={(keys) => {
                          const selected = Array.from(keys)[0]
                          setPasswordCount(Number(selected))
                        }}
                        className="max-w-xs"
                        variant="bordered"
                        listboxProps={{
                          className: "max-h-[200px] overflow-y-auto"
                        }}
                        classNames={{
                          trigger: "bg-default-100 data-[hover=true]:bg-default-200",
                          listbox: "overflow-y-auto"
                        }}
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <SelectItem 
                            key={num.toString()} 
                            value={num.toString()} 
                            textValue={num.toString()}
                            className="text-default-700 dark:text-default-600 hover:bg-default-100 dark:hover:bg-default-200"
                          >
                            {num}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>
                  </div>

                  <Divider className="my-4" />

                  <div>
                    <Checkbox isSelected={useCustomCharSet} onValueChange={setUseCustomCharSet} color="primary">
                      Use Custom Character Set
                    </Checkbox>
                    {useCustomCharSet && (
                      <Input
                        placeholder="Enter custom characters"
                        value={customCharSet}
                        onChange={(e) => setCustomCharSet(e.target.value)}
                        className="mt-4"
                        variant="bordered"
                        color="primary"
                      />
                    )}
                  </div>

                  <div>
                    <label htmlFor="excluded-chars" className="block text-default-700 font-medium mb-2">
                      Excluded Characters
                    </label>
                    <Input
                      id="excluded-chars"
                      placeholder="Characters to exclude from generation"
                      value={excludedChars}
                      variant="bordered"
                      color="primary"
                      onChange={(e) => setExcludedChars(e.target.value)}
                    />
                  </div>
                </div>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>

        {/* Info Section */}
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <div className="rounded-xl p-2 md:p-4 max-w-5xl mx-auto">
              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 flex items-center">
                <Info className="w-6 h-6 mr-2" />
                What is Advanced Password Generator?
              </h2>
              <p className="text-sm md:text-base text-default-600 mb-4">
              A Password Generator is a tool which is used to create a strong and random passwords for online accounts, this tool createa a random password combingation of numbers, letters, and symbols to be used as a Password. This tools allows you to generate Password fast and convenient way, you can fully customize your password, also this tool Operates entirely on Client side, so we won't store, tansmit and process any of the generated password. All Password generation happens securely on your browser, keeping your data private and protected.
              </p>


              <div className="my-8">
                <Image
                  src="/Images/InfosectionImages/PasswordGeneratorPreview.png?height=200&width=400"
                  alt="Screenshot of the Advanced Password Generator interface showing various password generation options"
                  width={400}
                  height={200}
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </div>

              <h2
                id="how-to-use"
                className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center"
              >
                <BookOpen className="w-6 h-6 mr-2" />
                How to Use the Advanced Password Generator
              </h2>
              <ol className="list-decimal list-inside space-y-2 text-sm md:text-base text-default-600">
                <li>Under the Basic tab, you can set your desired password length using the slider.</li>
                <li>
                  You can choose which character types to include (lowercase, uppercase, numbers, symbols) in the Original tab.
                </li>
                <li>
                  Under the Advanced tab, you can check Require Every Type to include all type of characters, Lettes to Begin with, and No Consecutive Characters.
                </li>
                <li>Use the Security tab to exclude similar or ambiguous characters for easier reading.</li>
                <li>
                  For more control, use the Custom tab to set a custom character set or exclude specific characters.
                </li>
                <li>Select the number of passwords you want to generate.</li>
                <li>Click the "Generate" button to create new password(s).</li>
                <li>Use the "Copy" button to copy the generated password(s) to your clipboard.</li>
                <li>Adjust settings and regenerate as needed until you're satisfied with the result.</li>
              </ol>

              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Lightbulb className="w-6 h-6 mr-2" />
                Features That Make Us Stand Out
              </h2>
              <ul className="list-disc list-inside space-y-2 text-xs md:text-sm text-default-600">
                <li>
                  <strong>Customizable Length:</strong> Generate passwords from 8 to 64 characters long.
                </li>
                <li>
                  <strong>Character Set Options:</strong> Include or exclude lowercase, uppercase, numbers, and symbols.
                </li>
                <li>
                  <strong>Advanced Settings:</strong> Require every character type, begin with a letter, or avoid
                  consecutive characters.
                </li>
                <li>
                  <strong>Security Features:</strong> Exclude similar-looking or ambiguous characters to prevent
                  confusion.
                </li>
                <li>
                  <strong>Custom Character Sets:</strong> Define your own character set or exclude specific characters.
                </li>
                <li>
                  <strong>Multiple Password Generation:</strong> Create up to 10 passwords at once.
                </li>
                <li>
                  <strong>Password Strength Indicator:</strong> Get instant feedback on the strength of your generated
                  password.
                </li>
                <li>
                  <strong>One-Click Copy:</strong> Easily copy your new password(s) to the clipboard.
                </li>
                <li>
                  <strong>Secure Generation:</strong> Passwords are generated client-side for maximum security.
                </li>
              </ul>

              <p className="text-sm md:text-base text-default-600 mt-4">
                Start using our Advanced Password Generator today to create strong, unique passwords for all your
                accounts. Enhance your online security and protect your digital identity with ease!
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    </ToolLayout>
  )
}