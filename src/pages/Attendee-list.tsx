import { Search } from 'lucide-react'
import { IconButton, Table, Tablecell, TableHeader, TableRow } from '../components'
import { ChangeEvent, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useFetchAtendees } from '../services/useFetchAtendees'
import { setUrlState } from '../helpers/setUrlState'
import { getUrlState } from '../helpers/getUrlState'

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

interface Attendace {
  id: string
  name: string
  email: string
  createdAt: string
  checkedInAt: string | null
}

export function AttendeeList() {
  const url = new URL(window.location.toString())

  const [search, setSearch] = useState(() => {
    return getUrlState('search') || ''
  })

  const [page, setPage] = useState(() => {
    return Number(getUrlState('page')) || 1
  })

  const [atendees, setAtendees] = useState<Attendace[]>([])

  const [total, setTotal] = useState(0)

  const totalPages = Math.ceil(total / 10)

  async function resolveData() {
    try {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const data = await useFetchAtendees(page, search)
      setAtendees(data.attendees)
      setTotal(data.total)
    } catch (error) {

    }
  }

  useEffect(() => {
    resolveData()
  }, [page, search])

  function setCurrentSearch(search: string) {
    setUrlState('search', search)
    setSearch(search)
  }

  function setCurrentPage(page: number) {
    setUrlState('page', String(page))
    setPage(page)
  }

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    setCurrentSearch(event.target.value)
    setCurrentPage(1)
  }

  function nextPage() {
    if (page <= totalPages) setCurrentPage(page + 1)
  }

  function previousPage() {
    if (page > 1) setCurrentPage(page - 1)
  }
  function lastPage() {
    setCurrentPage(totalPages)
  }
  function firstPage() {
    setCurrentPage(1)
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className="flex gap-3 items-center">
        <h1 className="text-2xl font-bold">Participantes</h1>
        <div className="px-3 py-1.5 gap-3 border flex items-center text-sm border-white/10 rounded-lg w-72">
          <Search className='size-4 text-emerald-300' />
          <input value={search} onChange={handleSearchChange} className="border-0 p-0 focus:ring-0 text-sm bg-transparent flex-1 outline-none" placeholder="Buscar participante..." />
        </div>
      </div>
      <Table>
        <thead>
          <TableRow className='border-b border-white/10'>
            <TableHeader>
              <input type='checkbox' className='border border-white/10  bg-black/20 size-4 rouded-md checked:bg-orange-300 checked:hover:bg-orange-400 outline-none ' />
            </TableHeader>
            <TableHeader>Código</TableHeader>
            <TableHeader>Participante</TableHeader>
            <TableHeader>Data da inscrição</TableHeader>
            <TableHeader>Data do check-in</TableHeader>
            <TableHeader className='w-10'></TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {atendees.map((atendee) => (
            <TableRow key={atendee.id} className='border-b border-white/10'>
              <Tablecell className='w-12'>
                <input type='checkbox' className='border border-white/10 bg-black/20 size-4 rouded-md checked:bg-orange-300 checked:hover:bg-orange-400 outline-none focus:ring ' />
              </Tablecell>
              <Tablecell>{atendee.id}</Tablecell>
              <Tablecell>
                <div className='flex flex-col gap-1'>
                  <span className='font-semibold text-white'>{atendee.name}</span>
                  <span>{atendee.email}</span>
                </div>
              </Tablecell>
              <Tablecell>{dayjs().to((atendee.createdAt))}</Tablecell>
              <Tablecell>{
                atendee.checkedInAt ? dayjs().to((atendee.checkedInAt)) : <span className='text-zinc-500'>'Não fez check-in'</span>
              }</Tablecell>
              <Tablecell className='w-12'>
                <IconButton transparent icon='more' />
              </Tablecell>
            </TableRow>
          ))}

        </tbody>
        <tfoot>
          <TableRow>
            <Tablecell colSpan={3}>
              mostrando {atendees.length} de {total} itens
            </Tablecell>
            <Tablecell colSpan={3} className='text-right'>
              <div className='inline-flex gap-8 items-center'>

                <span>Pagina {page} de {totalPages}</span>

                <div className='flex gap-1.5'>
                  <IconButton disabled={page === 1} onClick={firstPage} icon='firstPage' />
                  <IconButton disabled={page === 1} onClick={previousPage} icon='prevousPage' />
                  <IconButton disabled={page === totalPages} onClick={nextPage} icon='nextPage' />
                  <IconButton disabled={page === totalPages} onClick={lastPage} icon='lastPage' />
                </div>
              </div>
            </Tablecell>

          </TableRow>
        </tfoot>
      </Table>

    </div>
  )
}

