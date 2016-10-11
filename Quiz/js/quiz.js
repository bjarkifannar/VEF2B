(function() {
	"use strict";
	
	/* Breytur */
	var container = document.getElementById('container'); /* Containerinn fyrir spurningar og svör */
	var quizTitle = 'Skálmöld'; /* Nafnið á quizzinu */
	var nextQuestionNumber; /* Hvaða spurning er næst */
	var numQuestions; /* Hvað eru margar spurningar */
	var numCorrect; /* Hvað hefur notandinn svarað mörgum spurningum rétt */
	var numIncorrect; /* Hvað hefur notandinn svarað mörgum spurningum rangt */
	var incorrectAnswers; /* Hvaða svör voru röng */
	var questions; /* Spurningarnar */
	var time; /* Tíminn */
	var minutes = 0; /* Mínútur */
	var seconds = 0; /* Sekúndur */

	/* Hreinsar containerinn */
	function clearContainer() {
		container.innerHTML = "";

		createQuizTitleElement();
	}

	/* Endursetur global breytur */
	function resetVariables() {
		nextQuestionNumber = 0;
		numQuestions = questions.length;
		numCorrect = 0;
		numIncorrect = 0;
		incorrectAnswers = [];
		minutes = 0;
		seconds = 0;
	}

	/* Telur tíma */
	function timer() {
		var tmpS, tmpM;

		if (seconds === 59) {
			minutes++;
			seconds = 0;
		} else {
			seconds++;
		}

		showTime();
	}

	/* Sýnir tímann */
	function showTime() {
		var timeDiv = document.getElementById('time-div'); /* Nær í time-div */
		var timeContent = ''; /* Tímastrengurinn */

		if (minutes < 10) /* Ef það hafa liðið minna en 10 mínútur */
			timeContent += '0' + minutes; /* Bæta 0 fyrir framan mínútur */
		else
			timeContent += minutes; /* Bæta mínútum við tímastrenginn */

		timeContent += ':'; /* Bæta ':' á milli mín og sek */

		if (seconds < 10) /* Ef sekúndurnar eru færri en 10 */
			timeContent += '0' + seconds; /* Bæta 0 fyrir framan sekúndur */
		else
			timeContent += seconds; /* Bæta sekæundunum við tæimastrenginn */

		timeDiv.innerHTML = timeContent; /* Setja tímann í time-div */
	}

	/* Býr til div með quiz nafninu */
	function createQuizTitleElement() {
		var titleEl = document.createElement('h1');
		titleEl.id = 'quiz-title';
		titleEl.innerHTML = quizTitle;
		titleEl.innerHTML += '<div class="split"></div>';

		container.appendChild(titleEl);
	}

	/* Býr til div sem sýnir hvaða spurningu notandinn er á */
	function createNumQuestionsDiv() {
		var numQuestionsDiv = document.createElement('div');
		numQuestionsDiv.id = 'num-questions';
		numQuestionsDiv.className = 'num-questions';
		numQuestionsDiv.innerHTML = "<p><b>Question</b> " + (nextQuestionNumber + 1) + "/" + numQuestions + ":</p>";

		container.appendChild(numQuestionsDiv);
	}

	/* Býr til og sýnir spurninga textann */
	function showQuestionText(text) {
		var tmpTitle = document.createElement('h2');
		tmpTitle.id = 'question-text';
		tmpTitle.innerHTML = text;

		container.appendChild(tmpTitle);
	}

	/* Býr til og sýnir svarmöguleika */
	function showAnswers(answers, correctAnswer) {
		/* Fara í gegn um svarmöguleika og sýna þá */
		for (var i = 0; i < answers.length; i++) {
			var tmpAns = answers[i];
			var ansDiv = document.createElement('div');

			ansDiv.innerHTML = tmpAns; /* Setja textann */
			ansDiv.className = 'answer'; /* Setja klasann 'answer' á div */
			ansDiv.onclick = questionClick; /* Setja onclick aðferðina */

			/* Ef þetta er rétta svarið */
			if (correctAnswer === answers[i]) {
				ansDiv.id = 'correct';
			}

			/* Sýna svarmöguleikann */
			container.appendChild(ansDiv);
		}
	}

	/* Sýnir spurningu og svarmöguleika */
	function showQuestion() {
		var tmpQ = questions[nextQuestionNumber].q;
		var tmpAnswers = questions[nextQuestionNumber].answers;
		var tmpCorrectAnswer = questions[nextQuestionNumber].correctAnswer;

		/* Shuffle-a svarmöguleikum */
		tmpAnswers = shuffleArray(tmpAnswers);

		/* Sýna spurninguna */
		showQuestionText(tmpQ);

		/* Sýna svarmöguleikana */
		showAnswers(tmpAnswers, tmpCorrectAnswer);
	}

	/* Býr til div fyrir niðurstöður */
	function createResultDiv() {
		var resultDiv = document.createElement('div');
		resultDiv.className = 'result-div';
		resultDiv.innerHTML = "<p><b>Correct answers:</b> " + numCorrect + "</p><p><b>Incorrect answers:</b> " + numIncorrect + "</p>";

		container.appendChild(resultDiv);
	}

	/* Býr til div fyrir röng svör */
	function createIncorrectAnswerDiv() {
		/* Ef notandinn var ekki með allt rétt */
		if (numIncorrect > 0) {
			var incorrectContent = "<h2>Incorrect:</h2>";
			var incorrectAnswerDiv = document.createElement('div');
			incorrectAnswerDiv.id = 'incorrect-answers';
			incorrectAnswerDiv.className = 'incorrect-answers';

			/* Fara í gegn um röng svör og bæta þeim við */
			for (var i = 0; i < incorrectAnswers.length; i++) {
				incorrectContent += "<div class='split'></div>";
				incorrectContent += "<p><b>Question:</b> " + incorrectAnswers[i][0] + "</p>";
				incorrectContent += "<p><b>Your answer:</b> <span class='red'>" + incorrectAnswers[i][1] + "</span></p>";
				incorrectContent += "<p><b>Correct answer:</b> <span class='green'>" + incorrectAnswers[i][2] + "</span></p>";
			}

			incorrectAnswerDiv.innerHTML = incorrectContent;

			container.appendChild(incorrectAnswerDiv);
		}
	}

	/* Býr til div til að reyna aftur */
	function createTryAgainDiv() {
		var tryAgainDiv = document.createElement('div');
		tryAgainDiv.className = 'try-again-div';
		tryAgainDiv.innerHTML = "<p>Play again</p>";

		tryAgainDiv.onclick = function() {
			startNewGame();
		};

		container.appendChild(tryAgainDiv);
	}

	/* Sýnir niðurstöður í lokin */
	function showResults() {
		createResultDiv();
		createIncorrectAnswerDiv();
	}

	/* Sýnir næstu spurningu */
	function displayNextQuestion() {
		/* Shuffle-a spurningafylkinu ef þetta er fyrsta spurningin */
		if (nextQuestionNumber === 0) {
			questions = shuffleArray(questions);
		}

		clearContainer();

		/* Ef spurningarnar eru ekki búnar */
		if (nextQuestionNumber < numQuestions) {
			createNumQuestionsDiv();
			showQuestion();

			/* Bæta 1 við nextQuestionNumber */
			nextQuestionNumber++;
		} else {
			clearInterval(time);

			showResults();
			createTryAgainDiv();
		}
	}

	/* Byrjar nýjan leik */
	function startNewGame() {
		clearContainer(); /* Hreinsa containerinn */
		resetVariables(); /* Endursetja breytur */
		displayNextQuestion(); /* Sýna spurningu */
		showTime(); /* Sýna tímann */

		time = setInterval(timer, 1000); /* Keyra timer function 1 sinni á sekúndu */
	}

	/* Smiður fyrir spurningar */
	function Question(q, answers, correctAnswer) {
		this.q = q; /* Spurningin */
		this.answers = answers; /* Array með svörum */
		this.correctAnswer = correctAnswer; /* Rétt svar (strengur) */
	}

	/* Bæta röngu svari við incorrectAnswers fylkið */
	function addIncorrectAnswer(answerContent) {
		incorrectAnswers[incorrectAnswers.length] = [document.getElementById('question-text').textContent, answerContent, questions[nextQuestionNumber - 1].correctAnswer];
	}

	/* Þegar ýtt er á svarmöguleika */
	var questionClick = function() {
		/* Ef þetta er rétt svar */
		if (this.id === 'correct') {
			/* Bæta 1 við rétt svör */
			numCorrect++;
		} else {
			/* Bæta 1 við röng svör */
			numIncorrect++;

			addIncorrectAnswer(this.textContent);
		}

		/* Sýna næstu spurningu */
		displayNextQuestion();
	};

	/* Býr til spurningar */
	function createQuestions() {
		var tmpQuestions = [];

		tmpQuestions = [
						new Question('Hvaða ár var hljómsveitin stofnuð?', ['2008', '2009', '2010', '2011'], '2009'),
						new Question('Hvað heitir fyrsta plata hljómsveitarinnar?', ['Baldur', 'Með Vættum', 'Vögguvísur Yggdrasils'], 'Baldur'),
						new Question('Hvað eru margir gítarleikarar í hljómsveitinni?', ['1', '2', '3', '4'], '3'),
						new Question('Hvað heitir trommuleikarinn?', ['Baldur', 'Jón Geir', 'Björgvin', 'Gunnar'], 'Jón Geir'),
						new Question('Hvað eru meðlimir hljómsveitarinnar margir?', ['4', '5', '6', '7'], '6')
					];

		return tmpQuestions;
	}

	/* Búa til spurningar */
	questions = createQuestions();

	startNewGame(); /* Byrja leikinn */
})();