import express from 'express'
import dotenv from 'dotenv'

import userRoutes from './routes/user.routes.js'
import vehicleRoutes from './routes/vehicle.routes.js'
import tripRoutes from './routes/trip.routes.js'
import analyticsRoutes from './routes/analytics.routes.js'

import {logger} from './middlewares/logger.middleware.js'

dotenv.config()
const app=express()

app.use(express.json())
app.use(logger)

app.use('./users',userRoutes)
app.use('./vehicles',vehicleRoutes)
app.use('./trips',tripRoutes)
app.use('./analytics', analyticsRoutes)

app.use((req,res)=>{
    res.status(400).json({message:'This Request Is Not Found'})
})

app.listen(process.env.PORT,()=>{
    console.log(`Server running on port ${process.env.PORT}`)
})