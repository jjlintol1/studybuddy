import { Document, Schema, model, models } from "mongoose";

export interface IStudySet extends Document {
    name: string;
    user: Schema.Types.ObjectId;
    flashcards: Schema.Types.ObjectId[];
}

const studySetSchema = new Schema<IStudySet>({
    name: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    flashcards: [{
        type: Schema.Types.ObjectId,
        ref: 'Flashcard'
    }]
});

const StudySet = models.StudySet || model<IStudySet>('StudySet', studySetSchema);

export default StudySet;