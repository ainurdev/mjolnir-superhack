import type { Station } from '@/types';

export const BASE_URL = 'https://gettv-srs.testing.gettv.ainur.dev';

export const DEFAULT_STATION: Station = {
  uid: 'mjolnir420',
  name: 'Mjolnir Station',
  description:
    'Etiam ultricies augue vitae nibh laoreet dictum sed vel felis. Mauris vitae ipsum ut augue bibendum viverra ac porta tellus. Nam lorem nibh, gravida sed tristique ac, fermentum non lacus. Fusce vehicula ipsum a bibendum iaculis. Fusce lacinia dignissim nisi, nec fringilla ante accumsan pellentesque.',
  avatar: 'https://picsum.photos/500',
  cover: 'https://picsum.photos/1440/900',
  monthly_fee: 420,
  subscribers: 69,
  last_stream: '2 hours ago',
};

export const KEY = 'mjolnirtv';
