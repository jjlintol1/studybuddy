import { Document, Schema, model, models } from "mongoose";

export interface IQuestion extends Document {
    question: string;
    options: string[];
    answer: string;
}

const questionSchema = new Schema<IQuestion>({
    question: {
        type: String,
        required: true
    },
    options: {
        type: [String],
        required: true
    },
    answer: {
        type: String,
        required: true
    }
});

const Question = models.Question || model<IQuestion>('Question', questionSchema);

export default Question;