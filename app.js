start = () => {
   gamePattern = [];
   started = false;
   userClickedPattern = [];
   buttonsSequence = ["red", "blue", "green", "yellow"];
   level = 0;
   indx = 0;
   $(document).keypress(function () {
      if (!started) {
         nextSequence();
         $("#level-title").html(`<h1>Level ${level}</h1>`);
         started = true;
      }
   });
};
start();

playSound = (name) => {
   var audio = new Audio(`sounds/${name}.mp3`);
   audio.play();
};

animatePress = (currentColor) => {
   $(`#${currentColor}`).addClass("pressed");
   setTimeout(function () {
      $(`#${currentColor}`).removeClass("pressed");
   }, 300);
};

nextSequence = () => {
   indx = 0;
   level = level + 1;
   $("#level-title").html(`<h1>Level ${level}</h1>`);

   randNum = Math.round(Math.random() * 3);
   let randomChosenColour = buttonsSequence[randNum];

   playSound(randomChosenColour);

   gamePattern.push(randomChosenColour);
   $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100);
};

$(".btn").click(function () {
   let userChosenColor = $(this).attr("id"); // $(this) refers to button that was clicked
   playSound(userChosenColor);
   animatePress(userChosenColor);
   userClickedPattern.push(userChosenColor);
   checkAnswer(userChosenColor);
});

checkAnswer = (userChosenColor) => {
   if (userChosenColor == gamePattern[indx]) {
      indx = indx + 1;
      if (gamePattern.length == userClickedPattern.length) {
         setTimeout(function () {
            userClickedPattern = [];
            nextSequence();
         }, 1000);
      }
   } else {
      gameOver();
   }
};

gameOver = () => {
   $(document.body).addClass("game-over");
   setTimeout(function () {
      $(document.body).removeClass("game-over");
   }, 200);
   $("#level-title").html(`<h1>Press a key start</h1>`);
   start();
};
