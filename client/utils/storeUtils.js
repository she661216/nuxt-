// ***************************** 操作localStorage start *****************************
export const setLocalStore = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}

export const getLocalStore = name => {
  if (!name) return
  return window.localStorage.getItem(name)
}

export const removeLocalStore = name => {
  if (!name) return
  window.localStorage.removeItem(name)
}
// ***************************** 操作localStorage end *****************************

// ***************************** 操作sessionStorage start *****************************
export const setSessionStore = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.sessionStorage.setItem(name, content)
}

export const getSessionStore = name => {
  if (!name) return
  return window.sessionStorage.getItem(name)
}

export const removeSessionStore = name => {
  if (!name) return
  window.sessionStorage.removeItem(name)
}
// ***************************** 操作sessionStorage end *****************************
