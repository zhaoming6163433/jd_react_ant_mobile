import appConfigs from '../configs'
import Request from './request'

/**
 * mock获取用户信息
 */
export const post_user_info = (params) => Request(appConfigs.urlWebHttp + "/data", params, 'GET');