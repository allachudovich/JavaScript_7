'use strict';


var myTest = {

    questions: [{
        qNumber: 1,
        question: 'Кто автор трагедии "Ариадна"',
        answer1: 'А.Ахматова',
        answer2: 'Б.Пастернак',
        answer3: 'М.Цветаева',
        answer4: 'К.Бальмонт',
        correctAnswer: 'М.Цветаева'
    }, {
        qNumber: 2,
        question: 'Как называлось первое произведение Л.Н.Толстого?',
        answer1: 'Детство',
        answer2: 'Воскресенье',
        answer3: 'Плоды просвещения',
        answer4: 'Анна Каренина',
        correctAnswer: 'Детство'
    }, {
        qNumber: 3,
        question: 'Какое офицальное звание А.С.Пушкина?',
        answer1: 'Штаб-капитан',
        answer2: 'Титулярный советник',
        answer3: 'Камер-юнкер',
        answer4: 'Мичман',
        correctAnswer: 'Камер-юнкер'
    }]

};

localStorage.setItem('myTest', JSON.stringify(myTest));

var test = localStorage.getItem('myTest');

test = JSON.parse(test);

$(function() {

    var source = $('#test-template').html(),
        template = Handlebars.compile(source),
        html = template(myTest);

    $('#content').html(html);



    var usersAnswers = [];
    var correctAnswers = [];
    var score = 0;


    var addCorrectAnswers = function() {
        var i = 0,
            qNumber = myTest.questions.length;
        for (i; i < qNumber; i++) {
            var correctAnswer = myTest.questions[i].correctAnswer;
            correctAnswers.push(correctAnswer);
        }
    };


    var addUsersAnswers = function() {
        $('.answers input:checked').each(function() {
            usersAnswers.push($(this).attr('value'));
        });
    };


    var showSuccessModal = function() {
        $('#modal').show();
        $('#message').html('<p class="success">Поздравляю!Ваши познания в литературе великолепны!</p>');
    };

    var showFailModal = function() {
        $('#modal').show();
        $('#message').html('<p class="fail">Увы, вам стоит вспомнить школьную программу!</p>');
    };


    var closeModal = function() {
        $('#modal').hide();
    };


    var clearCheckboxes = function() {
        score = 0;

        $('.answers input:checked').each(function() {
            $(this).attr('checked', false);
            usersAnswers.pop();
        });
    };

    var checkAnswers = function() {

        addUsersAnswers();

        var i = 0,
            length = correctAnswers.length;


        for (i; i < length; i++) {
            if (usersAnswers[i] == correctAnswers[i]) {
                score++;
            }
        }

        if (score == length) {
            $('.answers input:checked').each(function() {});
            showSuccessModal();
        } else {
            showFailModal();
        }
    };

    addCorrectAnswers();

    $('#check-answers').on('click', function() {
        checkAnswers();
        clearCheckboxes();
    });

    $('#modal').click(closeModal);
});
