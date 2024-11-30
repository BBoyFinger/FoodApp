import express from "express";
import {
  getAllConversation,
  getMessageByConversation,
  postSaveMessage,
} from "../controllers/ChatController.js";

const ChatRouter = express.Router();
ChatRouter.get("/", getAllConversation);
ChatRouter.get("/message", getMessageByConversation);
ChatRouter.post("/save", postSaveMessage);

export default ChatRouter;
