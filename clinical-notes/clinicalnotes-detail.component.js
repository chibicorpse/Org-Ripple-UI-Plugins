let templateClinicalnotesDetail = require('./clinicalnotes-detail.html');

class ClinicalnotesDetailController {
  constructor($scope, $state, $stateParams, $ngRedux, clinicalnotesActions, serviceRequests, ClinicalnotesModal) {
    serviceRequests.publisher('routeState', {state: $state.router.globals.current.views, name: 'patients-details'});
    serviceRequests.publisher('headerTitle', {title: 'Patients Details'});

    this.edit = function () {
      ClinicalnotesModal.openModal(this.currentPatient, {title: 'Edit Clinical Note'}, this.clinicalNote, this.currentUser);
    };
    
    this.setCurrentPageData = function (data) {
      if (data.patients.data) {
        this.currentPatient = data.patients.data;
      }
      if (data.clinicalnotesGet.data) {
        this.clinicalNote = data.clinicalnotesGet.data;
        this.dateCreated = moment(this.clinicalNote.dateCreated).format('DD-MMM-YYYY');
      }
    };

    let unsubscribe = $ngRedux.connect(state => ({
      getStoreData: this.setCurrentPageData(state)
    }))(this);

    $scope.$on('$destroy', unsubscribe);

    this.clientnotesLoad = clinicalnotesActions.get;
    this.clientnotesLoad($stateParams.patientId, $stateParams.clinicalNoteIndex, $stateParams.source);
  }
}

const ClinicalnotesDetailComponent = {
  template: templateClinicalnotesDetail,
  controller: ClinicalnotesDetailController
};

ClinicalnotesDetailController.$inject = ['$scope', '$state', '$stateParams', '$ngRedux', 'clinicalnotesActions', 'serviceRequests', 'ClinicalnotesModal'];
export default ClinicalnotesDetailComponent;