import { Document } from 'mongoose';

export interface IPlayer {
  user: string;
  reports: IPlayerReport[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IPlayerDocument extends IPlayer, Document {}

export interface IPlayerReport {
  targetDescription: string;
  createdAt: Date;
  reportedBy: {
    id: string | number;
    username: string;
    avatarURL: string | null | undefined;
  };
}
