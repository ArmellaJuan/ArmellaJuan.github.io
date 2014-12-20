   //Datos comunes
   module.factory('$data', function() {
      var data = {};
      //CONSTANTES UTILES

      data.serverName = 'https://na.api.pvp.net/';

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






module.factory('ConsultaInvocadorService', function($http,$data) {
     
    var factory = {}; 

   

    var apiKey = $data.apiKey;

    var consultaInvocador = 'api/lol/las/v1.4/summoner/by-name/';


    function statsSummary(id){

        return 'api/lol/las/v1.3/stats/by-summoner/' + id + '/summary';
    } 

    function leagueSummary(id){

      return 'api/lol/las/v2.5/league/by-summoner/' + id + '/entry';
    }


    factory.consultarSummary= function(id, resultado, error){

      //Summary
      var summaryURL = $data.serverName + statsSummary(id) + apiKey;
      $http.get(summaryURL).
        success(function(data) {
          resultado(data);
      
        });

    }

    factory.consultarLeague = function(id, resultado, error){
         //LEague
                var leagueURL =  $data.serverName + leagueSummary(id) + apiKey;
                 $http.get(leagueURL).
                      success(function(data) {
                        resultado(data);
                      });  
              }
    

    factory.consultarDatos =  function (nombreInvocador, resultado, error) {
      nombreInvocador =nombreInvocador.toLowerCase();
      
      var consultarURL = $data.serverName + consultaInvocador + nombreInvocador + apiKey;
      $http.get(consultarURL).
        success(function(data) {
                resultado(data);

                });
             
      }
 

 
    return factory;
});