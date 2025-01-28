"use client"

import React, { useState, useCallback, useEffect } from "react"
import {
  Card,
  CardBody,
  Button,
  Input,
  Textarea,
  Slider,
  Checkbox,
  Tabs,
  Tab,
  Select,
  SelectItem,
} from "@nextui-org/react"
import {
  RefreshCw,
  Copy,
  Eye,
  EyeOff,
  Shield,
  Info,
  BookOpen,
  Lightbulb,
  Key,
  Sliders,
  Lock,
  Settings,
} from "lucide-react"
import { toast } from "react-hot-toast"
import ToolLayout from "@/components/ToolLayout"
import Image from "next/image"
import Link from "next/link"

const CHAR_SETS = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
}

export default function AdvancedPasswordGenerator() {
  const [password, setPassword] = useState("")
  const [length, setLength] = useState(8)
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
  const [showPassword, setShowPassword] = useState(false)
  const [customCharSet, setCustomCharSet] = useState("")
  const [useCustomCharSet, setUseCustomCharSet] = useState(false)
  const [excludedChars, setExcludedChars] = useState("")
  const [passwordCount, setPasswordCount] = useState(1)

  const generatePassword = useCallback(() => {
    try {
      let charset = ""
      if (useLowercase) charset += CHAR_SETS.lowercase
      if (useUppercase) charset += CHAR_SETS.uppercase
      if (useNumbers) charset += CHAR_SETS.numbers
      if (useSymbols) charset += CHAR_SETS.symbols
      if (useCustomCharSet && customCharSet) charset += customCharSet

      if (charset.length === 0) {
        toast.error("Please select at least one character type")
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
    } catch (error) {
      console.error("Password generation error:", error)
      toast.error("An error occurred while generating the password")
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
      toast.success("Password copied to clipboard!")
    } catch (error) {
      console.error("Copy failed:", error)
      toast.error("Failed to copy password")
    }
  }

  return (
    <ToolLayout
      title="Password Generator"
      description="Generate secure and customizable passwords quickly and effortlessly"
      toolId="678f383026f06f912191bccb"
    >
      <div className="flex flex-col gap-8">
        {/* Password Output Section */}
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-default-700">Generated Password</h2>
              <div className="flex items-center space-x-2">
                <Shield
                  className={`${
                    passwordStrength === "Very Strong"
                      ? "text-success"
                      : passwordStrength === "Strong"
                        ? "text-success-400"
                        : passwordStrength === "Moderate"
                          ? "text-warning"
                          : passwordStrength === "Weak"
                            ? "text-danger-400"
                            : "text-danger"
                  }`}
                />
                <span className="text-default-600">Strength: {passwordStrength}</span>
              </div>
            </div>

            <div className="relative">
            <Textarea 
                value={password} 
                readOnly 
                rows={4} 
                className="w-full font-mono "
                variant="bordered"
                classNames={{
                inputWrapper: [
                    "border-2", 
                    "border-default-300", 
                    "dark:border-default-600", 
                    "bg-default-100", 
                    "dark:bg-default-200/50", 
                    "hover:border-primary-500", 
                    "dark:hover:border-primary-400",
                    "overflow-y-auto border",
                ],
                input: "overflow-y-auto"
                }}
                style={{
                      
/* @ts-expect-error: Suppressing TypeScript error for WebkitTextSecurity style property */
                  WebkitTextSecurity: showPassword ? "none" : "disc",
                }}
              />
              <Button
                isIconOnly
                variant="light"
                className="absolute top-2 right-2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </Button>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row items-center justify-end space-y-2 sm:space-y-0 sm:space-x-2">
              <Button onClick={handleCopyToClipboard} color="primary" startContent={<Copy className="h-5 w-5" />}>
                Copy
              </Button>
              <Button onClick={generatePassword} color="success" startContent={<RefreshCw className="h-5 w-5" />}>
                Generate
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Password Settings Section */}
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <h2 className="text-2xl font-bold text-default-700 mb-4">Password Settings</h2>

            <Tabs aria-label="Password settings">
              <Tab
                key="basic"
                title={
                  <div className="flex items-center space-x-2">
                    <Key className="h-4 w-4" />
                    <span>Basic</span>
                  </div>
                }
              >
                <div className="mt-4 space-y-6">
                  <div>
                    <label htmlFor="length-slider" className="block text-default-700 mb-2">
                      Password Length: {length}
                    </label>
                    <Slider
                      aria-label="Password length"
                      step={1}
                      maxValue={64}
                      minValue={8}
                      value={length}
                      onChange={(value) => setLength(value as number)}
                      className="max-w-md"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Checkbox isSelected={useLowercase} onValueChange={setUseLowercase}>
                      Include Lowercase
                    </Checkbox>
                    <Checkbox isSelected={useUppercase} onValueChange={setUseUppercase}>
                      Include Uppercase
                    </Checkbox>
                    <Checkbox isSelected={useNumbers} onValueChange={setUseNumbers}>
                      Include Numbers
                    </Checkbox>
                    <Checkbox isSelected={useSymbols} onValueChange={setUseSymbols}>
                      Include Symbols
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
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Checkbox isSelected={requireEveryType} onValueChange={setRequireEveryType}>
                    Require Every Type
                  </Checkbox>
                  <Checkbox isSelected={beginWithLetter} onValueChange={setBeginWithLetter}>
                    Begin With a Letter
                  </Checkbox>
                  <Checkbox isSelected={noConsecutive} onValueChange={setNoConsecutive}>
                    No Consecutive Characters
                  </Checkbox>
                </div>
              </Tab>
              <Tab
                key="security"
                title={
                  <div className="flex items-center space-x-2">
                    <Lock className="h-4 w-4" />
                    <span>Security</span>
                  </div>
                }
              >
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Checkbox isSelected={excludeSimilar} onValueChange={setExcludeSimilar}>
                    Exclude Similar Characters
                  </Checkbox>
                  <Checkbox isSelected={excludeAmbiguous} onValueChange={setExcludeAmbiguous}>
                    Exclude Ambiguous Characters
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
                <div className="min-h-[56px] overflow-hidden"> {/* Prevent additional scrollbar */}
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
                        className: "max-h-[200px] overflow-y-auto" // Control dropdown scrolling
                    }}
                    classNames={{
                        trigger: "bg-default-100 data-[hover=true]:bg-default-200",
                        listbox: "overflow-y-auto" // Ensure dropdown scrolling
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


                  <div>
                    <Checkbox isSelected={useCustomCharSet} onValueChange={setUseCustomCharSet}>
                      Use Custom Character Set
                    </Checkbox>
                    {useCustomCharSet && (
                      <Input
                        placeholder="Enter custom characters"
                        value={customCharSet}
                        onChange={(e) => setCustomCharSet(e.target.value)}
                        className="mt-2"
                        variant="bordered"
                      />
                    )}
                  </div>

                  <div>
                    <label htmlFor="excluded-chars" className="block text-default-700 mb-2">
                      Excluded Characters
                    </label>
                    <Input
                      id="excluded-chars"
                      placeholder="Characters to exclude"
                      value={excludedChars}
                      variant="bordered"
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
            <div className="rounded-xl p-2 md:p-4 max-w-4xl mx-auto">
              <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 flex items-center">
                <Info className="w-6 h-6 mr-2" />
                What is the Advanced Password Generator?
              </h2>
              <p className="text-sm md:text-base text-default-600 mb-4">
                The Advanced Password Generator is a versatile tool designed for creating strong, secure passwords
                tailored to your specific needs. Whether you're setting up a new account, updating existing passwords,
                or managing multiple logins, this tool provides the flexibility and security features you need to
                generate robust passwords quickly and easily.
              </p>

              <div className="my-8">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Screenshot of the Advanced Password Generator interface showing various password generation options"
                  width={600}
                  height={400}
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
                <li>Set your desired password length using the slider in the Basic tab.</li>
                <li>
                  Choose which character types to include (lowercase, uppercase, numbers, symbols) in the Basic tab.
                </li>
                <li>
                  Explore advanced options in the Advanced tab, such as requiring every character type or beginning with
                  a letter.
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

