'use client'

import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import {Copy, Check, CornerUpRight } from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from '@/hooks/use-toast';

interface ShareButtonProps {
  id: string;
  title?: string;
  text?: string;
  className?: string;
}

export default function ShareButton({ id, title = 'Check this out!', text = 'Find V99 near you!', className = '' }: ShareButtonProps) {
  const [isSharing, setIsSharing] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/${id}` : `/${id}`;

  const handleShare = async () => {
    setIsSharing(true);
    const shareData = {
      title: title,
      text: text,
      url: shareUrl
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        setIsDialogOpen(true);
      }
    } catch (error) {
      console.error('Error sharing:', error);
      setIsDialogOpen(true);
    } finally {
      setIsSharing(false);
    }
  };

  const handleCopy = async () => {
    if (inputRef.current) {
      inputRef.current.select();
      inputRef.current.setSelectionRange(0, 99999); // For mobile devices

      try {
        // Use the Clipboard API
        await navigator.clipboard.writeText(shareUrl);
        setIsCopied(true);
        toast({
          title: "Copied!",
          description: "Link copied to clipboard",
        });
        setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
        // Fallback method using a temporary input element
        copyToClipboard(shareUrl);
      }
    }
  };

  const copyToClipboard = (text: string) => {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    toast({
      title: "Copied!",
      description: "Link copied to clipboard",
    });
  };

  return (
    <>
      <Button 
        onClick={handleShare} 
        disabled={isSharing}
        className={`w-full bg-yellow-500 hover:bg-yellow-700 text-white ${className}`}
      >
        {isSharing ? 'Sharing...' : 'Share'}
        <CornerUpRight className="ml-2 h-4 w-4" />
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="w-72 md:w-1/2">
          <DialogHeader>
            <DialogTitle>Share this link</DialogTitle>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Input
                ref={inputRef}
                id="link"
                readOnly
                value={shareUrl}
                className="w-full"
              />
            </div>
            <Button onClick={handleCopy} size="sm" className="px-3">
              <span className="sr-only">Copy</span>
              {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Click the button to copy the link to your clipboard
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
}
