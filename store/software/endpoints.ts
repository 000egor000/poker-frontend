import { apiSlice as api } from "../api/reducer";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    usersControllerBuySoftware: build.mutation<
      UsersControllerBuySoftwareApiResponse,
      UsersControllerBuySoftwareApiArg
    >({
      query: (queryArg) => ({
        url: `/users/software/${queryArg.softwareId}`,
        method: "POST",
      }),
    }),
    softwareControllerGetAllSoftware: build.query<
      SoftwareControllerGetAllSoftwareApiResponse,
      SoftwareControllerGetAllSoftwareApiArg
    >({
      query: (queryArg) => ({
        url: `/software`,
        headers: { secret: queryArg.secret },
      }),
    }),
    softwareControllerCreateSoftware: build.mutation<
      SoftwareControllerCreateSoftwareApiResponse,
      SoftwareControllerCreateSoftwareApiArg
    >({
      query: (queryArg) => ({
        url: `/software`,
        method: "POST",
        body: queryArg.createSoftwareDto,
        headers: { secret: queryArg.secret },
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as softwareApi };
export type UsersControllerBuySoftwareApiResponse =
  /** status 200 Software successfully purchased */ ResponseI;
export type UsersControllerBuySoftwareApiArg = {
  softwareId: number;
};
export type SoftwareControllerGetAllSoftwareApiResponse =
  /** status 200  */ Software[];
export type SoftwareControllerGetAllSoftwareApiArg = {
  /** тот же секрет, что у jwt в env */
  secret: string;
};
export type SoftwareControllerCreateSoftwareApiResponse =
  /** status 201  */ Software;
export type SoftwareControllerCreateSoftwareApiArg = {
  /** тот же секрет, что у jwt в env */
  secret: string;
  createSoftwareDto: CreateSoftwareDto;
};
export type ResponseI = {
  message?: string | null;
  code: string;
  success: boolean;
};
export type Software = {
  id: number;
  /** Название софта */
  title: string;
  /** Обложка софта */
  image: string;
  /** Стикер софта */
  sticker: string;
  /** Ссылка на сайт софта */
  softUrl: string;
  /** Цена софта */
  price: number;
  /** Описание софта */
  description: string;
  /** Возможности софта */
  capabilities: string[];
  /** Скриншоты софта */
  interfaceScreens: string[];
};
export type CreateSoftwareDto = {
  /** Название софта */
  title: string;
  /** Обложка софта */
  image: Blob;
  /** Стикер софта */
  sticker: Blob;
  /** Ссылка на сайт софта */
  softUrl: string;
  /** Цена софта */
  price: number;
  /** Описание софта */
  description: string;
  /** Возможности софта */
  capabilities: string[];
  /** Скриншоты софта */
  interfaceScreens: Blob[];
};
export const {
  useUsersControllerBuySoftwareMutation,
  useSoftwareControllerGetAllSoftwareQuery,
  useSoftwareControllerCreateSoftwareMutation,
} = injectedRtkApi;
