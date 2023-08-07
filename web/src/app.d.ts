import type { Buffer } from 'buffer';
import 'vite/client';

declare global {
  interface Window {
    ethereum: any;
    global: any;
    Buffer: typeof Buffer;
  }
}
