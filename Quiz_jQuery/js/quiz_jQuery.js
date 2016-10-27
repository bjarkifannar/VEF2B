$(function() {
	var container = $('#container');
	var quizTitle = 'Skálmöld';
	var nextQuestionNumber, numQuestions, numCorrect, numIncorrect;
	var incorrectAnswers, questions;

	function clearContainer() {
		container.text("");
		container.css({'width': '75%', 'display': 'block', 'margin': '0 auto'});
		createQuizTitleElement();
		createProgressBar();
	}

	function resetVariables() {
		nextQuestionNumber = 0;
		numQuestions = questions.length;
		numCorrect = 0;
		numIncorrect = 0;
		incorrectAnswers = [];
	}

	function createQuizTitleElement() {
		var titleEl = $('<h1 id="quiz-title"></h1>');
		titleEl.text(quizTitle);
		container.prepend(titleEl);
	}

	function createNumQuestionsDiv() {
		var numQuestionsString = '<p><b>Question</b> ' + (nextQuestionNumber + 1) + '/' + numQuestions + ':</p>';
		var numQuestionsDiv = $('<div id="num-questions"></div>');
		numQuestionsDiv.html(numQuestionsString);

		container.append(numQuestionsDiv);
	}

	function createProgressBar() {
		var progressbarDiv = $('<div id="progressbar"></div>');
		container.append(progressbarDiv);

		$('#progressbar').progressbar({
			value: nextQuestionNumber / numQuestions * 100
		});
	}

	function showQuestionText(text) {
		var tmpTitle = $('<h2 id="question-text"></h2>');
		tmpTitle.text(text);

		container.append(tmpTitle);
	}

	function showAnswers(answers, correctAnswer) {
		$.each(answers, function(i, val) {
			var tmpAns = answers[i];
			var ansDiv = $('<div class="answer"></div>').text(tmpAns).button().css({'box-sizing': 'border-box', 'width': '100%'});

			ansDiv.on('click', function() {
				if ($(this).text() == correctAnswer) {
					numCorrect++;
					displayNextQuestion();
				} else {
					if (!$(this).hasClass('clicked')) {
						$(this).addClass('clicked');

						numIncorrect++;

						console.log("Number of incorrect answers: " + numIncorrect);
						
						$(this).animate({
							backgroundColor: "red",
							color: "white"
						}, 250);

						addIncorrectAnswer(tmpAns);
					}
				}
			});

			ansDiv.on('mouseenter', function() {
				$(this).css('cursor', 'pointer');
			});

			container.append(ansDiv);
		});
	}

	function showQuestion() {
		var tmpQ = questions[nextQuestionNumber].q;
		var tmpAnswers = questions[nextQuestionNumber].answers;
		var tmpCorrectAnswer = questions[nextQuestionNumber].correctAnswer;

		tmpAnswers = shuffleArray(tmpAnswers);

		showQuestionText(tmpQ);
		showAnswers(tmpAnswers, tmpCorrectAnswer);
	}

	function createTryAgainDiv() {
		var tryAgainDiv = $('<div></div>').html('Play again').button().width('100%').css({'box-sizing': 'border-box', 'margin': '0.5em auto', 'display': 'block'}).on('click', function() {
			startNewGame();
		});

		container.append(tryAgainDiv);
	}

	function displayResults() {
		var resultDiv = $('<div></div>').html('<p><b>Incorrect answers:</b> ' + numIncorrect + '</p>');
		container.append(resultDiv);

		createTryAgainDiv();
	}

	function displayNextQuestion() {
		if (nextQuestionNumber === 0)
			questions = shuffleArray(questions);

		clearContainer();

		if (nextQuestionNumber < numQuestions) {
			createNumQuestionsDiv();
			showQuestion();

			nextQuestionNumber++;
		} else {
			displayResults();
		}
	}

	function startNewGame() {
		clearContainer();
		resetVariables();
		displayNextQuestion();
	}

	function Question(q, answers, correctAnswer) {
		this.q = q;
		this.answers = answers;
		this.correctAnswer = correctAnswer;
	}

	function addIncorrectAnswer(answerContent) {
		incorrectAnswers[incorrectAnswers.length] = [$('#question-text').text,
														answerContent,
														questions[nextQuestionNumber - 1].correctAnswer];
	}

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

	questions = createQuestions();

	startNewGame();
});