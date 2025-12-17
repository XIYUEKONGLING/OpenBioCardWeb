import { API_CONFIG } from '../config/api.js'

export const authAPI = {
  async login(credentials) {
    const response = await fetch(API_CONFIG.getUrl('/signin'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials)
    })

    if (!response.ok) {
      try {
        const error = await response.json()
        throw new Error(error.error || 'Login failed')
      } catch (parseError) {
        throw new Error(`Login failed: ${response.status} ${response.statusText}`)
      }
    }

    return await response.json()
  },

  async checkPermission(token, username) {
    const response = await fetch(API_CONFIG.getUrl('/admin/check-permission'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, token })
    })

    if (response.status === 403) {
      return { authorized: true, isAdmin: false }
    }

    if (!response.ok) {
      return { authorized: false, isAdmin: false }
    }

    try {
      const data = await response.json()
      return { authorized: true, isAdmin: data.success }
    } catch (parseError) {
      console.error('Failed to parse permission response:', parseError)
      return { authorized: false, isAdmin: false }
    }
  }
}
