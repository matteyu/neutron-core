import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative rounded-xl border border-white/20 bg-gradient-to-b from-white/20 to-white/10 shadow-[0_8px_16px_rgba(0,0,0,0.2)] backdrop-blur-[2px] transition-all duration-200",
      "hover:shadow-[0_12px_24px_rgba(0,0,0,0.3)] hover:border-white/30",
      "before:absolute before:inset-0 before:-z-10 before:rounded-xl before:bg-gradient-to-b before:from-white/20 before:to-white/5",
      "after:absolute after:inset-0 after:-z-20 after:rounded-xl after:bg-gradient-to-t after:from-black/20 after:to-white/20",
      "overflow-hidden",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col space-y-1.5 p-6 bg-gradient-to-b from-white/20 to-transparent rounded-t-xl",
      className
    )}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative text-2xl font-bold leading-none tracking-tight",
      "text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-lg font-semibold text-white/95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]",
      className
    )}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div 
    ref={ref} 
    className={cn(
      "p-6 pt-0 relative z-20",
      "before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-b before:from-transparent before:to-white/5",
      className
    )} 
    {...props} 
  />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center p-6 pt-0 bg-gradient-to-t from-white/10 to-transparent",
      className
    )}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }