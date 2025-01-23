// components/DashboardToolRequests.tsx
"use client"

import { useEffect, useState } from "react"
import { Card, CardBody, Button, Chip } from "@nextui-org/react"
import { Lightbulb, Clock } from "lucide-react"

interface ToolRequest {
  id: string
  toolName: string
  category: string
  description: string
  status: "pending" | "approved" | "rejected"
  createdAt: string
}

export function DashboardToolRequests() {
  const [requests, setRequests] = useState<ToolRequest[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("/api/tool-requests")
        if (!response.ok) throw new Error("Failed to fetch tool requests")
        const data = await response.json()
        setRequests(data)
      } catch (error) {
        console.error("Error fetching tool requests:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRequests()
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (requests.length === 0) {
    return (
      <div className="p-4 min-h-[300px] flex items-center justify-center">
        <div className="text-center">
          <Lightbulb className="w-12 h-12 text-default-300 mx-auto mb-4" />
          <p className="text-default-500 text-lg">No tool requests yet</p>
          <Button
            color="primary"
            variant="flat"
            href="/tool-request"
            className="mt-4"
          >
            Request a Tool
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 p-4">
      {requests.map((request) => (
        <Card key={request.id} className="bg-content2/50">
          <CardBody className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold">{request.toolName}</h3>
                  <Chip
                    size="sm"
                    color={
                      request.status === "approved"
                        ? "success"
                        : request.status === "rejected"
                        ? "danger"
                        : "warning"
                    }
                  >
                    {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                  </Chip>
                </div>
                <p className="text-small text-default-500 mb-2">{request.description}</p>
                <div className="flex items-center gap-2 text-tiny text-default-400">
                  <Clock className="w-3 h-3" />
                  <span>
                    {new Date(request.createdAt).toLocaleDateString()}
                  </span>
                  <span className="mx-2">•</span>
                  <span>{request.category}</span>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  )
}