export interface TCredentials {
  login: string;
  password: string;
}

export interface TCreateUserSchema {
  login: string;
  mail: string;
  password: string;
  password2: string;
  existingHome?: string;
}
export interface TCreateUser {
  login: string;
  mail: string;
  password: string;
  existingHome?: string;
}
