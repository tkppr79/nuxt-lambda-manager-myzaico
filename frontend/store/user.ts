import { MutationTree, GetterTree } from 'vuex'

export const state = () => ({
  user: {
    id: 0,
    name: '',
    idToken: '',
    accessToken: '',
    filterSets: [],
  },
  timeoutId: -1,
});

export type UserState = ReturnType<typeof state>

export const mutations: MutationTree<UserState> = {
  setUser(state, user) {
    state.user = user;
  },
  setFilterSets(state, filterSets) {
    state.user.filterSets = filterSets;
  },
  setTimeoutId(state, timeoutId) {
    state.timeoutId = timeoutId;
  },
};

export const getters: GetterTree<UserState, UserState> = {
  user (state) {
    return state.user;
  },
  timeoutId (state) {
    return state.timeoutId;
  },
};
