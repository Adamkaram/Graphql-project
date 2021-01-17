import { redis } from "../../redis"
import {v4} from "uuid"
import { confirmUserPrfix } from "../constants/redisPrefixes";

export const CreateConfirmationUrl = async (userID: number) => { 
    const token = v4();
    await redis.set(confirmUserPrfix + token, userID ,"ex" ,  60 * 60 * 24) // 1 day expiration 60 min * 60 seconde 24 is 24 hours
   console.log(token)
    return `${process.env.Domain}/user/confirm/${token} `;
}
