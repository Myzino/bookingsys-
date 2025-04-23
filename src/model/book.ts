import mongoose, {Document, Model, Schema} from 'mongoose';

interface IBook extends Document {
    booker: string;
    bookerEmail: string;
    bookerPhone: string;
    bookerId: string;
    startDate: Date;
    endDate: Date;
    totalPrice: number;
    status: string;
    id: string;
}