
  module.controller('AppController', function($scope, $data) {
    $scope.doSomething = function() {
      setTimeout(function() {
        alert('tappaed');
      }, 100);
    };
  });

  module.controller('ApiLolController', function($scope,$http,$data){

    $scope.nombreInvocador = "paisatandil"

    $scope.apiKey = $data.apiKey;

    $scope.consultaInvocador = 'api/lol/las/v1.4/summoner/by-name/';

    $scope.urlIcon = $data.urlIcon;
 
    $scope.encontrado = false;

    $scope.datosRanked = false;

    function statsSummary(){

        return 'api/lol/las/v1.3/stats/by-summoner/' +  $scope.invocador[$scope.nombreInvocadorIngresado].id + '/summary';
    } 

    function leagueSummary(){

      return 'api/lol/las/v2.5/league/by-summoner/' +  $scope.invocador[$scope.nombreInvocadorIngresado].id  + '/entry';
    }

    //Gets the summary by type of game:
    function getSummaryFromType(type, playerStatSummaries){
      for (i in playerStatSummaries) {
        if(playerStatSummaries[i].playerStatSummaryType == type){
          return playerStatSummaries[i];  
        }
      }
    }

    //Gets the league by queue of game:
    function getLeagueFromQueue(queue, playerLeagues){
      for (i in playerLeagues) {
        if(playerLeagues[i].queue == queue){
          return playerLeagues[i];  
        }
      }
    }

    $scope.consultarInvocador = function () {
      $scope.encontrado = false;
      $scope.datosRanked = false;
      $scope.nombreInvocadorIngresado = $scope.nombreInvocador.toLowerCase();
      var consultarURL = $data.serverName + $scope.consultaInvocador + $scope.nombreInvocadorIngresado + $scope.apiKey;
      $http.get(consultarURL).
        success(function(data) {
                console.log("Resultado invocador: ");
                console.log(data);
                $scope.invocador = data;
                //Summary
                var summaryURL = $data.serverName + statsSummary() + $scope.apiKey;
                $http.get(summaryURL).
                  success(function(data) {
                    console.log("Resultado summary: ");
                    $scope.summary = getSummaryFromType("Unranked",data.playerStatSummaries);
                    $scope.rankedSolo = getSummaryFromType("RankedSolo5x5",data.playerStatSummaries);
                    console.log("Normal: " + $scope.summary);
                    console.log("RankedSolo: ");
                    console.log($scope.rankedSolo);
                    $scope.encontrado = true;
                  });
                //LEague
                var leagueURL =  $data.serverName + leagueSummary() + $scope.apiKey;
                 $http.get(leagueURL).
                      success(function(data) {
                        console.log("Resultado league: ");
                        console.log(data);
                        $scope.rankedSoloLeague = getLeagueFromQueue("RANKED_SOLO_5x5", data[$scope.invocador[$scope.nombreInvocadorIngresado].id]);
                        console.log($scope.rankedSoloLeague);
                        $scope.datosRanked = true;
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
      //CONSTANTES UTILES

      data.serverName = 'https://las.api.pvp.net/';

      data.gameVersion = '4.20.1';

      data.apiKey =  '?api_key=403fb85e-20f7-4c8e-ac5c-a47402a2ac7c';
      
      data.urlIcon = 'http://ddragon.leagueoflegends.com/cdn/' + data.gameVersion +'/img/profileicon/';
      
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

