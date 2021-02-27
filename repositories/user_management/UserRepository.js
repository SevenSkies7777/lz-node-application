var mysql = require("mysql");
var express = require("express");
var app = express();
var path = require("path");
var con = require("../../common/dbConnect.js");

module.exports = class Repository {

    static fetchAllUsers() {
        return new Promise(function(resolve, reject) {
            con.query(
                "SELECT * FROM users INNER JOIN counties c on users.CountyId = c.CountyId",
                function(err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    }


    static fetchAUserRolesByUserId(userId) {
        return new Promise(function(resolve, reject) {
            con.query(
                "SELECT * FROM users INNER JOIN user_roles ur on users.UserId = ur.UserId INNER JOIN roles r on ur.RoleId = r.RoleId WHERE users.UserId = " +
                mysql.escape(userId),
                function(err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    }


    static fetchAUserSpecificRoleByUserIdAndRoleId(userId,roleId) {
        return new Promise(function(resolve, reject) {
            con.query(
                "SELECT * FROM users INNER JOIN user_roles ur on users.UserId = ur.UserId INNER JOIN roles r on ur.RoleId = r.RoleId WHERE users.UserId = " +userId+ " AND ur.RoleId = " +
            mysql.escape(roleId),
                function(err, result) {
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
