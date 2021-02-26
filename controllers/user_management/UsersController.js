const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const UserRepository = require('../../repositories/user_management/UserRepository');

router.use(function timeLog(req, res, next) {
    next();
});


router.post('/fetch_a_user_roles',urlencodedParser, async (request,response) => {
    let userId = request.body.userId;
    let result = await UserRepository.fetchAUserRolesByUserId(userId);
    response.send(result);
});


router.post('/fetch_a_user_specific_role',urlencodedParser, async (request,response) => {
    let userId = request.body.userId;
    let roleId = request.body.roleId;
    let result = await UserRepository.fetchAUserSpecificRoleByUserIdAndRoleId(userId,roleId);
    response.send(result[0]);
});



module.exports = router;
