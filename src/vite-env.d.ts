/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Public origin of the SketchFlow-AI showcase. Required for the Work iframe. */
  readonly VITE_SKETCHFLOW_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
