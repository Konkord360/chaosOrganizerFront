export interface IPayment {
    paymentTitle: string;
    amountOfSinglePayment: number;
    wholeAmount: number;
    deadline: string;
    receiverIBAN: string;
    receiverName: string
    senderIBAN: string;
    payedByNow: 0;
}