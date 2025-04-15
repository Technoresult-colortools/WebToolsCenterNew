// components/TemplatesTab.tsx
import { useState } from "react"
import { Card, Button, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react"
import { Save } from "lucide-react"

interface TemplatesTabProps {
  selectedTemplate: string
  setSelectedTemplate: (templateId: string) => void
  qrCodeTemplates: any[]
  savedTemplates: any[]
  handleSaveTemplate: (templateName: string) => boolean
}

export const TemplatesTab: React.FC<TemplatesTabProps> = ({
  selectedTemplate,
  setSelectedTemplate,
  qrCodeTemplates,
  savedTemplates,
  handleSaveTemplate,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [templateName, setTemplateName] = useState("")
  const [saveError, setSaveError] = useState("")

  const handleSaveClick = () => {
    if (!templateName.trim()) {
      setSaveError("Please enter a template name")
      return
    }

    const success = handleSaveTemplate(templateName)
    if (success) {
      setTemplateName("")
      setSaveError("")
      onClose()
    } else {
      setSaveError("Failed to save template")
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold">Built-in Templates</h3>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 pr-2 max-h-80 overflow-x-auto">
          {qrCodeTemplates.map((template) => (
            <Card
              key={template.id}
              isPressable
              onPress={() => setSelectedTemplate(template.id)}
              className={`p-2 h-24 ${
                selectedTemplate === template.id
                  ? "border-2 border-primary-500 dark:border-primary-400"
                  : "border border-default-200"
              }`}
            >
              <div className="flex flex-col h-full items-center justify-between">
                <div className="w-12 h-12 relative">
                  {template.thumbnail ? (
                    <div className="w-12 h-12 bg-default-100 flex items-center justify-center">
                      {/* In a real implementation, you'd use actual thumbnails */}
                      <div
                        className="w-8 h-8"
                        style={{ backgroundColor: template.bgColor }}
                      >
                        <div
                          className="w-8 h-8"
                          style={{
                            backgroundColor: template.fgColor,
                            clipPath: template.bodyShape === "dots" ? "circle(40%)" : "none",
                            borderRadius: template.bodyShape === "rounded" ? "20%" : "0",
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="w-12 h-12 bg-default-200" />
                  )}
                </div>
                <span className="text-sm mt-1">{template.name}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {savedTemplates.length > 0 && (
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold">Your Templates</h3>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {savedTemplates.map((template) => (
              <Card
                key={template.id}
                isPressable
                onPress={() => setSelectedTemplate(template.id)}
                className={`p-2 h-24 ${
                  selectedTemplate === template.id
                    ? "border-2 border-primary-500 dark:border-primary-400"
                    : "border border-default-200"
                }`}
              >
                <div className="flex flex-col h-full items-center justify-between">
                  <div className="w-12 h-12 relative">
                    <div className="w-12 h-12 bg-default-100 flex items-center justify-center">
                      <div
                        className="w-8 h-8"
                        style={{ backgroundColor: template.bgColor }}
                      >
                        <div
                          className="w-8 h-8"
                          style={{
                            backgroundColor: template.fgColor,
                            clipPath: template.bodyShape === "dots" ? "circle(40%)" : "none",
                            borderRadius: template.bodyShape === "rounded" ? "20%" : "0",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <span className="text-sm mt-1">{template.name}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      <Button color="primary" variant="bordered" startContent={<Save size={18} />} onPress={onOpen} className="w-full">
        Save Current as Template
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Save as Template</ModalHeader>
          <ModalBody>
            <Input
              label="Template Name"
              placeholder="Enter a name for your template"
              value={templateName}
              onChange={(e) => {
                setTemplateName(e.target.value)
                setSaveError("")
              }}
              isInvalid={!!saveError}
              errorMessage={saveError}
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={onClose}>
              Cancel
            </Button>
            <Button color="primary" onPress={handleSaveClick}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}