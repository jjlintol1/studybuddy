import { Document, Schema, model, models } from "mongoose";

export interface IFlashcard extends Document {
    term: string;
    definition: string;
    studySet: Schema.Types.ObjectId;
}

const flashcardSchema = new Schema<IFlashcard>({
    term: {
        type: String,
        required: true
    },
    definition: {
        type: String,
        required: true
    },
    studySet: {
        type: Schema.Types.ObjectId,
        ref: 'StudySet',
        required: true
    }
});

const Flashcard = models.Flashcard || model<IFlashcard>('Flashcard', flashcardSchema);

export default Flashcard;