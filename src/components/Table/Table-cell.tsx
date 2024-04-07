import { ComponentProps } from "react";
import {twMerge} from 'tailwind-merge'

interface TableCellProps extends ComponentProps<'td'>{}
export function Tablecell(props: TableCellProps) {
  return ( 
    <td {...props} className={twMerge('py-3 px-4 text-sm text-zinc-400', props.className)} />
  )
}

