function setCookie(name, value, day) {
  let date = new Date()
  date.setTime(date.getTime() + (day || 7) * 24 * 60 * 60 * 1000)
  let expires = `expires=${date.toGMTString()}`
  document.cookie = `${name}=${value};${expires}`
}

function getCookie(name) {
  let fromatName = `${name}=`
  let cookieArray = document.cookie.split(';').map((cookie) => cookie.trim())
  let currentCookie = cookieArray.find((cookie) => cookie.includes(fromatName))
  currentCookie = currentCookie
    ? currentCookie.substring(fromatName.length, currentCookie.length)
    : ''
  return currentCookie
}
export { setCookie, getCookie }
