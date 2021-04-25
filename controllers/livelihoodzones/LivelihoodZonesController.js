const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const LivelihoodZonesRepository = require('../../repositories/livelihoodzones/LivelihoodZonesRepository');

router.use(function timeLog(req, res, next) {
    next();
});

router.post('/fetch_a_county_sublocations_livelihoodzone_assignments',urlencodedParser, async (request,response) => {
    let countyId = request.body.countyId;
    let result = await LivelihoodZonesRepository.fetchACountySubLocationsLivelihoodZoneAssignment(countyId)
    response.send(result);
});

router.post('/fetch_a_county_livelihoodzones',urlencodedParser, async (request,response) => {
    let countyId = request.body.countyId;
    let result = await LivelihoodZonesRepository.fetchACountyLivelihoodZones(countyId);
    response.send(result);
});



module.exports = router;
