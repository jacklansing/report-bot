import mongoose, { Schema } from 'mongoose';
import { IPlayerDocument } from '../types/player.types';

const reportedBySchema = new Schema(
  {
    id: String,
    username: String,
    avatarURL: String,
    guildName: String,
  },
  { timestamps: true },
);

const playerSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    reports: [
      new Schema(
        {
          targetDescription: { type: String, required: true },
          createdAt: Date,
          reportedBy: reportedBySchema,
        },
        { timestamps: true },
      ),
    ],
    youtubeReports: [
      new Schema(
        {
          youtubeURL: { type: String, required: true },
          reportedBy: reportedBySchema,
        },
        { timestamps: true },
      ),
    ],
  },
  { timestamps: true },
);

export default mongoose.model<IPlayerDocument>('Player', playerSchema);
