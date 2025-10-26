/**
 * API Service для работы с bot.e-replika.ru
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'

export interface Stats {
  total_donations: number
  total_amount: number
  total_donors: number
  active_campaigns: number
  verified_funds: number
  today_donations: number
  today_amount: number
}

export interface Donation {
  id: number
  amount: number
  fund_name: string
  date: string
  status: string
}

export interface Fund {
  id: number
  name: string
  category: string
  verified: boolean
  total_raised: number
  total_donors: number
}

class ApiService {
  private baseUrl: string

  constructor() {
    this.baseUrl = API_BASE_URL
  }

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    try {
      const url = `${this.baseUrl}${endpoint}`
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer test_token_123',
          ...options?.headers,
        },
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  async getStats(): Promise<Stats> {
    return this.request<Stats>('/replika/stats')
  }

  async getDonations(limit: number = 10): Promise<Donation[]> {
    return this.request<Donation[]>(`/replika/donations?limit=${limit}`)
  }

  async getFunds(): Promise<Fund[]> {
    return this.request<Fund[]>('/replika/funds')
  }

  async createDonation(data: any): Promise<any> {
    return this.request<any>('/replika/donations/create', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }
}

export const apiService = new ApiService()

