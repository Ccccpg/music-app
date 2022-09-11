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
//获取搜索结果
export function getSearchResult(keyword,num) {
  return axios1({
    method: 'get',
    url: `/search?keywords=${keyword}&type=1&offset=${num}`
  })
}