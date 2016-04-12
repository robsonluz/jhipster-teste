(function() {
    'use strict';

    angular
        .module('app2App')
        .controller('BookDetailController', BookDetailController);

    BookDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Book'];

    function BookDetailController($scope, $rootScope, $stateParams, entity, Book) {
        var vm = this;
        vm.book = entity;
        vm.load = function (id) {
            Book.get({id: id}, function(result) {
                vm.book = result;
            });
        };
        var unsubscribe = $rootScope.$on('app2App:bookUpdate', function(event, result) {
            vm.book = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
