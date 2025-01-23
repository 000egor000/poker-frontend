import { apiSlice as api } from "../api/reducer";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    paymentControllerWebhook: build.mutation<
      PaymentControllerWebhookApiResponse,
      PaymentControllerWebhookApiArg
    >({
      query: (body) => ({
        url: `/payment/webhook`,
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as paymentApi };
export type PaymentControllerWebhookApiResponse = unknown;
export type PaymentControllerWebhookApiArg = {
  paymentId: string;
  status: string;
};
export const { usePaymentControllerWebhookMutation } = injectedRtkApi;
