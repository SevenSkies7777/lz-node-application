const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const Repository = require('../repositories/Repository');

router.use(function timeLog(req, res, next) {
    next();
});

router.post('/insert_users',urlencodedParser, async (request,response) => {
    let jsonObject = {
        FirstName: request.body.firstName,
        MiddleName: request.body.middleName,
        Surname: request.body.surname,
        Email: request.body.email
    };
    let result = await Repository.insert("users",jsonObject);
    response.send(result);
});

router.post('/fetch_all_students',urlencodedParser, async (request,response) => {
    let result = await Repository.fetchAllStudents();
    response.send(result);
});

router.post('/fetch_a_student_fee_statement',urlencodedParser, async (request,response) => {
    let admissionNumber = request.body.admissionNumber;
    let result = await Repository.fetchAStudentFeeStatement(admissionNumber)
    response.send(result[0]);
});

router.post('/fetch_a_student_installments',urlencodedParser, async (request,response) => {
    let admissionNumber = request.body.admissionNumber;
    let result = await Repository.fetchAStudentInstallments(admissionNumber)
    response.send(result);
});

module.exports = router;
