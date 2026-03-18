/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_PARI_PROFILE_IMAGE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
