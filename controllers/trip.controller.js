import { supabase } from '../config/supabase.js'

export const createTrip = async (req, res) => {
  try {
    if (req.user.role !== 'customer') {
      return res.status(403).json({ message: 'Only customers can create trips' })
    }

    const { vehicle_id, distance_km, passengers } = req.body

    const { data: vehicle } = await supabase
      .from('vehicles')
      .select('*')
      .eq('id', vehicle_id)
      .single()

    if (!vehicle.isAvailable)
      return res.status(400).json({ message: 'Vehicle not available' })

    if (passengers > vehicle.allowed_passengers)
      return res.status(400).json({ message: 'Passenger limit exceeded' })

    await supabase.from('trips').insert([{
      customer_id: req.user.id,
      vehicle_id,
      distance_km,
      passengers
    }])

    await supabase.from('vehicles')
      .update({ isAvailable: false })
      .eq('id', vehicle_id)

    res.status(201).json({ message: 'Trip created' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const endTrip = async (req, res) => {
  const { tripId } = req.params

  const { data: trip } = await supabase
    .from('trips')
    .select('*, vehicles(rate_per_km)')
    .eq('id', tripId)
    .single()

  const cost = trip.distance_km * trip.vehicles.rate_per_km

  await supabase.from('trips')
    .update({ isCompleted: true, tripCost: cost })
    .eq('id', tripId)

  await supabase.from('vehicles')
    .update({ isAvailable: true })
    .eq('id', trip.vehicle_id)

  res.json({ message: 'Trip ended', tripCost: cost })
}
