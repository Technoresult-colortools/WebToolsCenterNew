"use client"

import { useState } from "react"
import { Button, Card, CardBody, Input, Slider, Tabs, Tab, Link } from "@nextui-org/react"
import {  toast } from "react-hot-toast"
import {
  Smartphone,
  Copy,
  TabletSmartphone,
  Info,
  Lightbulb,
  BookOpen,
  RefreshCw,
  ZapIcon,
  AlignJustify,
  Type,
  Calculator,
  Clock,
  Scissors,
} from "lucide-react"
import ToolLayout from "@/components/ToolLayout"
import Image from "next/image"

export default function ReactNativeShadowGenerator() {
  const [shadowColor, setShadowColor] = useState("#000000")
  const [shadowOffsetWidth, setShadowOffsetWidth] = useState(0)
  const [shadowOffsetHeight, setShadowOffsetHeight] = useState(2)
  const [shadowOpacity, setShadowOpacity] = useState(0.25)
  const [shadowRadius, setShadowRadius] = useState(3.84)
  const [elevation, setElevation] = useState(5)
  const [androidColor, setAndroidColor] = useState("#000000")
  const [androidBackgroundColor, setAndroidBackgroundColor] = useState("#FFFFFF")
  const [activeTab, setActiveTab] = useState("ios")
  const [previewBackground, setPreviewBackground] = useState("#F0F0F0")

  const getShadowStyle = () => {
    if (activeTab === "android") {
      return {
        boxShadow: `0px ${elevation * 0.5}px ${elevation * 1.5}px ${androidColor}${Math.round(0.3 * 255)
          .toString(16)
          .padStart(2, "0")}`,
        backgroundColor: androidBackgroundColor,
      }
    } else {
      const colorHex = `${Math.round(shadowOpacity * 255)
        .toString(16)
        .padStart(2, "0")}`
      return {
        boxShadow: `${shadowOffsetWidth}px ${shadowOffsetHeight}px ${shadowRadius}px ${shadowColor}${colorHex}`,
        backgroundColor: "#FFFFFF", // Add a white background for iOS shadow
      }
    }
  }

  const copyToClipboard = () => {
    let code = ""

    if (activeTab === "ios") {
      code = `// iOS Shadow Style
{
  shadowColor: "${shadowColor}",
  shadowOffset: {
    width: ${shadowOffsetWidth},
    height: ${shadowOffsetHeight}
  },
  shadowOpacity: ${shadowOpacity.toFixed(2)},
  shadowRadius: ${shadowRadius.toFixed(2)}
}`
    } else {
      code = `// Android Shadow Style
{
  elevation: ${elevation},
  shadowColor: "${androidColor}",
  backgroundColor: "${androidBackgroundColor}", // Required for Android shadows
  overflow: "hidden", // Recommended for Android to clip shadow properly
}`
    }

    const platformCode = `// Cross-platform shadow implementation
import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  shadowBox: {
    backgroundColor: "${androidBackgroundColor}", // Required for Android
    ...Platform.select({
      ios: {
        shadowColor: "${shadowColor}",
        shadowOffset: {
          width: ${shadowOffsetWidth},
          height: ${shadowOffsetHeight}
        },
        shadowOpacity: ${shadowOpacity.toFixed(2)},
        shadowRadius: ${shadowRadius.toFixed(2)}
      },
      android: {
        elevation: ${elevation},
        shadowColor: "${androidColor}",
        overflow: "hidden"
      }
    })
  }
});`

    navigator.clipboard.writeText(`${code}\n\n${platformCode}`)
    toast.success("Shadow style copied to clipboard!")
  }

  const resetToDefaults = () => {
    if (activeTab === "ios") {
      setShadowColor("#000000")
      setShadowOffsetWidth(0)
      setShadowOffsetHeight(2)
      setShadowOpacity(0.25)
      setShadowRadius(3.84)
      setPreviewBackground("#F0F0F0")
    } else {
      setElevation(5)
      setAndroidColor("#000000")
      setAndroidBackgroundColor("#FFFFFF")
      setPreviewBackground("#F0F0F0")
      
    }
    toast.success("Reset to default values")
  }

  return (
    <ToolLayout
      title="React Native Shadow Generator"
      description="Create and Customize shadow styles for both iOS and Android in React Native"
      toolId="678f382e26f06f912191bcb8"
    >

      <div className="flex flex-col gap-8">
        {/* Preview Card */}
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <Tabs selectedKey={activeTab} onSelectionChange={(key) => setActiveTab(key as string)}>
              <Tab
                key="ios"
                title={
                  <div className="flex items-center">
                    <Smartphone className="w-4 h-4 mr-2" />
                    iOS
                  </div>
                }
              >
                <div
                  className="p-8 rounded-lg flex justify-center items-center"
                  style={{ backgroundColor: previewBackground }}
                >
                  <div className="w-32 h-32" style={getShadowStyle()}></div>
                </div>
              </Tab>
              <Tab
                key="android"
                title={
                  <div className="flex items-center">
                    <TabletSmartphone className="w-4 h-4 mr-2" />
                    Android
                  </div>
                }
              >
                <div
                  className="p-8 rounded-lg flex justify-center items-center"
                  style={{ backgroundColor: previewBackground }}
                >
                  <div className="w-32 h-32" style={getShadowStyle()}></div>
                </div>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>

        {/* Shadow Properties Form */}
        <Card className="bg-default-50 dark:bg-default-100">
          <CardBody className="p-6">
            <div className="space-y-6">
              {activeTab === "ios" ? (
                <>
                  <div>
                    <label className="block text-small font-medium text-default-700 mb-1.5">Shadow Color</label>
                    <div className="flex items-center space-x-2">
                      <Input
                        value={shadowColor}
                        onChange={(e) => setShadowColor(e.target.value)}
                        placeholder="#000000"
                        variant="bordered"
                      />
                      <input
                        type="color"
                        value={shadowColor}
                        onChange={(e) => setShadowColor(e.target.value)}
                        className="w-10 h-10 p-1 rounded"
                        
                      />
                    </div>
                  </div>

                  {[
                    {
                      id: "shadowOffsetWidth",
                      label: "Offset Width",
                      value: shadowOffsetWidth,
                      min: -20,
                      max: 20,
                      onChange: setShadowOffsetWidth,
                    },
                    {
                      id: "shadowOffsetHeight",
                      label: "Offset Height",
                      value: shadowOffsetHeight,
                      min: -20,
                      max: 20,
                      onChange: setShadowOffsetHeight,
                    },
                    {
                      id: "shadowOpacity",
                      label: "Opacity",
                      value: shadowOpacity,
                      min: 0,
                      max: 1,
                      step: 0.01,
                      onChange: setShadowOpacity,
                    },
                    {
                      id: "shadowRadius",
                      label: "Blur Radius",
                      value: shadowRadius,
                      min: 0,
                      max: 20,
                      step: 0.1,
                      onChange: setShadowRadius,
                    },
                  ].map((slider) => (
                    <div key={slider.id}>
                      <label className="block text-small font-medium text-default-700 mb-1.5">
                        {slider.label}: {slider.value.toFixed(2)}
                      </label>
                      <Slider
                        aria-label={slider.label}
                        value={slider.value}
                        onChange={(value) => slider.onChange(value as number)}
                        step={slider.step || 1}
                        maxValue={slider.max}
                        minValue={slider.min}
                        className="max-w-md"
                      />
                    </div>
                  ))}
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-small font-medium text-default-700 mb-1.5">
                      Elevation: {elevation}
                    </label>
                    <Slider
                      aria-label="Elevation"
                      value={elevation}
                      onChange={(value) => setElevation(value as number)}
                      step={1}
                      maxValue={24}
                      minValue={0}
                      className="max-w-md"
                    />
                    <p className="text-sm text-default-500 mt-1 flex items-center">
                      <Info className="w-4 h-4 mr-1" />
                      Android elevation ranges from 0 to 24dp
                    </p>
                  </div>

                  <div>
                    <label className="block text-small font-medium text-default-700 mb-1.5">Shadow Color</label>
                    <div className="flex items-center space-x-2">
                      <Input
                        value={androidColor}
                        onChange={(e) => setAndroidColor(e.target.value)}
                        placeholder="#000000"
                        variant="bordered"
                      />
                      <input
                        type="color"
                        value={androidColor}
                        onChange={(e) => setAndroidColor(e.target.value)}
                        className="w-10 h-10 p-1 rounded"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-small font-medium text-default-700 mb-1.5">Background Color</label>
                    <div className="flex items-center space-x-2">
                      <Input
                        value={androidBackgroundColor}
                        onChange={(e) => setAndroidBackgroundColor(e.target.value)}
                        placeholder="#FFFFFF"
                        variant="bordered"
                      />
                      <input
                        type="color"
                        value={androidBackgroundColor}
                        onChange={(e) => setAndroidBackgroundColor(e.target.value)}
                        className="w-10 h-10 p-1 rounded"
                      />
                    </div>
                    <p className="text-sm text-default-500 mt-1 flex items-center">
                      <Info className="w-4 h-4 mr-1" />
                      Background color is required for Android shadows to work
                    </p>
                  </div>
                </>
              )}

              {/* Preview Customization */}
              <div>
                <label className="block text-small font-medium text-default-700 mb-1.5">Preview Background Color</label>
                <div className="flex items-center space-x-2">
                  <Input
                    value={previewBackground}
                    onChange={(e) => setPreviewBackground(e.target.value)}
                    placeholder="#F0F0F0"
                    variant="bordered"
                  />
                  <input
                    type="color"
                    value={previewBackground}
                    onChange={(e) => setPreviewBackground(e.target.value)}
                    className="w-10 h-10 p-1 rounded"
                  />
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Generated Code Section */}
        <Card>
          <CardBody className="p-8">
            <h3 className="text-lg font-semibold mb-4">React Native Shadow Style</h3>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto dark:bg-gray-800 dark:text-white">
              {`import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  shadowBox: {
    backgroundColor: "${androidBackgroundColor}", // Required for Android
    ...Platform.select({
      ios: {
        shadowColor: "${shadowColor}",
        shadowOffset: {
          width: ${shadowOffsetWidth},
          height: ${shadowOffsetHeight}
        },
        shadowOpacity: ${shadowOpacity.toFixed(2)},
        shadowRadius: ${shadowRadius.toFixed(2)}
      },
      android: {
        elevation: ${elevation},
        shadowColor: "${androidColor}",
        overflow: "hidden"
      }
    })
  }
});`}
            </pre>
            <Button
              color="primary"
              onPress={copyToClipboard}
              className="mt-4 mb-4"
              startContent={<Copy className="w-4 h-4" />}
            >
              Copy Code
            </Button>
            <Button color="danger" onPress={resetToDefaults} startContent={<RefreshCw className="w-4 h-4" />}>
            Reset to Defaults
          </Button>
          </CardBody>
        </Card>

        {/* Info Section */}
        <Card className="bg-default-50 dark:bg-default-100 p-4 md:p-8">
          <div className="rounded-xl p-2 md:p-4 max-w-4xl mx-auto">
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 flex items-center">
              <Info className="w-6 h-6 mr-2" />
              What is the React Native Shadow Generator?
            </h2>
            <p className="text-sm md:text-base text-default-600 mb-4">
            The react native shadow generator is a versatile tool designed for developers working with react natives. It provides a{" "}
              <Link href="#how-to-use" className="text-primary hover:underline">
                user-friendly interface
              </Link>{" "}
              to create and customize shadow styles for both iOS and Android platforms. Whether you are designing a smooth UI or adding depth to the components of your app, our shadow generator simplifies the process of crafting to the correct shade for cross-platform development.
            </p>
            <p className="text-sm md:text-base text-default-600 mb-4">
            With the platform-specific shade properties and support for real-time preview, this is like a powerful design device on your fingers. Say goodbye to the complexities of management of various shadow implementation and hello to skilled, consistent shade style in your entire react country project!
            </p>

            <div className="my-8">
              <Image
                src="/Images/InfosectionImages/ReactNativeShadowPreview.png?height=400&width=600"
                alt="Screenshot of the React Native Shadow Generator interface showing various shadow customization options"
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
              How to Use the React Native Shadow Generator?
            </h2>
            <p className="text-sm md:text-base text-default-600 mb-4">
              Using our React Native Shadow Generator is straightforward. Here's a quick guide to get you started:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-sm md:text-base">
              <li>Choose the platform (iOS or Android) you want to generate shadows for.</li>
              <li>Adjust the shadow properties using the provided sliders and color pickers.</li>
              <li>See the changes in real-time in the preview section.</li>
              <li>Customize the preview background color for better visualization.</li>
              <li>Copy the generated code with a single click.</li>
              <li>Paste the code into your React Native project and apply the styles to your components.</li>
            </ol>

            <h2
              id="features"
              className="text-lg md:text-xl lg:text-2xl font-semibold text-default-700 mb-4 mt-8 flex items-center"
            >
              <Lightbulb className="w-6 h-6 mr-2" />
              Key Features
            </h2>
            <ul className="list-disc list-inside space-y-2 text-xs md:text-sm">
              <li>
                <ZapIcon className="w-4 h-4 inline-block mr-1" /> <strong>Platform-specific shadow generation:</strong>{" "}
                Create shadows tailored for iOS and Android
              </li>
              <li>
                <AlignJustify className="w-4 h-4 inline-block mr-1" /> <strong>Customizable properties:</strong>{" "}
                Fine-tune shadow color, offset, opacity, and radius for iOS; adjust elevation and colors for Android
              </li>
              <li>
                <Type className="w-4 h-4 inline-block mr-1" /> <strong>Real-time preview:</strong> See your changes
                instantly
              </li>
              <li>
                <Calculator className="w-4 h-4 inline-block mr-1" /> <strong>Cross-platform code generation:</strong>{" "}
                Get ready-to-use React Native styles
              </li>
              <li>
                <Clock className="w-4 h-4 inline-block mr-1" /> <strong>One-click copy:</strong> Easily copy generated
                code to clipboard
              </li>
              <li>
                <Scissors className="w-4 h-4 inline-block mr-1" /> <strong>Reset functionality:</strong> Quickly revert
                to default values
              </li>
            </ul>

            <p className="text-sm md:text-base text-default-600 mt-6">
              Ready to elevate your React Native app's UI with perfectly crafted shadows? Start using our React Native
              Shadow Generator now and experience the ease of creating consistent, cross-platform shadow styles. Whether
              you're a seasoned developer or just getting started with React Native, our tool provides the perfect
              balance of simplicity and power. Try it out and see how it can enhance your development workflow!
            </p>
          </div>
        </Card>
      </div>
    </ToolLayout>
  )
}

