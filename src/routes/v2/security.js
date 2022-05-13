import { Router } from 'express'
import validator from 'validator'
import utils from '../../utils'

const router = new Router()

router.get('/authenticate', async (req, res) => {
  const response = new utils.Response()
  try {
    const { email, password } = req.body
    if (validator.isEmail(email)) {
      const token = await req.context.models.User.findByLogin(email.toLowerCase(), password)
      if (token) {
        response.setMessage(token)
      } else {
        response.setCode(403)
      }
    } else {
      response.setCode(400)
    }
  } catch (e) {
    console.error(e)
    response.setCode(500)
  }

  return res.status(response.getCode()).send(response.getMessage())
})

export default router