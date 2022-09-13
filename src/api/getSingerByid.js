import axios1 from "@/utils/request";
export function getSingerDetail(id){
  return axios1({
    method:'get',
    url:`/artist/detail?id=${id}`
  })
}
export function getSingerTop50Songs(id){
  return axios1({
    method: 'get',
    url: `/artist/top/song?id=${id}`
  })
}