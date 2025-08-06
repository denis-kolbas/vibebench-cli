// VibeBench CLI Types
// Synced with website API types

export type VoteType = 'fire' | 'mid' | 'cursed';

export interface VoteRequest {
  modelSlug: string;
  voteType: VoteType;
  comment?: string;
}

export interface VoteResponse {
  success: boolean;
  message: string;
  model?: ModelData;
  remaining?: number;
  resetTime?: number;
}

export interface ModelVotes {
  fire: number;
  mid: number;
  cursed: number;
  total: number;
}

export interface ModelData {
  slug: string;
  name: string;
  category: string;
  vibeScore: number;
  votes: ModelVotes;
  rank?: number;
}

export interface LeaderboardEntry extends ModelData {
  rank: number;
}

export interface RateLimitStatus {
  remaining: number;
  resetTime: number;
  maxVotes: number;
}

export interface APIError {
  error: string;
  message?: string;
  details?: string;
}