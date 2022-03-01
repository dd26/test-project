export function fetchAccessToken ({ commit }) {
  commit('updateAccessToken', JSON.parse(localStorage.getItem('TEST_SESSION_INFO')))
}
export function logout ({ commit }) {
  localStorage.removeItem('TEST_SESSION_INFO')
  commit('logout')
}
