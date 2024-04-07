import { useState } from 'react'
import { NavLink } from '.'
import nlwUniteIcon from '../assets/headerIcon.svg'
import { routes } from '../navigation/navigationProvider'
import { getUrlState } from '../helpers/getUrlState'
import { setUrlState } from '../helpers/setUrlState'

export function Header() {
  const [selected, setSelected] = useState(() => {
    return Number(getUrlState('section')) || 0
  })

  function setCurrentSection(section: number) {
    setUrlState('section', String(section))
    setSelected(section)
  }

  return (
    <header className='flex items-center gap-5 py-2'>
      <img src={nlwUniteIcon} />
      <nav className='flex items-center gap-5'>
          {
            routes.map(({ label }, index) => (
              <NavLink key={index} active={index === selected} onClick={()=> setCurrentSection(index)}  label={label} />
            ))}
      </nav>
    </header>
  )
}