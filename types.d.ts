export declare type Contact = {
    id: number;
    company: string;
    prefix?: string;
    firstName?: string;
    lastName?: string;
    suffix?: string;
    salutation?: string;
    professionalTitle?: string;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
    mainPhone?: string;
    directPhone?: string;
    mobilePhone?: string;
    emailAddress?: string;
    narrative?: string;
    group: string[];
    tag: string[];
  };
  export declare type User = {
    id: number;
    username: string;
    permission: Permission;
  };

  export interface Tag {
  id: number;
  name: string;
  removed?: boolean;
}

  export declare enum Permission {
    VIEWER = 'VIEWER',
    EDITOR = 'EDITOR',
    ADMIN = 'ADMIN',
  }
  