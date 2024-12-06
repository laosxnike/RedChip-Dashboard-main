import { google } from 'googleapis';
import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');
const TOKEN_PATH = path.join(process.cwd(), 'youtube_token.json');

export interface YouTubeAnalyticsData {
  date: string;
  views: number;
  estimatedMinutesWatched: number;
  averageViewDuration: number;
  subscribersGained: number;
  subscribersLost: number;
  likes: number;
  comments: number;
  videosAddedToPlaylists: number;
  shares: number;
  annotationClickThroughRate: number;
  annotationCloseRate: number;
  annotationImpressions: number;
  annotationClickableImpressions: number;
  cardClickRate: number;
  cardTeaserClickRate: number;
  cardImpressions: number;
  cardTeaserImpressions: number;
  cardClicks: number;
  cardTeaserClicks: number;
}

export class YouTubeAnalyticsService {
  private auth: any;

  private async authorize() {
    const content = fs.readFileSync(CREDENTIALS_PATH, 'utf-8');
    const credentials = JSON.parse(content);
    
    const oauth2Client = new google.auth.OAuth2(
      credentials.web.client_id,
      credentials.web.client_secret,
      'http://localhost'
    );

    // Check if we have previously stored a token.
    try {
      if (fs.existsSync(TOKEN_PATH)) {
        const token = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf-8'));
        oauth2Client.setCredentials(token);
        return oauth2Client;
      }
    } catch (err) {
      throw new Error('Token not found or invalid. Please run the test script first to authenticate.');
    }

    throw new Error('Token not found. Please run the test script first to authenticate.');
  }

  async initialize() {
    this.auth = await this.authorize();
  }

  async getChannelStats() {
    if (!this.auth) {
      await this.initialize();
    }

    const youtube = google.youtube({
      version: 'v3',
      auth: this.auth,
    });

    const response = await youtube.channels.list({
      part: ['snippet,contentDetails,statistics'],
      mine: true
    });

    const channel = response.data.items?.[0];
    if (!channel) {
      throw new Error('Channel not found');
    }

    return {
      title: channel.snippet?.title,
      description: channel.snippet?.description,
      subscriberCount: parseInt(channel.statistics?.subscriberCount || '0'),
      viewCount: parseInt(channel.statistics?.viewCount || '0'),
      videoCount: parseInt(channel.statistics?.videoCount || '0')
    };
  }

  async getAnalytics(startDate: string, endDate: string): Promise<YouTubeAnalyticsData[]> {
    if (!this.auth) {
      await this.initialize();
    }

    const youtubeAnalytics = google.youtubeAnalytics({
      version: 'v2',
      auth: this.auth,
    });

    const response = await youtubeAnalytics.reports.query({
      ids: 'channel==MINE',
      startDate,
      endDate,
      metrics: [
        'views',
        'estimatedMinutesWatched',
        'averageViewDuration',
        'subscribersGained',
        'subscribersLost',
        'likes',
        'comments',
        'videosAddedToPlaylists',
        'shares',
        'annotationClickThroughRate',
        'annotationCloseRate',
        'annotationImpressions',
        'annotationClickableImpressions',
        'cardClickRate',
        'cardTeaserClickRate',
        'cardImpressions',
        'cardTeaserImpressions',
        'cardClicks',
        'cardTeaserClicks'
      ].join(','),
      dimensions: 'day',
      sort: '-day'
    });

    if (!response.data.rows) {
      return [];
    }

    return response.data.rows.map(row => ({
      date: row[0] as string,
      views: row[1] as number,
      estimatedMinutesWatched: row[2] as number,
      averageViewDuration: row[3] as number,
      subscribersGained: row[4] as number,
      subscribersLost: row[5] as number,
      likes: row[6] as number,
      comments: row[7] as number,
      videosAddedToPlaylists: row[8] as number,
      shares: row[9] as number,
      annotationClickThroughRate: row[10] as number,
      annotationCloseRate: row[11] as number,
      annotationImpressions: row[12] as number,
      annotationClickableImpressions: row[13] as number,
      cardClickRate: row[14] as number,
      cardTeaserClickRate: row[15] as number,
      cardImpressions: row[16] as number,
      cardTeaserImpressions: row[17] as number,
      cardClicks: row[18] as number,
      cardTeaserClicks: row[19] as number
    }));
  }

  async getLastWeekAnalytics(): Promise<YouTubeAnalyticsData[]> {
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    return this.getAnalytics(startDate, endDate);
  }

  async getLastMonthAnalytics(): Promise<YouTubeAnalyticsData[]> {
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    return this.getAnalytics(startDate, endDate);
  }
}