import { useState, useEffect, useCallback } from 'react'
import { apiService, Stats, APIError } from '../services/api'

interface UseStatsResult {
  stats: Stats | null
  loading: boolean
  error: APIError | null
  refetch: () => Promise<void>
}

export function useStats(): UseStatsResult {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<APIError | null>(null)

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const data = await apiService.getStats()
      setStats(data)
      
    } catch (err) {
      const apiError = err instanceof APIError 
        ? err 
        : new APIError(err instanceof Error ? err.message : 'Failed to fetch stats')
      
      setError(apiError)
      console.error('Error fetching stats:', apiError)
      
      // Set fallback stats
      setStats({
        total_donations: 0,
        total_amount: 0,
        total_donors: 0,
        active_campaigns: 0,
        verified_funds: 0,
        today_donations: 0,
        today_amount: 0,
        this_month_donations: 0,
        this_month_amount: 0,
      })
      
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  return { stats, loading, error, refetch: fetchStats }
}
