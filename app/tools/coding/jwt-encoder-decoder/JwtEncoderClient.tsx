"use client"

import { useState, useCallback, useEffect } from "react"
import {
  Button,
  Card,
  CardBody,
  Input,
  Switch,
  Textarea,
  Tabs,
  Tab,
  Select,
  SelectItem,
  Tooltip,
} from "@nextui-org/react"
import { toast } from "react-hot-toast"
import {
  Key,
  Lock,
  Copy,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  BookOpen,
  Info,
  Code,
  Terminal,
  AlertTriangle,
  Check,
  X,
  Play,
  Shield,
  FileText,
} from "lucide-react"
import { KJUR } from "jsrsasign"
import ToolLayout from "@/components/ToolLayout"

type Algorithm = "HS256" | "HS384" | "HS512" | "RS256" | "RS384" | "RS512" | "ES256" | "ES384" | "ES512"

interface JWTPayload {
  [key: string]: string | number | boolean | undefined
  iat?: number
  exp?: number
  nbf?: number
  sub?: string
  iss?: string
  aud?: string
  jti?: string
}

interface Claims {
  exp: string
  nbf: string
  sub: string
  iss: string
  aud: string
  jti: string
}

const DEFAULT_CLAIMS: Claims = {
  exp: "",
  nbf: "",
  sub: "",
  iss: "",
  aud: "",
  jti: "",
}

const isValidJSON = (str: string): boolean => {
  try {
    JSON.parse(str)
    return true
  } catch {
    return false
  }
}

const formatJWT = (jwt: string): string => {
  const parts = jwt.split(".")
  return parts.join(".\n")
}

const parseJWT = (jwt: string): string => {
  return jwt.replace(/\s/g, "")
}

export default function JWTEncoderDecoder() {
  const [activeTab, setActiveTab] = useState<"encode" | "decode">("encode")
  const [algorithm, setAlgorithm] = useState<Algorithm>("HS256")
  const [signingKey, setSigningKey] = useState("")
  const [jsonInput, setJsonInput] = useState("")
  const [jwtInput, setJwtInput] = useState("")
  const [jwtOutput, setJwtOutput] = useState("")
  const [decodedHeader, setDecodedHeader] = useState("")
  const [decodedPayload, setDecodedPayload] = useState("")
  const [autoSetIat, setAutoSetIat] = useState(true)
  const [showAdditionalClaims, setShowAdditionalClaims] = useState(false)
  const [claims, setClaims] = useState<Claims>(DEFAULT_CLAIMS)
  const [isEncoding, setIsEncoding] = useState(false)
  const [isDecoding, setIsDecoding] = useState(false)
  const [jwtValidity, setJwtValidity] = useState<boolean | null>(null)
  const [expirationStatus, setExpirationStatus] = useState<"valid" | "expired" | "not-yet-valid" | null>(null)

  const validateInput = useCallback(() => {
    if (!signingKey.trim()) {
      toast.error("Signing key is required")
      return false
    }

    if (activeTab === "encode" && !isValidJSON(jsonInput)) {
      toast.error("Invalid JSON payload")
      return false
    }

    if (activeTab === "decode" && !jwtInput.trim()) {
      toast.error("JWT input is required")
      return false
    }

    return true
  }, [signingKey, jsonInput, jwtInput, activeTab])

  const handleEncode = async () => {
    if (!validateInput()) return

    setIsEncoding(true)
    try {
      const payload: JWTPayload = JSON.parse(jsonInput)

      if (autoSetIat) {
        payload.iat = Math.floor(Date.now() / 1000)
      }

      // Process claims
      Object.entries(claims).forEach(([key, value]) => {
        if (value) {
          if (key === "exp" || key === "nbf") {
            const offset = Number.parseInt(value)
            if (isNaN(offset)) {
              throw new Error(`Invalid ${key} value: must be a number`)
            }
            payload[key] = Math.floor(Date.now() / 1000) + offset
          } else {
            payload[key] = value
          }
        }
      })

      const header = { alg: algorithm, typ: "JWT" }
      const sHeader = JSON.stringify(header)
      const sPayload = JSON.stringify(payload)

      const token = KJUR.jws.JWS.sign(null, sHeader, sPayload, signingKey)

      setJwtOutput(formatJWT(token))
      setDecodedHeader(JSON.stringify(header, null, 2))
      setDecodedPayload(JSON.stringify(payload, null, 2))
      toast.success("JWT encoded successfully!")
    } catch (error) {
      toast.error(`Error encoding JWT: ${(error as Error).message}`)
    } finally {
      setIsEncoding(false)
    }
  }

  const handleDecode = async () => {
    if (!validateInput()) return

    setIsDecoding(true)
    try {
      const parsedJWT = parseJWT(jwtInput)
      // First try to decode without verification
      const decoded = KJUR.jws.JWS.parse(parsedJWT)
      setDecodedHeader(JSON.stringify(decoded.headerObj, null, 2))
      setDecodedPayload(JSON.stringify(decoded.payloadObj, null, 2))

      // Then verify the signature
      const isValid = KJUR.jws.JWS.verify(parsedJWT, signingKey, [algorithm])
      setJwtValidity(isValid)

      if (!isValid) {
        toast.error("Warning: JWT signature verification failed")
      } else {
        toast.success("JWT decoded and verified successfully!")
      }

      // Check expiration
      const payload = decoded.payloadObj as JWTPayload
      const currentTime = Math.floor(Date.now() / 1000)
      if (payload.exp && payload.exp < currentTime) {
        setExpirationStatus("expired")
      } else if (payload.nbf && payload.nbf > currentTime) {
        setExpirationStatus("not-yet-valid")
      } else {
        setExpirationStatus("valid")
      }
    } catch (error) {
      toast.error(`Error decoding JWT: ${(error as Error).message}`)
      setDecodedHeader("")
      setDecodedPayload("")
      setJwtValidity(null)
      setExpirationStatus(null)
    } finally {
      setIsDecoding(false)
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success("Copied to clipboard!")
    } catch {
      toast.error("Failed to copy to clipboard")
    }
  }

  const handleReset = () => {
    setJsonInput("")
    setJwtInput("")
    setJwtOutput("")
    setDecodedHeader("")
    setDecodedPayload("")
    setSigningKey("")
    setClaims(DEFAULT_CLAIMS)
    setJwtValidity(null)
    setExpirationStatus(null)
    toast.success("Reset successful!")
  }

  useEffect(() => {
    // Reset JWT validity and expiration status when changing tabs
    setJwtValidity(null)
    setExpirationStatus(null)
  }, [])

  return (
    <ToolLayout
      title="JWT Encoder and Decoder"
      description="Securely encode and decode JSON Web Tokens (JWT) for authentication and data exchange"
      toolId="678f383026f06f912191bcc8"
    >

      <Card className="bg-default-50 dark:bg-default-100">
        <CardBody className="p-6">
          <Tabs
            aria-label="JWT options"
            selectedKey={activeTab}
            onSelectionChange={(key) => setActiveTab(key as "encode" | "decode")}
          >
            <Tab
              key="encode"
              title={
                <div className="flex items-center">
                  <Lock className="w-4 h-4 mr-2" />
                  Encoder
                </div>
              }
            >
              <div className="space-y-4 mt-4">
                <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                  <div className="w-full md:w-1/2">
                    <Select
                      label="Algorithm"
                      selectedKeys={[algorithm]}
                      onChange={(e) => setAlgorithm(e.target.value as Algorithm)}
                      variant="bordered"
                    >
                      {["HS256", "HS384", "HS512", "RS256", "RS384", "RS512", "ES256", "ES384", "ES512"].map((alg) => (
                        <SelectItem key={alg} value={alg} className="text-default-700">
                          {alg}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                  <div className="w-full md:w-1/2">
                    <Input
                      type="password"
                      label="Signing Key"
                      variant="bordered"
                      value={signingKey}
                      onChange={(e) => setSigningKey(e.target.value)}
                      placeholder="Enter signing key..."
                    />
                  </div>
                </div>
                <Textarea
                  label="JSON Payload"
                  placeholder="Enter JSON payload..."
                  variant="bordered"
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  minRows={4}
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch isSelected={autoSetIat} onValueChange={setAutoSetIat} />
                    <span>Auto-set "Issued at (iat)"</span>
                  </div>
                  <Button onClick={() => setShowAdditionalClaims(!showAdditionalClaims)}>
                    {showAdditionalClaims ? <ChevronUp /> : <ChevronDown />}
                    Additional Claims
                  </Button>
                </div>
                {showAdditionalClaims && (
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(claims).map(([key, value]) => (
                      <Input
                        key={key}
                        label={key.toUpperCase()}
                        value={value}
                        onChange={(e) => setClaims((prev) => ({ ...prev, [key]: e.target.value }))}
                        placeholder={`Enter ${key}...`}
                        variant="bordered"
                      />
                    ))}
                  </div>
                )}
                <Textarea label="JWT" variant="bordered" value={jwtOutput} readOnly minRows={3} />
                <div className="flex flex-col md:flex-row gap-2 w-full">
                <Button className="w-full md:flex-1" color="primary" onPress={handleEncode} isLoading={isEncoding} startContent={<Play />}>
                    {isEncoding ? "Encoding..." : "Encode"}
                </Button>
                <Button className="w-full md:flex-1" color="secondary" onPress={handleReset} startContent={<RefreshCw />}>
                    Reset
                </Button>
                <Button className="w-full md:flex-1" color="success" onPress={() => copyToClipboard(jwtOutput)} isDisabled={!jwtOutput} startContent={<Copy />}>
                    Copy JWT
                </Button>
                </div>
              </div>
            </Tab>
            <Tab
              key="decode"
              title={
                <div className="flex items-center">
                  <Key className="w-4 h-4 mr-2" />
                  Decoder
                </div>
              }
            >
              <div className="space-y-4 mt-4">
                <Textarea
                  label="JWT"
                  placeholder="Enter JWT..."
                  variant="bordered"
                  value={jwtInput}
                  onChange={(e) => setJwtInput(e.target.value)}
                  minRows={3}
                />
                <Input
                  type="password"
                  label="Signing Key (for verification)"
                  variant="bordered"
                  value={signingKey}
                  onChange={(e) => setSigningKey(e.target.value)}
                  placeholder="Enter signing key..."
                />
                <Textarea label="Decoded Header" variant="bordered" value={decodedHeader} readOnly minRows={4} />
                <Textarea label="Decoded Payload" variant="bordered" value={decodedPayload} readOnly minRows={4} />
               
                <div className="flex flex-col md:flex-row gap-2 w-full items-center">
                <Button className="w-full md:flex-1" color="primary" onPress={handleDecode} isLoading={isDecoding} startContent={<Play />}>
                    {isDecoding ? "Decoding..." : "Decode"}
                </Button>

                {/* Status Indicators (JWT Validity & Expiration) */}
                <div className="flex items-center justify-center space-x-2 w-full md:w-auto">
                    {jwtValidity !== null && (
                    <Tooltip content={jwtValidity ? "JWT signature is valid" : "JWT signature is invalid"}>
                        {jwtValidity ? <Check className="text-success" /> : <X className="text-danger" />}
                    </Tooltip>
                    )}
                    {expirationStatus && (
                    <Tooltip
                        content={
                        expirationStatus === "valid"
                            ? "JWT is currently valid"
                            : expirationStatus === "expired"
                            ? "JWT has expired"
                            : "JWT is not yet valid"
                        }
                    >
                        {expirationStatus === "valid" && <Check className="text-success" />}
                        {expirationStatus === "expired" && <AlertTriangle className="text-warning" />}
                        {expirationStatus === "not-yet-valid" && <AlertTriangle className="text-primary" />}
                    </Tooltip>
                    )}
                </div>

                <Button className="w-full md:flex-1" color="secondary" onPress={handleReset} startContent={<RefreshCw />}>
                    Reset
                </Button>

                <Button className="w-full md:flex-1" color="success" onPress={() => copyToClipboard(decodedPayload)} isDisabled={!decodedPayload} startContent={<Copy />}>
                    Copy JSON
                </Button>
                </div>
              </div>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>

        <Card className="mt-8 bg-default-50 dark:bg-default-100">
        <CardBody>
            <div className="rounded-xl p-2 md:p-4 max-w-4xl mx-auto">
            {/* What is JWT? */}
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 flex items-center">
                <Info className="w-6 h-6 mr-2" />
                What is JWT (JSON Web Token)?
            </h2>
            <p className="text-sm md:text-base text-default-600 mb-4">
                JSON Web Token (JWT) is a compact, URL-safe means of representing claims to be transferred between two parties.
                JWTs are widely used for authentication and secure data exchange. They can be digitally signed using a secret or
                a public/private key pair to ensure data integrity.
            </p>

            {/* JWT Structure */}
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <BookOpen className="w-6 h-6 mr-2" />
                Structure of a JWT
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-sm md:text-base">
                <li>
                <strong>Header:</strong> Contains metadata about the token type and signing algorithm.
                </li>
                <li>
                <strong>Payload:</strong> Holds claims (user data or permissions).
                </li>
                <li>
                <strong>Signature:</strong> Ensures authenticity by signing the header and payload.
                </li>
            </ol>

            {/* JWT Example */}
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Code className="w-6 h-6 mr-2" />
                Example of a JWT
            </h2>
            <p className="mb-4 text-sm md:text-base text-default-600">
                A JWT consists of three parts: Header, Payload, and Signature, separated by dots:
            </p>
            <p className="mb-4 font-mono text-default-700 p-2 rounded-lg break-all text-sm">
                eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.
                SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
            </p>

            {/* Encoding & Decoding JWT */}
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Terminal className="w-6 h-6 mr-2" />
                JWT Encoding & Decoding Process
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-sm md:text-base">
                <li>
                <strong>Encoding:</strong> Combines the encoded header, encoded payload, and the signature.
                </li>
                <li>
                <strong>Decoding:</strong> Splits the JWT into its three parts and decodes the header and payload.
                </li>
                <li>
                <strong>Verification:</strong> Checks the signature to ensure authenticity.
                </li>
            </ol>

            {/* Best Practices */}
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Lightbulb className="w-6 h-6 mr-2" />
                Best Practices for Using JWTs
            </h2>
            <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
                <li>Use HTTPS to prevent token interception.</li>
                <li>Keep tokens short-lived to reduce risk in case of exposure.</li>
                <li>Use strong signing algorithms like RS256 or ES256 instead of HS256 for security.</li>
                <li>Store tokens securely, preferably in HTTP-only cookies instead of localStorage.</li>
                <li>Implement token revocation strategies (e.g., blacklists or short expiry with refresh tokens).</li>
            </ul>

            {/* Security Considerations */}
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Shield className="w-6 h-6 mr-2" />
                Security Considerations
            </h2>
            <p className="text-sm md:text-base text-default-600 mb-4">
                While JWTs provide a stateless authentication mechanism, they must be handled with care. Avoid storing sensitive
                information in JWTs, as they can be decoded by anyone with access. Implement proper expiration and revocation
                methods.
            </p>

            {/* Limitations of JWT */}
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <AlertTriangle className="w-6 h-6 mr-2 text-warning" />
                Limitations of JWT
            </h2>
            <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
                <li>JWTs are not encrypted by default; sensitive data should not be stored in them.</li>
                <li>Long-lived JWTs can pose a security risk if not properly revoked.</li>
                <li>Token size increases as more claims are added, potentially affecting performance.</li>
            </ul>

            {/* Use Cases */}
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <FileText className="w-6 h-6 mr-2" />
                Common Use Cases for JWTs
            </h2>
            <ul className="list-disc list-inside space-y-2 text-sm md:text-base">
                <li>
                <strong>Authentication:</strong> After login, the server issues a JWT that the client uses for subsequent
                requests.
                </li>
                <li>
                <strong>API Authorization:</strong> JWTs are used to secure API endpoints by verifying user roles and
                permissions.
                </li>
                <li>
                <strong>Single Sign-On (SSO):</strong> JWTs enable authentication across multiple applications.
                </li>
                <li>
                <strong>Data Integrity:</strong> JWTs ensure that transmitted data remains unaltered.
                </li>
            </ul>

            {/* Final Thoughts */}
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                <Shield className="w-6 h-6 mr-2" />
                Final Thoughts
            </h2>
            <p className="text-sm md:text-base text-default-600">
                JWTs are an essential part of modern authentication and authorization systems. While they provide a
                stateless and efficient way to verify identities, they must be used correctly to prevent security vulnerabilities.
                Implementing short-lived tokens, secure storage practices, and proper revocation mechanisms will help ensure
                robust security.
            </p>
            </div>
        </CardBody>
        </Card>

    </ToolLayout>
  )
}

