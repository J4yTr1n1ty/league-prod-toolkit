import { Router } from 'express'

import moduleService from '../../modules/ModuleService'
import { download } from '../../../scripts/install'

export default (globalContext: any): Router => {
  const router = Router()

  router.get('/', async (req, res) => {
    res.render('modules',
      {
        ...globalContext,
        title: 'Modules',
        moduleCount: moduleService.modules.length,
        installedModules: {
          Plugins: moduleService.modules.filter(m => m.getName().startsWith('plugin')),
          'League Modules': moduleService.modules.filter(m => m.getName().includes('league')),
          'Valo Modules': moduleService.modules.filter(m => m.getName().includes('valo')),
          Themes: moduleService.modules.filter(m => m.getName().startsWith('theme')),
          Other: moduleService.modules.filter(m =>
            !m.getName().startsWith('theme') && !m.getName().includes('valo') && !m.getName().includes('league') && !m.getName().startsWith('plugin'))
        },
        availableModuleCount: moduleService.assets.length,
        availableModules: {
          Plugins: moduleService.assets.filter(m => m.name.startsWith('plugin')),
          'League Modules': moduleService.assets.filter(m => m.name.includes('league')),
          'Valo Modules': moduleService.assets.filter(m => m.name.includes('valo')),
          Themes: moduleService.assets.filter(m => m.name.startsWith('theme')),
          Other: moduleService.assets.filter(m =>
            !m.name.startsWith('theme') && !m.name.includes('valo') && !m.name.includes('league') && !m.name.startsWith('plugin'))
        }
      })
  })
  router.get('/api', (req, res) => {
    res.json(moduleService.modules.map((module) => module.toJson()))
  })

  return router
}
