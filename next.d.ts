declare module 'next' {
  export interface Metadata {
    title?: string;
    description?: string;
  }
}

declare module 'next/font/google' {
  export function Geist(config: any): any;
  export function Geist_Mono(config: any): any;
}
