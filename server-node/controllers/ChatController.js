import asyncHandler from "express-async-handler";
import ConversationModel from "../models/ConversationModel.js";
import { MessageModel } from "../models/MessageModel.js";

const getAllConversation = asyncHandler(async (req, res) => {
  try {
    const allConversation = await ConversationModel.find().sort({
      updateAt: -1,
    });
    res.json(allConversation);
  } catch (error) {
    res.json({ message: error.message });
  }
});

const getMessageByConversation = asyncHandler(async (req, res) => {
  const { idUser, idConversation } = req.query;

  try {
    const conversation = await ConversationModel.findOne({
      $or: [{ idUser }, { _id: idConversation }],
    });

    if (!conversation) {
      return res.json({
        message: "Conversation not found.",
      });
    }

    const messages = await MessageModel.find({
      idConversation: conversation._id,
    }).populate("idConversation");

    if (!messages.length) {
      return res.status(400).json({
        message: "No messages found for this conversation.",
      });
    }

    return res.status(200).json({
      messageList: messages,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error.",
    });
  }
});

const postSaveMessage = asyncHandler(async (req, res) => {
  try {
    const messageText = new MessageModel({
      sender: req.body.sender,
      message: req.body.message,
      idConversation: req.body.idConversation,
    });
    const createMessage = await messageText.save();
    res.send(createMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export { getAllConversation, getMessageByConversation, postSaveMessage };
