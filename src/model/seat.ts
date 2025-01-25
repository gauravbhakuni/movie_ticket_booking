// model/seat.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface Seat extends Document {
  movieTitle: string;
  date: string;
  timing: string;
  seats: string[];
  userId: mongoose.Schema.Types.ObjectId;
}

const SeatSchema: Schema<Seat> = new Schema({
  movieTitle: { type: String, required: true },
  date: { type: String, required: true },
  timing: { type: String, required: true },
  seats: [{ type: String, required: true }],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const SeatModel = mongoose.models.Seat as mongoose.Model<Seat> || mongoose.model<Seat>('Seat', SeatSchema);

export default SeatModel;
