import { apiSlice as api } from "../api/reducer";

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    usersControllerGetUserProfile: build.query<
      UsersControllerGetUserProfileApiResponse,
      UsersControllerGetUserProfileApiArg
    >({
      query: () => ({
        url: `/users/profile`,
      }),
    }),
    usersControllerUpdateUserInfo: build.mutation<
      UsersControllerUpdateUserInfoApiResponse,
      UsersControllerUpdateUserInfoApiArg
    >({
      query: (queryArg) => ({
        url: `/users/profile`,
        method: "PATCH",
        body: queryArg.updateUserDto,
      }),
    }),
    usersControllerTopUpBalance: build.mutation<
      UsersControllerTopUpBalanceApiResponse,
      UsersControllerTopUpBalanceApiArg
    >({
      query: () => ({ url: `/users/top-up-balance`, method: "POST" }),
    }),
    usersControllerGetUserCourses: build.query<
      UsersControllerGetUserCoursesApiResponse,
      UsersControllerGetUserCoursesApiArg
    >({
      query: ({ accessToken }) => ({
        url: `/users/courses`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    }),
    usersControllerBuyCourse: build.mutation<
      UsersControllerBuyCourseApiResponse,
      UsersControllerBuyCourseApiArg
    >({
      query: (queryArg) => ({
        url: `/users/courses/${queryArg.courseId}`,
        method: "POST",
      }),
    }),
    usersControllerGetUserCourse: build.query<
      UsersControllerGetUserCourseApiResponse,
      UsersControllerGetUserCourseApiArg
    >({
      query: ({ courseId, accessToken }) => ({
        url: `/users/courses/${courseId}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    }),
    usersControllerGetCertificate: build.query<
      UsersControllerGetCertificateApiResponse,
      UsersControllerGetCertificateApiArg
    >({
      query: (queryArg) => ({
        url: `/users/courses/${queryArg.courseId}/certificate`,
      }),
    }),
    usersControllerGetUserLesson: build.query<
      UsersControllerGetUserLessonApiResponse,
      UsersControllerGetUserLessonApiArg
    >({
      query: ({ courseId, lessonId, accessToken }) => ({
        url: `/users/courses/${courseId}/${lessonId}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    }),
    usersControllerBuySoftware: build.mutation<
      UsersControllerBuySoftwareApiResponse,
      UsersControllerBuySoftwareApiArg
    >({
      query: (queryArg) => ({
        url: `/users/software/${queryArg.softwareId}?option=${queryArg.option}`,
        method: "POST",
      }),
    }),
    usersControllerGetUserSoft: build.query<
      UsersControllerGetUserSoftApiResponse,
      UsersControllerGetUserSoftApiArg
    >({
      query: ({ softwareId, accessToken }) => ({
        url: `/users/software/${softwareId}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as usersApi };
export type UsersControllerGetUserProfileApiResponse =
  /** status 200  */ GetUserProfileSchema;
export type UsersControllerGetUserProfileApiArg = void;
//   {
//   accessToken: string;
// };
export type UsersControllerUpdateUserInfoApiResponse =
  /** status 200  */ GetUserProfileSchema;
export type UsersControllerUpdateUserInfoApiArg = {
  updateUserDto: UpdateUserDto;
};
export type UsersControllerTopUpBalanceApiResponse = /** status 200  */ {
  paymentUrl?: string;
};
export type UsersControllerTopUpBalanceApiArg = void;
export type UsersControllerGetUserCoursesApiResponse =
  /** status 200  */ GetUserCoursesSchema;
export type UsersControllerGetUserCoursesApiArg = {
  accessToken: string;
};
export type UsersControllerBuyCourseApiResponse =
  /** status 200 Course successfully purchased */ ResponseI;
export type UsersControllerBuyCourseApiArg = {
  courseId: number;
};
export type UsersControllerGetUserCourseApiResponse =
  /** status 200  */ GetOneUserCourseSchema;
export type UsersControllerGetUserCourseApiArg = {
  courseId: string;
  accessToken: string;
};
export type UsersControllerGetCertificateApiResponse = unknown;
export type UsersControllerGetCertificateApiArg = {
  courseId: number;
};
export type UsersControllerGetUserLessonApiResponse =
  /** status 200  */ GetUserLessonSchema;
export type UsersControllerGetUserLessonApiArg = {
  accessToken: string;
  courseId: string;
  lessonId: string;
};
export type UsersControllerBuySoftwareApiResponse =
  /** status 200 Software successfully purchased */ ResponseI;
export type UsersControllerBuySoftwareApiArg = {
  softwareId: number;
  option: number;
};
export type UsersControllerGetUserSoftApiResponse = /** status 200  */ Software;
export type UsersControllerGetUserSoftApiArg = {
  softwareId: string;
  accessToken: string;
};
export type GetUserProfileSchema = {
  id: number;
  /** Имя */
  name: string;
  /** Фамилия */
  surname: string;
  /** Email */
  email: string;
  /** Номер телефона */
  phoneNumber: string;
  /** Баланс пользователя */
  balance: number;
};
export type UpdateUserDto = {
  /** Имя */
  name: string;
  /** Фамилия */
  surname: string;
};
export type FreeCourses = {
  id: number;
  /** Название курса */
  title: string;
  /** Обложка */
  image: string;
  /** Статус курса */
  status: string;
  /** Краткое описание */
  shortDescription: string;
  /** Цена */
  price: number;
};
export type PremiumCourses = {
  id: number;
  /** Название курса */
  title: string;
  /** Обложка */
  image: string;
  /** Статус курса */
  status: string;
  /** Краткое описание */
  shortDescription: string;
  /** Цена */
  price: number;
};
export type PokerSoftware = {
  id: number;
  /** Название софта */
  title: string;
  /** Обложка софта */
  image: string;
  /** Стикер софта */
  sticker: string;
  /** Цена софта */
  price: number;
  /** Описание софта */
  description: string;
};
export type GetUserCoursesSchema = {
  freeCourses: FreeCourses[];
  premiumCourses: PremiumCourses[];
  pokerSoftware: PokerSoftware[];
  lastWatchedVideo: VideoType;
};

export type VideoType = {
  id: number;
  name: string;
  filePath: string;
  courseId: number;
  lessonId: number;
  moduleId: number;
  lessonIndex: number;
};

export type ResponseI = {
  message?: string | null;
  code: string;
  success: boolean;
};
export type CourseLessonsLite = {
  id: number;
  /** Название модуля */
  moduleName: string;
  /** Название урока */
  name: string;
  /** Путь файла */
  filePath: string;
  /** MIME тип */
  mimetype: string;
  /** Нумерация видео */
  index: number;
  /** Статус доступности */
  isAvailable: boolean;
};
export type LessonsByModule = {
  /** Название модуля */
  moduleName: string;
  lessons: CourseLessonsLite[];
};
export type GetOneUserCourseSchema = {
  id: number;
  /** Название курса */
  title: string;
  /** Обложка */
  image: string;
  /** Описание */
  description: string;
  /** Цена */
  price: number;
  /** Статус курса */
  status: string;
  /** Чему вы научитесь */
  futureSkills: string[];
  /** Включает в себя */
  includes: string[];
  /** Массив модулей с уроками внутри */
  courseLessons: LessonsByModule[];
  /** Общее количество видео */
  lessonsAmount: number;
};
export type GetUserLessonSchema = {
  id: number;
  /** Название модуля */
  moduleName: string;
  /** Название урока */
  name: string;
  /** Путь файла */
  filePath: string;
  /** MIME тип */
  mimetype: string;
  /** Нумерация видео */
  index: number;
  /** Статус доступности */
  isAvailable: boolean;
  moduleIndex: number;
  lessonIndex: number;
  prevVideo: PrevAndNextVideoType;
  nextVideo: PrevAndNextVideoType;
};

export type PrevAndNextVideoType = {
  id: number;
  name: string;
  filePath: string;
  course: number;
  index: number;
};

export type SoftwareOption = {
  id: number,
  title: string,
  description: string,
  price: number
}

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
  isPurchased: boolean;
  options: SoftwareOption[];
};

export const {
  usersControllerGetUserProfile,
  usersControllerGetUserCourses,
  usersControllerGetUserCourse,
  usersControllerGetUserSoft,
  usersControllerGetUserLesson,
} = injectedRtkApi.endpoints;

export const {
  useUsersControllerGetUserProfileQuery,
  useUsersControllerUpdateUserInfoMutation,
  useUsersControllerTopUpBalanceMutation,
  useUsersControllerGetUserCoursesQuery,
  useUsersControllerBuyCourseMutation,
  useUsersControllerGetUserCourseQuery,
  useUsersControllerGetCertificateQuery,
  useUsersControllerGetUserLessonQuery,
  useUsersControllerBuySoftwareMutation,
  useUsersControllerGetUserSoftQuery,
} = injectedRtkApi;
