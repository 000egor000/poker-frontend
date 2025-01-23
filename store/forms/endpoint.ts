import { apiSlice } from "@store/api/reducer";
import { ConsultationFormRequest } from "@store/forms/types";

export const formsApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    consultationForm: build.mutation<void, ConsultationFormRequest>({
      query: (body) => ({
        url: "/forms",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useConsultationFormMutation } = formsApi;
