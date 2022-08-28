import { Tab, Tabs, Swipe, SwipeItem, Lazyload } from 'vant';
const list = [Tab, Tabs, Swipe, SwipeItem, Lazyload]
export default function vue_use_vant(vue) {
  list.forEach((item) => {
    return vue.use(item)
  })
}