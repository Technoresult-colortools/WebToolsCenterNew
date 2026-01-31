"use client"

import { Card } from "@nextui-org/react"
import {
    Info,
    BookOpen,
    Lightbulb,
    Shield,
    ShieldAlert,
    Fingerprint,
    Eye,
    Zap,
    Code,
    Smartphone,
    CheckCircle2,
    FileText,
    Database,
    AlertTriangle,
    Search,
    Lock,
    Settings,
    History,
    Key,
    Terminal,
    Layers,
    Share2
} from "lucide-react"
import Link from "next/link"

export default function InfoSectionJWT() {


    return (
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8 mt-8">
            <div className="rounded-xl p-2 md:p-4 max-w-6xl mx-auto">
                {/* Intro Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 flex items-center">
                    <Info className="w-6 h-6 mr-2 text-primary-500" />
                    What is JWT (JSON Web Token)?
                </h2>
                <p className="text-default-600 mb-4">
                    Think of a <Link href="#how-to-use" className="text-primary-500 hover:underline">JSON Web Token (JWT)</Link> as a high-tech digital passport for the internet. It is a compact, URL-safe way to send information between two parties—usually a client and a server—that can be verified and trusted because it is digitally signed.
                </p>
                <p className="text-default-600 mb-4">
                    In modern web development, JWTs are the backbone of stateless authentication. Instead of the server needing to remember every logged-in user (session), the user carries their own "credentials" in a token. Whether you are building a mobile app, a single-page application (SPA), or a microservices architecture, JWTs provide a secure and efficient way to handle authorization and secure data exchange.
                </p>

                {/* JWT Example Visual Section */}
                <div className="my-8">
                    <div className="relative rounded-lg shadow-lg overflow-hidden bg-white dark:bg-zinc-950 border border-default-200">
                        <div className="p-4 border-b border-default-200 bg-default-50 flex items-center justify-between">
                            <span className="text-sm font-medium text-default-700 flex items-center">
                                <Code className="w-4 h-4 mr-2" /> Encoded JWT Example
                            </span>
                            <div className="flex gap-1">
                                <div className="w-3 h-3 rounded-full bg-danger-400" />
                                <div className="w-3 h-3 rounded-full bg-warning-400" />
                                <div className="w-3 h-3 rounded-full bg-success-400" />
                            </div>
                        </div>
                        <div className="p-6 font-mono text-sm md:text-base break-all leading-relaxed">
                            <span className="text-purple-600 dark:text-purple-400 font-bold">eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9</span>
                            <span className="text-default-400">.</span>
                            <span className="text-pink-600 dark:text-pink-400 font-bold">eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ</span>
                            <span className="text-default-400">.</span>
                            <span className="text-cyan-600 dark:text-cyan-400 font-bold">SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c</span>
                        </div>
                        <div className="p-3 bg-default-50/50 border-t border-default-200 flex flex-wrap gap-4 justify-center text-xs">
                            <span className="flex items-center text-purple-600"><div className="w-2 h-2 rounded-full bg-purple-600 mr-1" /> Header</span>
                            <span className="flex items-center text-pink-600"><div className="w-2 h-2 rounded-full bg-pink-600 mr-1" /> Payload</span>
                            <span className="flex items-center text-cyan-600"><div className="w-2 h-2 rounded-full bg-cyan-600 mr-1" /> Signature</span>
                        </div>
                    </div>
                </div>

                {/* How to Use / Structure Section */}
                <h2 id="how-to-use" className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <BookOpen className="w-6 h-6 mr-2 text-primary-500" />
                    Structure and Process
                </h2>

                <ol className="list-none space-y-4 text-default-600">
                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                            1
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Settings className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                <strong className="text-default-700">The Header:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                The process starts with the <strong>Header</strong>, which typically consists of two parts: the type of the token (JWT) and the signing algorithm being used, such as HMAC SHA256 or RSA.
                            </p>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium">
                            2
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Layers className="w-4 h-4 text-green-500 flex-shrink-0" />
                                <strong className="text-default-700">The Payload:</strong>
                            </div>
                            <div className="ml-6 space-y-2">
                                <div className="flex items-start gap-2">
                                    <FileText className="w-3 h-3 mt-0.5 text-gray-500 flex-shrink-0" />
                                    <div>
                                        <strong className="text-default-700">Claims & User Data:</strong>
                                        <span className="text-default-600 ml-1">This contains the "claims"—statements about an entity (typically, the user) and additional data like expiration times (<code>exp</code>) or user roles.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-medium">
                            3
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Fingerprint className="w-4 h-4 text-orange-500 flex-shrink-0" />
                                <strong className="text-default-700">The Signature:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                To create the signature part, you must take the encoded header, the encoded payload, a secret, and the algorithm specified in the header. This prevents the data from being tampered with.
                            </p>
                        </div>
                    </li>

                    <li className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium">
                            4
                        </span>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <Terminal className="w-4 h-4 text-purple-500 flex-shrink-0" />
                                <strong className="text-default-700">Verification Process:</strong>
                            </div>
                            <p className="text-default-600 ml-6">
                                When the server receives a JWT, it decodes the header and payload, then re-signs them with its secret key to see if the resulting signature matches the one provided in the token.
                            </p>
                        </div>
                    </li>
                </ol>

                {/* Features Grid */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Lightbulb className="w-6 h-6 mr-2 text-primary-500" />
                    Key Features & Benefits
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-default-600">
                    <div className="flex items-start gap-3">
                        <Zap className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Stateless Authentication:</strong>
                            <span className="block mt-1">Servers don't need to store session data in memory, making it incredibly easy to scale horizontally.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Smartphone className="w-5 h-5 mt-0.5 text-secondary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Mobile Friendly:</strong>
                            <span className="block mt-1">JWTs are ideal for mobile environments where cookies are difficult to manage or unsupported.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Share2 className="w-5 h-5 mt-0.5 text-success-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Cross-Domain Auth:</strong>
                            <span className="block mt-1">Easily share authentication across different domains and microservices using the same token.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Database className="w-5 h-5 mt-0.5 text-warning-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Self-Contained:</strong>
                            <span className="block mt-1">The token carries all the information the server needs, reducing the number of database queries.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 mt-0.5 text-danger-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Data Integrity:</strong>
                            <span className="block mt-1">Digital signatures ensure that the information inside the payload cannot be modified by the client.</span>
                        </div>
                    </div>
                    <div className="flex items-start gap-3">
                        <History className="w-5 h-5 mt-0.5 text-primary-500 flex-shrink-0" />
                        <div>
                            <strong className="text-default-700">Standardized & Interoperable:</strong>
                            <span className="block mt-1">Based on open standards (RFC 7519), ensuring compatibility across all major languages and frameworks.</span>
                        </div>
                    </div>
                </div>

                {/* Security Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <ShieldAlert className="w-6 h-6 mr-2 text-primary-500" />
                    Security Considerations & Limitations
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-default-600">
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <Eye className="w-4 h-4 text-danger-500" /> Not Encrypted
                        </h3>
                        <p className="text-sm">
                            By default, JWTs are <strong>Base64Encoded</strong>, not encrypted. Anyone can decode the token to see the data inside. <strong>Never store sensitive info like passwords or credit card numbers in a JWT.</strong>
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-4 rounded-lg shadow-sm border border-default-200">
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-warning-500" /> Revocation Issues
                        </h3>
                        <p className="text-sm">
                            Since JWTs are stateless, they are hard to "log out" or invalidate before they expire without building a secondary blacklist or using short expiry times.
                        </p>
                    </div>
                </div>

                {/* Best Practices Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <Zap className="w-6 h-6 mr-2 text-primary-500" />
                    Pro Tips & Best Practices
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-default-600">
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md border border-default-200">
                        <h3 className="font-semibold text-lg mb-2 flex items-center gap-2 text-default-700">
                            <Lock className="w-4 h-4 text-success-500" /> Storage
                        </h3>
                        <p className="text-sm">
                            Store tokens in <strong>HttpOnly, Secure cookies</strong> instead of localStorage to protect them from Cross-Site Scripting (XSS) attacks.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md border border-default-200">
                        <h3 className="font-semibold text-lg mb-2 flex items-center gap-2 text-default-700">
                            <Key className="w-4 h-4 text-primary-500" /> Algorithms
                        </h3>
                        <p className="text-sm">
                            Use asymmetric algorithms like <strong>RS256</strong> (Public/Private keys) for higher security than the symmetric HS256 algorithm.
                        </p>
                    </div>
                    <div className="bg-default-200/50 dark:bg-default-300/20 p-3 rounded-lg shadow-md border border-default-200">
                        <h3 className="font-semibold text-lg mb-2 flex items-center gap-2 text-default-700">
                            <Search className="w-4 h-4 text-secondary-500" /> Expiration
                        </h3>
                        <p className="text-sm">
                            Set a short <strong>exp</strong> (expiration) time. Use <strong>Refresh Tokens</strong> to get new JWTs without making the user log in again.
                        </p>
                    </div>
                </div>

                {/* Use Cases Section */}
                <h2 className="text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center">
                    <CheckCircle2 className="w-6 h-6 mr-2 text-primary-500" />
                    Common Use Cases
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-default-600">
                    <div className="flex gap-3 items-start">
                        <div className="mt-1 text-success-500"><CheckCircle2 className="w-5 h-5" /></div>
                        <div>
                            <strong className="text-default-700">Authorization:</strong>
                            <p className="text-sm">The most common scenario. Once the user is logged in, each subsequent request will include the JWT, allowing the user to access routes and services that are permitted with that token.</p>
                        </div>
                    </div>
                    <div className="flex gap-3 items-start">
                        <div className="mt-1 text-success-500"><CheckCircle2 className="w-5 h-5" /></div>
                        <div>
                            <strong className="text-default-700">Information Exchange:</strong>
                            <p className="text-sm">JSON Web Tokens are a good way of securely transmitting information between parties. Because JWTs can be signed, you can be sure the senders are who they say they are.</p>
                        </div>
                    </div>
                </div>

                {/* Final Thoughts */}
                <p className="text-default-600 mt-8 text-center">
                    JWTs are an essential part of modern authentication and authorization systems. While they provide a stateless and efficient way to verify identities, they must be implemented with security in mind to prevent vulnerabilities. Master the art of secure token management today!
                </p>
            </div>
        </Card>
    )
}