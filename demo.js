var app = angular.module('app', ['ngAnimate']);


app.factory('data', function () {
 
  return{
    list:function(){
      return [
       
        {question:'What music do you like',
         config:{type:'checkbox',columns:'12'},
         answers:
              [
                {id:1,title:"Rock",selected:false},
                {id:2,title:"Folk",selected:false},
                {id:3,title:"Jazz",selected:false},
              ]

        },
         {question:'How would you rate our service',
          config:{type:'radio',columns:'4'},
         answers:
              [
                {id:1,title:"Awesome",selected:false},
                {id:2,title:"It was ok",selected:false},
                {id:3,title:"Terrible",selected:false}
              ]
        },
        {question:'How many times have you used our service',
        config:{type:'radio',columns:'2'},
         answers:
              [
                {id:3,title:"1",selected:false},
                {id:3,title:"2",selected:false},
                {id:3,title:"3",selected:false},
                {id:3,title:"4",selected:false},
                {id:3,title:"5",selected:false},
                {id:3,title:"More than 5",selected:false}
              ]
        },
      ];
    }
  };
});



app.controller('main', function($scope,data,$timeout) {
    $scope.data = data.list();
    $scope.progress = 0;
    $scope.index = 0;
    $scope.animation_type = 'back';
 
    $timeout(function(){
      $scope.data[1].answers[0].selected = true;
      $scope.next();
    }, 1000);
  
  
    $scope.next = function(){
      $scope.animation_type = 'next';
      $scope.index++;
      $scope.percent();
    }
    $scope.back = function(){
      $scope.animation_type = 'back';
      $scope.index--;
      $scope.percent();
    }
    $scope.percent = function(){
      var precent = ($scope.index * 100) / $scope.data.length;
      $scope.progress = precent;
    }
    $scope.reset = function (){
      $scope.data = data.list();
      $scope.index = -1;                          
      $scope.next();
    };
    
  $scope.markAnswer = function($parent,config){
      
      switch(config.type){
        case 'radio':
          
            for(var answer in $scope.data[$scope.index].answers){
              $scope.data[$scope.index].answers[answer].selected= false;
            }
          
            $parent.selected = true;
          
          break;
          case 'checkbox':
            $parent.selected = !$parent.selected;
          break;
      }
  }
});