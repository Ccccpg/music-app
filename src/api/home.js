import axios1 from "@/utils/request";
export function getBanner() {
  return axios1({
    method: "get",
    url: "/banner?type=2"
  })
}
export function getplaylists() {
  return axios1({
    method: "get",
    url: "/top/playlist?limit=30&order=hot"
  })
}