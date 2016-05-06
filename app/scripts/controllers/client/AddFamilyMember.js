(function (module) {
    mifosX.controllers = _.extend(module, {
        AddFamilyMember: function (scope, resourceFactory, location, dateFilter, routeParams) {
            scope.clientId = routeParams.clientId;
            scope.cancel = "#/viewclient/"+scope.clientId;
            scope.formData = {};
            scope.restrictDate = new Date();
            resourceFactory.familyMemberTemplateResource.getFamilyMemberTemplate({clientId : scope.clientId}, function (data) {
                scope.salutationOptions = data.salutationOptions;
                scope.relationshipOptions = data.relationshipOptions;
                scope.genderOptions = data.genderOptions;
                scope.occupationOptions = data.occupationOptions;
                scope.educationOptions = data.educationOptions;
            });

            scope.submit = function () {
                this.formData.dateOfBirth = dateFilter(scope.formData.dateOfBirth, scope.df);
                this.formData.locale = scope.optlang.code;
                this.formData.dateFormat = scope.df;
                resourceFactory.familyMembersResource.save({clientId:scope.clientId},this.formData, function (data) {
                    location.path('/viewclient/' + scope.clientId);
                });
            };
        }
    });

    mifosX.ng.application.controller('AddFamilyMember', ['$scope', 'ResourceFactory', '$location', 'dateFilter', '$routeParams', mifosX.controllers.AddFamilyMember]).run(function ($log) {
        $log.info("AddFamilyMember initialized");
    });
}(mifosX.controllers || {}));