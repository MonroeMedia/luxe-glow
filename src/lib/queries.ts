import { sanityClient } from './sanity';

// ─── Types ────────────────────────────────────────────────────

export interface SiteSettings {
  businessName: string;
  phone: string;
  email: string;
  address: string;
  serviceAreas: string[];
  social: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    youtube?: string;
  };
}

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

export interface Page {
  _id: string;
  title: string;
  slug: { current: string };
  seo?: SEOFields;
  sections: Section[];
}

export interface Section {
  _type: string;
  _key: string;
  [key: string]: unknown;
}

export interface Service {
  _id: string;
  name: string;
  description: string;
  icon?: string;
  price?: string;
}

export interface Testimonial {
  _id: string;
  name: string;
  location?: string;
  stars: 1 | 2 | 3 | 4 | 5;
  body: string;
}

// ─── Queries ──────────────────────────────────────────────────

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return sanityClient.fetch(
    `*[_type == "siteSettings"][0]{
      businessName,
      phone,
      email,
      address,
      serviceAreas,
      social
    }`
  );
}

export async function getAllPages(): Promise<Pick<Page, '_id' | 'slug'>[]> {
  return sanityClient.fetch(
    `*[_type == "page" && defined(slug.current)]{
      _id,
      slug
    }`
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
      sections[]{ ... }
    }`,
    { slug }
  );
}

export async function getAllServices(): Promise<Service[]> {
  return sanityClient.fetch(
    `*[_type == "service"] | order(_createdAt asc){
      _id,
      name,
      description,
      icon,
      price
    }`
  );
}

export async function getAllTestimonials(): Promise<Testimonial[]> {
  return sanityClient.fetch(
    `*[_type == "testimonial"] | order(_createdAt asc){
      _id,
      name,
      location,
      stars,
      body
    }`
  );
}
