
import express from 'express'
import { createTrip, endTrip } from '../controllers/trip.controller.js'
import { rateLimiter } from '../middlewares/rateLimiter.middleware.js'

const router = express.Router()

router.post('/create', rateLimiter, createTrip)
router.patch('/end/:tripId', endTrip)

export default router
