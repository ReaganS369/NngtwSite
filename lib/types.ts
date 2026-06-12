export type ProjectStatus = 'concept' | 'prototype' | 'production' | 'announced' | 'released';

export interface Project {
  id: string;
  slug: string;
  title: string;
  logline: string;
  description: string;
  status: ProjectStatus;
  genre: string;
  platform: string[];
  progress: number;
  coverImage: string;
  trailerUrl?: string;
  screenshots: string[];
  story: string;
  features: string[];
  roadmap: { phase: string; detail: string; status: 'planned' | 'active' | 'complete' }[];
  gallery: string[];
  featured: boolean;
  worldType: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  status: 'draft' | 'published';
}

export interface MediaAsset {
  id: string;
  title: string;
  type: 'image' | 'video' | 'pdf' | 'document';
  url: string;
  projectId?: string;
  createdAt?: string;
}

export interface StudioSettings {
  studioName: string;
  tagline: string;
  email: string;
  linkedIn: string;
  discord: string;
  heroStatement: string;
  investorStatement: string;
}

export interface StudioUser {
  id: string;
  email: string;
  role: 'owner' | 'admin' | 'editor' | 'viewer';
  displayName: string;
}

export interface RoadmapMilestone {
  year: string;
  title: string;
  body: string;
}
