// components/ShapeTab.tsx
import React from "react"
import { Card, CardBody, RadioGroup, Radio } from "@nextui-org/react"

interface ShapeTabProps {
  bodyShape: string
  setBodyShape: (shape: string) => void
  eyeFrameShape: string
  setEyeFrameShape: (shape: string) => void
  eyeBallShape: string
  setEyeBallShape: (shape: string) => void
}

export const ShapeTab: React.FC<ShapeTabProps> = ({
  bodyShape,
  setBodyShape,
  eyeFrameShape,
  setEyeFrameShape,
  eyeBallShape,
  setEyeBallShape,
}) => {
  return (
    <div className="space-y-6">
      {/* QR Body Shape */}
      <div>
        <h3 className="text-md font-semibold mb-2">QR Code Shape</h3>
        <Card>
          <CardBody>
            <RadioGroup
              value={bodyShape}
              onValueChange={setBodyShape}
              orientation="horizontal"
              classNames={{
                wrapper: "gap-2",
              }}
            >
              <Radio value="square">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-default-800 mr-2" />
                  <span>Square</span>
                </div>
              </Radio>
              <Radio value="rounded">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-default-800 rounded-lg mr-2" />
                  <span>Rounded</span>
                </div>
              </Radio>
              <Radio value="dots">
                <div className="flex items-center">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <div className="w-4 h-4 bg-default-800 rounded-full" />
                  </div>
                  <span className="ml-2">Dots</span>
                </div>
              </Radio>
              <Radio value="classy">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-default-800 rotate-45 mr-2" />
                  <span>Classy</span>
                </div>
              </Radio>
            </RadioGroup>
          </CardBody>
        </Card>
      </div>

      {/* Eye Frame Shape */}
      <div>
        <h3 className="text-md font-semibold mb-2">Position Detector Shape</h3>
        <Card>
          <CardBody>
            <RadioGroup
              value={eyeFrameShape}
              onValueChange={setEyeFrameShape}
              orientation="horizontal"
              classNames={{
                wrapper: "gap-2",
              }}
            >
              <Radio value="square">
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-default-800 mr-2" />
                  <span>Square</span>
                </div>
              </Radio>
              <Radio value="rounded">
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-default-800 rounded-lg mr-2" />
                  <span>Rounded</span>
                </div>
              </Radio>
              <Radio value="circle">
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-default-800 rounded-full mr-2" />
                  <span>Circle</span>
                </div>
              </Radio>
            </RadioGroup>
          </CardBody>
        </Card>
      </div>

      {/* Eye Ball Shape */}
      <div>
        <h3 className="text-md font-semibold mb-2">Inner Eye Shape</h3>
        <Card>
          <CardBody>
            <RadioGroup
              value={eyeBallShape}
              onValueChange={setEyeBallShape}
              orientation="horizontal"
              classNames={{
                wrapper: "gap-2",
              }}
            >
              <Radio value="square">
                <div className="flex items-center">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <div className="w-4 h-4 bg-default-800" />
                  </div>
                  <span className="ml-2">Square</span>
                </div>
              </Radio>
              <Radio value="circle">
                <div className="flex items-center">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <div className="w-4 h-4 bg-default-800 rounded-full" />
                  </div>
                  <span className="ml-2">Circle</span>
                </div>
              </Radio>
              <Radio value="dot">
                <div className="flex items-center">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <div className="w-4 h-4 bg-default-800 rounded-full" />
                  </div>
                  <span className="ml-2">Dot</span>
                </div>
              </Radio>
            </RadioGroup>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}