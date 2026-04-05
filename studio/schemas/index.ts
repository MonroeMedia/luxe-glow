import siteSettings from './siteSettings';
import seo from './seo';
import page from './page';
import service from './service';
import testimonial from './testimonial';

// Page section blocks
import heroBlock from './heroBlock';
import prepBlock from './prepBlock';
import dayOfBlock from './dayOfBlock';
import postTanBlock from './postTanBlock';
import galleryBlock from './galleryBlock';
import whyChooseUsBlock from './whyChooseUsBlock';
import contactBlock from './contactBlock';

export const schemaTypes = [
  // Singletons
  siteSettings,
  // Shared objects
  seo,
  // Documents
  page,
  service,
  testimonial,
  // Section block object types
  heroBlock,
  prepBlock,
  dayOfBlock,
  postTanBlock,
  galleryBlock,
  whyChooseUsBlock,
  contactBlock,
];
