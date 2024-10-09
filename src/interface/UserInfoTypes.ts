export type CountryCode = `+${number}`;
export type Aadhaar = `${number}${number}${number}${number}${number}${number}${number}${number}${number}${number}${number}${number}`;
export type PhoneNumber = `+${CountryCode}${number}${number}${number}${number}${number}${number}${number}${number}${number}${number}`;
export type Email = `${string}@${string}.${string}`;