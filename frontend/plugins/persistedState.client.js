import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    key: 'myzaico',
    paths: ['user.user', 'user.timeoutId'],
    storage: window.sessionStorage
  })(store);
}
