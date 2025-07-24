import React, { useEffect } from 'react'
import { toast } from '@/components/ui/sonner'

interface BrowserCompatibilityProps {
  children: React.ReactNode
}

export const BrowserCompatibilityWrapper = ({ children }: BrowserCompatibilityProps) => {
  useEffect(() => {
    // Check for critical browser features
    const checkCompatibility = () => {
      const issues: string[] = []
      
      // Check WebGPU support (non-blocking)
      if (!(navigator as any).gpu) {
        console.log('WebGPU not supported - using CPU fallback')
      }
      
      // Check for modern JavaScript features
      if (!window.fetch) {
        issues.push('Fetch API not supported')
      }
      
      if (!window.Promise) {
        issues.push('Promises not supported')
      }
      
      // Check CSS features
      const testEl = document.createElement('div')
      testEl.style.display = 'grid'
      if (!testEl.style.display) {
        issues.push('CSS Grid not supported')
      }
      
      // Check localStorage
      try {
        localStorage.setItem('test', 'test')
        localStorage.removeItem('test')
      } catch {
        issues.push('localStorage not available')
      }
      
      // Show compatibility warnings for critical issues only
      if (issues.length > 0) {
        toast.error('Browser Compatibility Issues Detected', {
          description: `Some features may not work properly. Consider updating your browser.`,
          duration: 8000,
        })
      }
    }
    
    checkCompatibility()
  }, [])

  return <>{children}</>
}