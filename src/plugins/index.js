import {
  Tab, Tabs, Swipe, SwipeItem, Lazyload,
  Icon, Button, List, Tag, Cell, Image as VanImage,
  Progress, Popup, Search, Col, Row, Sticky, Form, Field
} from 'vant';
const list = [Tab, Tabs, Swipe, SwipeItem, Lazyload,
  Icon, Button, List, Tag, Cell, VanImage, Progress
  , Popup, Search, Col, Row, Sticky, Form, Field]
export default function vue_use_vant(vue) {
  list.forEach((item) => {
    return vue.use(item)
  })
}