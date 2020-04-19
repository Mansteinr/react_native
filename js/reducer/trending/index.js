import Types from '../../actionTypes'
const defaultState = {}
/**
 * 如何动态设置store 和动态获取store 难点storeKeh不固定
 * @param {*} state 
 * @param {*} action 
 */
export default function onAction (state = defaultState, action) {
  switch (action.type) {
    case Types.TRENDING_REFRESH_SUCCESS:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          projectModels: action.projectModels, //此次要展示的数据
          items: action.items, // 原始数据
          isLoading: false,
          hideLoadingMore: false,
          pageIndex: action.pageIndex
        }
      }
    case Types.TRENDING_REFRESH:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          isLoading: true,
          hideLoadingMore: true, // 第一次刷新的时候 不需要加载更多
        }
      }
    case Types.TRENDING_REFRESH_FAIL:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          isLoading: false
        }
      }
    case Types.TRENDING_LOAD_MORE_SUCCESS:
      console.log(action)
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          projectModels: action.projectModels,
          hideLoadingMore: false,
          pageIndex: action.pageIndex
        }
      }
    case Types.TRENDING_LOAD_MORE_FAIL:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          hideLoadingMore: true,
          pageIndex: action.pageIndex
        }
      }
    default:
      return state
  }
}
