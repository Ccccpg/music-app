import axios1 from "@/utils/request";
export function getPlaydesc(id) {
  return axios1({
    method: "get",
    url: `/playlist/detail?id=${id}`
  })
}
export function getPlaylist(id,num) {
  return axios1({
    method: "get",
    url: `/playlist/track/all?id=${id}&limit=15&offset=${num}`
  })
}