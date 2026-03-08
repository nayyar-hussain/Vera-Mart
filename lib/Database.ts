import mongoose from "mongoose"

import "@/Model/Product"
import { setServers } from "dns/promises"

setServers(['1.1.1.1', '1.0.0.1', '8.8.8.8', '8.8.4.4'])

const MONGODB_URI = process.env.MONGODB_URI!
let cached = global.mongoose
if(!cached){
    cached = global.mongoose = {conn : null , promise : null}
}

export const ConnectToDatabase = async() => {
    if(cached.conn){
        return cached.conn
    }

    if(!cached.promise){
        let opt = {
            bufferCommands : false
        }
        cached.promise = mongoose.connect(MONGODB_URI , opt).then(() => mongoose.connection)

    }
    try {
        cached.conn = await cached.promise
        return cached.conn
    } catch (error) {
        cached.conn = null
        throw error
    }
}