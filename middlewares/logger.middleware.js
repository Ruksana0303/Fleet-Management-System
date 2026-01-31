import fs from 'fs'

export const logger=(req,res,next)=>{
    const log =`${req.method} ${req.url} ${new Data().toISOString()}\n`
    fs.appendFileSync('logs.txt',log)
    next()
}