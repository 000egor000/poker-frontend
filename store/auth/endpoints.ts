import { apiSlice as api } from "../api/reducer";
import { User } from "@store/users/types";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    authControllerRegistration: build.mutation<
      AuthControllerRegistrationApiResponse,
      AuthControllerRegistrationApiArg
    >({
      query: (queryArg) => ({
        url: `/auth/registration`,
        method: "POST",
        body: queryArg.createUserDto,
      }),
    }),
    authControllerLogin: build.mutation<
      AuthControllerLoginApiResponse,
      AuthControllerLoginApiArg
    >({
      query: (queryArg) => ({
        url: `/auth/login`,
        method: "POST",
        body: queryArg.loginDto,
      }),
    }),
    authControllerForgotPassword: build.mutation<
      AuthControllerForgotPasswordApiResponse,
      AuthControllerForgotPasswordApiArg
    >({
      query: (queryArg) => ({
        url: `/auth/forgot-password`,
        method: "POST",
        body: queryArg.forgotPasswordDto,
      }),
    }),
    authControllerResetTokenCheck: build.mutation<
      AuthControllerResetTokenCheckApiResponse,
      AuthControllerResetTokenCheckApiArg
    >({
      query: (queryArg) => ({
        url: `/auth/reset-token-check`,
        method: "POST",
        body: queryArg.resetTokenCheckDto,
      }),
    }),
    authControllerResetPassword: build.mutation<
      AuthControllerResetPasswordApiResponse,
      AuthControllerResetPasswordApiArg
    >({
      query: (queryArg) => ({
        url: `/auth/reset-password`,
        method: "POST",
        body: queryArg.resetPasswordDto,
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as authApi };
export type AuthControllerRegistrationApiResponse = /** status 201  */ {
  access_token: string;
  user: User;
};
export type AuthControllerRegistrationApiArg = {
  createUserDto: CreateUserDto;
};
export type AuthControllerLoginApiResponse = /** status 200  */ {
  access_token: string;
  user: User;
};
export type AuthControllerLoginApiArg = {
  loginDto: LoginDto;
};
export type AuthControllerForgotPasswordApiResponse =
  /** status 201 Verification code sent to email */ ResponseI;
export type AuthControllerForgotPasswordApiArg = {
  forgotPasswordDto: ForgotPasswordDto;
};
export type AuthControllerResetTokenCheckApiResponse =
  /** status 200 Correct code */ ResponseI;
export type AuthControllerResetTokenCheckApiArg = {
  resetTokenCheckDto: ResetTokenCheckDto;
};
export type AuthControllerResetPasswordApiResponse =
  /** status 200 Resetting password successfully done */ ResponseI;
export type AuthControllerResetPasswordApiArg = {
  resetPasswordDto: ResetPasswordDto;
};
export type CreateUserDto = {
  /** Имя */
  name: string;
  /** Фамилия */
  surname: string;
  /** Email */
  email: string;
  /** Номер телефона */
  phoneNumber: string;
  /** Пароль */
  password: string;
};
export type LoginDto = {
  /** Email */
  email: string;
  /** Пароль */
  password: string;
};
export type ResponseI = {
  message?: string | null;
  code: string;
  success: boolean;
};
export type ForgotPasswordDto = {
  /** Email */
  email: string;
};
export type ResetTokenCheckDto = {
  /** Email */
  email: string;
  /** Код подтверждения сброса */
  resetToken: string;
};
export type ResetPasswordDto = {
  /** Email */
  email: string;
  /** Пароль */
  password: string;
  /** Код подтверждения сброса */
  resetToken: string;
};
export const {
  useAuthControllerRegistrationMutation,
  useAuthControllerLoginMutation,
  useAuthControllerForgotPasswordMutation,
  useAuthControllerResetTokenCheckMutation,
  useAuthControllerResetPasswordMutation,
} = injectedRtkApi;
