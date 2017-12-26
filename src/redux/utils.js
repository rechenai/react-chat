export function getRedirectPath ({type, avatar}) {
  let url
  if (type === 'genius') url = '/genius'
  if (type === 'boss') url = '/boss'
  if (!avatar) url = url + 'Info'
  return url
}

export function getChatId(userId, targetId) {
  return [userId, targetId].sort().join('_')
}