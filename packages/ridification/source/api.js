const DEFAULT_HOST = 'https://ridibooks.com'
const API_HOST = 'https://store-api.ridibooks.com'

export async function getNotificationUnreadCount() {
  const response = await fetch(`${DEFAULT_HOST}/api/notification/unread_count`)
  const data = await response.json()

  return data
}

export async function getBearerToken() {
  const { data } = await fetch(`${API_HOST}/users/me/notification-token/`, {
    credentials: 'include',
  })

  return data.token
}

export async function postNotification(init) {
  const formData = new FormData()
  formData.append('_method', 'PUT')

  await fetch(`${API_HOST}/notification`, {
    ...init,
    method: 'POST',
    body: formData,
  })
}

export async function getNotification({ token = '', limit = 100 }) {
  const headers = { authorization: `Bearer ${token}` }
  const response = await fetch(`${API_HOST}/notification?limit=${limit}`, {
    headers,
  })
  const data = await response.json()

  await postNotification({ headers })

  return data
}
