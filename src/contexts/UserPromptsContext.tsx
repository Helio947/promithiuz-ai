
import { createContext, useContext, useEffect, useState } from "react";
import { Prompt } from "@/types/prompt-engine";
import { toast } from "@/components/ui/use-toast";

interface UserPromptsContextType {
  favorites: string[];
  toggleFavorite: (promptId: string) => void;
  isFavorited: (promptId: string) => boolean;
}

const UserPromptsContext = createContext<UserPromptsContextType | undefined>(undefined);

export function UserPromptsProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem("promptFavorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("promptFavorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (promptId: string) => {
    setFavorites(prev => {
      const isCurrentlyFavorited = prev.includes(promptId);
      const newFavorites = isCurrentlyFavorited
        ? prev.filter(id => id !== promptId)
        : [...prev, promptId];
      
      toast({
        title: isCurrentlyFavorited ? "Removed from favorites" : "Added to favorites",
        description: "Your favorites have been updated",
      });
      
      return newFavorites;
    });
  };

  const isFavorited = (promptId: string) => favorites.includes(promptId);

  return (
    <UserPromptsContext.Provider value={{ favorites, toggleFavorite, isFavorited }}>
      {children}
    </UserPromptsContext.Provider>
  );
}

export function useUserPrompts() {
  const context = useContext(UserPromptsContext);
  if (context === undefined) {
    throw new Error("useUserPrompts must be used within a UserPromptsProvider");
  }
  return context;
}
