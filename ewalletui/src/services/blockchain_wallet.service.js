// Development of the blockchain wallet as been pause due to temporary shut down of IPDB foundation on test node

import driver from 'bigchaindb-driver'

// BigchainDB server instance
const API_PATH = 'https://test.ipdb.io/'

// Create a new keypair.
const alice = new driver.Ed25519Keypair()

// Construct a transaction payload
const tx = driver.Transaction.makeCreateTransaction(
  // Define the asset to store
  {
    transaction_id: 'testid',
    sender_wallet_addr: sender_wallet_addr,
    receiver_wallet_addr: receiver_wallet_addr,
    amount: amount,
    transaction_datetime: transaction_datetime
   },

  // Metadata contains information about the transaction itself
  // (can be `null` if not needed)
  null,

  // A transaction needs an output
  [ driver.Transaction.makeOutput(
          driver.Transaction.makeEd25519Condition(alice.publicKey))
  ],
  alice.publicKey
)

// Sign the transaction with private keys
const txSigned = driver.Transaction.signTransaction(tx, alice.privateKey)

// Send the transaction off to BigchainDB
const conn = new driver.Connection(API_PATH)

conn.postTransactionCommit(txSigned)
    .then(retrievedTx => console.log('Transaction', retrievedTx.id, 'successfully posted.'))


const BlockchainWalletService = {

    checkBalance: async function() {
        const url = "/api/wallet/checkBalance"

        const response = await ApiService.get(url)
        return response.data[0].balance
    },

    pay: async function(sender_wallet_addr, receiver_wallet_addr, amount) {
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
    },

}




export default WalletService

export { WalletService }
