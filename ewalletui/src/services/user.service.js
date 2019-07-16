import ApiService from './api.service'
import { TokenService } from './storage.service'


class AuthenticationError extends Error {
    constructor(errorCode, message) {
        super(message)
        this.name = this.constructor.name
        this.message = message
        this.errorCode = errorCode
    }
}

const UserService = {
    /**
     * Login the user and store the access token to TokenService.
     *
     * @returns access_token
     * @throws AuthenticationError
    **/
    login: async function(email, password) {
        const requestData = {
            method: 'post',
            url: "/api/login",
            data: {
                email: email,
                password: password
            }
        }

        try {
            const response = await ApiService.customRequest(requestData)

            TokenService.saveToken(response.data.token)
            ApiService.setHeader()

            return {token: response.data.token, user: response.data.user}

        } catch (error) {
            throw new AuthenticationError(error.response.status, error.response.data.message)
        }
    },

    /**
     *
    **/
    register: async function(username, email, password, password_confirmation) {
        const requestData = {
            method: 'post',
            url: "/api/register",
            data: {
                name: username,
                email: email,
                password: password,
                password_confirmation: password_confirmation
            }
        }

        try {
            const response = await ApiService.customRequest(requestData)

            TokenService.saveToken(response.data.token)
            ApiService.setHeader()

            return response.data.token
        } catch (error) {
            throw error.response.data.errors
        }
    },

    getUserObj: async function() {
        const requestData = {
            method: 'get',
            url: "/api/getUserObj"
        }

        try {
          const response = await ApiService.customRequest(requestData)

          return {user: response.data}
        } catch (error) {
          TokenService.removeToken()
          TokenService.removeRefreshToken()
          ApiService.removeHeader()
        }


    },

    /**
     * Logout the current user by removing the token from storage.
     *
     * Will also remove `Authorization Bearer <token>` header from future requests.
    **/
    logout() {
        // Remove the token and remove Authorization header from Api Service as well
        TokenService.removeToken()
        TokenService.removeRefreshToken()
        ApiService.get("api/logout")
        ApiService.removeHeader()
    }
}

export default UserService

export { UserService, AuthenticationError }
