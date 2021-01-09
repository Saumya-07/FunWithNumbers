var playing=false;
var score;
var action;
var timeremaining;
var correctAnswer;


//if we click on the start/reset button
document.getElementById('startReset').onclick=function(){
    //if we are playing
    if(playing==true){
        location.reload();//reload page
    }
    else{//if we are not playing
        playing=true;
        //set score to 0
        score=0;
        document.getElementById('scoreValue').innerHTML=score;

        //show countdowbox
        show('timeleft');
        timeremaining=60;
        document.getElementById('timeremaining').innerHTML=timeremaining;
        hide('gameOver');

        //change button to reset game
        document.getElementById('startReset').innerHTML='Reset Game';

        //start countdown box
        startCountdown();

        //generate question and answers
        generateQA();
    }
}

//clicking on answer box
for(i=1;i<5;i++){
    document.getElementById('box'+i).onclick=function(){
        //if we are playing check
        if(playing==true){
            if(this.innerHTML== correctAnswer){
                //correct answer
                //yes
                  //imcrease score by 1
                  score++;
                document.getElementById('scoreValue').innerHTML=score;
                //hide wrong box and show correct box
                hide('wrong');
                show('correct');
                setTimeout(function(){
                    hide('correct')
                },1000);

                //generate questions ad answers
                generateQA();
            }
            else{
                hide('correct');
                show('wrong');
                setTimeout(function(){
                    hide('wrong')
                },1000);
            }
        }
    }
}




//start count down
function startCountdown(){
    action= setInterval(function(){
        timeremaining -= 1;
    document.getElementById('timeremaining').innerHTML=timeremaining;
    if(timeremaining==0){
        stopCountdown();
        show('gameOver');
        document.getElementById('gameOver').innerHTML='<p>Game Over!</p><p>Your score is '+ score + ' .</p>';

        hide('timeleft');
        hide('correct');
        hide('wrong');
        playing=false;
        document.getElementById('startReset').innerHTML='Start Game';
    }
    },1000);   
}
//stop count down
function stopCountdown(){
    clearInterval(action);
}
//show function
function show(Id){
    document.getElementById(Id).style.display='block';
}
//hide function
function hide(Id){
    document.getElementById(Id).style.display='none';
}

//genrate new questions and answers
function generateQA(){
    var x= 1+ Math.round(9* Math.random());
    var y= 1+ Math.round(9* Math.random());
    correctAnswer = x*y ;
    document.getElementById('question').innerHTML=x + "x" + y;

    var correctPosition=  1+ Math.round(3* Math.random());
    //fill one box with correct answers
    document.getElementById('box'+ correctPosition).innerHTML=correctAnswer;

    //fill other boxes with wrong answers
    var answers = [correctAnswer];

    for(i=1;i<5;i++){
        if(i!=correctPosition){
            var wrongAnswer;
            do{
                wrongAnswer=( 1+ Math.round(9* Math.random()))*( 1+ Math.round(9* Math.random()));
            }while(answers.indexOf(wrongAnswer)>-1)

            document.getElementById('box'+i).innerHTML=wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
}
 