import { handleUpgrade } from 'kavi'

process.env.PORT = process.env.PORT ?? 4173
process.env.HOST = process.env.HOST ?? "localhost"
const { server } = await import('./build/index.js')
handleUpgrade(server)