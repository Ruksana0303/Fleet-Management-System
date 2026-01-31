import { supabse } from '../config/supabse.js'

export const signup=async(req,res)=>{
    try{
        const{name,email,password,role}=req.body

        if(!['customer','owner','driver'].includes(role)){
            return res.status(400).json({message:'Invalid role'})
        }

        const {error}=await supabase 
         .from('users')
         .insert([{name,email,password,role}])

        if(error) return res.status(400).json({error:error.message})

        res.status(201).json({message:'User created successfully'})

    } catch(err){
        res.status(500).json({error: err.message})
    }
}