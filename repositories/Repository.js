var mysql = require("mysql");
var express = require("express");
var app = express();
var path = require("path");
var con = require("../common/dbConnect.js");

module.exports = class Repository {

    static insert(tableName, jsonObject) {
        return new Promise(function(resolve, reject) {
            con.query("INSERT INTO " + tableName + " SET ?", jsonObject, function(
                err,
                result
            ) {
                if (err) {
                    reject(err);
                } else {
                    var returned_value_ = {
                        success: true,
                        message: "Record inserted succesfully.",
                        recordId: result.insertId
                    };
                    resolve(returned_value_);
                }
            });
        });
    }

    static fetchAllStudents() {
        return new Promise(function(resolve, reject) {
            con.query(
                "SELECT * FROM students;",
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

    static fetchAStudentFeeStatement(admissionNumber) {
        return new Promise(function(resolve, reject) {
            con.query(
                "SELECT * FROM fee WHERE fee.AdmissionNo = " +
                mysql.escape(admissionNumber),
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

    static fetchAStudentInstallments(admissionNumber) {
        return new Promise(function(resolve, reject) {
            con.query(
                "SELECT * FROM installments WHERE installments.AdmissionNo = " +
                mysql.escape(admissionNumber),
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
