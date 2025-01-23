import { apiSlice as api } from "../api/reducer";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    usersControllerGetUserCourses: build.query<
      UsersControllerGetUserCoursesApiResponse,
      UsersControllerGetUserCoursesApiArg
    >({
      query: () => ({ url: `/users/courses` }),
    }),
    coursesControllerGetAllCourses: build.query<
      CoursesControllerGetAllCoursesApiResponse,
      CoursesControllerGetAllCoursesApiArg
    >({
      query: (queryArg) => ({
        url: `/courses`,
        headers: { secret: queryArg.secret },
      }),
    }),
    coursesControllerCreateCourse: build.mutation<
      CoursesControllerCreateCourseApiResponse,
      CoursesControllerCreateCourseApiArg
    >({
      query: (queryArg) => ({
        url: `/courses`,
        method: "POST",
        body: queryArg.createCourseDto,
        headers: { secret: queryArg.secret },
      }),
    }),
    coursesControllerGetCourseById: build.query<
      CoursesControllerGetCourseByIdApiResponse,
      CoursesControllerGetCourseByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/courses/${queryArg.id}`,
        headers: { secret: queryArg.secret },
      }),
    }),
    coursesControllerAddLessonToCourse: build.mutation<
      CoursesControllerAddLessonToCourseApiResponse,
      CoursesControllerAddLessonToCourseApiArg
    >({
      query: (queryArg) => ({
        url: `/courses/${queryArg.id}/lessons`,
        method: "POST",
        body: queryArg.createLessonDto,
        headers: { secret: queryArg.secret },
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as coursesApi };
export type UsersControllerGetUserCoursesApiResponse =
  /** status 200  */ GetUserCoursesSchema;
export type UsersControllerGetUserCoursesApiArg = void;
export type CoursesControllerGetAllCoursesApiResponse =
  /** status 200  */ GetAllCoursesSchema[];
export type CoursesControllerGetAllCoursesApiArg = {
  /** тот же секрет, что у jwt в env */
  secret: string;
};
export type CoursesControllerCreateCourseApiResponse =
  /** status 201  */ CreateCourseSchema;
export type CoursesControllerCreateCourseApiArg = {
  /** тот же секрет, что у jwt в env */
  secret: string;
  createCourseDto: CreateCourseDto;
};
export type CoursesControllerGetCourseByIdApiResponse =
  /** status 200  */ Courses;
export type CoursesControllerGetCourseByIdApiArg = {
  /** тот же секрет, что у jwt в env */
  secret: string;
  id: number;
};
export type CoursesControllerAddLessonToCourseApiResponse =
  /** status 201  */ AddLessonSchema;
export type CoursesControllerAddLessonToCourseApiArg = {
  /** тот же секрет, что у jwt в env */
  secret: string;
  id: number;
  createLessonDto: CreateLessonDto;
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
};
export type Courses = {
  id: number;
  /** Название курса */
  title: string;
  /** Обложка */
  image: string;
  /** Краткое описание */
  shortDescription: string;
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
  /** Массив видео-уроков */
  courseLessons: CourseLessons[];
  userCourse: UserCourses;
};
export type CourseLessons = {
  id: number;
  /** Название модуля */
  moduleName: string;
  /** Название урока */
  name: string;
  /** Путь файла */
  filePath: string;
  /** MIME тип */
  mimetype: string;
  course: Courses;
  /** Нумерация видео */
  index: number;
  /** Статус доступности */
  isAvailable: boolean;
  userWatchedLesson: UserWatchedLessons;
};
export type UserWatchedLessons = {
  id: number;
  user: Users;
  courseLessons: CourseLessons;
};
export type Users = {
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
  /** Список купленных курсов */
  userCourses: UserCourses;
  /** Список просмотренных уроков */
  userWatchedLessons: UserWatchedLessons[];
};
export type UserCourses = {
  id: number;
  user: Users;
  course: Courses;
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
  course: Courses;
  /** Нумерация видео */
  index: number;
  /** Статус доступности */
  isAvailable: boolean;
};
export type GetAllCoursesSchema = {
  id: number;
  /** Название курса */
  title: string;
  /** Обложка */
  image: string;
  /** Краткое описание */
  shortDescription: string;
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
  userCourse: UserCourses;
  courseLessons: CourseLessonsLite[];
};
export type CreateCourseSchema = {
  id: number;
  /** Название курса */
  title: string;
  /** Обложка */
  image: string;
  /** Краткое описание */
  shortDescription: string;
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
  userCourse: UserCourses;
};
export type CreateCourseDto = {
  /** Название курса */
  title: string;
  /** Обложка */
  image: Blob;
  /** Краткое описание */
  shortDescription: string;
  /** Описание */
  description: string;
  /** Цена */
  price: number;
  /** Чему вы научитесь */
  futureSkills: string[];
  /** Включает в себя */
  includes: string[];
};
export type AddLessonSchema = {
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
  course: number;
};
export type CreateLessonDto = {
  /** Название модуля */
  moduleName: string;
  /** Название урока */
  name: string;
  /** Видео-урок */
  file: Blob;
};
export const {
  useUsersControllerGetUserCoursesQuery,
  useCoursesControllerGetAllCoursesQuery,
  useCoursesControllerCreateCourseMutation,
  useCoursesControllerGetCourseByIdQuery,
  useCoursesControllerAddLessonToCourseMutation,
} = injectedRtkApi;
