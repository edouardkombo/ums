import SkillList from '../components/skill/List'
import SkillCreate from '../components/skill/Create'
import SkillUpdate from '../components/skill/Update'
import SkillShow from '../components/skill/Show'

export default [
  { name: 'SkillList', path: '/skills/', component: SkillList },
  { name: 'SkillCreate', path: '/skills/create', component: SkillCreate },
  { name: 'SkillUpdate', path: '/skills/edit/:id', component: SkillUpdate },
  { name: 'SkillShow', path: '/skills/show/:id', component: SkillShow }
]
