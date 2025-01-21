export class PaymentConstants {
    public static readonly BASE_URL: string = 'http://localhost:8080/api';
    public static readonly PAYMENT_PROCESS_URL: string = `${PaymentConstants.BASE_URL}/payments/process`;

    public static readonly PAYMENT_RETRIEVAL_URL: string  = `${PaymentConstants.BASE_URL}/payments/retrieveAll`;
    // public static readonly PAYMENT_BY_USER_ID_URL: string  = `${PaymentConstants.BASE_URL}/payments/retrieveById/{id}`;
    public static readonly PAYMENT_RETRIEV_BY_STATUS_URL: string  = `${PaymentConstants.BASE_URL}/payments/retrieveByStatus/`;

   public static readonly PAYMENT_UPDATE_BY_ID_URL: string  = `${PaymentConstants.BASE_URL}/payments/update/`;

    public static readonly PAYMENT_DELETE_BY_ID_URL: string  = `${PaymentConstants.BASE_URL}/payments/delete/{id}`;
}
