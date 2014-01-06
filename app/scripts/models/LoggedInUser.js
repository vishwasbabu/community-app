(function(module) {
  mifosX.models = _.extend(module, {
    LoggedInUser: function(data) {
      this.name = data.username;
      this.userPermissions = data.userPermissions;

      this.getHomePageIdentifier = function() {
        var role = _.first(data.selectedRoles || data.roles);
        return mifosX.models.roleMap[role.id];
      };
    }
  });
}(mifosX.models || {}));
