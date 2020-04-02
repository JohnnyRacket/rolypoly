import redis from "redis";
import { promisify } from "util";


export const client = redis.createClient(process.env.REDIS_URL);
export const getAsync = promisify(client.get).bind(client);
export const setAsync = promisify(client.set).bind(client);
export const delAsync = promisify(client.del).bind(client);