export default {
    sentry: process.env.MARKETPLACE_SENTRY_DNS ? { dsn: process.env.MARKETPLACE_SENTRY_DNS } : undefined
}