export async function  useFetchAtendees (page: number, search: string) {
  const endpoint = new URL(`http://localhost:3333/events/9e9bd979-9d10-4915-b339-3786b1634f33/attendees`)
  endpoint.searchParams.set('pageIndex', String(page - 1))
  if (search.length > 0) {
    endpoint.searchParams.set('query', search)
  }

  try{
    return (await fetch(endpoint)).json()
  }catch(e){
    return null
  }

    
}