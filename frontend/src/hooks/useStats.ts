import { useState, useEffect } from 'react'
import { apiService, Stats } from '../services/api'

export function useStats() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        const data = await apiService.getStats()
        setStats(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch stats')
        // Fallback to default stats
        setStats({
          total_donations: 1850,
          total_amount: 5240000,
          total_donors: 1240,
          active_campaigns: 12,
          verified_funds: 8,
          today_donations: 45,
          today_amount: 187500,
        })
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return { stats, loading, error }
}

