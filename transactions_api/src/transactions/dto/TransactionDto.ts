export interface TransactionDto {
    transactionExternalId: string;
    transactionType: {
        name: string;
    };
    transactionStatus: {
        name: string;
    };
	value: number;
	createdAt: Date;
}
