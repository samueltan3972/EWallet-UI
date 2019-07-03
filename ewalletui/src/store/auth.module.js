import { UserService, AuthenticationError } from '../services/user.service'
import { TokenService } from '../services/storage.service'
import router from '../routes'


const state =  {
    authenticating: false,
    accessToken: TokenService.getToken(),
    authenticationErrorCode: 0,
    authenticationError: '',
    registerError: {},
    userObj: {}
}

const getters = {
    loggedIn: (state) => {
        return state.accessToken ? true : false
    },

    authenticationErrorCode: (state) => {
        return state.authenticationErrorCode
    },

    authenticationError: (state) => {
        return state.authenticationError
    },

    authenticating: (state) => {
        return state.authenticating
    },

    registerError: (state) => {
      return state.registerError
    },

    userObj: (state) => {
      return state.userObj
    }
}

const actions = {
    async login({ commit }, {email, password}) {
        commit('loginRequest');

        try {
            const response = await UserService.login(email, password);
            commit('userObj', response.user)
            commit('loginSuccess', response.token)

            // Redirect the user to the page he first tried to visit or to the home view
            router.push(router.history.current.query.redirect || '/');

            return true
        } catch (e) {
            if (e instanceof AuthenticationError) {
                commit('registerError', {errorCode: e.errorCode, errorMessage: e.message})
            }

            return false
        }
    },

    async register({ commit }, {username, email, password, password_confirmation}) {
        commit('loginRequest');

        try {
            const token = await UserService.register(username, email, password, password_confirmation);
            commit('loginSuccess', token)

            // Redirect the user to the page he first tried to visit or to the home view
            router.push(router.history.current.query.redirect || '/');

            return true
        } catch (e) {
            commit('registerError', e)
            return false
        }
    },

    async getUserObj({ commit }) {
      const response = await UserService.getUserObj();
      commit('userObj', response.user)

      return true
    },

    logout({ commit }) {
        UserService.logout()
        commit('logoutSuccess')
        router.push('/login')
    }
}

const mutations = {
    loginRequest(state) {
        state.authenticating = true;
        state.authenticationError = ''
        state.authenticationErrorCode = 0
    },

    loginSuccess(state, accessToken) {
        state.accessToken = accessToken
        state.authenticating = false;
    },

    loginError(state, {errorCode, errorMessage}) {
        state.authenticating = false
        state.authenticationErrorCode = errorCode
        state.authenticationError = errorMessage
    },

    userObj(state, userObj){
      state.userObj = userObj
    },

    registerError(state, err){
      state.registerError = err
    },

    logoutSuccess(state) {
        state.accessToken = ''
    }
}

export const auth = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
