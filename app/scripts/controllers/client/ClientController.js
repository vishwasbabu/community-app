(function(module) {
  mifosX.controllers = _.extend(module, {
    ClientController: function(scope, resourceFactory , paginatorService, location) {
        
      scope.clients = [];
      scope.routeTo = function(id){
      if (scope.showTask('READ_CLIENT')) {
        //delete the manually created errors to display api errors if request fails.
        delete scope.errorDetails;
        location.path('/viewclient/'+ id);
      } else{
        scope.errorDetails = [];
        scope.errorDetails.push({code:'error.msg.not.authorized'});
      };
      };

      if (scope.showTask('READ_CLIENT')) {
        //delete the manually created errors to display api errors if request fails.
        delete scope.errorDetails;
        var fetchFunction = function(offset, limit, callback) {
          resourceFactory.clientResource.getAllClients({offset: offset, limit: limit} , callback);
        };
        scope.clients = paginatorService.paginate(fetchFunction, 14);
      } else{
        scope.errorDetails = [];
        scope.errorDetails.push({code:'error.msg.not.authorized'});
      };
    }
  });
  mifosX.ng.application.controller('ClientController', ['$scope', 'ResourceFactory', 'PaginatorService','$location',  mifosX.controllers.ClientController]).run(function($log) {
    $log.info("ClientController initialized");
  });
}(mifosX.controllers || {}));
