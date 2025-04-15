import axios from "axios";
import { RegisterLibraryData, ProfileResponse, LoginData } from "../types/type";

const BASE_URL = "https://s-libraries.uz/api/v1";

// Kutubxona ro'yxatga olish
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
    console.error("Register Error:", errorData);
    throw new Error(
      errorData.message || "Ro'yxatdan o'tishda xatolik yuz berdi"
    );
  }

  return response.json();
};

// Login function
export const login = async ({ phone, password }: LoginData) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login/`, { phone, password });

    if (response.status !== 200 && response.status !== 201) {
      throw new Error("Login muvaffaqiyatsiz tugadi!");
    }

    return response.data;
  } catch (error: any) {
    console.error("Login xatosi:", error);
    throw error;
  }
};

// Profilni olish
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

  if (response.status === 401) {
    localStorage.removeItem("token");
    throw new Error("Token muddati tugagan. Qayta login qiling.");
  }

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || "Profil ma'lumotlarini yuklashda xatolik"
    );
  }

  return response.json();
};

// Kutubxonalar ro'yxatini olish
export const getLibraries = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/libraries/libraries/`);
    return res.data;
  } catch (error) {
    console.error('Books fetch error:', error);
    throw new Error('Kitoblar ro\'yxatini olishda xatolik yuz berdi.');
  }
};

// Kutubxona kitoblar detallarini olish
export const getLibraryDetail = async (id: string) => {
  const res = await fetch(`https://s-libraries.uz/api/v1/libraries/library/${id}/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(`Xatolik: ${res.status}`);
  }

  const data = await res.json();
  return data.results;
};

// Kitoblarni qidirish
export const searchBooks = async (query: string) => {
  try {
    const response = await axios.get(`https://s-libraries.uz/api/v1/books/search/book/?q=${encodeURIComponent(query)}`);
    return response.data;
  } catch (error) {
    throw new Error('Kitoblarni qidirishda xatolik yuz berdi.');
  }
};

// Logout function



export const logout = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Token topilmadi");
  }

  try {
    const response = await axios.post(
      `${BASE_URL}/auth/logout/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      // Serverdan chiqish muvaffaqiyatli bo'lsa
      console.log("Foydalanuvchi tizimdan chiqdi");
      return response.data;
    } else {
      throw new Error("Logout so'rovi muvaffaqiyatsiz tugadi");
    }
  } catch (error) {
    throw new Error("Tizimda xatolik yuz berdi. Iltimos qaytadan urinib ko'ring.");
  }
};