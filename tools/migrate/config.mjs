export const ORIGIN = 'https://www.openapis.org';

export const SITEMAPS = {
  post: `${ORIGIN}/wp-sitemap-posts-post-1.xml`,
  page: `${ORIGIN}/wp-sitemap-posts-page-1.xml`,
};

export const USER_AGENT =
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36';

export const CACHE_DIR = '.cache';
export const HTML_DIR = `${CACHE_DIR}/html`;
export const URLS_FILE = 'data/source-urls.json';
export const MANIFEST_FILE = `${CACHE_DIR}/manifest.json`;

export const CONCURRENCY = 5;
export const DELAY_MS = 250;

export const DROPPED = {
  login: 'WordPress auth stub',
  logout: 'WordPress auth stub',
  register: 'WordPress auth stub',
  user: 'WordPress auth stub',
  account: 'WordPress auth stub',
  members: 'WordPress auth stub',
  'password-reset': 'WordPress auth stub',
  'under-construction': 'placeholder page',
  'home-2': 'duplicate homepage draft',
  'home-2-2': 'duplicate homepage draft',
  'get-involved/mailing-lists-2': 'duplicate of get-involved/mailing-lists',
  'membershipjoin-2': 'duplicate of membershipjoin',
};

export const GENERATED = new Set(['blog']);

export const MOVED = {
  eventscalendar: 'https://events.openapis.org',
  events: 'https://events.openapis.org',
  'get-involved/about': 'https://events.openapis.org',
};

export const LEGACY = {
  '/membership/join': '/membershipjoin',
  '/join': '/membershipjoin',
  '/participate/how-to-contribute': '/participatehow-to-contribute',
  '/participate/how-to-contribute/governance': '/participatehow-to-contribute/governance',
  '/governance': '/participatehow-to-contribute/governance',
  '/specification/v3implementations-form': '/specificationrepo/share-your-oas-implementations',
  '/calendar': 'https://events.openapis.org',
  '/contact': '/',
  '/membership/members': '/membershipmembers',
  '/specification/v3insights': '/specificationrepo',
  '/about/technical-steering-committee': '/about/technical-developer-community',
  '/news/blogs/2016/01/next-steps-oai-exciting-2016-looms-ahead':
    '/blog/2016/01/09/next-steps-for-the-oai-an-exciting-2016-looms-ahead',
  '/news/blogs/2016/07/you-can-get-involved-creating-openapi-specification-and-heres-how':
    '/blog/2016/07/11/you-can-get-involved-in-creating-the-openapi-specification-and-heres-how',
  '/news/blogs/2016/10/tdc-request-parameters-explaining-30-spec-part-3':
    '/blog/2016/10/14/request-parameters-explaining-the-3-0-spec-part-3',
  '/news/blogs/2016/10/tdc-structural-improvements-explaining-30-spec-part-2':
    '/blog/2016/10/03/tdc-structural-improvements-explaining-the-3-0-spec-part-2',
  '/blog/2023/12/06/openapi-moonwalk-2024': '/blog/2023/12/04/openapi-moonwalk-2024',
  '/blog/2017/03/01/openapi-spec-3-implementers-draft-released':
    '/blog/2017/03/01/open-api-initiative-announces-the-release-of-the-openapi-spec-3-implementers-draft',
  '/announcement/2024/05/29/a-new-specification-from-openapi-arazzo':
    '/blog/2024/05/29/a-new-specification-from-openapi-arazzo',
};

export const APP_ROUTE_PREFIXES = ['/category/', '/tag/', '/author/'];

export const LEGACY_PREFIXES = {
  '/events/': 'https://events.openapis.org',
};

export const COMPOSED = new Set([
  '',
  'membership-benefits',
  'testimonials',
  'about/technical-developer-community',
  'membershipjoin',
]);

export const CFP = {
  'oai-at-apidays': 'apidays-events-2023',
  'oai-at-apidays-3': 'apidays-paris-2024',
  'oai-at-apidays-4': 'apidays-london-2023',
  'oai-at-apidays-4-2': 'apidays-australia-2023',
  'oai-at-apidays-4-2-2': 'apidays-australia-2024',
  'oai-at-apidays-4-3': 'apidays-paris-2023',
  'oai-at-apidays-4-3-2-2': 'apidays-helsinki-2024',
  'oai-at-apidays-4-3-2-2-2': 'apidays-new-york-2024',
  'oai-at-apidays-4-3-2-3': 'apidays-singapore-2024',
  'oai-at-apidays-4-4': 'apidays-london-2024',
};

export function classifyPage(slug) {
  if (slug in DROPPED) return 'dropped';
  if (GENERATED.has(slug)) return 'generated';
  if (slug in MOVED) return 'moved';
  if (slug in CFP) return 'cfp';
  if (COMPOSED.has(slug)) return 'composed';
  return 'prose';
}
