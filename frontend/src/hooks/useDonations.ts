import { useState, useEffect } from 'react'
import { apiService, Donation } from '../services/api'

export function useDonations(limit: number = 10) {
  const [donations, setDonations] = useState<Donation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        setLoading(true)
        const data = await apiService.getDonations(limit)
        setDonations(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch donations')
      } finally {
        setLoading(false)
      }
    }

    fetchDonations()
  }, [limit])

  return { donations, loading, error }
}

