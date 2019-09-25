import { init } from '@rematch/core'
import { home } from '@/models/home'
const store = init({
  models:{
    home
  }
})
export default store;