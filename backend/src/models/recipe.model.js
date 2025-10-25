import mongoose, {Schema} from "mongoose"

const recipeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    recipeName: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String
    },
    disease: {
        type: String,
        required: true,
    },
    recipeImage: {
        type: String, // cloudinary url
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
        index: true,
    },
    ingradients: [
        {
            type: String,
            required: true,
    }],
    steps: [
        {
            type: String,
            required: true
        }
    ],
    expectedTime: {
        type: Number,
        required: true
    }
},{timestamps: true})

export const Recipe = mongoose.model("Recipe", recipeSchema)