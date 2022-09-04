import {
  Tab, Tabs, Swipe, SwipeItem, Lazyload,
  Icon, Button, List, Tag, Cell, Image as VanImage,
  Progress, Popup
} from 'vant';
const list = [Tab, Tabs, Swipe, SwipeItem, Lazyload,
  Icon, Button, List, Tag, Cell, VanImage, Progress
  , Popup]
export default function vue_use_vant(vue) {
  list.forEach((item) => {
    return vue.use(item)
  })
}