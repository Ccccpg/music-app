import axios1 from "@/utils/request";
export function getSearchHot() {
  return axios1({
    method: 'get',
    url: '/search/hot/detail'
  })
}
export function getRecommend(keyword) {
  return axios1({
    method: 'get',
    url: `/search/suggest?keywords=${keyword}&type=mobile`
  })
}
//获取单曲搜索结果
export function getSearchSongsResult(keyword,num) {
  return axios1({
    method: 'get',
    url: `/cloudsearch?keywords=${keyword}&type=1&offset=${num}`
  })
}
//获取专辑搜索结果
export function getSearchAlbumResult(keyword, num) {
  return axios1({
    method: 'get',
    url: `/cloudsearch?keywords=${keyword}&type=10`
  })
}
//获取用户搜索结果
export function getSearchUsersResult(keyword, num) {
  return axios1({
    method: 'get',
    url: `/cloudsearch?keywords=${keyword}&type=1002`
  })
}
//获取歌手搜索结果
export function getSearchSingersResult(keyword, num) {
  return axios1({
    method: 'get',
    url: `/cloudsearch?keywords=${keyword}&type=100`
  })
}
