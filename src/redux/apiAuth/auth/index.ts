import { apiAuth as index } from "..";

const apiAuth = index.injectEndpoints({
  endpoints: (build) => ({
    GetUser: build.query<AUTH.GetMeResponse, AUTH.GetMeRequest>({
      query: () => ({
        url: `/auth/user`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),

    SignUp: build.mutation<AUTH.PostSignUpResponse, AUTH.PostSignInRequest>({
      query: (formData) => ({
        url: `/auth/sign-up`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["user"],
    }),

    SignIn: build.mutation<AUTH.PostSignInResponse, AUTH.PostSignInRequest>({
      query: (formData) => ({
        url: `/auth/sign-in`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["user"],
    }),

    LogOut: build.mutation<AUTH.LogOutResponse, AUTH.LogOutRequest>({
      query: () => ({
        url: `/auth/logout`,
        method: "POST",
      }),
      invalidatesTags: ["user"],
    })
  }),
});

export const { useGetUserQuery, useSignUpMutation, useSignInMutation, useLogOutMutation } = apiAuth;
