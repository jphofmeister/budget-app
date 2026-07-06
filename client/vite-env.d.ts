/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ALLOW_DEVELOPMENT_COMPUTERLOG: string;
  readonly VITE_AUTHORITY: string;
  readonly VITE_CLIENT_ID: string;
  readonly VITE_FORCE_DEMONSTRATION_MODE: string;
  readonly VITE_FORCE_DEVELOPMENT_API: string;
  readonly VITE_FORCE_DEVELOPMENT_MODE: string;
  readonly VITE_FORCE_LOCAL_API: string;
  readonly VITE_FORCE_PRODUCTION_API: string;
  readonly VITE_FORCE_STAGING_API: string;
  readonly VITE_FORCE_STAGING_MODE: string;
  readonly VITE_PLAYGROUND_POPUP_REDIRECT_URI: string;
  readonly VITE_POPUP_REDIRECT_URI: string;
  readonly VITE_SERVER_PORT: number;
  readonly PORT: number;
}

// * Declarations for globals defined in vite config using the "define" option -- 04/1/2026 JW
declare const __APP_VERSION__: string;
declare const __COPYRIGHT_YEAR__: string;
