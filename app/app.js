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
        // route for the services purchasing page
            .when('/services', {
                templateUrl: 'app/views/page/partials/purchases.html',
                controller: 'servicesController'
            })
            .when('/services/:services_id', {
                templateUrl: 'app/views/page/partials/purchases-item.html',
                controller: 'servicesController'
            })
        // route for the services purchasing page
            .when('/subscriptions', {
                templateUrl: 'app/views/page/partials/subscriptions.html',
                controller: 'subscriptionsController'
            })
            .when('/subscriptions/:subscription_id', {
                templateUrl: 'app/views/page/partials/purchases-item.html',
                controller: 'subscriptionsController'
            })
        // route for the confirm purchases page
            .when('/confirm', {
                templateUrl: 'app/views/page/partials/confirm.html',
                controller: 'confirmController'
            });
    });
    // create the controller and inject Angular's $scope
    purchaseModule.controller('mainController', function ($scope) {
        $scope.productTotal = 0;

        $scope.busServices = [
            {key: 'a1', name: 'Business Service 1', price: 14.23, selected: false, description: 'This is a description of product key a1.'},
            {key: 'a7', name: 'Business Service 2', price: 24.23, selected: false, description: 'This is a description of product key a7.'},
            {key: 'a5', name: 'Business Service 3', price: 34.23, selected: false, description: 'This is a description of product key a5.'},
            {key: 'a3', name: 'Business Service 4', price: 44.23, selected: false, description: 'This is a description of product key a3.'},
            {key: 'a2', name: 'Business Service 5', price: 54.23, selected: false, description: 'This is a description of product key a2.'},
            {key: 'a9', name: 'Business Service 6', price: 64.23, selected: false, description: 'This is a description of product key a9.'}
        ];

        $scope.busSubscriptons = [
            {key: 'b14', name: 'Subscriptions 1', price: 14.43, selected: false, description: 'This is a description of product key b14.'},
            {key: 'b23', name: 'Subscriptions 2', price: 24.43, selected: false, description: 'This is a description of product key b23.'},
            {key: 'b19', name: 'Subscriptions 3', price: 34.43, selected: false, description: 'This is a description of product key b19.'},
            {key: 'b11', name: 'Subscriptions 4', price: 44.43, selected: false, description: 'This is a description of product key b11.'},
            {key: 'b21', name: 'Subscriptions 5', price: 54.43, selected: false, description: 'This is a description of product key b21.'},
            {key: 'b26', name: 'Subscriptions 6', price: 64.43, selected: false, description: 'This is a description of product key b26.'}
        ];

//        $scope.arrayCollection = connectionToMongoLabs();
//        console.log($scope.arayCollection);

        $scope.selectedProducts = [];
/**
 * [getTotal is used to loop through the scoped objects and get totals from
 * other controllers.  It needs to be left in the scope and in the main
 * controller.]
 * @return total {[number]} [retuns grand total]
 */
        $scope.getTotal = function () {
            var i,
                totals;
            var services = 0, subscriptions = 0;
            var product = {};

            for (i = 0; i < $scope.busServices.length; i += 1) {
                product = $scope.busServices[i];
                if (product.selected) {
                    services += product.price;
                }
            }

            for (i = 0; i < $scope.busSubscriptons.length; i += 1) {
                product = $scope.busSubscriptons[i];
                if (product.selected) {
                    subscriptions += product.price;
                }
            }

            totals = services + subscriptions;
            return totals;
        };
    });
    // create the controller and inject Angular's $scope
    purchaseModule.controller('servicesController', function ($scope, $routeParams) {
        var i, selected;
        var product = {};

        // to show a single product item
        if ($routeParams.services_id) {
            $scope.key = $routeParams.services_id.substring(1);

            for (i = 0; i < $scope.busServices.length; i += 1) {
                product = $scope.busServices[i];
                if (product.key === $scope.key) {
                    $scope.product = product;
                }
            }
        }

        // to purchase a single product item
        $scope.addItem = function (product) {
            //var toggleButton = document.getElementById('purchase-item');
            var confirm = document.getElementById('confirmation');
            var btn, text;
            // Check if the product is already added

            for (i = 0; i < $scope.busServices.length; i += 1) {
                if ($scope.busServices[i].key === product.key && $scope.busServices[i].selected !== true) {
                    console.log("item not detected.  Adding item");
                    // add the price to the scoped total price (this might be refactored into
                    // an object.total property)
                    $scope.productTotal += product.price;
                    // add to the selectProducts in scope
                    $scope.selectedProducts.push(product);

                    // mark the matching selected property in the Model.
                    $scope.busServices[i].selected = true;

                    btn = document.createElement('a');
                    text = document.createTextNode('return');
                    btn.setAttribute('href', "#/services");
                    btn.appendChild(text);
                    document.body.appendChild(btn);

                } else {
                    confirm.innerHTML = "Item is in cart.";
                }  //end if
            } // end loop
        }; // end addItem function

        /**
         * When the template loads, loop through the $scope model and
         * talley the current totals. This should be refactored into
         * a service factory to prevent duplicate code.
         */

        $scope.updateTotalsOnLoad = function () {
            for (i = 0; i < $scope.busServices.length; i += 1) {
                selected = $scope.busServices[i].selected;
                if (selected === true) {
                    $scope.productTotal += $scope.busServices[i].price;
                }
            }
            return $scope.productTotal;
        };  // end function ProductTotalsOnLoad

        /**
         * When an item is selected, it's price is added to the totals and the
         * product object is added to the selectedProducts Object.  This should
         * be refactored into a service factory to prevent duplicate code.
         */

        $scope.updateTotals = function (key) {
            var el = document.getElementById('product-input-' + key);
            //var elTotal = document.getElementById('purchase-product-total');

            for (i = 0; i < $scope.busServices.length; i += 1) {
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
    purchaseModule.controller('subscriptionsController', function ($scope, $routeParams) {
        var i, selected;
        var product = {};

        // to show a single product item
        if ($routeParams.subscription_id) {
            console.log("route fired");
            $scope.key = $routeParams.subscription_id.substring(1);
            console.log($scope.key);

            for (i = 0; i < $scope.busSubscriptons.length; i += 1) {
                product = $scope.busSubscriptons[i];
                if (product.key === $scope.key) {
                    $scope.product = product;
                }
            }
        }

        // to purchase a single product item
        $scope.addItem = function (product) {
            //var toggleButton = document.getElementById('purchase-item');
            var confirm = document.getElementById('confirmation');
            var btn, text;
            // Check if the product is already added

            for (i = 0; i < $scope.busSubscriptons.length; i += 1) {
                if ($scope.busSubscriptons[i].key === product.key && $scope.busSubscriptons[i].selected !== true) {
                    console.log("item not detected.  Adding item");
                    // add the price to the scoped total price (this might be refactored into
                    // an object.total property)
                    $scope.productTotal += product.price;
                    // add to the selectProducts in scope
                    $scope.selectedProducts.push(product);

                    // mark the matching selected property in the Model.
                    $scope.busServices[i].selected = true;

                    btn = document.createElement('a');
                    text = document.createTextNode('return');
                    btn.setAttribute('href', "#/services");
                    btn.appendChild(text);
                    document.body.appendChild(btn);

                } else {
                    confirm.innerHTML = "Item is in cart.";
                }  //end if
            } // end loop
        }; // end addItem function

        /**
         * When the page load, loop through the persistent model and
         * talley the current totals.  This should be refactored into
         * a service factory to prevent duplicate code.
         */

        $scope.updateTotalsOnLoad = function () {
            for (i = 0; i < $scope.busSubscriptons.length; i += 1) {
                selected = $scope.busSubscriptons[i].selected;
                if (selected === true) {
                    $scope.productTotal += $scope.busSubscriptons[i].price;
                }
            }
            return $scope.productTotal;
        };  // end function ProductTotalsOnLoad

        /**
         * When an item is select, it's pice is added to the totals and it is
         * added to the selectedProducts Object.
         */

        $scope.updateTotals = function (key) {
            var el = document.getElementById('product-input-' + key);
            //var elTotal = document.getElementById('purchase-product-total');

            for (i = 0; i < $scope.busSubscriptons.length; i += 1) {
                product = $scope.busSubscriptons[i];
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
                $scope.busSubscriptons[i] = product;
            } // end busServices Loop
        }; // end function updateTotals
    });  // end subscriptions controller
    // create the controller and inject Angular's $scope
    purchaseModule.controller('confirmController', function ($scope) {
        console.log($scope.selectedProducts);

       console.dir($scope);
        var i;
        var product = {};
        var confirmServices = [];
/*
        for (i = 0; i < $scope.busServices.length; i += 1) {
            product = $scope.busServices[i];
            if (product.selected) {
                confirmServices.push(product);
                $scope.confirmServices.total += product.price;
            }
        }
        console.dir($scope.busServices);
        console.dir(confirmServices);

        for (i = 0; i < $scope.busSubscriptions.length; i += 1) {
            product = objSubscriptions[i];
            if (product.selected) {
                $scope.confirmSubscriptions.push(product);
                $scope.confirmSubscriptions.total += product.price;
            }
        }
*/
        // setup stripe with test API key
    $scope.chargeTOStripe = function chargeToStripe (total) {
        var stripe = require("stripe")(
            "sk_test_mkGsLqEW6SLnZa487HYfJVLf"
        );

        // create charge using stripe module
        stripe.charges.create({
          amount: total,
          currency: "usd",
          card: {
            number: '4242424242424242',
            exp_month: 12,
            exp_year: 2014,
            cvc: '123'
          },
          description: "Charge for test@example.com"
        }).then(function(charge) {
          console.log("Charge created");
          console.log(charge);
        }, function(err) {
          console.log(err);
        });
    };
}());