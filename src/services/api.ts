const BASE_URL = "https://s-libraries.uz/api/v1";

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

export const registerLibrary = async (data: RegisterLibraryData) => {
  const response = await fetch(`${BASE_URL}/auth/register-library/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || "Ro'yxatdan o'tishda xatolik yuz berdi"
    );
  }

  return response.json();
};

export const login = async (data: LoginData): Promise<LoginResponse> => {
  const response = await fetch(`${BASE_URL}/auth/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      phone: data.phone,
      password: data.password,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Login failed");
  }

  const responseData = await response.json();

  // Save token to localStorage
  localStorage.setItem("token", responseData.access_token);
  localStorage.setItem("user", JSON.stringify(responseData.user));

  return responseData;
};

export const getProfile = async (): Promise<ProfileResponse> => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Token topilmadi");
  }

  const response = await fetch(`${BASE_URL}/auth/profile/`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || "Profil ma'lumotlarini yuklashda xatolik"
    );
  }

  return response.json();
};
