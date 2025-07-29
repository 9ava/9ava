import type {MongoDB} from '../mongodb'
import {stringToObjectId} from '../mongodb'
import {Router} from 'express'
import * as U from '../utils'

export const authRouter = (...args: any[]) => {
  const db: MongoDB = args[0]
  const user = db.collection('user')
  const router = Router()

  return router
    .post('/signUp', async (req, res) => {
      const {body} = req

      try {
        const exists = await user.findOne({email: body.email})

        if (exists) {
          res.json({ok: false, errorMessage: '이미 가입한 회원입니다.'})
        } else {
          const {email, password} = body
          const hashed = await U.hashPasswordP(password)
          const newBody = {email, password: hashed}
          const {insertedId} = await user.insertOne(newBody)
          const jwt = await U.jwtSignP({userId: insertedId})
          res.json({ok: true, body: jwt})
        }
      } catch (e) {
        if (e instanceof Error) res.json({ok: false, errorMessage: e.message})
      }
    })
    .post('/login', async (req, res) => {
      const {email, password} = req.body
      if (!email || !password) {
        res.json({ok: false, errorMessage: 'email and password are required'})
        return
      }

      try {
        const foundUser = await user.findOne({email})
        if (!foundUser) {
          res.json({ok: false, errorMessage: '등록되지 않은 사용자 입니다.'})
          return
        }

        const isPasswordCorrect = await U.comparePasswordP(password, foundUser.password)
        if (!isPasswordCorrect) {
          res.json({ok: false, errorMessage: '비밀번호가 틀립니다.'})
          return
        }

        const jwt = await U.jwtSignP({userId: foundUser._id})
        res.json({ok: true, body: jwt})
      } catch (e) {
        if (e instanceof Error) {
          res.json({ok: false, errorMessage: e.message})
        }
      }
    })
}
