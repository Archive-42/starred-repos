import { Router } from "express"
import errorHandler from "./middlewares/error-handler"
import admin from "./routes/admin"
import store from "./routes/store"

// guaranteed to get dependencies
export default (container, config) => {
  const app = Router()

  admin(app, container, config)
  store(app, container, config)

  app.use(errorHandler())

  return app
}

export * from "./routes/admin/notifications"
export * from "./routes/admin/store"
export * from "./routes/admin/variants"
export * from "./routes/store/auth"
export * from "./routes/store/carts"
export * from "./routes/store/collections"
export * from "./routes/store/customers"
export * from "./routes/store/gift-cards"
export * from "./routes/store/orders"
export * from "./routes/store/products"
export * from "./routes/store/regions"
export * from "./routes/store/return-reasons"
export * from "./routes/store/returns"
export * from "./routes/store/shipping-options"
export * from "./routes/store/swaps"
export * from "./routes/store/variants"
