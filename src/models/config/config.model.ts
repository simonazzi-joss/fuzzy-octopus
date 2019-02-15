export interface Configuration {
  userData: UserData;
  menues: Array<MenuLink>;
  lastLoginInfo: any;
  permissions: any;
}

export interface UserData {
  id: number;
  name: string;
  avatar: string;
}

export interface MenuLink {
  text: string;
  href: string;
  badge: string;
}

export interface LoginInfo {
  timestamp: string;
  token: string;
}
