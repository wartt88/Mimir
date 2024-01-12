// file to create the schema of the bd data 
import mongoose, { Schema } from "mongoose";

const deckSchema = new Schema({
    id: Number,
    title: String,
    tags : [String],
    isPublic: Boolean,
    isEducational: Boolean,
    votes: {
        up: Number,
        down: Number,
    },
    deadline: Date,
    owner_id: Number,
    cards: [{
        id: Number,
        question: String,
        answer: String,
        proficency: Number,
        lastSeen: Date,
    
    }]
    },
    

 {
    timestamps: true,
});

const Deck = mongoose.models.Deck || mongoose.model("Deck", deckSchema);

export default Deck;