declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "devlopment" | "production" | "test";
    REACT_APP_API_URL: string;
    PUBLIC_URL: string;
  }
}
