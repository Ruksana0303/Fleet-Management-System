import { supabse} from '../config/supabse.js'

export const addVehicle=async(req, res)=>{
    try{
        if(req.user.role!=='owner'){
            return res.status(403).json({message:'Only owners can add vehicles'})
        }
        const { name, registration_number, allowed_passengers,rate_per_km}=req.body
        const{error}=await SupabaseClient.from('vehicles').insert([{
            name,
            registration_number,
            allowed_passengers,
            rate_per_km,
            owner_id:req.user.id
        }])

        if(error) return res.status(400).json({error:error.message})
        
        res.status(201).json({message:'Vehicle added'})
    }catch(err){
        res.status(500).json({error: err.message})
    }
}

export const assignDriver=async(req , res)=>{
    try{
        const{vehicleId}=req.params
        const(driver_id)=req.body

        await SupabaseClient.from('vehicles')
         .update({driver_id})
         .eq('id',vehicleId)
        
        res.json({message: 'Driver assigned'})
    }catch(err){
        res.status(500).json({error: err.message})
    }
}

export const getVehicle=async(req , res)=>{
    const{vehicleId}=req.params
    const{data}=await supabase.from('vehicle').select('*').eq('id',vehicleId).single()
    res.json(data)
}