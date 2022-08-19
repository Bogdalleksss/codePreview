import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { getBaseUrl } from "utils/api";

interface VerifyBody {
  verify_id: string;
  verify_code: number;
}

interface User {
  _id?: string;
  phone: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  username: string;
  // Остальные данные скрыты
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: getBaseUrl('/auth'),
  }),
  endpoints: (build) => ({
    sendCode: build.mutation<any, string>({
      query: (email: string) => ({
        url: '/send-code',
        method: 'POST',
        body: { email }
      }),
    }),
    confirmEmail: build.mutation<any, VerifyBody>({
      query: (body: VerifyBody) => ({
        url: '/confirm-code',
        method: 'POST',
        body,
      }),
    }),
    signUp: build.mutation<any, User>({
      query: (body: User) => ({
        url: '/signup',
        method: 'POST',
        body,
      }),
    }),
  })
})
