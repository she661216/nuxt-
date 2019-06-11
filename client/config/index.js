export const baseURL = `http://api.inside.epyxw.${process.env.YX_ENV}`
export const nodeApi = process.env.YX_ENV === 'me' ? `http://127.0.0.1:3000` : process.env.YX_ENV === 'net' ? 'http://www.epyxw.net' : 'http://www.epyxw.cn'
// export const nodeApi = process.env.YX_ENV === 'me' ? `http://yx.epwk.net` : process.env.YX_ENV === 'net' ? 'http://yx.epwk.net' : 'http://yx.epwk.com'
export const tokenErroCode = [800014, 100181,100012,100014,100011]

