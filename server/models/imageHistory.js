import mongoose from 'mongoose';

const imageHistorySchema = new mongoose.Schema({
    imageSrc: {
        type: String,
        required: true
    },
    response: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});

const ImageHistory = mongoose.model('ImageHistory', imageHistorySchema);

export default ImageHistory;
