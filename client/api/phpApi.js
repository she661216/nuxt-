import Http from './HttpClass'
import {baseURL, nodeApi} from '../config'

let _http = new Http('/backend/api/', nodeApi)

/*************** 登录注册 start******************/
/**
 * 注册
 */
export const apiRegister = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('login_register_do', params, isLoading, isShowMsg)
}
/**
 * login
 */
export const apiLogin = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('login_do', params, isLoading, isShowMsg)
}
/**
 * 忘记密码
 */
export const apiForgetPass = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('forget_password_do', params, isLoading, isShowMsg)
}
/**
 * 退出登录
 */
export const apiLogout = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('uc_logout', params, isLoading, isShowMsg)
}

/**
 * 获取用户信息
 */
export const apiGetUserInfo = (params, isLoading = false, isShowMsg = false) => {
  return _http.post('uc_get_user_info', params, isLoading, isShowMsg)
}

/**
 * 修改用户名
 */
export const apiChangeUsername = (params, isLoading = false, isShowMsg = false) => {
  return _http.post('uc_change_username', params, isLoading, isShowMsg)
}

/**
 * 发送短信验证码
 */
export const apiSeedCode = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('verify_code', params, isLoading, isShowMsg)
}
/**
 * 是否是新客户
 */
export const apiIsNewUser = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('is_new_user', params, isLoading, isShowMsg)
}
/**
 * 更新jwt
 */
export const apiGetToken = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('get_access_token', params, isLoading, isShowMsg)
}
/*************** 登录注册 end******************/

/*************** 首页 start******************/
/**
 * 全局搜索 isShowMsg 1 服务 2方案 3文章
 */
export const apiGlobalSearch = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('global_search', params, isLoading, isShowMsg)
}
/**
 * 最新活动
 */
export const apiNewsList = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('index_newest_activity', params, isLoading, isShowMsg)
}
/**
 * 首页广告轮播图
 */
export const apiBanner = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('index_ad_slider', params, isLoading, isShowMsg)
}
/**
 * 一键预约
 */
export const apiConsole = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('console', params, isLoading, isShowMsg)
}
/**
 * 业务流程
 */
export const apiIndexFlow = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('index_business_flow', params, isLoading, isShowMsg)
}
/**
 * 联系我们
 */
export const apiContactUs = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('index_contact_us', params, isLoading, isShowMsg)
}
/**
 * 首页咨询列表
 */
export const apiIndexArticleList = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('article_zx_list_side', params, isLoading, isShowMsg)
}

/**
 * 项目中心列表
 */
export const apiProjectList = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('recommend_project_list', params, isLoading, isShowMsg)
}

/**
 * 项目中心列表
 */
export const apiProjectListCen = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('project_list', params, isLoading, isShowMsg)
}
/**
 * 发布需求
 */
export const apiIssueSubmit = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('uc_project', params, isLoading, isShowMsg)
}
/*************** 首页 end******************/

/***************文章 start******************/
/**
 * 文章详情
 */
export const apiArticleInfo = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('article_info', params, isLoading, isShowMsg)
}
/**
 * 获取上下篇文章
 */
export const apiArticlePrevNext = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('article_prev_next', params, isLoading, isShowMsg)
}

/**
 * 关联文章列表
 */
export const apiArticleListRelevance = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('article_other', params, isLoading, isShowMsg)
}
/**
 * 文章列表
 */
export const apiArticleList = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('index_article_list_side', params, isLoading, isShowMsg)
}

/**
 * 文章列表
 */
export const apiTalentMenu = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('get_talent_skills_all', params, isLoading, isShowMsg)
}

/**
 * 意见反馈
 */
export const apiFeedback = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('suggestion', params, isLoading, isShowMsg)
}

/***************文章 end******************/

/***************服务 start******************/

/**
 * 热门服务
 */
export const apiServiceCategoryHot = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('service_category_hot', params, isLoading, isShowMsg)
}

/**
 * 热门服务对应服务列表
 */
export const apiServiceListInfo = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('service_info', params, isLoading, isShowMsg)
}
/**
 * 服务分类(未使用到)
 */
export const apiServiceCategory = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('service_category', params, isLoading, isShowMsg)
}
/**
 * 服务列表
 */
export const apiServiceList = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('service_list', params, isLoading, isShowMsg)
}
/**
 * 服务详情
 */
export const apiServiceDetail = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('service_detail', params, isLoading, isShowMsg)
}
/**
 * 服务模式
 */
export const apiServiceModel = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('service_model', params, isLoading, isShowMsg)
}

/**
 * 服务分类一级
 */
export const apiServiceCategory1 = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('service_category_first', params, isLoading, isShowMsg)
}
/**
 * 服务模式
 */
export const apiServiceCategory2 = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('service_category_second', params, isLoading, isShowMsg)
}
/***************服务 end******************/

/***************解决方案 end******************/
/**
 * 方案菜单
 */
export const apiSchemeMenu = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('scheme', params, isLoading, isShowMsg)
}


/**
 * 方案菜单
 */
export const apiSchemeMenuList = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('scheme_list', params, isLoading, isShowMsg)
}

/***************解决方案 end******************/

/***************控制台 start******************/

/**
 * 平台公告
 */
export const apiNotice = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('notice_list_side', params, isLoading, isShowMsg)
}
/**
 * 最近浏览服务
 */
export const apiServiceRecent = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('uc_service_recent', params, isLoading, isShowMsg)
}

/**
 * 项目管理
 */
export const apiMyProject = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('uc_my_project', params, isLoading, isShowMsg)
}

/**
 * 一键预约
 */
export const apiMyConsole = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('uc_my_console', params, isLoading, isShowMsg)
}

/**
 * 优选快报列表
 */
export const apiKBList = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('article_kb_list_side', params, isLoading, isShowMsg)
}
/**
 * 消息列表
 */
export const apiMsgList = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('uc_get_msg_list', params, isLoading, isShowMsg)
}
/**
 * 消息详情
 */
export const apiMsgDetail = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('uc_get_msg_detial', params, isLoading, isShowMsg)
}
/**
 * 公共列表
 */
export const apiNoticeList = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('uc_notice_list_side', params, isLoading, isShowMsg)
}
/**
 * 公共详情
 */
export const apiNoticeDetail = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('uc_notice_info', params, isLoading, isShowMsg)
}
/**
 * 批量处理
 */
export const apiBatchDispose = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('uc_batch_deal_data', params, isLoading, isShowMsg)
}

/**
 * 商铺信息详情
 */
export const apiShopCase = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('uc_shop_case', params, isLoading, isShowMsg)
}


/**
 * 添加商铺案例
 */
export const apiAddShopCase = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('uc_add_shop_case', params, isLoading, isShowMsg)
}


/**
 * 编辑商铺案例
 */
export const apiEditShopCase = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('uc_edit_shop_case', params, isLoading, isShowMsg)
}


/**
 * 获取商铺案例详情
 */
export const apiShopCaseInfo = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('shop_case_info', params, isLoading, isShowMsg)
}


/**
 * 获取商铺信息详情
 */
export const apiShopInfo = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('uc_shop_info', params, isLoading, isShowMsg)
}
/**
 * 获取商铺信息详情
 */
export const apiShopInfoById = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('shop_info', params, isLoading, isShowMsg)
}
/**
 * 商铺人才列表接口
 */
export const apiGetShopTalentList = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('uc_shop_talent_list', params, isLoading, isShowMsg)
}

/**
 * 商铺案例删除
 */
export const apiDelShopCase = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('uc_shop_case_delete', params, isLoading, isShowMsg)
}

/**
 * 擅长行业分类
 */
export const apiGetGoodSkillsAll = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('get_good_skills_all', params, isLoading, isShowMsg)
}

/**
 * 获取省
 */
export const apiGetAreaProvince= (params, isLoading = false, isShowMsg = true) => {
  return _http.post('get_area_province', params, isLoading, isShowMsg)
}


/**
 * 获取市区
 */
export const apiGetAreaCity = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('get_area_city', params, isLoading, isShowMsg)
}


/**
 * 获取区或县
 */
export const apiGetAreaArea = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('get_area_area', params, isLoading, isShowMsg)
}

/**
 * 编辑商铺信息
 */
export const apiEditShopInfo = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('uc_edit_shop_info', params, isLoading, isShowMsg)
}

/**
 * 频道 职能 技能标签
 */
export const apiGetTalentSkillsAll = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('get_talent_skills_all', params, isLoading, isShowMsg)
}


/**
 * 商铺添加成员
 */
export const apiAddShopTalent = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('uc_add_shop_talent', params, isLoading, isShowMsg)
}


/**
 * 人才（成员）详情
 */
export const apiGetShopTalentInfo = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('shop_talent_info', params, isLoading, isShowMsg)
}


/**
 * 编辑成员-自我评价
 */
export const apiEditShopTalent = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('uc_edit_shop_talent_all', params, isLoading, isShowMsg)
}


/**
 * 编辑项目信息
 */
export const apiEditProject = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('uc_edit_project', params, isLoading, isShowMsg)
}


/**
 * 编辑项目信息
 */
export const apiProjectInfo = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('project_info', params, isLoading, isShowMsg)
}
/**
 * 服务商-申请资料登记
 */
export const apiShopAuth = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('uc_shop_auth', params, isLoading, isShowMsg)
}
/**
 * 修改资料登记
 */
export const apiEditShopAuth = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('uc_edit_shop_auth', params, isLoading, isShowMsg)
}
/**
 * 优选商铺审核信息详情接口
 */
export const apiShopAuthInfo = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('uc_shop_auth_info', params, isLoading, isShowMsg)
}

/**
 * 权益要求列表
 */
export const apiShopEquity = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('get_shop_equity', params, isLoading, isShowMsg)
}


/**
 * 获取商铺申请状态信息
 */
export const apiShopAuthStatus = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('uc_shop_auth_status', params, isLoading, isShowMsg)
}


/**
 * 人才列表接口
 */
export const apiTalentList = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('talent_list', params, isLoading, isShowMsg)
}


/**
 * 优选专家前台调用接口
 */
export const apiIndexTalentList = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('recommend_talent_list', params, isLoading, isShowMsg)
}


/**
 * 首页企业数和项目数 展示数据
 */
export const apiGetIndexInitData = (params, isLoading = false, isShowMsg = true) => {
  return _http.post('get_index_init_data', params, isLoading, isShowMsg)
}

/***************控制台 end******************/
