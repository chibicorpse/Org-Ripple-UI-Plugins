let templateClinicalnotesList = require('./clinicalnotes-list.html');

class ClinicalnotesListController {
  constructor($scope, $state, $stateParams, $ngRedux, clinicalnotesActions, serviceRequests, ClinicalnotesModal) {
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, name: 'patients-details'});
    serviceRequests.publisher('headerTitle', {title: 'Patients Details'});

    this.currentPage = 1;
    this.query = '';

    this.create = function () {
      ClinicalnotesModal.openModal(this.currentPatient, {title: 'Create Clinical Note'}, {}, this.currentUser);
    };
    
    this.go = function (id, clinicalNoteSource) {
      $state.go('clinicalNotes-detail', {
        patientId: $stateParams.patientId,
        clinicalNoteIndex: id,
        filter: this.query,
        page: this.currentPage,
        reportType: $stateParams.reportType,
        searchString: $stateParams.searchString,
        queryType: $stateParams.queryType,
        source: clinicalNoteSource
      });
    };

    this.pageChangeHandler = function (newPage) {
      $scope.currentPage = newPage;
    };

    if ($stateParams.page) {
      $scope.currentPage = $stateParams.page;
    }

    this.search = function (row) {
      return (
        angular.lowercase(row.type).indexOf(angular.lowercase($scope.query) || '') !== -1 ||
        angular.lowercase(row.author).indexOf(angular.lowercase($scope.query) || '') !== -1 ||
        angular.lowercase(row.dateCreated).indexOf(angular.lowercase($scope.query) || '') !== -1 ||
        angular.lowercase(row.source).indexOf(angular.lowercase($scope.query) || '') !== -1
      );
    };

    if ($stateParams.filter) {
      this.query = $stateParams.filter;
    }


    this.selected = function (clinicalNoteIndex) {
      return clinicalNoteIndex === $stateParams.clinicalNoteIndex;
    };

    this.setCurrentPageData = function (data) {
      if (data.patients.data) {
        this.currentPatient = data.patients.data;
      }
      if (data.clinicalnotes.data) {
        this.clinicalNotes = data.clinicalnotes.data;
      }
      if (data.user.data) {
        this.currentUser = data.user.data;
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.clientnotesLoad = clinicalnotesActions.all;
    this.clientnotesLoad($stateParams.patientId);
  }
}

const ClinicalnotesListComponent = {
  template: templateClinicalnotesList,
  controller: ClinicalnotesListController
};

ClinicalnotesListController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'clinicalnotesActions', 'serviceRequests', 'ClinicalnotesModal'];
export default ClinicalnotesListComponent;