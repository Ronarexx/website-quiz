
// 1
var questions = [
	[
		"¿Qué es Blockchain?",
		"Base de datos distribuida y segura",
		"Bitcoin",
		"DLT (Distributed Ledger Technology)",
		"1 y 3",
		3
	],
	[
		"¿Qué permite Blockchain?",
		"Registrar Transacciones y Contratos",
		"Modificar los datos contenidos en ella",
		"Borrar los datos contenidos en ella",
		"Ninguna de las anteriores",
		0
	],
	[
		"¿Qué es eæternity?",
		"Plataforma de Blockchain 3.0",
		"Exchange",
		"Lenguaje de Programacion",
		"Ninguna de las anteriores",
		0
	],
	[
		"¿Qué problemas de blockchain resuelve æternity?",
		"Escalabilidad",
		"Usabilidad",
		"Disponibilidad de datos del mundo real",
		"Todas las anteriores",
		3
	],
	[
		"¿Como debe ser la ejecución de los contratos inteligentes?",
		"Segura",
		"Eficiente",
		"Económica y Escalable",
		"Todas las Anteriores",
		3
	],
	[
		"En æternity de que forma son manejados los contratos ...",
		"privada on-chain",
		"publica on-chain",
		"privada off-chain",
		"publica off-chain",
		2
	],
	[
		"¿Cual es el algoritmo que usa æternityy para PoW?",
		"Primecoin",
		"Hashcash",
		"Cockoo Cycle",
		"CryptoNight",
		2
	],
	[
		"El core de implemetacion de æternityy esta escrito en ...",
		"C++",
		"Erlang",
		"Python",
		"ARust",
		1
	],
	[
		"Los canales de estado en æternity pueden ser abiertos entre ...",
		"2 partes",
		"3 partes",
		"4 partes",
		"Ilimitadas",
		0
	],
	[
		"Los Smart Contract en æternity son escritos en ...",
		"Solidity",
		"Vype",
		"Sophia",
		"Bamboo",
		2
	],
];

// 2
var questionTemplate = _.template(" \
	<div class='card question'><span class='question'><%= question %></span> \
      <ul class='options'> \
        <li> \
          <input type='radio' name='question[<%= index %>]' value='0' id='q<%= index %>o1'> \
          <label for='q<%= index %>o1'><%= a %></label> \
        </li> \
        <li> \
          <input type='radio' name='question[<%= index %>]' value='1' id='q<%= index %>o2'> \
          <label for='q<%= index %>o2'><%= b %></label> \
        </li> \
        <li> \
          <input type='radio' name='question[<%= index %>]' value='2' id='q<%= index %>o3'> \
          <label for='q<%= index %>o3'><%= c %></label> \
        </li> \
        <li> \
          <input type='radio' name='question[<%= index %>]' value='3' id='q<%= index %>o4'> \
          <label for='q<%= index %>o4'><%= d %></label> \
        </li> \
      </ul> \
    </div> \
    ");


// 3
var points,
	pointsPerQuestion,
	currentQuestion,
	questionTimer,
	timeForQuestion = 10, // seconds
	timeLeftForQuestion;

// 4
$(function() {

	//
	$('button.start').click(start);
	$('.play_again button').click(restart);

	function restart() {
		points = 0;
		pointsPerQuestion = 10;
		currentQuestion = 0;
		timeLeftForQuestion = timeForQuestion;

		$('.finish.card').hide();
		$('div.start').show();
		$('.times_up').hide();

		generateCards();
		updateTime();
		updatePoints();
	}

	//
	function start() {
		$('div.start').fadeOut(200, function() {
			moveToNextQuestion();
		});
	}

	//
	function generateCards() {
		$('.questions').html('');
		for (var i = 0; i < questions.length; i++) {
			var q = questions[i];
			var html = questionTemplate({
				question: q[0],
				index: i,
				a: q[1],
				b: q[2],
				c: q[3],
				d: q[4]
			});
			$('.questions').append(html);
		};
		$('.question.card input').change(optionSelected);
	}

	//
	function moveToNextQuestion() {
		currentQuestion += 1;
		if (currentQuestion > 1) {
			$('.question.card:nth-child(' + (currentQuestion-1) + ')').hide();
		}
		showQuestionCardAtIndex(currentQuestion);
		setupQuestionTimer();
	}

	//
	function setupQuestionTimer() {
		if (currentQuestion > 1) {
			clearTimeout(questionTimer);
		}
		timeLeftForQuestion = timeForQuestion;
		questionTimer = setTimeout(countdownTick, 1000);
	}

	//
	function showQuestionCardAtIndex(index) { // staring at 1
		var $card = $('.question.card:nth-child(' + index + ')').show();
	}

	//
	function countdownTick() {
		timeLeftForQuestion -= 1;
		updateTime();
		if (timeLeftForQuestion == 0) {
			return finish();
		}
		questionTimer = setTimeout(countdownTick, 1000);
	}

	//
	function updateTime() {
		$('.countdown .time_left').html(timeLeftForQuestion + 's');
	}

	//
	function updatePoints() {
		$('.points span.points').html(points + ' puntos');
	}

	//
	function optionSelected() {
		var selected = parseInt(this.value);
		var correct = questions[currentQuestion-1][5];

		if (selected == correct) {
			points += pointsPerQuestion;
			updatePoints();
			correctAnimation();
		} else {
			wrongAnimation();
		}

		if (currentQuestion == questions.length) {
			clearTimeout(questionTimer);
			return finish();
		}
		moveToNextQuestion();
	}

	function correctAnimation() {
		animatePoints('right');
	}

	//
	function wrongAnimation() {
		animatePoints('wrong');
	}

	//
	function animatePoints(cls) {
		$('header .points').addClass('animate ' + cls);
		setTimeout(function() {
			$('header .points').removeClass('animate ' + cls);
		}, 500);
	}

	//
	function finish() {
		if (timeLeftForQuestion == 0) {
			$('.times_up').show();
		}
		$('p.final_points').html(points + ' puntos');

		if (points>90) {
			$('p.final_points').html(points + ' puntos' + '</br><img src="img/first-place-medal.png" width="1000" height="80" />');
		} else if (points>80 && points<=90) {
			$('p.final_points').html(points + ' puntos' + '</br><img src="img/second-place-medal.png" width="160" height="80" />');
		} else if (points>70 && points<=80) {
			$('p.final_points').html(points + ' puntos' + '</br><img src="img/third-place-medal.png" width="160" height="80" />');
		} else {
			$('p.final_points').html(points + ' puntos');
		}

		$('.question.card:visible').hide();
		$('.finish.card').show();
	}

	//
	restart();

});
