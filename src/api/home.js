import request from '@/utils/request'

export const findBrand = (limit = 6) => request.get('/home/brand', { params: { limit } })

export const findBanner = () => request.get('/home/banner')

export const findNew = () => request.get('home/new')

export const findHot = () => request.get('home/hot')

export const findGoods = () => request.get('home/goods')

export const findSpecial = () => request.get('home/special')
