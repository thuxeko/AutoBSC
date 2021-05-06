import { ChainId, Token, Fetcher, WETH, Route, Trade, TokenAmount, TradeType, Percent } from '@pancakeswap/sdk'
import { JsonRpcProvider } from '@ethersproject/providers';
import { Balances } from "../models"
import Web3 from 'web3'
import axios from 'axios'

import * as Service from '../services/services'
import { ethers } from "ethers";
import fs from 'fs'

//#region Get ABI
// let urlRequest = 'https://api.pancakeswap.info/api/tokens'

// let token_find = 'Bake'

// let contractInput = '0x99e92123eb77bc8f999316f622e5222498438784'
// let urlGetABI = 'https://api.bscscan.com/api?module=contract&action=getabi&address=' + contractInput + '&apikey=APK1BUUFYPH8ECC5EIJVCD6F464WFN3Y2S'
// axios.get(urlGetABI).then(async function (response) {
//     let data = response.data;
//     let abi_contract = JSON.parse(data['result']);

//     let contract_token = new web3.eth.Contract(abi_contract, contractInput);
//     let name_token = await contract_token.methods.name().call()
//     let symbol_token = await contract_token.methods.symbol().call()
//     let decimal_token = await contract_token.methods.decimals().call()
//     let supply_token = await contract_token.methods.totalSupply().call() / (10**decimal_token)

//     console.log(`Name: ${name_token} \nSymbol: ${symbol_token} \nDecimal: ${decimal_token} \nTotal Supply: ${supply_token}`)
// }).catch(function (err) {
//     console.log(err)
// })
//#endregion

//#region Get Token
// Service.getTokenWithSymbol(token_find, 1).then(x=> console.log(x));

//#endregion

let nProvider = new JsonRpcProvider("https://bsc-dataseed1.defibit.io/");
let providerMainnet = new ethers.providers.JsonRpcProvider("https://bsc-dataseed1.defibit.io/");

let address = {
    BUSD: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    WBNB: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    Routerv1: '0x05fF2B0DB69458A0750badebc4f9e13aDd608C7F',
    Routerv2: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
    factoryv1: '0xBCfCcbde45cE874adCB698cC183deBcF17952812',
    factoryv2: '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73',
    mnemonic: 'xxx',
    wallet: 'xxx'
}

const prvKey = 'xxx';

//#region Example
// const tokenSearch = async () => {
//     const tk = await Fetcher.fetchTokenData(ChainId.MAINNET, address.BUSD, nProvider);
//     const wbnb = WETH[ChainId.MAINNET];
//     const pair = await Fetcher.fetchPairData(tk, wbnb, nProvider);
//     const route = new Route([pair], wbnb);
//     const amountIn = ethers.utils.parseUnits('0.01', 'ether')
//     const trade = new Trade(route, new TokenAmount(WETH[tk.chainId], amountIn), TradeType.EXACT_INPUT)
//     // console.log(route.midPrice.toSignificant(6)) //1 bnb = xxx Token
//     // console.log(route.midPrice.invert().toSignificant(6)) //1 Token = xxx BNB

//     // console.log(trade.executionPrice.toSignificant(6));
//     // console.log(trade.nextMidPrice.toSignificant(6));

//     const slippageTolerance = new Percent('50', '10000');
//     const amountInOut = trade.minimumAmountOut(slippageTolerance).raw;
//     const path = [wbnb.address, tk.address];
//     const to = '0x441949e9F37A84A0E080Cc6E58247dEE9668D160';
//     const deadline = Math.floor(Date.now() / 1000) + 60 * 20;
//     const value = trade.inputAmount.raw;

//     console.log('Amount In Out: ' + amountInOut);
//     console.log('Value: ' + value);

//     // const signer = new ethers.Wallet(prvKey);
//     // const account = signer.connect(providerMainnet);
// }

// tokenSearch().catch(x => console.log(x))
//#endregion

//#region Send Token
// let rawAbi = fs.readFileSync('abi/abi.json', 'utf-8');
// let abiDefault = JSON.parse(rawAbi);

// const wlFunction = async () => {
//     let signer = ethers.Wallet.fromMnemonic(address.mnemonic);
//     let account = signer.connect(providerMainnet);

//     let accAddress = (await account.getAddress()).toString();
//     let accBalance = (await account.getBalance()).toNumber();
//     console.log('Acount Address: %s', accAddress)
//     console.log('Acount Balance: %s', (accBalance / 1e18))
// }

// wlFunction().catch(x => console.log(x))
//#endregion

Service.getBalances(address.wallet)
    .then(x => {
        let data = new Balances(x);
        console.log(data.error);
    })