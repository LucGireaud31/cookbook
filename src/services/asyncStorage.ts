import AsyncStorage from "@react-native-async-storage/async-storage";
import { FilterProps } from "./recipes";

enum KeysEnum {
  Filter = "filter",
  Page = "page",
  Token = "token",
  Login = "login",
}

// ---------- //
// --Get-- //
// ---------- //

const DEFAULT_FILTER: FilterProps = {
  ingredients: [],
  isFavorite: false,
  minNote: 1,
  search: "",
  tags: [],
  types: [],
};

export async function getFilterLocalStorage(): Promise<FilterProps> {
  try {
    return {
      ...DEFAULT_FILTER,
      ...JSON.parse((await AsyncStorage.getItem(KeysEnum.Filter)) ?? ""),
    };
  } catch {
    setFilterLocalStorage(DEFAULT_FILTER);
    return DEFAULT_FILTER;
  }
}
export async function getPageLocalStorage(): Promise<number> {
  try {
    return parseInt((await AsyncStorage.getItem(KeysEnum.Page)) ?? "1");
  } catch {
    setPageLocalStorage(1);
    return 1;
  }
}

export async function getTokenLocalStorage(): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(KeysEnum.Token);
  } catch {
    return null;
  }
}

export async function getLoginLocalStorage(): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(KeysEnum.Login);
  } catch {
    return null;
  }
}

// ---------- //
// --Set-- //
// ---------- //

export async function setFilterLocalStorage(newFilter: FilterProps) {
  try {
    await AsyncStorage.setItem(KeysEnum.Filter, JSON.stringify(newFilter));
  } catch {}
}
export async function setPageLocalStorage(page: number) {
  try {
    await AsyncStorage.setItem(KeysEnum.Page, page.toString());
  } catch {}
}
export async function setLoginLocalStorage(login: string) {
  try {
    await AsyncStorage.setItem(KeysEnum.Login, login);
  } catch {}
}
export async function setTokenLocalStorage(token: string | null) {
  try {
    if (token) {
      await AsyncStorage.setItem(KeysEnum.Token, token);
    } else {
      await AsyncStorage.removeItem(KeysEnum.Token);
    }
  } catch {}
}
