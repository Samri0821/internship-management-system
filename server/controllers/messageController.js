import Message from "../models/Message.js";
import Internship from "../models/Internship.js";

// ==========================================
// SEND MESSAGE
// ==========================================
export const sendMessage = async (req, res) => {
  try {
    const { receiver, internship, message } = req.body;

    // Validate required fields
    if (!receiver || !internship || !message) {
      return res.status(400).json({
        message: "Receiver, internship and message are required"
      });
    }

    // Check authentication
    if (!req.user || !req.user.userId) {
      return res.status(401).json({
        message: "User authentication information is missing"
      });
    }

    // Find internship
    const internshipData = await Internship.findById(internship);

    if (!internshipData) {
      return res.status(404).json({
        message: "Internship not found"
      });
    }

    // Only intern or assigned supervisor can use this chat
    const isIntern =
      internshipData.intern.toString() ===
      req.user.userId.toString();

    const isSupervisor =
      internshipData.supervisor.toString() ===
      req.user.userId.toString();

    if (!isIntern && !isSupervisor) {
      return res.status(403).json({
        message: "You are not part of this internship"
      });
    }

    // Make sure receiver is the other participant
    const allowedReceiver = isIntern
      ? internshipData.supervisor.toString()
      : internshipData.intern.toString();

    if (receiver.toString() !== allowedReceiver) {
      return res.status(403).json({
        message: "You can only message the intern or supervisor assigned to this internship"
      });
    }

    // Create message
    const newMessage = await Message.create({
      sender: req.user.userId,
      receiver,
      internship,
      message,
      read: false
    });

    // Populate sender and receiver
    await newMessage.populate("sender", "name email role");
    await newMessage.populate("receiver", "name email role");

    return res.status(201).json({
      message: "Message sent successfully",
      chatMessage: newMessage
    });

  } catch (error) {
    console.error("Send Message Error:", error);

    return res.status(500).json({
      message: "Server error while sending message",
      error: error.message
    });
  }
};


// ==========================================
// GET CHAT HISTORY
// ==========================================
export const getChatHistory = async (req, res) => {
  try {
    const { internship } = req.params;

    if (!req.user || !req.user.userId) {
      return res.status(401).json({
        message: "User authentication information is missing"
      });
    }

    // Find internship
    const internshipData = await Internship.findById(internship);

    if (!internshipData) {
      return res.status(404).json({
        message: "Internship not found"
      });
    }

    // Check participant
    const isIntern =
      internshipData.intern.toString() ===
      req.user.userId.toString();

    const isSupervisor =
      internshipData.supervisor.toString() ===
      req.user.userId.toString();

    if (!isIntern && !isSupervisor) {
      return res.status(403).json({
        message: "You are not part of this internship"
      });
    }

    // Get conversation
    const messages = await Message.find({
      internship,
      $or: [
        {
          sender: req.user.userId
        },
        {
          receiver: req.user.userId
        }
      ]
    })
      .populate("sender", "name email role")
      .populate("receiver", "name email role")
      .sort({ createdAt: 1 });

    return res.status(200).json({
      count: messages.length,
      messages
    });

  } catch (error) {
    console.error("Get Chat History Error:", error);

    return res.status(500).json({
      message: "Server error while getting chat history",
      error: error.message
    });
  }
};


// ==========================================
// MARK MESSAGE AS READ
// ==========================================
export const markMessageAsRead = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        message: "Message not found"
      });
    }

    // Only receiver can mark it as read
    if (
      message.receiver.toString() !==
      req.user.userId.toString()
    ) {
      return res.status(403).json({
        message: "Only the receiver can mark this message as read"
      });
    }

    message.read = true;

    await message.save();

    return res.status(200).json({
      message: "Message marked as read",
      chatMessage: message
    });

  } catch (error) {
    console.error("Mark Message Read Error:", error);

    return res.status(500).json({
      message: "Server error while marking message as read",
      error: error.message
    });
  }
};