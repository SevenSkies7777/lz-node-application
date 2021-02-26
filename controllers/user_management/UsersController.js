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



module.exports = router;
