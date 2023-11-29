export declare type Contact = {
    id: number;
    company: string;
    prefix?: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    suffix?: string;
    professionalTitle?: string;
    address1?: string;
    city1?: string;
    state1?: string;
    zipCode1?: string;
    address1Type?: string;
    address?: string;
    city2?: string;
    state2?: string;
    zipCode2 ?: string;
    address2Type?: string;
    mainPhone?: string;
    directPhone?: string;
    mobilePhone?: string;
    emailAddress?: string;
    narrative?: string;
    tag: string[];
  };
  
  export declare type User = {
    id: number;
    username: string;
    permission: Permission;
  };
  
  export declare enum Permission {
    VIEWER = 'VIEWER',
    EDITOR = 'EDITOR',
    ADMIN = 'ADMIN',
  }
  