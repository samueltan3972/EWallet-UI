import ApiService from './api.service'

const WalletService = {

    checkBalance: async function() {
        const url = "/api/wallet/checkBalance"

        const response = await ApiService.get(url)
        return response.data[0].balance
    },

    pay: async function(receiver_wallet_addr, amount) {
        const requestData = {
            method: 'post',
            url: "/api/wallet/pay",
            data: {
                receiver_wallet_addr: receiver_wallet_addr,
                amount: amount
            }
        }

        const response = await ApiService.customRequest(requestData)

        return response.data[0].message
    },

    topup: async function(amount) {
        const requestData = {
            method: 'post',
            url: "/api/wallet/topup",
            data: {
                amount: amount
            }
        }

        const response = await ApiService.customRequest(requestData)

        return response.data[0].message
    },

    checkIsValidAddress: async function(addr){
      const requestData = {
          method: 'post',
          url: "/api/wallet/checkIsValidAddress",
          data: {
              wallet_addr: addr
          }
      }

      const response = await ApiService.customRequest(requestData)

      return response.data.status
    }
}

export default WalletService

export { WalletService }
