export enum LangEnum {
  ar = 'ar',
  en = 'en',
}
export enum ThemeEnum {
  light = 'light',
  dark = 'dark',
}
export type Address = {
  country: string;
  governorate: string;
  zone: string;
  street: string;
  postalCode: number;
};
export interface ICountry {
  label : string,
  value : string
}
export interface Icity {
  country : string,
  value : string[]
}
export const countries :ICountry[] = [{label : "Egypt" , value : "Egypt"} , {label : "Saudi Arabia" , value : "Saudi Arabia"} , {label : "Qatar" , value : "Qatar"}]

export const cities : Icity[] = [
  {country : "Egypt" , value : ["Cairo" , "Giza" , "Alexandria" , "Marsa Matrouh" , "Aswan"]} ,
  {country : "Saudi Arabia" , value : ["Riyadh" , "Jeddah" , "Makkah" , "Dammam" , "Madinah"]} ,
  {country : "Qatar" , value : ["Doha" , " Al Rayyan" , "Al Wakrah"]}
]
