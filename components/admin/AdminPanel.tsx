'use client';

import { useEffect, useMemo, useState, type ComponentType, type ReactNode } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, type User } from 'firebase/auth';
import { addDoc, collection, deleteDoc, doc, getDocs, serverTimestamp, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { BarChart3, FileUp, LayoutDashboard, Newspaper, Settings, Users } from 'lucide-react';
import { getFirebaseServices } from '@/lib/firebase';
import type { MediaAsset, NewsItem, Project, StudioUser } from '@/lib/types';

const tabs = ['Dashboard', 'Projects', 'Media Library', 'News', 'Analytics', 'Users', 'Settings'] as const;
type Tab = (typeof tabs)[number];

const blankProject = {
  title: '',
  slug: '',
  logline: '',
  description: '',
  status: 'concept',
  genre: '',
  platform: '',
  progress: 0,
  coverImage: '',
  worldType: '',
  featured: false
};

export function AdminPanel() {
  const services = useMemo(() => getFirebaseServices(), []);
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tab, setTab] = useState<Tab>('Dashboard');
  const [projects, setProjects] = useState<Project[]>([]);
  const [media, setMedia] = useState<MediaAsset[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [users, setUsers] = useState<StudioUser[]>([]);
  const [projectForm, setProjectForm] = useState(blankProject);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!services.auth) return;
    return onAuthStateChanged(services.auth, setUser);
  }, [services.auth]);

  async function refresh() {
    if (!services.db) return;
    const [projectDocs, mediaDocs, newsDocs, userDocs] = await Promise.all([
      getDocs(collection(services.db, 'projects')),
      getDocs(collection(services.db, 'media')),
      getDocs(collection(services.db, 'news')),
      getDocs(collection(services.db, 'users'))
    ]);
    setProjects(projectDocs.docs.map((item) => ({ id: item.id, ...item.data() }) as Project));
    setMedia(mediaDocs.docs.map((item) => ({ id: item.id, ...item.data() }) as MediaAsset));
    setNews(newsDocs.docs.map((item) => ({ id: item.id, ...item.data() }) as NewsItem));
    setUsers(userDocs.docs.map((item) => ({ id: item.id, ...item.data() }) as StudioUser));
  }

  useEffect(() => {
    if (user) void refresh();
  }, [user]);

  async function login() {
    if (!services.auth) return setMessage('Firebase environment variables are required before admin login.');
    await signInWithEmailAndPassword(services.auth, email, password);
  }

  async function createProject() {
    if (!services.db) return;
    await addDoc(collection(services.db, 'projects'), {
      ...projectForm,
      platform: projectForm.platform.split(',').map((item) => item.trim()).filter(Boolean),
      screenshots: [],
      gallery: [],
      features: [],
      roadmap: [],
      story: projectForm.description,
      progress: Number(projectForm.progress),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    setProjectForm(blankProject);
    setMessage('Project created in Firestore.');
    await refresh();
  }

  async function updateProject(project: Project) {
    if (!services.db) return;
    await updateDoc(doc(services.db, 'projects', project.id), { updatedAt: new Date().toISOString(), progress: Math.min(100, project.progress + 5) });
    setMessage(`${project.title} updated.`);
    await refresh();
  }

  async function deleteProject(project: Project) {
    if (!services.db) return;
    await deleteDoc(doc(services.db, 'projects', project.id));
    setMessage(`${project.title} deleted.`);
    await refresh();
  }

  async function uploadAsset(file: File) {
    if (!services.storage || !services.db) return setMessage('Firebase Storage and Firestore must be configured for uploads.');
    const storageRef = ref(services.storage, `media/${Date.now()}-${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    await addDoc(collection(services.db, 'media'), {
      title: file.name,
      type: file.type.startsWith('video') ? 'video' : file.type === 'application/pdf' ? 'pdf' : file.type.startsWith('image') ? 'image' : 'document',
      url,
      createdAt: serverTimestamp()
    });
    setMessage('Media uploaded to Firebase Storage.');
    await refresh();
  }

  if (!services.app) {
    return <AdminShell><p className="text-brand-white/70">Add Firebase environment variables from `.env.example` to enable the protected Studio OS.</p></AdminShell>;
  }

  if (!user) {
    return (
      <AdminShell>
        <div className="mx-auto max-w-md cinematic-card p-8">
          <p className="eyebrow">Protected Route</p>
          <h1 className="text-4xl font-black uppercase tracking-[-0.06em]">Admin Login</h1>
          <input className="mt-6 w-full rounded-xl border-brand-white/10 bg-black/35" type="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
          <input className="mt-3 w-full rounded-xl border-brand-white/10 bg-black/35" type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
          <button className="orange-button mt-5 w-full" onClick={() => void login()}>Enter Studio OS</button>
          {message && <p className="mt-4 text-sm text-brand-orange">{message}</p>}
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div><p className="eyebrow">Studio OS</p><h1 className="section-title">Admin Dashboard</h1></div>
        <button className="ghost-button" onClick={() => services.auth && void signOut(services.auth)}>Sign out</button>
      </div>
      <div className="grid gap-6 lg:grid-cols-[16rem_1fr]">
        <aside className="panel rounded-[2rem] p-4">
          {tabs.map((item) => <button key={item} onClick={() => setTab(item)} className={`mb-2 w-full rounded-2xl px-4 py-3 text-left text-sm font-black uppercase tracking-[0.12em] ${tab === item ? 'bg-brand-orange text-brand-black' : 'text-brand-white/62 hover:bg-brand-white/10'}`}>{item}</button>)}
        </aside>
        <section className="cinematic-card p-6">
          {message && <p className="mb-5 rounded-xl bg-brand-orange/10 p-3 text-sm text-brand-orange">{message}</p>}
          {tab === 'Dashboard' && <MetricGrid projects={projects.length} media={media.length} news={news.length} users={users.length} />}
          {tab === 'Projects' && <ProjectsAdmin projects={projects} form={projectForm} setForm={setProjectForm} createProject={createProject} updateProject={updateProject} deleteProject={deleteProject} />}
          {tab === 'Media Library' && <MediaAdmin media={media} uploadAsset={uploadAsset} />}
          {tab === 'News' && <List title="News" items={news.map((item) => item.title)} icon={<Newspaper />} />}
          {tab === 'Analytics' && <Analytics projects={projects} />}
          {tab === 'Users' && <List title="Users" items={users.map((item) => `${item.displayName} · ${item.role}`)} icon={<Users />} />}
          {tab === 'Settings' && <List title="Settings" items={['Studio profile', 'Contact channels', 'Roadmap document', 'Investor statement']} icon={<Settings />} />}
        </section>
      </div>
    </AdminShell>
  );
}

function AdminShell({ children }: { children: ReactNode }) {
  return <section className="section-shell min-h-screen pt-36">{children}</section>;
}

function MetricGrid({ projects, media, news, users }: { projects: number; media: number; news: number; users: number }) {
  const metrics: Array<{ label: string; value: number; Icon: ComponentType<{ className?: string }> }> = [
    { label: 'Projects', value: projects, Icon: LayoutDashboard },
    { label: 'Media', value: media, Icon: FileUp },
    { label: 'News', value: news, Icon: Newspaper },
    { label: 'Users', value: users, Icon: Users }
  ];

  return <div className="grid gap-4 md:grid-cols-4">{metrics.map(({ label, value, Icon }) => <div key={label} className="panel rounded-2xl p-5"><Icon className="size-6 text-brand-orange" /><p className="mt-5 text-4xl font-black">{value}</p><p className="text-xs uppercase tracking-[0.18em] text-brand-white/45">{label}</p></div>)}</div>;
}

function ProjectsAdmin({ projects, form, setForm, createProject, updateProject, deleteProject }: { projects: Project[]; form: typeof blankProject; setForm: (value: typeof blankProject) => void; createProject: () => Promise<void>; updateProject: (project: Project) => Promise<void>; deleteProject: (project: Project) => Promise<void>; }) {
  return <div className="grid gap-8"><div className="grid gap-3 md:grid-cols-2">{Object.keys(form).filter((key) => key !== 'featured').map((key) => <input key={key} className="rounded-xl border-brand-white/10 bg-black/35" placeholder={key} value={String(form[key as keyof typeof form])} onChange={(event) => setForm({ ...form, [key]: key === 'progress' ? Number(event.target.value) : event.target.value })} />)}<label className="flex items-center gap-3 text-sm"><input type="checkbox" checked={form.featured} onChange={(event) => setForm({ ...form, featured: event.target.checked })} /> Featured</label><button className="orange-button" onClick={() => void createProject()}>Create Project</button></div><div className="grid gap-3">{projects.map((project) => <div key={project.id} className="panel flex flex-col gap-4 rounded-2xl p-4 md:flex-row md:items-center md:justify-between"><div><p className="font-black uppercase">{project.title}</p><p className="text-sm text-brand-white/50">{project.status} · {project.progress}%</p></div><div className="flex gap-2"><button className="ghost-button px-4 py-2" onClick={() => void updateProject(project)}>Edit +5%</button><button className="ghost-button px-4 py-2" onClick={() => void deleteProject(project)}>Delete</button></div></div>)}</div></div>;
}

function MediaAdmin({ media, uploadAsset }: { media: MediaAsset[]; uploadAsset: (file: File) => Promise<void> }) {
  return <div><label className="cinematic-card block cursor-pointer p-8 text-center"><FileUp className="mx-auto size-8 text-brand-orange" /><p className="mt-3 font-black uppercase">Upload images, videos, PDFs, or documents</p><input type="file" className="hidden" accept="image/*,video/*,.pdf,.doc,.docx" onChange={(event) => event.target.files?.[0] && void uploadAsset(event.target.files[0])} /></label><div className="mt-6 grid gap-3 md:grid-cols-3">{media.map((item) => <a key={item.id} href={item.url} className="panel rounded-2xl p-4"><p className="font-bold">{item.title}</p><p className="text-xs uppercase tracking-[0.18em] text-brand-white/42">{item.type}</p></a>)}</div></div>;
}

function Analytics({ projects }: { projects: Project[] }) {
  const popular = [...projects].sort((a, b) => b.progress - a.progress).slice(0, 3);
  return <div><BarChart3 className="size-8 text-brand-orange" /><h2 className="mt-4 text-3xl font-black uppercase">Traffic overview</h2><p className="mt-2 text-brand-white/58">Connect Vercel Analytics or Firebase Analytics to populate visitor trends. Popular projects are currently inferred from progress signals.</p><div className="mt-6 grid gap-3">{popular.map((project) => <div key={project.id} className="panel rounded-2xl p-4">{project.title}</div>)}</div></div>;
}

function List({ title, items, icon }: { title: string; items: string[]; icon: ReactNode }) {
  return <div>{icon}<h2 className="mt-4 text-3xl font-black uppercase">{title}</h2><div className="mt-6 grid gap-3">{items.length ? items.map((item) => <div key={item} className="panel rounded-2xl p-4">{item}</div>) : <p className="text-brand-white/55">No Firestore records yet.</p>}</div></div>;
}
