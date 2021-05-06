export class item {
    contract_decimals: number | undefined;
    contract_name: string | undefined;
    contract_ticker_symbol: string | undefined;
    contract_address: string | undefined;
    balance: string | undefined;
    quote_rate: number | undefined; //Price 1 Token = USD
    quote: number | undefined; //Price all token in balance = USDT
}

export class data {
    address: string | undefined;
    items: [item] | undefined
}

export class Balances {
    data: data | undefined;
    error: boolean | undefined;
    error_message: string | undefined;
    error_code: number | undefined;

    public constructor(fields?: Partial<Balances>) {
        if (fields) {
            Object.assign(this, fields);
        }
    }
}