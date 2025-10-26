import { useState, useEffect, useCallback } from 'react'
import { apiService, Donation, APIError } from '../services/api'

interface UseDonationsParams {
  limit?: number
  offset?: number
  status?: string
}

interface UseDonationsResult {
  donations: Donation[]
  loading: boolean
  error: APIError | null
  total: number
  refetch: () => Promise<void>
}

export function useDonations(params: UseDonationsParams = {}): UseDonationsResult {
  const [donations, setDonations] = useState<Donation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<APIError | null>(null)
  const [total, setTotal] = useState(0)

  const fetchDonations = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const data = await apiService.getDonations(
        params.limit,
        params.offset,
        params.status
      )
      
      setDonations(data.results)
      setTotal(data.count)
      
    } catch (err) {
      const apiError = err instanceof APIError 
        ? err 
        : new APIError(err instanceof Error ? err.message : 'Failed to fetch donations')
      
      setError(apiError)
      console.error('Error fetching donations:', apiError)
      setDonations([])
      
    } finally {
      setLoading(false)
    }
  }, [params.limit, params.offset, params.status])

  useEffect(() => {
    fetchDonations()
  }, [fetchDonations])

  return { donations, loading, error, total, refetch: fetchDonations }
}
