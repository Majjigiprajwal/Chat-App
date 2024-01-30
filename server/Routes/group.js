const express = require('express');
const isAuth = require('../Middleware/isAuth')
const router = express.Router();

const groupController = require('../Controllers/group')

router.post('/create-group',isAuth,groupController.createGroup);

router.get('/get-groups',isAuth,groupController.getGroups);

router.get('/get-allgroups',isAuth,groupController.getAllGroups);

router.get('/groupMembers',isAuth,groupController.getGroupMembers);

router.post('/join-group',isAuth,groupController.joinGroup)

router.post('/remove-groupMember',isAuth,groupController.deleteGroupMember)

router.post('/admin-role',isAuth,groupController.assignAdminRole)

router.get('/search-groups',isAuth,groupController.searchGroups)

module.exports = router;