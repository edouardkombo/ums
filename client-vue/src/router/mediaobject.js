import MediaObjectList from '../components/mediaobject/List'
import MediaObjectCreate from '../components/mediaobject/Create'
import MediaObjectUpdate from '../components/mediaobject/Update'
import MediaObjectShow from '../components/mediaobject/Show'

export default [
  { name: 'MediaObjectList', path: '/media_objects/', component: MediaObjectList },
  { name: 'MediaObjectCreate', path: '/media_objects/create', component: MediaObjectCreate },
  { name: 'MediaObjectUpdate', path: '/media_objects/edit/:id', component: MediaObjectUpdate },
  { name: 'MediaObjectShow', path: '/media_objects/show/:id', component: MediaObjectShow }
]
