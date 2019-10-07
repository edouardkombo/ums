import GroupList from '../components/group/List'
import GroupCreate from '../components/group/Create'
import GroupUpdate from '../components/group/Update'
import GroupShow from '../components/group/Show'

export default [
  { name: 'GroupList', path: '/groups/', component: GroupList },
  { name: 'GroupCreate', path: '/groups/create', component: GroupCreate },
  { name: 'GroupUpdate', path: '/groups/edit/:id', component: GroupUpdate },
  { name: 'GroupShow', path: '/groups/show/:id', component: GroupShow }
]
