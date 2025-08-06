import fetch from 'node-fetch';
import { VoteRequest, VoteResponse, LeaderboardEntry, RateLimitStatus, APIError } from './types.js';

const API_BASE_URL = 'https://vibebench.com';

export class VibeBenchAPI {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async vote(request: VoteRequest): Promise<VoteResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const error = await response.json() as APIError;
        throw new Error(error.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json() as VoteResponse;
    } catch (error) {
      throw new Error(`Failed to submit vote: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async getLeaderboard(): Promise<LeaderboardEntry[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/leaderboard`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json() as { models: LeaderboardEntry[] };
      return data.models;
    } catch (error) {
      throw new Error(`Failed to fetch leaderboard: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async getModelStats(modelSlug: string): Promise<LeaderboardEntry> {
    const leaderboard = await this.getLeaderboard();
    const model = leaderboard.find(m => m.slug === modelSlug);
    
    if (!model) {
      throw new Error(`Model not found: ${modelSlug}`);
    }
    
    return model;
  }

  async getRateLimitStatus(): Promise<RateLimitStatus> {
    try {
      const response = await fetch(`${this.baseUrl}/api/rate-limit-status`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json() as RateLimitStatus;
    } catch (error) {
      throw new Error(`Failed to fetch rate limit status: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}