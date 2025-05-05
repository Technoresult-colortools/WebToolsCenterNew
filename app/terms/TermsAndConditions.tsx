"use client"

import React, { useState, useEffect } from "react"
import { Card, CardBody } from "@nextui-org/react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Link from "next/link"

export default function TermsAndConditions() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-16 pb-8 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/5 animate-gradient-xy" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div
          className={`max-w-6xl mx-auto text-center transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Terms and Conditions
          </h1>
          <p className="text-xl text-default-600 mb-6 max-w-2xl mx-auto">
            Last updated: April 01, 2025
          </p>
          <p className="text-lg text-default-600 mb-6 max-w-2xl mx-auto">
            Please read these terms and conditions carefully before using Our Service.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <div className="animate-fade-in-up">
          <Card className="bg-content2/50 backdrop-blur-sm mb-8">
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Interpretation and Definitions</h2>
              
              <h3 className="text-xl font-semibold text-foreground mb-3">Interpretation</h3>
              <p className="text-default-600 mb-4">
                The words of which the initial letter is capitalized have meanings defined under the following conditions. 
                The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
              </p>
              
              <h3 className="text-xl font-semibold text-foreground mb-3">Definitions</h3>
              <p className="text-default-600 mb-4">
                For the purposes of these Terms and Conditions:
              </p>
              
              <ul className="list-disc pl-6 text-default-600 space-y-3 mb-4">
                <li>
                  <strong>Affiliate</strong> means an entity that controls, is controlled by or is under common control with a party, 
                  where "control" means ownership of 50% or more of the shares, equity interest or other securities entitled to vote 
                  for election of directors or other managing authority.
                </li>
                <li>
                  <strong>Country</strong> refers to: Karnataka, India
                </li>
                <li>
                  <strong>Company</strong> (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to WebToolsCenter.
                </li>
                <li>
                  <strong>Device</strong> means any device that can access the Service such as a computer, a cellphone or a digital tablet.
                </li>
                <li>
                  <strong>Service</strong> refers to the Website.
                </li>
                <li>
                  <strong>Social Media Login</strong> refers to the authentication method that allows You to sign in to our Service using credentials from third-party social media platforms.
                </li>
                <li>
                  <strong>Terms and Conditions</strong> (also referred as "Terms") mean these Terms and Conditions that form the entire 
                  agreement between You and the Company regarding the use of the Service.
                </li>
                <li>
                  <strong>Third-party Social Media Service</strong> means any services or content (including data, information, products or services) 
                  provided by a third-party that may be displayed, included or made available by the Service. This includes, but is not limited to, social media platforms used for authentication.
                </li>
                <li>
                  <strong>Website</strong> refers to WebToolsCenter, accessible from{" "}
                  <Link href="https://webtoolscenter.com/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                    https://webtoolscenter.com/
                  </Link>
                </li>
                <li>
                  <strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf 
                  of which such individual is accessing or using the Service, as applicable.
                </li>
              </ul>
            </CardBody>
          </Card>
          
          <Card className="bg-content2/50 backdrop-blur-sm mb-8">
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Acknowledgment</h2>
              
              <div className="space-y-4 text-default-600">
                <p>
                  These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company. 
                  These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.
                </p>
                <p>
                  Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. 
                  These Terms and Conditions apply to all visitors, users and others who access or use the Service.
                </p>
                <p>
                  By accessing or using the Service You agree to be bound by these Terms and Conditions. 
                  If You disagree with any part of these Terms and Conditions then You may not access the Service.
                </p>
                <p>
                  You represent that you are over the age of 18. The Company does not permit those under 18 to use the Service.
                </p>
                <p>
                  Your access to and use of the Service is also conditioned on Your acceptance of and compliance with the <Link href="https://www.webtoolscenter.com/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                  </Link> of the Company. 
                  Our Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your personal information when 
                  You use the Application or the Website and tells You about Your privacy rights and how the law protects You. 
                  Please read Our <Link href="https://www.webtoolscenter.com/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                  </Link> carefully before using Our Service.
                </p>
              </div>
            </CardBody>
          </Card>

          <Card className="bg-content2/50 backdrop-blur-sm mb-8">
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Social Media Login</h2>
              
              <div className="space-y-4 text-default-600">
                <p>
                  Our Service provides the option to sign in using credentials from Third-party Social Media Services such as Google, Facebook, Twitter, and others.
                </p>
                <p>
                  By choosing to sign in with a Social Media Login, You authorize the Company to collect Your personal data such as Your name, email address, profile picture, and any other information that the social media platform makes available to our Service. The collection and use of this information will be governed by our Privacy Policy.
                </p>
                <p>
                  You acknowledge that the Third-party Social Media Service's privacy policy applies to the data collection, usage, and disclosure practices of the social media platform. We encourage You to read the privacy policies of any Third-party Social Media Service that You use to sign in to our Service.
                </p>
                <p>
                  You understand that if You choose to disconnect Your account from the Social Media Login, You may need to create separate login credentials to continue accessing our Service.
                </p>
                <p>
                  The Company is not responsible for any issues arising from authentication problems or service outages related to the Third-party Social Media Services. We reserve the right to modify, suspend, or discontinue the Social Media Login feature at any time without prior notice.
                </p>
              </div>
            </CardBody>
          </Card>
          
          <Card className="bg-content2/50 backdrop-blur-sm mb-8">
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">User Accounts</h2>
              
              <div className="space-y-4 text-default-600">
                <p>
                  When You create an account with Us, whether directly or through a Social Media Login, You must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of Your account on Our Service.
                </p>
                <p>
                  You are responsible for safeguarding the credentials used to access the Service and for any activities or actions under Your credentials, whether Your password is with Our Service or with a Third-party Social Media Service.
                </p>
                <p>
                  You agree not to disclose Your credentials to any third party. You must notify Us immediately upon becoming aware of any breach of security or unauthorized use of Your account.
                </p>
                <p>
                  You may not use as a username the name of another person or entity or that is not lawfully available for use, a name or trademark that is subject to any rights of another person or entity other than You without appropriate authorization, or a name that is otherwise offensive, vulgar or obscene.
                </p>
              </div>
            </CardBody>
          </Card>
          
          <Card className="bg-content2/50 backdrop-blur-sm mb-8">
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Links to Other Websites</h2>
              
              <div className="space-y-4 text-default-600">
                <p>
                  Our Service may contain links to third-party web sites or services that are not owned or controlled by the Company.
                </p>
                <p>
                  The Company has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party 
                  web sites or services. You further acknowledge and agree that the Company shall not be responsible or liable, directly or indirectly, 
                  for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, 
                  goods or services available on or through any such web sites or services.
                </p>
                <p>
                  When you use Social Media Login, You will be redirected to the Third-party Social Media Service's site. Your interactions with those sites are governed by their terms of service and privacy policies.
                </p>
                <p>
                  We strongly advise You to read the terms and conditions and privacy policies of any third-party web sites or services that You visit or use for authentication.
                </p>
              </div>
            </CardBody>
          </Card>
          
          <Card className="bg-content2/50 backdrop-blur-sm mb-8">
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Data Collection Through Social Login</h2>
              
              <div className="space-y-4 text-default-600">
                <p>
                  When You use Social Media Login to sign in to our Service, We collect certain information from the Third-party Social Media Service. This information may include:
                </p>
                <ul className="list-disc pl-6 text-default-600 space-y-2 mb-4">
                  <li>Your name and profile picture</li>
                  <li>Your email address</li>
                  <li>Your unique identifier with the social platform</li>
                  <li>Other profile information that You have made publicly available on the social platform</li>
                </ul>
                <p>
                  We will use this information in accordance with our Privacy Policy. The information We collect will be used solely for the purpose of:
                </p>
                <ul className="list-disc pl-6 text-default-600 space-y-2 mb-4">
                  <li>Creating and managing Your account</li>
                  <li>Providing You with our Services</li>
                  <li>Communicating with You about Your account or our Services</li>
                  <li>Enhancing security and preventing fraud</li>
                </ul>
                <p>
                  We will not share Your personal information with any third parties except as described in our Privacy Policy.
                </p>
              </div>
            </CardBody>
          </Card>
          
          <Card className="bg-content2/50 backdrop-blur-sm mb-8">
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Termination</h2>
              
              <div className="space-y-4 text-default-600">
                <p>
                  We may terminate or suspend Your access immediately, without prior notice or liability, for any reason whatsoever, 
                  including without limitation if You breach these Terms and Conditions.
                </p>
                <p>
                  Upon termination, Your right to use the Service will cease immediately.
                </p>
                <p>
                  If You wish to terminate Your account, You may simply discontinue using the Service or disconnect Your account from any associated Social Media Login services. You may also contact Us to request account deletion, which will be subject to our data retention policies.
                </p>
              </div>
            </CardBody>
          </Card>
          
          <Card className="bg-content2/50 backdrop-blur-sm mb-8">
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Limitation of Liability</h2>
              
              <div className="space-y-4 text-default-600">
                <p>
                  Notwithstanding any damages that You might incur, the entire liability of the Company and any of its suppliers under any provision 
                  of this Terms and Your exclusive remedy for all of the foregoing shall be limited to the amount actually paid by You through the 
                  Service or 100 USD if You haven't purchased anything through the Service.
                </p>
                <p>
                  To the maximum extent permitted by applicable law, in no event shall the Company or its suppliers be liable for any special, 
                  incidental, indirect, or consequential damages whatsoever (including, but not limited to, damages for loss of profits, loss of 
                  data or other information, for business interruption, for personal injury, loss of privacy arising out of or in any way related 
                  to the use of or inability to use the Service, third-party software and/or third-party hardware used with the Service, or 
                  otherwise in connection with any provision of this Terms), even if the Company or any supplier has been advised of the 
                  possibility of such damages and even if the remedy fails of its essential purpose.
                </p>
                <p>
                  The Company is not liable for any damages or issues arising from Your use of Social Media Login services, including but not limited to service interruptions, data breaches within the third-party platform, or changes to the third-party authentication systems.
                </p>
                <p>
                  Some states do not allow the exclusion of implied warranties or limitation of liability for incidental or consequential 
                  damages, which means that some of the above limitations may not apply. In these states, each party's liability will be 
                  limited to the greatest extent permitted by law.
                </p>
              </div>
            </CardBody>
          </Card>
          
          <Card className="bg-content2/50 backdrop-blur-sm mb-8">
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">"AS IS" and "AS AVAILABLE" Disclaimer</h2>
              
              <div className="space-y-4 text-default-600">
                <p>
                  The Service is provided to You "AS IS" and "AS AVAILABLE" and with all faults and defects without warranty of any kind. 
                  To the maximum extent permitted under applicable law, the Company, on its own behalf and on behalf of its Affiliates and 
                  its and their respective licensors and service providers, expressly disclaims all warranties, whether express, implied, 
                  statutory or otherwise, with respect to the Service, including all implied warranties of merchantability, fitness for a 
                  particular purpose, title and non-infringement, and warranties that may arise out of course of dealing, course of performance, 
                  usage or trade practice. Without limitation to the foregoing, the Company provides no warranty or undertaking, and makes no 
                  representation of any kind that the Service will meet Your requirements, achieve any intended results, be compatible or work 
                  with any other software, applications, systems or services, operate without interruption, meet any performance or reliability 
                  standards or be error free or that any errors or defects can or will be corrected.
                </p>
                <p>
                  Without limiting the foregoing, neither the Company nor any of the company's provider makes any representation or warranty 
                  of any kind, express or implied: (i) as to the operation or availability of the Service, or the information, content, and 
                  materials or products included thereon; (ii) that the Service will be uninterrupted or error-free; (iii) as to the accuracy, 
                  reliability, or currency of any information or content provided through the Service; or (iv) that the Service, its servers, 
                  the content, or e-mails sent from or on behalf of the Company are free of viruses, scripts, trojan horses, worms, malware, 
                  timebombs or other harmful components.
                </p>
                <p>
                  This disclaimer extends to any issues that may arise in connection with the Social Media Login functionality, including but not limited to authentication failures, service outages, or changes to the third-party platforms' services.
                </p>
                <p>
                  Some jurisdictions do not allow the exclusion of certain types of warranties or limitations on applicable statutory rights 
                  of a consumer, so some or all of the above exclusions and limitations may not apply to You. But in such a case the exclusions 
                  and limitations set forth in this section shall be applied to the greatest extent enforceable under applicable law.
                </p>
              </div>
            </CardBody>
          </Card>
          
          <Card className="bg-content2/50 backdrop-blur-sm mb-8">
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Governing Law</h2>
              
              <div className="space-y-4 text-default-600">
                <p>
                  The laws of the Country, excluding its conflicts of law rules, shall govern this Terms and Your use of the Service. 
                  Your use of the Application may also be subject to other local, state, national, or international laws.
                </p>
              </div>
            </CardBody>
          </Card>
          
          <Card className="bg-content2/50 backdrop-blur-sm mb-8">
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Disputes Resolution</h2>
              
              <div className="space-y-4 text-default-600">
                <p>
                  If You have any concern or dispute about the Service, You agree to first try to resolve the dispute informally by 
                  contacting the Company.
                </p>
              </div>
            </CardBody>
          </Card>
          
          <Card className="bg-content2/50 backdrop-blur-sm mb-8">
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">For European Union (EU) Users</h2>
              
              <div className="space-y-4 text-default-600">
                <p>
                  If You are a European Union consumer, you will benefit from any mandatory provisions of the law of the country 
                  in which You are resident.
                </p>
                <p>
                  In accordance with the General Data Protection Regulation (GDPR), 
                  EU users have specific rights concerning their personal data, including 
                  when that data is collected through Social Media Login services. 
                  These rights include the right to access, correct, delete, restrict processing, and data portability of Your personal information. For more information on how to exercise these rights, please refer to our <Link href="https://www.webtoolscenter.com/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                  Privacy Policy
                  </Link>.
                </p>
              </div>
            </CardBody>
          </Card>
          
          <Card className="bg-content2/50 backdrop-blur-sm mb-8">
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">United States Legal Compliance</h2>
              
              <div className="space-y-4 text-default-600">
                <p>
                  You represent and warrant that (i) You are not located in a country that is subject to the United States government 
                  embargo, or that has been designated by the United States government as a "terrorist supporting" country, and (ii) 
                  You are not listed on any United States government list of prohibited or restricted parties.
                </p>
              </div>
            </CardBody>
          </Card>
          
          <Card className="bg-content2/50 backdrop-blur-sm mb-8">
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Severability and Waiver</h2>
              
              <h3 className="text-xl font-semibold text-foreground mb-3">Severability</h3>
              <p className="text-default-600 mb-4">
                If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and interpreted 
                to accomplish the objectives of such provision to the greatest extent possible under applicable law and the remaining 
                provisions will continue in full force and effect.
              </p>
              
              <h3 className="text-xl font-semibold text-foreground mb-3">Waiver</h3>
              <p className="text-default-600 mb-4">
                Except as provided herein, the failure to exercise a right or to require performance of an obligation under these Terms 
                shall not affect a party's ability to exercise such right or require such performance at any time thereafter nor shall 
                the waiver of a breach constitute a waiver of any subsequent breach.
              </p>
            </CardBody>
          </Card>
          
          <Card className="bg-content2/50 backdrop-blur-sm mb-8">
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Translation Interpretation</h2>
              
              <div className="space-y-4 text-default-600">
                <p>
                  These Terms and Conditions may have been translated if We have made them available to You on our Service.
                  You agree that the original English text shall prevail in the case of a dispute.
                </p>
              </div>
            </CardBody>
          </Card>
          
          <Card className="bg-content2/50 backdrop-blur-sm mb-8">
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Changes to These Terms and Conditions</h2>
              
              <div className="space-y-4 text-default-600">
                <p>
                  We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. If a revision is material 
                  We will make reasonable efforts to provide at least 30 days' notice prior to any new terms taking effect. What constitutes 
                  a material change will be determined at Our sole discretion.
                </p>
                <p>
                  By continuing to access or use Our Service after those revisions become effective, You agree to be bound by the revised terms. 
                  If You do not agree to the new terms, in whole or in part, please stop using the website and the Service.
                </p>
              </div>
            </CardBody>
          </Card>
          
          <Card className="bg-content2/50 backdrop-blur-sm mb-8">
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Contact Us</h2>
              
              <div className="space-y-4 text-default-600">
                <p>If you have any questions about these Terms and Conditions, You can contact us:</p>
                <ul className="list-disc pl-6">
                  <li>
                    By visiting this page on our website:{" "}
                    <Link href="https://www.webtoolscenter.com/contact" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                      https://www.webtoolscenter.com/contact
                    </Link>
                  </li>
                </ul>
              </div>
            </CardBody>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}