import { IsEmail, IsNotEmpty } from "class-validator"
import jwt from "jsonwebtoken"
import config from "../../../../config"
import AuthService from "../../../../services/auth"
import CustomerService from "../../../../services/customer"
import { validator } from "../../../../utils/validator"

/**
 * @oas [post] /auth
 * operationId: "PostAuth"
 * summary: "Authenticate Customer"
 * description: "Logs a Customer in and authorizes them to view their details. Successful authentication will set a session cookie in the Customer's browser."
 * parameters:
 *   - (body) email=* {string} The Customer's email.
 *   - (body) password=* {string} The Customer's password.
 * tags:
 *   - Auth
 * responses:
 *  "200":
 *    description: OK
 *    content:
 *      application/json:
 *        schema:
 *          properties:
 *            customer:
 *              $ref: "#/components/schemas/customer"
 */
export default async (req, res) => {
  const validated = await validator(StorePostAuthReq, req.body)

  const authService: AuthService = req.scope.resolve("authService")
  const customerService: CustomerService = req.scope.resolve("customerService")

  const result = await authService.authenticateCustomer(
    validated.email,
    validated.password
  )
  if (!result.success) {
    res.sendStatus(401)
    return
  }

  // Add JWT to cookie
  req.session.jwt = jwt.sign(
    { customer_id: result.customer?.id },
    (config as any).jwtSecret,
    {
      expiresIn: "30d",
    }
  )

  const customer = await customerService.retrieve(result.customer?.id || "", {
    relations: ["orders", "orders.items"],
  })

  res.json({ customer })
}

export class StorePostAuthReq {
  @IsEmail()
  email: string

  @IsNotEmpty()
  password: string
}
