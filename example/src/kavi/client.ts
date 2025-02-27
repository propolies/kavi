import { createApiClient } from 'kavi/client'
import { options } from './options'
import type { Router } from '$lib/kavi/server'

export const api = createApiClient<Router>(options)