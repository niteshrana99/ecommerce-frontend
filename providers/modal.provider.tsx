"use client";

import { StoreModal } from "@/components/modals/storeModal";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
    const [mounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <StoreModal />
    );
}