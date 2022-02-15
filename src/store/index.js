import { createStore } from 'vuex';
import axios from "axios";
import currencies from "../constants/currencies.json";

export default createStore({
  state: {
    currencyInfo: "",
    currencies: currencies,
},
mutations: {
    setCurrencyInfo(state, currencyInfo) {
        state.currencyInfo = currencyInfo;
    }
},
getters: {
    getCurrencyInfo(state) {
        return state.currencyInfo;
    },
    getCurrencies(state) {
        return state.currencies;
    },
},
actions: {
    async convert({ commit }, { firstCurrency, secondCurrency, amount }) {
        const api_key = "7282f1d568868c68c3c4eb1740146d89"; // API Key
        const url = "http://data.fixer.io/api/latest?access_key=" + api_key;

        const response = await axios.get(url);
        const rates = response.data["rates"];
        const firstValue = rates[firstCurrency];
        const secondValue = rates[secondCurrency];
        const result = (secondValue / firstValue) * amount;
        const currencyInfo = {
            "firstCurrency": firstCurrency,
            "secondCurrency": secondCurrency,
            "amount": amount,
            "result": result
        };
        commit("setCurrencyInfo", currencyInfo);
    }
}
})
