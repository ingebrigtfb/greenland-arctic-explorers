import { Timestamp } from "firebase/firestore";

export interface ContentImage {
  url: string;
  storagePath: string;
  alt?: string;
}

export interface CollectionItem {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  longDescription: string;
  featuredImage?: ContentImage;
  gallery?: ContentImage[];
  price?: string;
  duration?: string;
  location?: string;
  tags?: string[];
  published: boolean;
  sortOrder: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export type Tour = CollectionItem;
export type Race = CollectionItem;
export type Lodge = CollectionItem;
export type Activity = CollectionItem;

export interface HeroContent {
  title: string;
  subtitle: string;
  tagline: string;
  heroImage?: ContentImage;
  ctaPrimaryText?: string;
  ctaPrimaryHref?: string;
  ctaSecondaryText?: string;
  ctaSecondaryHref?: string;
  updatedAt: Timestamp;
}

export interface ContentBlock {
  headline: string;
  body: string;
  image?: ContentImage;
}

export interface AboutContent {
  overline: string;
  title: string;
  blocks: ContentBlock[];
  updatedAt: Timestamp;
}

export interface ContactContent {
  overline: string;
  title: string;
  introText: string;
  address: string;
  phone: string;
  email: string;
  mapLink?: string;
  contactFormEmail?: string;
  socialLinks?: { platform: string; url: string }[];
  updatedAt: Timestamp;
}
