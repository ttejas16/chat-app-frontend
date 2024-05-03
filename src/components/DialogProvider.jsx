import { useState } from "react"
import { DialogContext } from "@/hooks/dialogContext"

function DialogProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <DialogContext.Provider value={{
      isOpen,
      setIsOpen
    }}>
      {children}
    </DialogContext.Provider>
  )
}

export default DialogProvider;