import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { getBaseUrl } from "utils/api";
import { IUser } from 'types'


interface IVerifyBody {
  verify_id: string;
  verify_code: number;
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
    confirmEmail: build.mutation<any, IVerifyBody>({
      query: (body: IVerifyBody) => ({
        url: '/confirm-code',
        method: 'POST',
        body,
      }),
    }),
    signUp: build.mutation<any, IUser>({
      query: (body: IUser) => ({
        url: '/signup',
        method: 'POST',
        body,
      }),
    }),
  })
})
