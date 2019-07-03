import store from '../store/index.js'

export default function popup(file,props=null) {
  store.state.dialog = {
    name: file,
    file: file,
    props: props
  }
}
