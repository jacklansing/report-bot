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
    heroReports: {
      type: Map,
      default: {},
      of: {
        reports: [
          {
            heroDescription: { type: String, required: true },
            reportedBy: reportedBySchema,
          },
        ],
      },
    },
  },
  { timestamps: true },
);

playerSchema.pre('save', function (next) {
  const player = this;
  // @ts-ignore
  player.username = player.username.toLowerCase();
  next();
});

playerSchema.pre('find', function (next) {
  // @ts-ignore
  const conditions = this._conditions;
  conditions.username = conditions.username.toLowerCase();
  next();
});

playerSchema.pre('findOne', function (next) {
  // @ts-ignore
  const conditions = this._conditions;
  conditions.username = conditions.username.toLowerCase();
  next();
});

export default mongoose.model<IPlayerDocument>('Player', playerSchema);
