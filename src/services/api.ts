const API_URL = import.meta.env.VITE_API_URL;

interface RegisterLibraryData {
  user: {
    password: string;
    name: string;
    phone: string;
  };
  library: {
    address: string;
    social_media?: {
      website?: string;
      facebook?: string;
      instagram?: string;
      telegram?: string;
    };
    can_rent_books: boolean;
    latitude?: string;
    longitude?: string;
  };
}

interface LoginData {
  phone: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    phone: string;
    isActive: boolean;
  };
}

export const authAPI = {
  async registerLibrary(data: RegisterLibraryData) {
    const response = await fetch(`${API_URL}/auth/register-library`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(data);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Registration failed");
    }

    return response.json();
  },

  async login(data: LoginData): Promise<LoginResponse> {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    const responseData = await response.json();

    if (!responseData.user.isActive) {
      throw new Error(
        "Sizning akkauntingiz hali admin tomonidan tasdiqlanmagan. Iltimos, tasdiqlash jarayoni tugashini kuting."
      );
    }

    return responseData;
  },
};
