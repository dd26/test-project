export function login (state, data) {
  localStorage.setItem('TEST_SESSION_INFO', JSON.stringify(data))
  state.TEST_SESSION_INFO = data
  state.user = data.user
}

export function logout (state) {
  localStorage.removeItem('TEST_SESSION_INFO')
  state.TEST_SESSION_INFO = ''
  state.user = ''
}

export function updateAccessToken (state, TEST_SESSION_INFO) {
  if (TEST_SESSION_INFO) {
    state.TEST_SESSION_INFO = TEST_SESSION_INFO
  } else {
    state.TEST_SESSION_INFO = {}
  }
}
