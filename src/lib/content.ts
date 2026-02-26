import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { getDbInstance } from "./firebase";
import type {
  CollectionItem,
  HeroContent,
  AboutContent,
  ContactContent,
} from "./types";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

// ── Single documents ──

export async function getHero(): Promise<HeroContent | null> {
  const snap = await getDoc(doc(getDbInstance(), "content", "hero"));
  return snap.exists() ? (snap.data() as HeroContent) : null;
}

export async function saveHero(data: Partial<HeroContent>) {
  await setDoc(doc(getDbInstance(), "content", "hero"), { ...data, updatedAt: serverTimestamp() }, { merge: true });
}

export async function getAbout(): Promise<AboutContent | null> {
  const snap = await getDoc(doc(getDbInstance(), "content", "about"));
  return snap.exists() ? (snap.data() as AboutContent) : null;
}

export async function saveAbout(data: Partial<AboutContent>) {
  await setDoc(doc(getDbInstance(), "content", "about"), { ...data, updatedAt: serverTimestamp() }, { merge: true });
}

export async function getContact(): Promise<ContactContent | null> {
  const snap = await getDoc(doc(getDbInstance(), "content", "contact"));
  return snap.exists() ? (snap.data() as ContactContent) : null;
}

export async function saveContact(data: Partial<ContactContent>) {
  await setDoc(doc(getDbInstance(), "content", "contact"), { ...data, updatedAt: serverTimestamp() }, { merge: true });
}

// ── Collection helpers ──

type CollectionName = "tours" | "races" | "lodges" | "activities";

export async function getPublishedItems(col: CollectionName): Promise<CollectionItem[]> {
  const db = getDbInstance();
  const q = query(
    collection(db, col),
    where("published", "==", true),
    orderBy("sortOrder", "asc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as CollectionItem));
}

export async function getAllItems(col: CollectionName): Promise<CollectionItem[]> {
  const db = getDbInstance();
  const q = query(collection(db, col), orderBy("sortOrder", "asc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as CollectionItem));
}

export async function getItemById(col: CollectionName, id: string): Promise<CollectionItem | null> {
  const db = getDbInstance();
  const snap = await getDoc(doc(db, col, id));
  return snap.exists() ? ({ id: snap.id, ...snap.data() } as CollectionItem) : null;
}

export async function getItemBySlug(col: CollectionName, slug: string): Promise<CollectionItem | null> {
  const db = getDbInstance();
  const q = query(collection(db, col), where("slug", "==", slug));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, ...d.data() } as CollectionItem;
}

export async function saveItem(col: CollectionName, id: string | null, data: Partial<CollectionItem>): Promise<string> {
  const db = getDbInstance();
  const ref = id ? doc(db, col, id) : doc(collection(db, col));
  const slug = data.title ? slugify(data.title) : data.slug;
  await setDoc(
    ref,
    {
      ...data,
      slug,
      updatedAt: serverTimestamp(),
      ...(!id ? { createdAt: serverTimestamp(), sortOrder: data.sortOrder ?? 0, published: data.published ?? false } : {}),
    },
    { merge: true }
  );
  return ref.id;
}

export async function deleteItem(col: CollectionName, id: string) {
  const db = getDbInstance();
  await deleteDoc(doc(db, col, id));
}

export async function checkAdminRole(uid: string): Promise<boolean> {
  // All authenticated users have admin access
  return !!uid;
}
