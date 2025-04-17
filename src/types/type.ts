
interface RegisterLibraryData {
  password: string;
  name?: string; 
  phone: string;
  library: {
    address: string;
    social_media?: Record<string, string>;
    can_rent_books: boolean;
    latitude?: string;
    longitude?: string;
  };
  }

  // types/registerTypes.ts
export interface RegisterData {
  libraryName: string;
  adminName: string;
  password: string;
  phoneNumber: string;
  allowBookRentals: boolean;
  address: string;
  latitude: string;
  longitude: string;
  socialMedia: Array<{
    platform: string;
    url: string;
  }>;
}


  
  
  interface LoginData {
    phone: string;
    password: string;
  }
  
  interface LoginResponse {
    access_token: string;
    user: {
      id: number;
      name: string;
      phone: string;
      is_active: boolean;
    };
  }
  
  interface ProfileResponse {
    id: number;
    name: string;
    phone: string;
    is_active: boolean;
    library: {
      id: number;
      name: string;
      address: string;
      latitude: string;
      longitude: string;
      can_rent_books: boolean;
      social_media: Array<{
        id: number;
        platform: string;
        link: string;
      }>;
    };
  }

  export interface UserDatabase {
    id: number;
    image?: string | null;
    address: string;
    social_media?: any | null;
    can_rent_books?: boolean;
    latitude?: string | null;
    longitude?: string | null;
    user: number;
  }
  
  type Book = {
    id: number;
    name: string;
    author: string;
    publisher: string;
    image?: string;         // Kitobning rasmi (optional)
    available?: boolean;    // Kitob mavjudligi (optional)
    library?: {             // Kutubxona ma'lumotlari (optional)
      name: string;
    };
  };
  
  

   interface Bookpage {
    id: number;
    library: number;
    name: string;
    author: string;
    publisher: string;
    quantity_in_library: number;
  }


  interface Library {
    id: number;
    name: string;
    image: string | null;
    address: string;
    total_books: number;
    is_active: boolean;
  }
  

  
  

  export type { RegisterLibraryData, LoginData, LoginResponse, ProfileResponse  , Book ,  Bookpage , Library};