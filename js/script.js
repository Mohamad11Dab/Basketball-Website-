$(document).ready(function() {

	$("#get-info-form").submit(function(event) {
        // cariables that holds the info the user entered
        var name = $("#name").val();
        var bday= $("#bday").val();
        var complete = false;
        // Get the modal
        var modal = document.getElementById("myModal");


        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];

        //check if the info entered are valid or not
        if(name != "" && bday != "" && (getAge(bday)>0)) {
            complete = true;
        }
        //change the css in case of an error
        if(name == "") {
            $("#name").addClass("error").parent().parent().find("label").addClass("error");
        }

        if(bday == "" || (getAge(bday)<0)) {
            $("#bday").addClass("error").parent().parent().find("label").addClass("error");
        }
        

        //if all the info are valid open a modal
        if(complete) {

        

            $(".name").html(name);
            $(".bday").html(bday);
            $(".age").html(getAge(bday));
            modal.style.display = "block";
            span.onclick = function() {
                modal.style.display = "none";
            }
              
              // When the user clicks anywhere outside of the modal, close it
            window.onclick = function(event) {
                if (event.target == modal) {
                  modal.style.display = "none";
                }
            }
            

        }
      

        event.preventDefault();

    });

    $("#name").keydown(function() {
        $(this).removeClass("error").parent().parent().find("label").removeClass("error");
    });

    $("#bday").keydown(function() {
        $(this).removeClass("error").parent().parent().find("label").removeClass("error");
    });

    // This function determines the user's age by comparing it with the current date.
    function getAge(bday) {
        var currentDate = new Date();
        var birthDate = new Date(bday);
        var age = currentDate.getFullYear() - birthDate.getFullYear();
        var m = currentDate.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && currentDate.getDate() < birthDate.getDate())) {
            age = age - 1;
        }
        return age;

	}
	
	$(window).scroll(function() {
		var vertical = $(window).scrollTop();
		if (vertical < 100) {
			$('#top_Button').fadeOut();
		} else {
			$('#top_Button').fadeIn();;
		}
	});

	$(document).ready(function() {
		$("#top_Button").click(function(event) {
			$("html, body").animate({ scrollTop: 0 }, "slow");
		});
	
	});



});

// Variable containing the questions and asnwers of the quiz
var myQuestions = [    
    {
        question: "Which NBA player holds the record for most point scored in a single game?",
        answers: {
            a: 'Wilt Chamberlain',
            b: 'Michael Jordan',
            c: 'Kobe Bryant',
            d: 'Mathew Delaavedova'
        },
        correctAnswer: 'a'
    },
    {
        question: "How many seconds does a team have to put up a shot before the shot clock violation ?",
        answers: {
            a: '18 seconds',
            b: '28 seconds',
            c: '24 seconds',
            d: '25 seconds'
        },
        correctAnswer: 'c'
    },
    {
        question: "How many points do you get for shooting a midrange ?",
        answers: {
            a: "2 points",
            b: "1 point",
            c: "3 points",
            
        },
        correctAnswer: 'a'
    },
    {
        question: "how many players should there be on the court",
        answers: {
            a: '8 players',
            b: '10 players',
            c: '12 players'
        },
        correctAnswer: 'b'
    }
];


//Get the ids of divs in html code (Quiz page)
var quizContainer = document.getElementById('quiz'); 
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('quiz_button');

generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);

function generateQuiz(questions, quizContainer, resultsContainer, submitButton){
    //function that illustrates the question and answers of the quiz
    function showQuestions(questions, quizContainer){
        //variable that stores the user's answers
        var output = [];
        var answers;

        // for each question...
        for(var i=0; i<questions.length; i++){
            
            // first reset the list of answers
            answers = [];

            // for each available answer...
            for(letter in questions[i].answers){

                // ...add an html radio button
                answers.push(
                    '<label>'
                        + '<input type="radio" name="question'+i+'" value="'+letter+'">'
                        + letter + ': '
                        + questions[i].answers[letter]
                    + '</label>'
                );
            }

            // add this question and its answers to the output
            output.push(
                '<div class="question">' + questions[i].question + '</div>'
                + '<div class="answers">' + answers.join('') + '</div>'
            );
        }

        // our output list into one string of html and put it on the page
        quizContainer.innerHTML = output.join('');
    }

    //function that opens a modal to show the score and chages the layout of the questions and asnwers
    //depending if the answer is correct or not
    function showResults(questions, quizContainer, resultsContainer){
        
        // gather answer containers from our quiz
        var answerContainers = quizContainer.querySelectorAll('.answers');
        
        // keep track of user's answers
        var userAnswer = '';
        var numCorrect = 0;

        // Get the modal
		var modal = document.getElementById("myModal");

		// Get the <span> element that closes the modal
		var span = document.getElementsByClassName("close")[0];
        
        // for each question...
        for(var i=0; i<questions.length; i++){

            // find selected answer
            userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;
            
            // if answer is correct
            if(userAnswer===questions[i].correctAnswer){
                // add to the number of correct answers
                numCorrect++;
                
                // color the answers green
                answerContainers[i].style.color = 'lightgreen';
            }
            // if answer is wrong or blank
            else{
                // color the answers red
                answerContainers[i].style.color = 'red';
            }
        }

        resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
        

        // show number of correct answers out of total
        //shows the modal
        modal.style.display = "block";
			span.onclick = function() { // if you press the close button just close 
				modal.style.display = "none";
			}
			  
			  // When the user clicks anywhere outside of the modal, close it
			window.onclick = function(event) {
				if (event.target == modal) {
				  modal.style.display = "none";
				}
			}
    }

    // show questions right away
    showQuestions(questions, quizContainer);
    
    // on submit, show results
    submitButton.onclick = function(){
        showResults(questions, quizContainer, resultsContainer);
    }

}