import { Document } from 'mongoose';

export interface IPlayer {
  username: string;
  reports: IPlayerReport[];
  youtubeReports: IPlayerYoutubeReport[];
  heroReports: Map<string, { reports: IPlayerHeroReport[] }>;
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

export interface IPlayerHeroReport {
  heroDescription: string;
  reportedBy: IReportedBy;
}

export interface IReportedBy {
  discord_id?: string;
  username: string;
  avatarURL: string | null | undefined;
  guildName: string;
}
