declare module NodeJS {
  interface ProcessEnv {
    ELECTRON_DISABLE_SECURITY_WARNINGS: boolean;
  }
}
