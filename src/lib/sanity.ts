import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Support both PUBLIC_ prefixed (Astro convention) and unprefixed (Vercel convention)
const projectId =
  import.meta.env.PUBLIC_SANITY_PROJECT_ID ??
  import.meta.env.SANITY_PROJECT_ID;

const dataset =
  import.meta.env.PUBLIC_SANITY_DATASET ??
  import.meta.env.SANITY_DATASET ??
  'production';

if (!projectId) {
  throw new Error(
    'Sanity projectId is not set. Add PUBLIC_SANITY_PROJECT_ID (or SANITY_PROJECT_ID) to your environment variables.'
  );
}

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: true,
  token: import.meta.env.SANITY_API_TOKEN,
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
