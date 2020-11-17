import { Document } from 'mongoose';

export interface IPlayer {
  username: string;
  reports: IPlayerReport[];
  youtubeReports: IPlayerYoutubeReport[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPlayerDocument extends IPlayer, Document {}

export interface IPlayerReport {
  targetDescription: string;
  reportedBy: IReportedBy;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IPlayerYoutubeReport {
  youtubeURL: string;
  createdAt?: Date;
  updatedAt?: Date;
  reportedBy: IReportedBy;
}

export interface IReportedBy {
  id?: string;
  username: string;
  avatarURL: string | null | undefined;
  guildName: string;
}
