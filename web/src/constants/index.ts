import type { Station } from '@/types';

export const BASE_URL = 'https://gettv-srs.testing.gettv.ainur.dev';

export const DEFAULT_STATION: Station = {
  id: 'mjolnir420',
  name: 'Mjolnir Station',
  description:
    'Etiam ultricies augue vitae nibh laoreet dictum sed vel felis. Mauris vitae ipsum ut augue bibendum viverra ac porta tellus. Nam lorem nibh, gravida sed tristique ac, fermentum non lacus. Fusce vehicula ipsum a bibendum iaculis. Fusce lacinia dignissim nisi, nec fringilla ante accumsan pellentesque.',
  image: 'https://picsum.photos/500',
  cover: 'https://picsum.photos/1440/900',
  monthlyFee: 420,
};

export const LOCALSTORAGE_KEY = "mjolnir-superhack-";

export const registry = {
  goerli: {
    stations: '0xCdad2aEBeC7CED98781aCB8Bf787E182D1C6ad0d',
    subscriptions: '0xdAe58536c54964F29300DE6C7F573D500a28AF94',
    url: '',
  },
};
