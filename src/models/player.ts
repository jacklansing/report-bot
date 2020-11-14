import mongoose, { Schema } from 'mongoose';
import { IPlayerDocument } from '../types/player.types';

const playerSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    reports: [
      new Schema(
        {
          targetDescription: { type: String, required: true },
          createdAt: Date,
          reportedBy: {
            id: String,
            username: String,
            avatarURL: String,
          },
        },
        { timestamps: true },
      ),
    ],
  },
  { timestamps: true },
);

export default mongoose.model<IPlayerDocument>('Player', playerSchema);
