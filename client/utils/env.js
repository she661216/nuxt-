/**
 * 本地存储
 * @type {app.context.env|{}|module.exports.env|{browser, node}}
 * @author ZGH0717
 */
export const environment = process.env
export const isDevMode = Object.is(environment.NODE_ENV, 'development')
export const isProdMode = Object.is(environment.NODE_ENV, 'production')

export const isStatic = process && process.static
export const isServer = process && process.server
export const isBrowser = process && process.browser
export const isCom = process.env.YX_ENV === 'cn'
