# NNGTW Studio Firestore Schema

All public website content is read from Firestore. The UI does not keep the project slate in page components.

## `projects/{projectId}`
- `slug: string`
- `title: string`
- `logline: string`
- `description: string`
- `status: concept | prototype | production | announced | released`
- `genre: string`
- `platform: string[]`
- `progress: number`
- `coverImage: string`
- `trailerUrl?: string`
- `screenshots: string[]`
- `story: string`
- `features: string[]`
- `roadmap: { phase: string; detail: string; status: planned | active | complete }[]`
- `gallery: string[]`
- `featured: boolean`
- `worldType: string`
- `createdAt: string`
- `updatedAt: string`

## `news/{newsId}`
- `title: string`
- `slug: string`
- `excerpt: string`
- `publishedAt: string`
- `status: draft | published`

## `users/{userId}`
- `email: string`
- `role: owner | admin | editor | viewer`
- `displayName: string`

## `media/{mediaId}`
- `title: string`
- `type: image | video | pdf | document`
- `url: string`
- `projectId?: string`
- `createdAt: timestamp | string`

## `settings/studio`
- `studioName: string`
- `tagline: string`
- `email: string`
- `linkedIn: string`
- `discord: string`
- `heroStatement: string`
- `investorStatement: string`

## `settings/roadmap`
- `milestones: { year: string; title: string; body: string }[]`
