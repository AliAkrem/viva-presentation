import { RateLimiter } from "limiter"

export const RecoverEmailLimiter = new RateLimiter({
    tokensPerInterval: 1,
    interval: 'minute',
    fireImmediately: true,
})