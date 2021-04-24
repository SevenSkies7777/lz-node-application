var mysql = require("mysql");
var express = require("express");
var app = express();
var path = require("path");
var con = require("../../common/dbConnect.js");

module.exports = class LivelihoodZonesRepository {

    static fetchACountySubLocationsLivelihoodZoneAssignment(countyId) {
        return new Promise(function (resolve, reject) {
            con.query(
                "SELECT * FROM counties INNER JOIN subcounties ON counties.CountyId = subcounties.CountyId INNER JOIN wards ON subcounties.SubCountyId = wards.SubCountyId INNER JOIN sublocations ON wards.WardId = sublocations.WardId INNER JOIN sublocations_livelihoodzone_assignment ON sublocations.SubLocationId = sublocations_livelihoodzone_assignment.SubLocationId INNER JOIN livelihood_zones ON livelihood_zones.LivelihoodZoneId = sublocations_livelihoodzone_assignment.LivelihoodZoneId WHERE counties.CountyId = " +
                mysql.escape(countyId),
                function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    }

};
