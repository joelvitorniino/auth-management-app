// src/types/user.ts
export interface User {
    id: number;
    email: string;
    name: string | null;
    password: string; 
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface JwtPayload {
    id: number;
    email: string;
    name: string;
  }
  