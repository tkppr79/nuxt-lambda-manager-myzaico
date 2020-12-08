import { MutationTree, GetterTree } from 'vuex'

export const state = () => ({
  user: {
    id: 0,
    name: '',
    idToken: '',
    accessToken: '',
    filterSets: [],
  },
  initialized: false,
});

export type UserState = ReturnType<typeof state>

export const mutations: MutationTree<UserState> = {
  setUser(state, user) {
    state.user = user;
  },
  setInitialization(state, value){
    state.initialized = value;
  },
};

export const getters: GetterTree<UserState, UserState> = {
  user (state) {
    return state.user;
  },
  initialized (state) {
    return state.initialized;
  },
};
