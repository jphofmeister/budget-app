export type APIData<T> = {
  errorOccurred?: boolean;
  message?: string;
  records?: T;
  transactionSuccess?: boolean;
  primaryKeyID?: number; // ? Only used in post requests, so should be an extension of this type instead? -- 02/13/2026 JH
  sessionToken?: string; // ? Only used for logging in, so should be an extension of this type instead? -- 02/13/2026 JH
};

export type URL1 = {
  country_code: string | null;
  country_name: string | null;
  city: string | null;
  postal: string | null;
  latitude: number | null;
  longitude: number | null;
  IPv4: string | null;
  state: string | null;
} | null;

export type URL2 = {
  ipAddress: string | null;
  continentCode: string | null;
  continentName: string | null;
  countryCode: string | null;
  countryName: string | null;
  stateProvCode: string | null;
  stateProv: string | null;
  city: string | null;
  // * https://db-ip.com/api/doc.php#error_codes -- 02/10/2025 JH
  error?: string;
  errorCode?: string;
} | null;
