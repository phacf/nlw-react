import { useState } from 'react'
import { NavLink } from '.'
import nlwUniteIcon from '../assets/headerIcon.svg'
import { routes } from '../navigation/navigationProvider'

export function Header() {
  const url = new URL(window.location.toString())

  const [selected, setSelected] = useState(() => {
    if (url.searchParams.has('section')) {
      return Number(url.searchParams.get('section'))
    }
    return 0
  })

  function setCurrentSection(section: number) {
    url.searchParams.set('section', String(section))
    window.history.pushState({}, '', url)
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