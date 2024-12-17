"use client";

import useStoreModal from "@/hooks/useStoreModal";
import { useEffect } from "react";

export default function Home() {

  const { open , onOpen } = useStoreModal()

  useEffect(( ) => {
      if(!open) onOpen();
  }, [open, onOpen]);

  
  return null;
}
