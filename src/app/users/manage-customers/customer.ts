// customer.ts
export interface Role {
    id: number;
    name: string;
  }
  
  export interface Customer {
    id: number;
    username: string;
    email: string;
    mobile:string;
    address: string;
    gender: string;
    roles: Role[];  // roles is an array of Role objects
  }
  