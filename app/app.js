/*global angular */

(function () {
    'use strict';

    var purchaseModule = angular.module('purchaseModule', ['ngRoute', 'ngAnimate', 'ngResource']);

    // configure our routes
    purchaseModule.config(function ($routeProvider) {
        $routeProvider
        // route for the landing index page
            .when('/', {
                templateUrl: 'app/views/page/partials/landing.html',
                controller: 'mainController'
            })
        // route for the purchasing page
            .when('/services', {
                templateUrl: 'app/views/page/partials/purchases.html',
                controller: 'getController'
            })
        // route for the purchaseModule page
            .when('/confirm', {
                templateUrl: 'app/views/page/partials/confirm.html',
                controller: 'confirmController'
            });
    });
    // create the controller and inject Angular's $scope
    purchaseModule.controller('mainController', function ($scope) {
        $scope.productTotal = 0;

        $scope.busServices = [
            {key: 'a1', name: 'Business Service 1', price: 14.23, selected: false},
            {key: 'a7', name: 'Business Service 2', price: 24.23, selected: false},
            {key: 'a5', name: 'Business Service 3', price: 34.23, selected: false},
            {key: 'a3', name: 'Business Service 4', price: 44.23, selected: false},
            {key: 'a2', name: 'Business Service 5', price: 54.23, selected: false},
            {key: 'a9', name: 'Business Service 6', price: 64.23, selected: false}
        ];

//        $scope.arrayCollection = connectionToMongoLabs();
//        console.log($scope.arayCollection);

        $scope.selectedProducts = [];

        $scope.getTotal = function () {
            var i = 0,
                total = 0;
            var product = {};

            for (i; i < $scope.busServices.length; i++) {
                product = $scope.busServices[i];
                if (product.selected) {
                    total += (product.price);
                }
            }
            console.log("fired");
            return total;
        };
    });
    // create the controller and inject Angular's $scope
    purchaseModule.controller('getController', function ($scope) {
        var productTotal;
        var i, selected;
        
        $scope.updateTotalsOnLoad = function () {
            for (i = 0; i<$scope.busServices.length; i++) {
                selected = $scope.busServices[i].selected;
                if (selected === true) {
                    $scope.productTotal += $scope.busServices[i].price;
                }
            }
            return $scope.productTotal;
        };  // end function ProductTotalsOnLoad

        $scope.updateTotals = function (key) {
            var i = 0;
            var product = {};
            var el = document.getElementById('product-input-' + key);
            //var elTotal = document.getElementById('purchase-product-total');

            for (i; i < $scope.busServices.length; i++) {
                product = $scope.busServices[i];
                if (product.key === key) {

                    if (el.checked) {
                        $scope.productTotal += product.price;
                        product.selected = true;
                        $scope.selectedProducts.push(product);
                    } else {
                        $scope.productTotal -= product.price;
                        product.selected = false;
                    }  // end if checked
                } // end if product key
                $scope.busServices[i] = product;
            } // end busServices Loop
        }; // end function updateTotals
    });
    // create the controller and inject Angular's $scope
    purchaseModule.controller('confirmController', function ($scope) {
        console.log($scope.selectedProducts);
    });
}());