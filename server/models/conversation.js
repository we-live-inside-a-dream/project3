const mongoose = require("mongoose")

const ConversationSchema = new mongoose.Schema(
    {
        members:{
            type:Array,
        },
    },
    {timeStamps:true}
)
module.exports = mongoose.model("conversation",ConversationSchema)