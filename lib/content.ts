import { collection, doc, getDoc, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import { unstable_noStore as noStore } from 'next/cache';
import { getFirebaseServices } from '@/lib/firebase';
import type { MediaAsset, NewsItem, Project, RoadmapMilestone, StudioSettings, StudioUser } from '@/lib/types';

const emptySettings: StudioSettings = {
  studioName: 'NNGTW Studio',
  tagline: 'Imagine • Explore • Evolve',
  email: '',
  linkedIn: '',
  discord: '',
  heroStatement: '',
  investorStatement: ''
};

function withId<T>(id: string, data: Record<string, unknown>): T {
  return { id, ...data } as T;
}

export async function getProjects(options?: { featured?: boolean; limitCount?: number }): Promise<Project[]> {
  noStore();
  const { db } = getFirebaseServices();
  if (!db) return [];

  const clauses = [collection(db, 'projects')];
  const constraints = [];
  if (options?.featured !== undefined) constraints.push(where('featured', '==', options.featured));
  constraints.push(orderBy('progress', 'desc'));
  if (options?.limitCount) constraints.push(limit(options.limitCount));

  const snapshot = await getDocs(query(clauses[0], ...constraints));
  return snapshot.docs.map((item) => withId<Project>(item.id, item.data()));
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  noStore();
  const { db } = getFirebaseServices();
  if (!db) return null;

  const snapshot = await getDocs(query(collection(db, 'projects'), where('slug', '==', slug), limit(1)));
  const project = snapshot.docs[0];
  return project ? withId<Project>(project.id, project.data()) : null;
}

export async function getNews(limitCount = 4): Promise<NewsItem[]> {
  noStore();
  const { db } = getFirebaseServices();
  if (!db) return [];

  const snapshot = await getDocs(
    query(collection(db, 'news'), where('status', '==', 'published'), orderBy('publishedAt', 'desc'), limit(limitCount))
  );
  return snapshot.docs.map((item) => withId<NewsItem>(item.id, item.data()));
}

export async function getMedia(limitCount = 12): Promise<MediaAsset[]> {
  noStore();
  const { db } = getFirebaseServices();
  if (!db) return [];

  const snapshot = await getDocs(query(collection(db, 'media'), orderBy('createdAt', 'desc'), limit(limitCount)));
  return snapshot.docs.map((item) => withId<MediaAsset>(item.id, item.data()));
}

export async function getUsers(): Promise<StudioUser[]> {
  noStore();
  const { db } = getFirebaseServices();
  if (!db) return [];

  const snapshot = await getDocs(collection(db, 'users'));
  return snapshot.docs.map((item) => withId<StudioUser>(item.id, item.data()));
}

export async function getStudioSettings(): Promise<StudioSettings> {
  noStore();
  const { db } = getFirebaseServices();
  if (!db) return emptySettings;

  const snapshot = await getDoc(doc(db, 'settings', 'studio'));
  return snapshot.exists() ? ({ ...emptySettings, ...snapshot.data() } as StudioSettings) : emptySettings;
}

export async function getRoadmap(): Promise<RoadmapMilestone[]> {
  noStore();
  const { db } = getFirebaseServices();
  if (!db) return [];

  const snapshot = await getDoc(doc(db, 'settings', 'roadmap'));
  const milestones = snapshot.exists() ? snapshot.data().milestones : [];
  return Array.isArray(milestones) ? (milestones as RoadmapMilestone[]) : [];
}
