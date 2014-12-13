
  module.controller('AppController', function($scope, $data) {
    $scope.doSomething = function() {
      setTimeout(function() {
        alert('tappaed');
      }, 100);
    };
  });

  module.controller('ApiLolController', function($scope,$http){

    $scope.nombreInvocador = "paisatandil"

    $scope.apiKey = '?api_key=403fb85e-20f7-4c8e-ac5c-a47402a2ac7c';

    $scope.consultaInvocador = 'api/lol/las/v1.4/summoner/by-name/';

    $scope.serverName = 'https://las.api.pvp.net/';

    $scope.encontrado = false;

    function statsSummary(){

        return 'api/lol/las/v1.3/stats/by-summoner/' +  $scope.invocador[$scope.nombreInvocadorIngresado].id + '/summary';
    } 

    //Gets the summary by type of game:
    function getSummaryFromType(type, playerStatSummaries){
      for (i in playerStatSummaries) {
        if(playerStatSummaries[i].playerStatSummaryType == type){
          return playerStatSummaries[i];  
        }
      }
    }

    $scope.consultarInvocador = function () {

      $scope.nombreInvocadorIngresado = $scope.nombreInvocador.toLowerCase();
      var consultarURL = $scope.serverName + $scope.consultaInvocador + $scope.nombreInvocadorIngresado + $scope.apiKey;
      $http.get(consultarURL).
        success(function(data) {
                console.log("Resultado invocador: ");
                console.log(data);
                $scope.invocador = data;
                var summaryURL = $scope.serverName + statsSummary() + $scope.apiKey;
                    $http.get(summaryURL).
                      success(function(data) {
                        console.log("Resultado summary: ");
                        $scope.summary = getSummaryFromType("Unranked",data.playerStatSummaries);
                         console.log($scope.summary);
                        $scope.encontrado = true;
                      });
                  
              });
      }

  });

  module.controller('DetailController', function($scope, $data) {
    $scope.item = $data.selectedItem;
  });

  module.controller('MasterController', function($scope, $data) {
    $scope.items = $data.items;  
    
    $scope.showDetail = function(index) {
      var selectedItem = $data.items[index];
      $data.selectedItem = selectedItem;
      $scope.ons.navigator.pushPage('views/detail.html', {title : selectedItem.title});
    };
  });

   module.factory('$data', function() {
      var data = {};
      
      data.items = [
          { 
              title: 'Item 1 Title',
              label: '4h',
              desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
          },
          { 
              title: 'Another Item Title',
              label: '6h',
              desc: 'Ut enim ad minim veniam.'
          },
          { 
              title: 'Yet Another Item Title',
              label: '1day ago',
              desc: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
          },
          { 
              title: 'Yet Another Item Title',
              label: '1day ago',
              desc: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
          }
      ]; 
      
      return data;
  });

