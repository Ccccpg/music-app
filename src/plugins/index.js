import { Tab, Tabs, Swipe, SwipeItem, Lazyload, Icon, Button, List, Tag, Cell } from 'vant';
const list = [Tab, Tabs, Swipe, SwipeItem, Lazyload, Icon, Button, List, Tag, Cell]
export default function vue_use_vant(vue) {
  list.forEach((item) => {
    return vue.use(item)
  })
}