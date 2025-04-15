import React from "react"
import { Button } from "@nextui-org/react"
import { Layout, Grid, Palette, ImageIcon } from "lucide-react"

interface SidebarNavigationProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    {
      id: "content",
      label: "Content",
      icon: <Layout size={20} />,
    },
    {
      id: "templates",
      label: "Templates",
      icon: <Grid size={20} />,
    },
    {
      id: "shape",
      label: "Shape",
      icon: <Layout size={20} />,
    },
    {
      id: "color",
      label: "Color",
      icon: <Palette size={20} />,
    },
    {
      id: "logo",
      label: "Logo",
      icon: <ImageIcon size={20} />,
    },
  ]

  return (
    <div className="flex md:flex-col w-full md:w-auto overflow-x-auto md:overflow-visible">
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          variant={activeTab === tab.id ? "flat" : "light"}
          className={`min-w-24 justify-start px-4 mb-2 ${
            activeTab === tab.id
              ? "bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400"
              : ""
          }`}
          startContent={tab.icon}
          onPress={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  )
}