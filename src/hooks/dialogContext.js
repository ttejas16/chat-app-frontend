import { createContext, useContext } from "react";

const DialogContext = createContext();

function useDialogContext() {
  return useContext(DialogContext);
}

export { DialogContext, useDialogContext };