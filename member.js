function skillsMember() {
  return {
    restrict: 'E',
    scope: {
      member: '='
    },
    template: '<div>{{member.name}}</div>'
  };
}