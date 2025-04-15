
interface RegisterLibraryData {
    user: {
      password: string;
      name: string; 
      phone: string;
    };
    library: {
      name: string; 
      address: string;
      social_media: Array<{
        platform: string;
        link: string;
      }>;
      can_rent_books: boolean;
      latitude: string;
      longitude: string;
    };
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
  

  export type { RegisterLibraryData, LoginData, LoginResponse, ProfileResponse  };