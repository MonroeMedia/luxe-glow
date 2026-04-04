import siteSettings from './siteSettings';
import seo from './seo';
import page from './page';
import service from './service';
import testimonial from './testimonial';

export const schemaTypes = [
  // Singletons
  siteSettings,
  // Shared objects
  seo,
  // Documents
  page,
  service,
  testimonial,
];
