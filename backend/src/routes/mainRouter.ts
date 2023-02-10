import { Router } from 'express'
import {playerRouter} from './playerRoute'

const router = Router()

router.use('/players', playerRouter)

export default router
