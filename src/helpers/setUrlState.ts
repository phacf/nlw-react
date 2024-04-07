/**
 * 
 * @param field 
 * @param value 
 */
export function setUrlState(field: string, value: string){
  const url = new URL(window.location.toString())
  url.searchParams.set(field, value)
  window.history.pushState({}, '', url)
}