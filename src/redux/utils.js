export function getRedirectPath ({type, avater}) {
  let url
  if (type === 'genius') url = '/genius'
  if (type === 'boss') url = '/boss'
  if (!avater) url = url + 'Info'
  return url
}