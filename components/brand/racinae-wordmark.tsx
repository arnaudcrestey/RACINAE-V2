import { cn } from "@/lib/utils"

type RacinaeWordmarkProps = {
  className?: string
}

export function RacinaeWordmark({ className }: RacinaeWordmarkProps) {
  return (
    <span
      className={cn(
        "font-heading text-[1.7rem] font-semibold leading-none tracking-normal text-foreground",
        className
      )}
    >
      RACINAE
    </span>
  )
}
