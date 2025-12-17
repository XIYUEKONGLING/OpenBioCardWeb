import { API_CONFIG } from '../config/api.js'

export const userAPI = {
  async getProfile(username) {
    const response = await fetch(API_CONFIG.getUrl(`/user/${username}`))

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('User not found')
      }
      throw new Error('Failed to fetch user profile')
    }

    return await response.json()
  },

  async updateProfile(username, profileData, token) {
    const response = await fetch(API_CONFIG.getUrl(`/user/${username}`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(profileData)
    })

    if (!response.ok) {
      try {
        const error = await response.json()
        throw new Error(error.error || 'Update failed')
      } catch (parseError) {
        throw new Error(`Update failed: ${response.status} ${response.statusText}`)
      }
    }

    return await response.json()
  }
}
