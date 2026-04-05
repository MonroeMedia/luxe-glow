import { sanityClient } from './sanity';

// ─── Shared ───────────────────────────────────────────────────

export interface SEOFields {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: {
    asset: { url: string };
    alt?: string;
  };
  noIndex?: boolean;
  schemaMarkup?: string;
}

// ─── Site Settings ────────────────────────────────────────────

export interface SiteSettings {
  businessName: string;
  logoText?: string;
  logoImage?: { asset: { url: string }; alt?: string };
  tagline?: string;
  phone?: string;
  email?: string;
  streetAddress?: string;
  city?: string;
  state?: string;
  address?: string; // legacy combined field
  serviceAreas?: string[];
  ctaLabel?: string;
  ctaDestination?: string;
  copyrightText?: string;
  social?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    youtube?: string;
  };
}

// ─── Section Block Types ──────────────────────────────────────

export interface HeroBlock {
  _type: 'heroBlock';
  _key: string;
  eyebrow?: string;
  h1?: string;
  h1Italic?: string;
  subtext?: string;
  primaryCtaLabel?: string;
  primaryCtaDestination?: string;
  secondaryCtaLabel?: string;
  secondaryCtaDestination?: string;
}

export interface PrepCard {
  _key: string;
  num?: string;
  title?: string;
  body?: string;
}

export interface PrepBlock {
  _type: 'prepBlock';
  _key: string;
  eyebrow?: string;
  heading?: string;
  subtext?: string;
  cards?: PrepCard[];
  calloutLabel?: string;
  calloutText?: string;
}

export interface StepItem {
  _key: string;
  num?: string;
  title?: string;
  body?: string;
}

export interface DayOfBlock {
  _type: 'dayOfBlock';
  _key: string;
  eyebrow?: string;
  heading?: string;
  subtext?: string;
  steps?: StepItem[];
  image?: { asset: { url: string }; alt?: string };
  ctaLabel?: string;
  ctaDestination?: string;
}

export interface PostTanBlock {
  _type: 'postTanBlock';
  _key: string;
  eyebrow?: string;
  heading?: string;
  subtext?: string;
  steps?: StepItem[];
  image?: { asset: { url: string }; alt?: string };
  calloutLabel?: string;
  calloutText?: string;
}

export interface GalleryImage {
  _key: string;
  image?: { asset: { url: string } };
  altText?: string;
}

export interface GalleryBlock {
  _type: 'galleryBlock';
  _key: string;
  eyebrow?: string;
  heading?: string;
  subtext?: string;
  images?: GalleryImage[];
  ctaLabel?: string;
  ctaDestination?: string;
}

export interface WhyCard {
  _key: string;
  title?: string;
  body?: string;
}

export interface WhyChooseUsBlock {
  _type: 'whyChooseUsBlock';
  _key: string;
  eyebrow?: string;
  heading?: string;
  subtext?: string;
  cards?: WhyCard[];
  calloutBadge?: string;
  calloutHeading?: string;
  calloutBody?: string;
}

export interface ContactBlock {
  _type: 'contactBlock';
  _key: string;
  eyebrow?: string;
  heading?: string;
  subtext?: string;
  formHeading?: string;
  formSubtext?: string;
  submitLabel?: string;
}

export type SectionBlock =
  | HeroBlock
  | PrepBlock
  | DayOfBlock
  | PostTanBlock
  | GalleryBlock
  | WhyChooseUsBlock
  | ContactBlock;

// ─── Page ─────────────────────────────────────────────────────

export interface Page {
  _id: string;
  title: string;
  slug: { current: string };
  seo?: SEOFields;
  sections: SectionBlock[];
}

// ─── Service / Testimonial ────────────────────────────────────

export interface Service {
  _id: string;
  name: string;
  description: string;
  icon?: string;
  price?: string;
  displayOrder?: number;
}

export interface Testimonial {
  _id: string;
  name: string;
  location?: string;
  stars: 1 | 2 | 3 | 4 | 5;
  body: string;
  displayOrder?: number;
}

// ─── Section field fragment helpers ──────────────────────────

const STEP_FIELDS = `_key, num, title, body`;

const CARD_FIELDS = `_key, num, title, body`;

const IMAGE_FIELDS = `asset->{ url }, alt`;

// ─── Queries ──────────────────────────────────────────────────

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return sanityClient.fetch(
    `*[_type == "siteSettings"][0]{
      businessName,
      logoText,
      logoImage{ ${IMAGE_FIELDS} },
      tagline,
      phone,
      email,
      streetAddress,
      city,
      state,
      address,
      serviceAreas,
      ctaLabel,
      ctaDestination,
      copyrightText,
      social
    }`
  );
}

export async function getAllPages(): Promise<Pick<Page, '_id' | 'slug'>[]> {
  return sanityClient.fetch(
    `*[_type == "page" && defined(slug.current)]{ _id, slug }`
  );
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  return sanityClient.fetch(
    `*[_type == "page" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      seo{
        metaTitle,
        metaDescription,
        ogImage{ asset->{ url }, alt },
        noIndex,
        schemaMarkup
      },
      sections[]{
        _type,
        _key,
        // heroBlock
        eyebrow,
        h1,
        h1Italic,
        subtext,
        primaryCtaLabel,
        primaryCtaDestination,
        secondaryCtaLabel,
        secondaryCtaDestination,
        // prepBlock / whyChooseUsBlock
        heading,
        cards[]{ ${CARD_FIELDS} },
        calloutLabel,
        calloutText,
        calloutBadge,
        calloutHeading,
        calloutBody,
        // dayOfBlock / postTanBlock
        steps[]{ ${STEP_FIELDS} },
        image{ ${IMAGE_FIELDS} },
        ctaLabel,
        ctaDestination,
        // galleryBlock
        images[]{ _key, image{ asset->{ url } }, altText },
        // contactBlock
        formHeading,
        formSubtext,
        submitLabel
      }
    }`,
    { slug }
  );
}

export async function getAllServices(): Promise<Service[]> {
  return sanityClient.fetch(
    `*[_type == "service"] | order(displayOrder asc, _createdAt asc){
      _id, name, description, icon, price, displayOrder
    }`
  );
}

export async function getAllTestimonials(): Promise<Testimonial[]> {
  return sanityClient.fetch(
    `*[_type == "testimonial"] | order(displayOrder asc, _createdAt asc){
      _id, name, location, stars, body, displayOrder
    }`
  );
}
