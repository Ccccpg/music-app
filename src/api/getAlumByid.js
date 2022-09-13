import axios1 from "@/utils/request";
export function getAlbumDesc(aid){
  return axios1({
    method:'get',
    url:`/album?id=${aid}`
  })
}