import { API_CONFIG } from '../config/api.js'

export const adminAPI = {
  async getUsers(token, username) {
    const response = await fetch(API_CONFIG.getUrl('/admin/users/list'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ username, token })
    })

    if (!response.ok) {
      try {
        const error = await response.json()
        throw new Error(error.error || 'Failed to fetch users')
      } catch (parseError) {
        throw new Error(`Failed to fetch users: ${response.status} ${response.statusText}`)
      }
    }

    return await response.json()
  },

  async createUser(userData, token, username) {
    const response = await fetch(API_CONFIG.getUrl('/admin/users'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        username,
        token,
        newUsername: userData.username,
        password: userData.password,
        type: userData.type
      })
    })

    if (!response.ok) {
      try {
        const error = await response.json()
        throw new Error(error.error || 'Failed to create user')
      } catch (parseError) {
        throw new Error(`Failed to create user: ${response.status} ${response.statusText}`)
      }
    }

    return await response.json()
  },

  async deleteUser(targetUsername, token, username) {
    const response = await fetch(API_CONFIG.getUrl(`/admin/users/${targetUsername}`), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ username, token })
    })

    if (!response.ok) {
      try {
        const error = await response.json()
        throw new Error(error.error || 'Failed to delete user')
      } catch (parseError) {
        throw new Error(`Failed to delete user: ${response.status} ${response.statusText}`)
      }
    }

    return await response.json()
  }
}
