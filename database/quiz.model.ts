import { Document, Schema, model, models } from "mongoose";

export interface IQuiz extends Document {
    name: string;
    user: Schema.Types.ObjectId;
    studySet: Schema.Types.ObjectId;
    questions: Schema.Types.ObjectId[];
}

const quizSchema = new Schema<IQuiz>({
    name: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    studySet: {
        type: Schema.Types.ObjectId,
        ref: 'StudySet',
        required: true
    },
    questions: [{
        type: Schema.Types.ObjectId,
        ref: 'Question'
    }]
});

const Quiz = models.Quiz || model<IQuiz>('Quiz', quizSchema);

export default Quiz;

