import { BaseController } from './BaseController'

class ExampleController extends BaseController {
	constructor($scope){
		this.$scope = $scope;
	}
}

ExampleController.$inject = ['$scope']
export { ExampleController }