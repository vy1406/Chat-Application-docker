const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
   // name: { type: mongoose.Schema.Types.ObjectId, ref: "username", required: true },
    name: { type: String, required: true },
    //receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    room: { type: String, required: true },
    socketID: { type: String, required: true },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
