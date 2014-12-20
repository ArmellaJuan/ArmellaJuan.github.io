
  module.controller('AppController', function($scope, $data) {
    $scope.doSomething = function() {
      setTimeout(function() {
        alert('tappaed');
      }, 100);
    };
  });



  module.controller('ApiLolController', ['$scope','$http','$data', 'ConsultaInvocadorService', function($scope,$http,$data,ConsultaInvocadorService){

    $scope.nombreInvocador = "paisatandil"

    $scope.urlIcon = $data.urlIcon;
 
    $scope.encontrado = false;

    $scope.datosRanked = false;


    //Gets the league by queue of game:
    function getLeagueFromQueue(queue, playerLeagues){
      for (i in playerLeagues) {
        if(playerLeagues[i].queue == queue){
          return playerLeagues[i];  
        }
      }
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
      $scope.encontrado = false;
      $scope.datosRanked = false;
      $scope.nombreInvocadorIngresado = $scope.nombreInvocador.toLowerCase();
      ConsultaInvocadorService.consultarDatos($scope.nombreInvocadorIngresado,function(data){  
                console.log("Resultado invocador: ");
                console.log(data);
                $scope.invocador = data;
                ConsultaInvocadorService.consultarLeague($scope.invocador[$scope.nombreInvocadorIngresado].id,function(data){
                     console.log("Resultado league: ");
                     console.log(data);
                     $scope.rankedSoloLeague = getLeagueFromQueue("RANKED_SOLO_5x5", data[$scope.invocador[$scope.nombreInvocadorIngresado].id]);
                     console.log($scope.rankedSoloLeague);
                     $scope.datosRanked = true;
                });
                ConsultaInvocadorService.consultarSummary( $scope.invocador[$scope.nombreInvocadorIngresado].id , function(data){
                    console.log("Resultado summary: ");
                    $scope.summary = getSummaryFromType("Unranked",data.playerStatSummaries);
                    $scope.rankedSolo = getSummaryFromType("RankedSolo5x5",data.playerStatSummaries);
                    console.log("Normal: " + $scope.summary);
                    console.log("RankedSolo: ");
                    console.log($scope.rankedSolo);
                    $scope.encontrado = true;
                });

      });

      }

  }]);

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

