const Router = require('express')
const router = new Router()
const statusController = require('../Controllers/statusController')

router.get('/status', statusController.getAllStatus)
router.get('/status/:id', statusController.getStatusById)
router.post('/status', statusController.createStatus)
router.put('/status/:id', statusController.updateStatus)
router.delete('/status/:id', statusController.deleteStatus)

module.exports = router