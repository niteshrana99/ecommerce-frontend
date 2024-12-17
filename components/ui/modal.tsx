'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import React from 'react';


interface IModalProps {
  open: boolean;
  title: string;
  description: string;
  children: React.ReactNode;
  onClose: () => void;
}


export const Modal = ({ open, title, description, children, onClose }: IModalProps) => {
  const onchange = (open: boolean) => {
    if(!open) {
      onClose();
    }
  } 
  return <Dialog open={open} onOpenChange={onchange}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <div>{children}</div>
    </DialogContent>
  </Dialog>
}

