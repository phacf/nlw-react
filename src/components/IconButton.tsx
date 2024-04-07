import { ComponentProps } from "react";
import { MoreHorizontal, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react'
import {twMerge} from 'tailwind-merge'


interface IconButtonProps extends ComponentProps<'button'> {
  icon?: IconsTypes
  transparent?: boolean
}

type IconsTypes = 'more' | 'nextPage' | 'firstPage' | 'prevousPage' | 'lastPage'

export function IconButton({ icon, transparent, ...props }: IconButtonProps) {

  const iconStyle = 'size-4'

  const icons: { [k in IconsTypes]: JSX.Element } = {
    more: <MoreHorizontal className={iconStyle} />,
    firstPage: <ChevronsLeft className={iconStyle} />,
    prevousPage: <ChevronLeft className={iconStyle} />,
    nextPage: <ChevronRight className={iconStyle} />,
    lastPage: <ChevronsRight className={iconStyle} />
  }

  const iconComponent = icon ? icons[icon] : null

  return (
    <button className={
      twMerge(
        'border border-white/10 rounded-md p-1.5 disabled:opacity-50',
        transparent? 'bg-black/20' : 'bg-white/10'
        )} {...props}>
      {iconComponent}
    </button>
  )
}

