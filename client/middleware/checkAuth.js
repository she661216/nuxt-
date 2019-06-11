export default function ({ req, store, redirect }) {

//区分服务端和客户端鉴权
 if (req && req.headers) {  
    if(!req.headers['cookie'] || req.headers['cookie'].indexOf('YX_SESSION_ID') < 0){
      return redirect('/user/login')
    }
}
}


