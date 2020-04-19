// 处理返回的数据
export const handleData = (actionType, dispatch, storeName, data, pageSize) => {
  let fixItems = []
  console.log(actionType, data, storeName, 'opopopoo')
  if (data && data.data) {
    if (Array.isArray(data.data)) {
      fixItems = data.data;
    } else if (Array.isArray(data.data.items)) {
      fixItems = data.data.items;
    }
  }
  dispatch({
    type: actionType,
    projectModels: pageSize > fixItems.length ? fixItems : fixItems.splice(0, pageSize), // 第一次加载的数据
    storeName,
    items: fixItems,
    pageIndex: 1
  })
}