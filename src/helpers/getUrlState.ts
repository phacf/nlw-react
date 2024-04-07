/**
 * 
 * @param field 
 * @returns string | null 
 */
export function getUrlState(field: string){
  const url = new URL(window.location.toString())
  if (url.searchParams.has(field)) {
    return url.searchParams.get(field)
  }
  return null
}