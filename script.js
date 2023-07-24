var app = angular.module("myApp", [])

app.controller("mainCtrl", ["$scope", "$timeout", function($scope, $timeout) {

    $scope.init = function() {
        $scope.winnerList = [];
        $scope.nameList = [];
        $scope.currentWinner = "";
        $scope.confirm = false;
        $scope.hideImage();
    }

    $scope.hideImage = function() {
        $("#winner-display").hide();
        $("#gift-img").hide();
        $("#firework-gif").hide();
    }

    $scope.showImage = function() {
        $("#winner-display").show();
        $("#gift-img").show();
        $("#firework-gif").show();
    }

    $scope.getNameList = function() {
        $scope.confirm = true;
        $scope.nameList = $("#textArea").val().split("\n");
        $scope.nameList.forEach(function(name, index) {
            if (name.trim() == "") {
                $scope.nameList.splice(index, 1);
            }
        });
    }

    $scope.spinWheel = function() {
        //Get random spinning degree
        var x = 1024;
        var y = 9999;
        var deg = Math.floor(Math.random() * (x - y)) + y;
        const element = document.getElementById("mainbox");
        const spinAudio = document.getElementById("audio-win");
        const errorSound = document.getElementById("audio-error");
        const button = document.getElementById("spin-btn");

        //Get list of name in textbox and choose random name
        $scope.alertMessage = "";
        var randomNum = Math.floor(Math.random() * $scope.nameList.length);
        $scope.currentWinner = $scope.nameList[randomNum];
        $scope.hideImage()

        //Check if the name list is empty
        if ($scope.nameList.length != 0 && $scope.confirm) {
            //Check if the random name is already in winnerList
                //Start spinning
                spinAudio.play();
                element.classList.remove("animate");
                //Disable spin button
                button.disabled = true;
                //Wheel rotating
                document.getElementById("box").style.transform = "rotate(" + deg + "deg)";
                //Animated the arrow and show winner in list
                $timeout(function() {
                    element.classList.add("animate");
                    $scope.winnerList.push($scope.currentWinner);
                    var index = $scope.nameList.indexOf($scope.currentWinner)
                    $scope.nameList.splice(index, 1)
                    $scope.showImage()
                }, 5500);
                //Enable spin button
                spinAudio.addEventListener("ended", function() {button.disabled = false;})
        } else {
            errorSound.play();
            $scope.hideImage();
            $scope.alertMessage = "Empty list or press the confirm button before spinning!";
        }
    }

    $scope.resetWinnerList = function() {
        $scope.refreshMessage();
        $scope.init();
    }

    $scope.clearTextBox = function() {
        $('#textArea').val("");
    }

    $scope.refreshMessage = function() {
        $scope.alertMessage = "";
    }

}]);

AOS.init({
    delay: 200, // values from 0 to 3000, with step 50ms
    duration: 1500, // values from 0 to 3000, with step 50ms
    once: false, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
});
