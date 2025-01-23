import { useState, useEffect } from 'react'
import { useUser } from '@auth0/nextjs-auth0/client'
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react"
import { Heart, LogIn } from 'lucide-react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

interface FavoriteButtonProps {
  toolId: string
}

export default function FavoriteButton({ toolId }: FavoriteButtonProps) {
  const { user, isLoading: userLoading } = useUser()
  const [isFavorite, setIsFavorite] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (!user || !toolId) return

      try {
        const response = await fetch(`/api/favorites/check?toolId=${encodeURIComponent(toolId)}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setIsFavorite(data.isFavorite)
      } catch (error) {
        console.error('Error checking favorite status:', error)
        toast.error('Failed to check favorite status')
      }
    }

    checkFavoriteStatus()
  }, [user, toolId])

  const handleLogin = () => {
    localStorage.setItem('loginRedirect', window.location.pathname)
    router.push('/login')
  }

  const toggleFavorite = async () => {
    if (!user) {
      setIsModalOpen(true)
      return
    }
  
    setIsLoading(true)
    try {
      const response = await fetch('/api/favorites', {
        method: isFavorite ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ toolId }),
      })
  
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to toggle favorite')
      }
  
      setIsFavorite(!isFavorite)
      window.dispatchEvent(new CustomEvent('favoritesUpdated'))
      toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites')
    } catch (error) {
      console.error('Error toggling favorite:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to update favorites')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Button
        isIconOnly
        variant="flat"
        isLoading={isLoading || userLoading}
        onClick={toggleFavorite}
        className={`bg-default-100 hover:bg-default-200 dark:bg-default-100/20 dark:hover:bg-default-200/30 ${isFavorite ? '!bg-danger-100 dark:!bg-danger-100/20' : ''}`}
      >
        <Heart
          className={`h-4 w-4 ${isFavorite ? 'text-danger fill-danger' : 'text-default-500 dark:text-default-400'}`}
        />
      </Button>

      <Modal 
        isOpen={isModalOpen} 
        onOpenChange={setIsModalOpen}
        backdrop="blur"
        placement="center"
        classNames={{
          base: "bg-content1 dark:bg-content1",
          header: "border-b border-divider",
          body: "py-6",
          footer: "border-t border-divider"
        }}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut"
              }
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn"
              }
            }
          }
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Heart className="w-6 h-6 text-danger" />
                  <h3 className="text-xl font-semibold text-foreground">Authentication Required</h3>
                </div>
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col items-center text-center px-2">
                  <div className="w-16 h-16 bg-danger/10 dark:bg-danger/20 rounded-full flex items-center justify-center mb-4">
                    <Heart className="w-8 h-8 text-danger" />
                  </div>
                  <p className="text-foreground font-medium mb-2">
                    Sign in to Save Favorites
                  </p>
                  <p className="text-default-500 text-sm mb-4">
                    Create your personalized collection of tools by signing in or creating an account.
                  </p>
                  <div className="w-full p-4 bg-default-100 dark:bg-default-50 rounded-lg">
                    <h4 className="text-sm font-medium text-foreground mb-2">
                      Benefits of signing in:
                    </h4>
                    <ul className="text-sm text-default-500">
                      <li className="flex items-center gap-2 mb-2">
                        <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center">
                          <span className="text-success text-xs">✓</span>
                        </div>
                        Save your favorite tools for quick access
                      </li>
                      <li className="flex items-center gap-2 mb-2">
                        <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center">
                          <span className="text-success text-xs">✓</span>
                        </div>
                        Organize your most-used tools
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center">
                          <span className="text-success text-xs">✓</span>
                        </div>
                        Sync favorites across devices
                      </li>
                    </ul>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button 
                  variant="light" 
                  onPress={onClose}
                  className="font-medium"
                >
                  Cancel
                </Button>
                <Button 
                  color="primary" 
                  onPress={() => {
                    onClose()
                    handleLogin()
                  }}
                  className="font-medium"
                  startContent={<LogIn className="w-4 h-4" />}
                >
                  Sign In / Register
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}