import { ComponentProps } from "react"
import {twMerge} from 'tailwind-merge'

interface NavLinkProps extends ComponentProps<'button'> {
  label: string
  active?: boolean
}

export function NavLink({label, active, ...props}: NavLinkProps) {
  return (
    <button className={twMerge(
      'font-medium text-sm text-zinc-400',
      active ? 'opacity-100' : 'opacity-50'
      )} 
     {...props}>{label}</button>
  )
}
