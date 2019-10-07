import GenderList from '../components/gender/List'
import GenderCreate from '../components/gender/Create'
import GenderUpdate from '../components/gender/Update'
import GenderShow from '../components/gender/Show'

export default [
  { name: 'GenderList', path: '/genders/', component: GenderList },
  { name: 'GenderCreate', path: '/genders/create', component: GenderCreate },
  { name: 'GenderUpdate', path: '/genders/edit/:id', component: GenderUpdate },
  { name: 'GenderShow', path: '/genders/show/:id', component: GenderShow }
]
