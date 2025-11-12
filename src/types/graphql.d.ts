declare module "*.graphql" {
  import { DocumentNode } from "graphql";

  const value: DocumentNode;
  export = value;
}

// Extend NodeJS.ProcessEnv to include POSSIBLE_TYPES and store config
declare namespace NodeJS {
  interface ProcessEnv {
    POSSIBLE_TYPES?: string;
    STORE_CONFIG_DATA?: string;
    STORE_NAME?: string;
    STORE_VIEW_CODE_BUILD?: string;
    AVAILABLE_STORE_VIEWS?: string;
    DEFAULT_LOCALE?: string;
    BASE_URL?: string;
    MAGENTO_MEDIA_BACKEND_URL?: string;
  }
}
