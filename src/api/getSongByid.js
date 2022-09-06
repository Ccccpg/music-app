import axios1 from "@/utils/request";
export function getSong(sid){
  return axios1({
    method:"get",
    url:`/song/url?id=${sid}`
  })
}
export function getSongLyric(sid){
  return axios1({
    method:'get',
    url:`/lyric?id=${sid}`
  })
}
export function getSongdetail(sid){
  return axios1({
    method: 'get',
    url: `/song/detail?ids=${sid}`
  })
}
