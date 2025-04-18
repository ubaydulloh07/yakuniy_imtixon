import axios from "axios";
import {  ProfileResponse, LoginData , Book} from "../types/type";

const BASE_URL = "https://s-libraries.uz/api/v1";

// Kutubxona ro'yxatga olish


const API_BASE_URL = 'https://s-libraries.uz/api/v1';

export const registerLibrary = async (data: {
  user: { name: string; phone: string; password: string };
  library: {
    name: string;
    address: string;
    latitude: string;
    longitude: string;
    can_rent_books: boolean;
    social_media: { platform: string; link: string }[];
  };
}) => {
  const response = await axios.post(`${API_BASE_URL}/auth/register-library/`, data);
  return response.data;
};

// Login qilish
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

// Profile
export const getProfile = async (): Promise<ProfileResponse> => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Token topilmadi");
  }

  const response = await fetch(`${BASE_URL}/auth/profile/`, {
    method: "GET",
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

/// profilni yangilash


export const updateProfile = async (data: any) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token topilmadi");

  const response = await fetch(`${BASE_URL}/auth/profile/`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Profilni yangilashda xatolik");
  }

  return response.json();
};


// Kutubxonalar 
export const getLibraries = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/libraries/libraries/`);
    return res.data;
  } catch (error) {
    console.error('Books fetch error:', error);
    throw new Error('Kitoblar ro\'yxatini olishda xatolik yuz berdi.');
  }
};

// Kutubxona detail
export const getLibraryDetail = async (id: string) => {
  const res = await fetch(`${BASE_URL}/libraries/library/${id}/`, {
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

export const searchBooks = async (query: string): Promise<Book[]> => {
  const response = await fetch(`${BASE_URL}/books/search/book/?q=${query}`);
  const data = await response.json();
  return data;  // API arrayni qaytaradi, shuning uchun to'g'ridan-to'g'ri data qaytadi
};



// Logout 



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
     
      console.log("Foydalanuvchi tizimdan chiqdi");
      return response.data;
    } else {
      throw new Error("Logout so'rovi muvaffaqiyatsiz tugadi");
    }
  } catch (error) {
    throw new Error("Tizimda xatolik yuz berdi. Iltimos qaytadan urinib ko'ring.");
  }
};



///  Kitoblarni olish


export const getAllBooks = async () => {
  const token = localStorage.getItem("token")
  const response = await fetch(`${BASE_URL}/books/books/`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  if (!response.ok) {
    throw new Error("Failed to fetch books")
  }
  return response.json()
}


///  kitob detail


export const getBookById = async (id: string) => {
  const response = await axios.get(`${BASE_URL}/books/book/${id}`);
  return response.data;
};





///  profile kitoblar 



export const getLibraryBooks = async () => {
  const res = await axios.get(`${BASE_URL}/libraries/library/books`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return res.data;
};



//// delete kitob

export const deleteBook = async (id: number) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`https://s-libraries.uz/api/v1/books/book/${id}/`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error('Kitobni o‘chirishda xatolik yuz berdi');
  }
  return true;
};


///  kitobni  edit qilish  


export const updateBook = async (id: number, bookData: any) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token mavjud emas");

  const response = await axios.put(
    `${BASE_URL}/books/book/${id}/`,
    bookData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

