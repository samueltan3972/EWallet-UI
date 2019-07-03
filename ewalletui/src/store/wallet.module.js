import { WalletService } from '../services/wallet.service'

const state =  {
    balance: ''
}

const getters = {
    balance: (state) => {
        return state.balance
    }
}

const actions = {
    async checkBalance({ commit }) {
      const balance = await WalletService.checkBalance();
      commit('setBalance', balance);

      return true
    },

    async pay({ commit }, { receiver_wallet_addr, amount }){
      const message = await WalletService.pay(receiver_wallet_addr, amount);

      return message
    },

    async topup({ commit }, { amount }){
      const message = await WalletService.topup(amount);

      return message
    },

    async checkIsValidAddress({ commit }, { addr }){
      const status = await WalletService.checkIsValidAddress(addr)

      return status
    }
}

const mutations = {
    setBalance(state, balance) {
        state.balance = balance;
    },
}

export const wallet = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
