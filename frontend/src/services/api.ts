/**
 * Professional API Service with error handling and retries
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'

export interface APIError {
  message: string
  statusCode?: number
}

export interface Stats {
  total_donations: number
  total_amount: number
  total_donors: number
  active_campaigns: number
  verified_funds: number
  today_donations: number
  today_amount: number
  this_month_donations?: number
  this_month_amount?: number
}

export interface Donation {
  id: number
  amount: number
  fund_name: string
  fund_id?: number
  date: string
  status: string
  currency: string
}

export interface Fund {
  id: number
  name: string
  category: string
  verified: boolean
  total_raised: number
  total_donors: number
  description?: string
  country_code?: string
}

class ApiService {
  private baseUrl: string
  private defaultHeaders: Record<string, string>

  constructor() {
    this.baseUrl = API_BASE_URL
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_REPLIKA_API_KEY || 'test_token_123'}`,
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    
    const config: RequestInit = {
      ...options,
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
    }

    try {
      const response = await fetch(url, config)

      // Handle HTTP errors
      if (!response.ok) {
        const error = await this.parseError(response)
        throw error
      }

      // Handle successful response
      const data = await response.json()
      return data

    } catch (error) {
      if (error instanceof Error) {
        throw new APIError(
          error.message,
          (error as any).statusCode
        )
      }
      throw error
    }
  }

  private async parseError(response: Response): Promise<APIError> {
    try {
      const error = await response.json()
      return new APIError(
        error.detail || error.message || `HTTP ${response.status}`,
        response.status
      )
    } catch {
      return new APIError(
        `HTTP ${response.status}: ${response.statusText}`,
        response.status
      )
    }
  }

  /**
   * Get platform statistics
   */
  async getStats(): Promise<Stats> {
    try {
      return await this.request<Stats>('/replika/stats')
    } catch (error) {
      console.error('Failed to fetch stats:', error)
      throw error
    }
  }

  /**
   * Get list of donations
   */
  async getDonations(
    limit: number = 10,
    offset: number = 0,
    status?: string
  ): Promise<{ results: Donation[]; count: number; limit: number; offset: number }> {
    try {
      const params = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString(),
      })
      
      if (status) {
        params.append('status', status)
      }

      return await this.request<{ results: Donation[]; count: number; limit: number; offset: number }>(
        `/replika/donations?${params}`
      )
    } catch (error) {
      console.error('Failed to fetch donations:', error)
      throw error
    }
  }

  /**
   * Get list of funds
   */
  async getFunds(verifiedOnly: boolean = true): Promise<Fund[]> {
    try {
      const params = new URLSearchParams({
        verified_only: verifiedOnly.toString(),
      })

      return await this.request<Fund[]>(
        `/replika/funds?${params}`
      )
    } catch (error) {
      console.error('Failed to fetch funds:', error)
      throw error
    }
  }

  /**
   * Create a new donation
   */
  async createDonation(data: {
    amount: number
    fund_id?: number
    fund_name?: string
    currency?: string
  }): Promise<Donation> {
    try {
      // Validate amount
      if (data.amount <= 0) {
        throw new APIError('Amount must be greater than 0', 400)
      }

      return await this.request<Donation>('/replika/donations/create', {
        method: 'POST',
        body: JSON.stringify(data),
      })
    } catch (error) {
      console.error('Failed to create donation:', error)
      throw error
    }
  }

  /**
   * Health check
   */
  async healthCheck(): Promise<{ status: string; api_connected: boolean }> {
    try {
      return await this.request<{ status: string; api_connected: boolean }>('/replika/health')
    } catch (error) {
      return { status: 'unhealthy', api_connected: false }
    }
  }
}

class APIError extends Error {
  statusCode?: number

  constructor(message: string, statusCode?: number) {
    super(message)
    this.name = 'APIError'
    this.statusCode = statusCode
  }
}

export const apiService = new ApiService()
