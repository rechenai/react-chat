export function getRedirectPath ({type, avatar}) {
  let url
  if (type === 'genius') url = '/genius'
  if (type === 'boss') url = '/boss'
  if (!avatar) url = url + 'Info'
  return url
}