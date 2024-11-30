import express from "express";
import {
  clientCancelOrder,
  createOrder,
  DeleteOrder,
  GetAllOrder,
  GetAllOrderPaid,
  GetAllOrderPaypal,
  GetAllOrderPendding,
  GetAllOrderShipping,
  GetOrderByUser,
  GetOrderPaidByUser,
  GetOrderPaypalByUser,
  GetOrderPenddingByUser,
  GetOrderShippingByUser,
  PaidProduct,
  PrintOrderGhn,
  ShippingProduct,
  updateOrder,
} from "../controllers/OrderController.js";
import { admin, protect } from "../middlewares/Auth.js";

const OrderRouter = express.Router();

OrderRouter.post("/create", protect, createOrder);
OrderRouter.post("/update/:id", updateOrder);
OrderRouter.post("/cancel/:id", clientCancelOrder);
OrderRouter.get("/print/:id", PrintOrderGhn);
OrderRouter.put("/shipping/:id", ShippingProduct);
OrderRouter.put("/paid/:id", protect, PaidProduct);
OrderRouter.delete("/delete/:id", protect, DeleteOrder);

OrderRouter.get("/", protect, GetAllOrder);
OrderRouter.get("/orderPaypal", protect, GetAllOrderPaypal);
OrderRouter.get("/orderPendding", protect, GetAllOrderPendding);
OrderRouter.get("/orderShipping", protect, GetAllOrderShipping);
OrderRouter.get("/orderPaid", protect, GetAllOrderPaid);

// OrderRouter.get("/allOrderInAMonth", GetAllOrderInAMonth);

// // --- user
OrderRouter.get("/:id", protect, GetOrderByUser);
OrderRouter.get("/orderPaypal/:id", protect, GetOrderPaypalByUser);
OrderRouter.get("/orderPendding/:id", protect, GetOrderPenddingByUser);
OrderRouter.get("/orderShipping/:id", protect, GetOrderShippingByUser);
OrderRouter.get("/orderpaid/:id", protect, GetOrderPaidByUser);

// OrderRouter.get("/allOrderInAMonth", GetAllOrderInAMonth);

// // --- user
OrderRouter.get("/:id", GetOrderByUser);
OrderRouter.get("/orderPaypal/:id", GetOrderPaypalByUser);
OrderRouter.get("/orderPendding/:id", GetOrderPenddingByUser);
OrderRouter.get("/orderShipping/:id", GetOrderShippingByUser);
OrderRouter.get("/orderpaid/:id", GetOrderPaidByUser);
export default OrderRouter;
