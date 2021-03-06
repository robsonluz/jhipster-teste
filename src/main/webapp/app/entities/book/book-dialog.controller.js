(function() {
    'use strict';

    angular
        .module('app2App')
        .controller('BookDialogController', BookDialogController);

    BookDialogController.$inject = ['$scope', '$stateParams', '$uibModalInstance', 'entity', 'Book'];

    function BookDialogController ($scope, $stateParams, $uibModalInstance, entity, Book) {
        var vm = this;
        vm.book = entity;
        vm.load = function(id) {
            Book.get({id : id}, function(result) {
                vm.book = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('app2App:bookUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.book.id !== null) {
                Book.update(vm.book, onSaveSuccess, onSaveError);
            } else {
                Book.save(vm.book, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };

        vm.datePickerOpenStatus = {};
        vm.datePickerOpenStatus.data = false;

        vm.openCalendar = function(date) {
            vm.datePickerOpenStatus[date] = true;
        };
    }
})();
