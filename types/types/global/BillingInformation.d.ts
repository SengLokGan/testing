type File = {
  name: string;
  link: string;
  expDate: string;
};
type Payor = {
  name: string;
  files: File[];
  comments: string;
};
export interface BillingInformation {
  payor: string;
  payorInformation: string;
  paymentMethod: string;
  payorInsurances: Payor[];
  depositAmount: string;
  depositPaymentMethod: string;
  comments: string;
}
export {};
