import mongoose from "mongoose";


const blogSchema = new mongoose.Schema({

    imageUrl: {
        type: String,
        required: true

    },
    imageId: {
        type: String,
        required: true

    },
    tag: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    des: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    isActive:{
        type:Boolean,
        default:true
    }

},
    {
        timestamps: true
    }

)

const blogModel = mongoose.model('Blog', blogSchema);

export default blogModel;