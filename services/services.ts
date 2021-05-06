import axios from 'axios'
import { ethers } from "ethers";
import { configs } from "../config/config";
import fs from 'fs'

const providerMainnet = new ethers.providers.JsonRpcProvider(configs.rpc_mainnet);

export async function getTokenWithSymbol(symbol: string, typeCm: number) {
    let urlRequest = 'https://api.pancakeswap.info/api/tokens'

    console.log('Token: ' + symbol)
    try {
        const dt = await axios.get(urlRequest);

        let lst_token = dt.data.data;

        let token_result = Object.keys(lst_token).map(key => lst_token[key]).find(x => x.symbol.toUpperCase()
            === symbol.toUpperCase());

        let contractToken = Object.keys(lst_token).find(key => lst_token[key] === token_result);

        if (token_result) {
            if (typeCm == 1) {
                // String Link PancakeSwap & Poocoin Chart
                let pooChart = `<a href="https://poocoin.app/tokens/${contractToken}">💩_PooChart_💩</a>`
                let pancakeLink = `<a href="https://exchange.pancakeswap.finance/#/swap?inputCurrency=${contractToken}">🥞_Buy Token_🥞</a>`

                // String Text
                let token_symbol = 'Token: ' + token_result.name + ' - ' + token_result.symbol

                let symbol_usd = `1 ${token_result.symbol} = ${token_result.price.substring(0, token_result.price.indexOf('.') + 14)} USD`
                let symbol_bnb = `1 ${token_result.symbol} = ${token_result.price_BNB.substring(0, token_result.price_BNB.indexOf('.') + 14)} BNB`

                let totalin1usd = 1 / parseFloat(token_result.price)
                let totalin1bnb = 1 / parseFloat(token_result.price_BNB)
                let usd_symbol = `1 USD = ${totalin1usd} ${token_result.symbol}`
                let bnb_symbol = `1 BNB = ${totalin1bnb} ${token_result.symbol}`

                let strOut = `${token_symbol} \n${symbol_usd} \n${symbol_bnb} \n \n${usd_symbol} \n${bnb_symbol} \n \n${pancakeLink} \n${pooChart}`

                return strOut
            }
            else if (typeCm == 2) {
                return contractToken
            }

        }
        else {
            return 'Token không tồn tại'
        }
    } catch (err) {
        console.log(err)
        return 'Có lỗi xảy ra. Liên hệ ông ThuXeko để xử lý'
    }
}

export async function getTokeninWallet(wallet: string) {
    const value = (await providerMainnet.getBalance(wallet)).toString()
    return value;
}

export async function getBalances(wallet: string) {
    let urlGet = `https://api.covalenthq.com/v1/${configs.chainid_mainnet}/address/${wallet}/balances_v2/?key=${configs.covalenthqKey}`

    const data = await axios.get(urlGet);
    return data.data;
}