import { toast } from "react-hot-toast"

// Local storage key for favorites
const FAVORITES_STORAGE_KEY = "image-filters-favorites"

/**
 * Get favorites from localStorage
 */
export const getFavorites = (): string[] => {
  try {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(FAVORITES_STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    }
    return []
  } catch (error) {
    console.error("Error loading favorites:", error)
    return []
  }
}

/**
 * Save favorites to localStorage
 */
export const saveFavorites = (favorites: string[]): void => {
  try {
    if (typeof window !== "undefined") {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites))
    }
  } catch (error) {
    console.error("Error saving favorites:", error)
  }
}

/**
 * Toggle a filter in the favorites list
 */
export const toggleFavorite = (
  filterName: string,
  currentFavorites: string[],
  setFavorites: (favorites: string[]) => void
): void => {
  const isCurrentlyFavorite = currentFavorites.includes(filterName)
  let newFavorites: string[]

  if (isCurrentlyFavorite) {
    // Remove from favorites
    newFavorites = currentFavorites.filter((name) => name !== filterName)
    toast.success(`Removed ${filterName} from favorites`)
  } else {
    // Add to favorites
    newFavorites = [...currentFavorites, filterName]
    toast.success(`Added ${filterName} to favorites`)
  }

  // Update state and localStorage
  setFavorites(newFavorites)
  saveFavorites(newFavorites)
}

/**
 * Initialize favorites from localStorage
 */
export const initializeFavorites = (): string[] => {
  return getFavorites()
}

/**
 * Clear all favorites
 */
export const clearAllFavorites = (setFavorites: (favorites: string[]) => void): void => {
  setFavorites([])
  saveFavorites([])
  toast.success("Cleared all favorites")
}

/**
 * Check if a filter is favorited
 */
export const isFavorite = (filterName: string, favorites: string[]): boolean => {
  return favorites.includes(filterName)
}