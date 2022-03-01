import request from '@/utils/request'

export const getCategroyList = () => request.get('/home/category/head')

/**
 * 获取单个顶级分类信息
 * @param {String} id - 顶级分类ID
 */
export const findTopCategory = id => request.get('/category', {
  params: {
    id
  }
})

/**
 * 获取二级分类筛选条件数据
 * @param {String} id -  二级分类ID
 */
export const findSubCategoryFilter = id => request.get('/category/sub/filter', {
  params: {
    id
  }
})

/**
 * 获取二级分类下的商品数据
 * @param {*} data
 * @returns
 */
export const findSubCategoryGoods = data => request.post('/category/goods/temporary', data)
