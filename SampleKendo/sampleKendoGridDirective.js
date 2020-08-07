'use strict';//Indicating browser should run only in java script mode
var app = angular.module("SampleApp", ["kendo.directives", "ui.bootstrap"]);

app.directive('sampleKendoGridDirective', function () {
    return ({
        restrict: "AE",
        transclude: true,
        replace: true,
        templateUrl: "SampleKendo/SampleKendoGrid.html",
        controller: "sampleKendoGridDController",//controller to bind
        controllerAs: "vm", bindToController: true,//
        scope: {
        },
        link: {

            //this method executes when the link function has started
            pre: function preLink($scope, $iElement, $iAttrs, $controller) {

            },
            //after compilation/binding of the data has completed this method is executed
            post: function postLink($scope, $iElement, $iAttrs, $controller) {

            }
        },
    })
}).controller('sampleKendoGridDController', ["$scope", "$uibModal", "$http", "$q", function ($scope, $uibModal, $http, $q) {
    this.$onInit = function () {
        $scope.PageinitOnLoad();
    };
    $scope.MainWidgets1 = {};
    $scope.MainWidgets2 = {};
    $scope.ShowLogin = true;
    $scope.PageinitOnLoad = function () {

        $scope.ShowDepartmentView = false;
        $scope.ViewData = "Click on this will redirect to department page";
        $scope.GetEmployeesInfo();
        $scope.GetDeptInfo();
    };

    $scope.GetDeptInfo = function () {
        var DataToService = {
            actionType: 10
        };
        $scope.PostData("POST", "http://35.154.5.57/SampleWebApi/SampleController/SampleCRUD", DataToService).then(function (ServiceResponse) {
            if (ServiceResponse) {
                $scope.SampleDepartmentGridDataSource.data(ServiceResponse.depatmentList);
            }
        });
    }


    $scope.GetEmployeesInfo = function () {
        var DataToService = {
            actionType: 9
        };
        $scope.PostData("POST", "http://35.154.5.57/SampleWebApi/SampleController/SampleCRUD", DataToService).then(function (ServiceResponse) {
            if (ServiceResponse) {
                $scope.SampleFirstGridDataSource.data(ServiceResponse.employeeList);
            }
        });
    };


    $scope.ViewClick = function () {
        if ($scope.ShowDepartmentView == false) {
            $scope.ShowDepartmentView = true;
            $scope.ViewData = "Click on this will redirect to Employee page";
        }
        else {
            $scope.ShowDepartmentView = false;
            $scope.ViewData = "Click on this will redirect to department page";
        }
    };




    //Data Source
    $scope.SampleFirstGridDataSource = new kendo.data.DataSource({
        data: [],
    });
    $scope.SampleFirstGridOptions = {
        dataSource: $scope.SampleFirstGridDataSource,//assigning the data source
        sortable: true,
        navigatable: true,
        persistSelection: true,
        selectable: "single row",
        columns: [
            {
                field: 'pkempid',
                title: 'Id',
                width: 100,
            },
            {
                field: 'empname',
                title: 'Name',
                width: 150,
            },
            {
                field: 'salary',
                title: 'salary',
                width: 150,
            },
            {
                field: 'deptname',
                title: 'Dept',
                width: 150,
            },
            {
                field: 'isactive',
                title: 'Active',
                width: 100,
            },
            {
                field: 'email',
                title: 'Email',
                width: 150,
            },
            {
                width: 100,
                command: [{
                    name: "Edit", text: "",
                    template: "<span id=\"SampleFirstGridEditIcon\" style=\"cursor: pointer\"  ng-click=\"SampleFirstGridEditIconClick(this.dataItem);\" ng-enter=\"SampleFirstGridEditIconClick(this.dataItem);\" title=\"Edit\"> <img src=\"Icons/edit.png\"></span>"
                }],
            },
            {
                command: [{
                    name: "Remove", text: "",
                    template: "<div style='cursor:pointer' ng-click='SampleFirstGridDeleteIconClick(this.dataItem)' ng-enter='SampleFirstGridDeleteIconClick(this.dataItem)' title=\"delete\"><img src=\"Icons/Cross_Orance.png\"></div>"
                }],
                width: 75,
            }
        ],
    };

    $scope.SampleFirstGridDeleteIconClick = function (data) {



    }

    $scope.SampleFirstGridOptions.dataBound = function (e) {

    };

    var DummyData1 = [];
    DummyData1.push(
        {
            Column1: "satya",
            Column2: "satya",
            Column3: "satya",
        });
    $scope.SampleFirstGridOptions.dataSource.data(DummyData1);
    //*******KENDO GRID BINDING BLOCK END*******
    //Data Source
    $scope.SampleDepartmentGridDataSource = new kendo.data.DataSource({
        data: [],
    });
    $scope.SampleDepartmentGridOptions = {
        dataSource: $scope.SampleDepartmentGridDataSource,//assigning the data source
        sortable: true,
        navigatable: true,
        selectable: "single row",
        columns: [
            {
                field: 'pkdeptid',
                title: 'ID',
                width: 250,
            },
            {
                field: 'deptname',
                title: 'Dept Name',
                width: 250,
            },
            {
                field: 'isactive',
                title: 'Active',
                width: 100,
            },
            {
                width: 100,
                command: [{
                    name: "Edit", text: "",
                    template: "<span id=\"SampleFirstGridEditIcon\" style=\"cursor: pointer\"  ng-click=\"SampleSecondGridEditIconClick(this.dataItem);\" ng-enter=\"SampleSecondGridEditIconClick(this.dataItem);\" title=\"Edit\"> <img src=\"Icons/edit.png\"></span>"
                }],
            },
            {
                command: [{
                    name: "Remove", text: "",
                    template: "<div style='cursor:pointer' ng-click='SampleSecondGridDeleteIconClick(this.dataItem)' ng-enter='SampleSecondGridDeleteIconClick(this.dataItem)' title=\"delete\"><img src=\"Icons/Cross_Orance.png\"></div>"
                }],
                width: 75,
            }
        ],
    };

    $scope.SampleDepartmentGridOptions.dataBound = function (e) {

    };
    var DummyData2 = [];
    DummyData2.push(
        {
            ID: "Deva",
            Column2: "Deva",
            Column3: "Deva",
        });
    $scope.SampleDepartmentGridOptions.dataSource.data(DummyData2);

    $scope.ForgotPassword = function () {
        if (!$scope.username) {
            alert("Enter User Name");
            return;
        }

        var datatoservice = {
            actionType: 8,
            Login: {
                UserName: $scope.username
            }
        }

        $scope.PostData("POST", "http://35.154.5.57/SampleWebApi/SampleController/SampleCRUD", datatoservice).then(function (ServiceResponse) {
            if (!ServiceResponse) {
                alert("Faile");
                return;
                //$scope.ShowLogin = false;
            }
            if (ServiceResponse.loginModel.userPassword) {
                alert("Password is : " + ServiceResponse.loginModel.userPassword);
                return;
            } else {
                alert("No Password!");

            }
        });
    }


    $scope.SampleSecondGridEditIconClick = function (SelectedDataItem) {
        var grid = $("#SampleDeployementGridID").data('kendo-Grid')
        var DataToPopup = grid.dataItem(grid.select());
        var modalInstance = $uibModal.open({
            templateUrl: "SampleKendo/AddUpdateDeptPopup.html",
            controller: "AddUpdateDeptController",
            windowClass: 'app-modal-window',
            resolve: {
                ParentPopupData: function () {
                    return DataToPopup
                }
            }
        });

        modalInstance.result.then(function (response) {
            $scope.result = `${response} button hitted`;
            $scope.GetDeptInfo();
        });
    }

    $scope.SampleSecondGridDeleteIconClick = function (SelectedDataItem) {
        var grid = $("#SampleDeployementGridID").data('kendo-Grid')
        var DataToPopup = grid.dataItem(grid.select());

        var datatoservice = {
            actionType: 6,
            depatmentModel: {
                pkdeptid: DataToPopup.pkdeptid

            }
        }

        $scope.PostData("POST", "http://35.154.5.57/SampleWebApi/SampleController/SampleCRUD", datatoservice).then(function (ServiceResponse) {
            if (!ServiceResponse) {
                alert("Delete Failed");
                return;
                //$scope.ShowLogin = false;
            }
            if (ServiceResponse.status == false) {
                alert("Delete Failed");
                return;
            } else {
                $scope.GetDeptInfo();
                alert("Delete Success");

            }
        });
    }


    $scope.SampleFirstGridEditIconClick = function (SelectedDataItem) {
        var grid = $("#SampleFirstGridID").data('kendo-Grid')
        var DataToPopup = grid.dataItem(grid.select());
        var modalInstance = $uibModal.open({
            templateUrl: "SampleKendo/AddUpdateEmployeePopup.html",
            controller: "AddUpdateEmployeeController",
            windowClass: 'app-modal-window',
            resolve: {
                ParentPopupData: function () {
                    return DataToPopup
                }
            }
        });

        modalInstance.result.then(function (response) {
            $scope.result = `${response} button hitted`;
            $scope.GetEmployeesInfo();
        });


    };

    $scope.SampleFirstGridDeleteIconClick = function (SelectedDataItem) {
        var grid = $("#SampleFirstGridID").data('kendo-Grid')
        var DataToPopup = grid.dataItem(grid.select());

        var datatoservice = {
            actionType: 3,
            employeeModel: {
                Pkempid: DataToPopup.pkempid
            }
        }

        $scope.PostData("POST", "http://35.154.5.57/SampleWebApi/SampleController/SampleCRUD", datatoservice).then(function (ServiceResponse) {
            if (!ServiceResponse) {
                alert("Delete Failed");
                return;
                //$scope.ShowLogin = false;
            }
            if (ServiceResponse.status == false) {
                alert("Delete Failed");
                return;
            } else {
                $scope.GetEmployeesInfo();
                alert("Delete Success");

            }
        });
    };

    $scope.AddDept = function () {
        var modalInstance = $uibModal.open({
            templateUrl: "SampleKendo/AddUpdateDeptPopup.html",
            controller: "AddUpdateDeptController",
            windowClass: 'app-modal-window',
            resolve: {
                ParentPopupData: function () {
                    return null
                }
            }
        });

        modalInstance.result.then(function (response) {
            $scope.result = `${response} button hitted`;
            $scope.GetDeptInfo();
        });
    }

    $scope.AddEmployee = function () {

        var modalInstance = $uibModal.open({
            templateUrl: "SampleKendo/AddUpdateEmployeePopup.html",
            controller: "AddUpdateEmployeeController",
            windowClass: 'app-modal-window',
            resolve: {
                ParentPopupData: function () {
                    return null
                }
            }
        });

        modalInstance.result.then(function (response) {
            $scope.result = `${response} button hitted`;
            $scope.GetEmployeesInfo();
        });
    };

    $scope.Login = function () {
        if (!$scope.username && !$scope.password) {
            //$scope.ShowLogin = false;
            return;
        }

        var DataToService = {
            actionType: 7,
            Login: {
                UserName: $scope.username,
                UserPassword: $scope.password
            }
        }

        $scope.PostData("POST", "http://35.154.5.57/SampleWebApi/SampleController/SampleCRUD", DataToService).then(function (ServiceResponse) {
            if (!ServiceResponse) {
                alert("Login Failed");
                return;
                //$scope.ShowLogin = false;
            }
            if (ServiceResponse.status == false) {
                alert("Invalid email or password");
                return;
            } else {
                $scope.ShowLogin = false;
            }
        });

    };

    //this method i sueful in sending the http requests to the WCF services
    $scope.PostData = function (MethodType, MethodUrl, Data) {

        //MAXIMUM TIMEOUT OF THE CURRENT REQUEST
        var requestTimeout = 35 * 1000;//35 seconds
        var deferred = $q.defer();

        $http({
            method: MethodType,
            url: MethodUrl,
            data: Data,
            timeout: requestTimeout,
        }).then(function (data) {

            if (!data && data == "null") data = undefined;

            deferred.resolve(data.data);
        }, function (reason) {
            deferred.reject(reason);

        });

        return deferred.promise;
    };
}]);


//Modal Popup Js
app.controller('AddUpdateEmployeeController', ["$scope", "$uibModalInstance", "ParentPopupData", "$http", "$q", function ($scope, $uibModalInstance, ParentPopupData, $http, $q) {


    var DUMMYDADROPDATA = [
        { "DeployementName": "All", "DeployementID": "0" },
        { "DeployementName": "No Action", "DeployementID": "1" }
    ];


    this.$onInit = function () {
        $scope.HeaderName = "Employee";
        $scope.BtnName = "Submit";
        $scope.DepartmentsList = {};
        $scope.Departmentssource = new kendo.data.DataSource({
            data: [],
        });
        //Get Deployements Group
        //$scope.DeployementDatasource.data(ServiceResponse();


        $scope.GetDepatmentList();
    };

    $scope.GetDepatmentList = function () {
        var DataToService = { actionType: 10 }

        $scope.ModalPostData("POST", "http://35.154.5.57/SampleWebApi/SampleController/SampleCRUD", DataToService).then(function (ServiceResponse) {
            if (!ServiceResponse) {
                alert("Login Failed");
                return;
                //$scope.ShowLogin = false;
            }
            if (ServiceResponse.depatmentList) {
                $scope.Departmentssource.data(ServiceResponse.depatmentList);
                if (ParentPopupData) {
                    $scope.EmpName = ParentPopupData.empname;
                    $scope.Email = ParentPopupData.email;
                    $scope.Password = ParentPopupData.password;
                    $scope.Salary = ParentPopupData.salary;
                    $scope.IsActive = ParentPopupData.isactive;
                    $scope.SelectedDept = ParentPopupData.pkdeptid;
                }
            }
        });
    }


    $scope.ok = function () {
        if (ParentPopupData) {
            if (ParentPopupData.pkempid) {
                var datatoservice = {
                    actionType: 2,
                    employeeModel: {
                        Pkempid: ParentPopupData.pkempid,
                        Empname: $scope.EmpName,
                        Email: $scope.Email,
                        Password: $scope.Password,
                        Salary: $scope.Salary,
                        Isactive: $scope.IsActive,
                        Fkdeptid: $scope.SelectedDept
                    }
                }
            }
        }
        else {
            var datatoservice = {
                actionType: 1,
                employeeModel: {
                    Empname: $scope.EmpName,
                    Email: $scope.Email,
                    Password: $scope.Password,
                    Salary: $scope.Salary,
                    Isactive: $scope.IsActive,
                    Fkdeptid: $scope.SelectedDept
                }
            }
        }

        $scope.ModalPostData("POST", "http://35.154.5.57/SampleWebApi/SampleController/SampleCRUD", datatoservice).then(function (ServiceResponse) {
            if (!ServiceResponse) {
                alert("Employee Save Failed");
                return;
                //$scope.ShowLogin = false;
            }
            $uibModalInstance.close("Ok");

        });



    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    };


    //this method i sueful in sending the http requests to the WCF services
    $scope.ModalPostData = function (MethodType, MethodUrl, Data) {

        //MAXIMUM TIMEOUT OF THE CURRENT REQUEST
        var requestTimeout = 35 * 1000;//35 seconds
        var deferred = $q.defer();

        $http({
            method: MethodType,
            url: MethodUrl,
            data: Data,
            timeout: requestTimeout,
        }).then(function (data) {

            if (!data && data == "null") data = undefined;

            deferred.resolve(data.data);
        }, function (error) {

            deferred.reject(error);

        });

        return deferred.promise;
    };

}]);



app.controller('AddUpdateDeptController', ["$scope", "$uibModalInstance", "ParentPopupData", "$http", "$q", function ($scope, $uibModalInstance, ParentPopupData, $http, $q) {


    var DUMMYDADROPDATA = [
        { "DeployementName": "All", "DeployementID": "0" },
        { "DeployementName": "No Action", "DeployementID": "1" }
    ];


    this.$onInit = function () {
        $scope.HeaderName = "Employee";
        $scope.BtnName = "Submit";
        $scope.DepartmentsList = {};
        $scope.Departmentssource = new kendo.data.DataSource({
            data: [],
        });
        //Get Deployements Group
        //$scope.DeployementDatasource.data(ServiceResponse();

        if (ParentPopupData) {
            $scope.DeptName = ParentPopupData.deptname;
            $scope.DeptIsActive = ParentPopupData.isactive;
        }

    };

    $scope.ok = function () {
        if (ParentPopupData) {
            if (ParentPopupData.pkdeptid) {
                var datatoservice = {
                    actionType: 5,
                    depatmentModel: {
                        pkdeptid: ParentPopupData.pkdeptid,
                        deptname: $scope.DeptName,
                        Isactive: $scope.DeptIsActive
                    }
                }
            }
        }
        else {
            var datatoservice = {
                actionType: 4,
                depatmentModel: {
                    deptname: $scope.DeptName,
                    Isactive: $scope.DeptIsActive
                }
            }
        }

        $scope.ModalPostData("POST", "http://35.154.5.57/SampleWebApi/SampleController/SampleCRUD", datatoservice).then(function (ServiceResponse) {
            if (!ServiceResponse) {
                alert("Dept Save Failed");
                return;
                //$scope.ShowLogin = false;
            }
            $uibModalInstance.close("Ok");

        });



    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    };


    //this method i sueful in sending the http requests to the WCF services
    $scope.ModalPostData = function (MethodType, MethodUrl, Data) {

        //MAXIMUM TIMEOUT OF THE CURRENT REQUEST
        var requestTimeout = 35 * 1000;//35 seconds
        var deferred = $q.defer();

        $http({
            method: MethodType,
            url: MethodUrl,
            data: Data,
            timeout: requestTimeout,
        }).then(function (data) {

            if (!data && data == "null") data = undefined;

            deferred.resolve(data.data);
        }, function (error) {

            deferred.reject(error);

        });

        return deferred.promise;
    };

}]);