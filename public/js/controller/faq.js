/*global angular*/

"use strict";

var iac-app = angular.module("iac-app", [
    "iac-app.services",
    "iac-app.controllers",
    "iac-app.filters",
    "iac-app.directives",
    "ui.bootstrap"
]);

iac-app.config(function ($routeProvider) {
    $routeProvider
        .when("/",
        {
            controller: "iacAppControllers",
            templateUrl: "iac-app/faq.html"
        })
        .otherwise({ redirectTo: "/" });
});