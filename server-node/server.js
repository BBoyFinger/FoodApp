import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import session from 'express-session';
import { connectDB } from "./config/db/db.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import UserRouter from "./routers/UserRouter.js";
import ProductRouter from "./routers/ProductRouter.js";
import ChatRouter from "./routers/ChatRouter.js";
import { ConnectSocket } from "./config/socket/socket.js";
import SelectListrouter from "./routers/SelectListRouter.js";
import ListTypeProductRouter from "./routers/ListTypeProductRouter.js";
import OrderRouter from "./routers/OrderRouter.js";
import PaymentRouter from "./routers/PaymentRouter.js";
import passport from "./controllers/PassportController.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(
  session({
    secret: 'food_app',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());

ConnectSocket(server);
connectDB();

app.get("", (req, res) => {
  res.send("API is running>>>");
});

app.use("/api/users", UserRouter);
app.use("/api/products", ProductRouter);
app.use("/api/chats", ChatRouter);
app.use("/api/select-list", SelectListrouter);
app.use("/api/payment", PaymentRouter);
app.use("/api/type-products", ListTypeProductRouter);
app.use("/api/orders", OrderRouter);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});
app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);
// C1: Auth trong server
app.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: 'http://localhost:3000',
  failureRedirect: 'http://localhost:3000/login'
}));
// C2: Auth rồi truyền data thông qua url redirect 
// app.get(
//   '/auth/google/callback',
//   (req, res, next) => {
//     passport.authenticate('google', (err, user, info) => {
//       if (err) {
//         return res.status(500).json({ message: 'Internal Server Error' });
//       }
//       if (!user) {
//         return res.status(401).json({ message: 'Unauthorized' });
//       }
//       req.logIn(user, (err) => {
//         if (err) {
//           return res.status(500).json({ message: 'Internal Server Error' });
//         }
//         return res.status(200).json({ message: 'Authentication Successful' });
//       });
//     })(req, res, next);
//   }
// );

app.use(errorHandler);

server.listen(PORT, () => {
  console.log(`Server running in http://localhost/${PORT}`);
});
