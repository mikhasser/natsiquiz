let questions = [
    {
        prompt: 'Тест: вы фошызд?',
        options: [
            { option: 'Начать', score: 0 }
        ]
    },
    {
        prompt: 'Кто такой Барак Обама?',
        options: [
            { option: 'Замечательный человек!', score: 0 },
            { option: '44-ый президент США', score: 0.5 },
            { option: '🐒', score: 1 }
        ]
    },
    {
        prompt: 'Поддерживаете ли вы такие выражения как "Раесся для русских" и "Евреи должны умереть"?',
        options: [
            { option: 'Да, и между прочим, моя мать избивала меня в детстве', score: 0 },
            { option: 'Я сохраняю нейтралитет', score: 0.5 },
            { option: 'Нет', score: 1 }
        ]
    },
    {
        prompt: 'Вы пользуетесь Джингой?',
        options: [
            { option: 'Джинга - плохой телефон, я предпочитаю айфон', score: 0 },
            { option: 'Django?', score: 0.5 },
            { option: 'Да, прочная мобилка', score: 1 }
        ]
    },
    {
        prompt: 'Что бы случилось после второй мировой войны в качестве альтернативы?',
        options: [
            { option: 'Мы бы ели баварские сосиски и пили пиво, потому что гитлер не собирался уничтожить всех русских', score: 0 },
            { option: 'Я хз, но думаю ничего хорошего', score: 0.5 },
            { option: 'Полный кошмар', score: 1 }
        ]
    },
    {
        prompt: 'Вы?',
        options: [
            { option: 'Национал социалист', score: 0 },
            { option: 'Либераха', score: 0.5 },
            { option: 'Коммунист ☭', score: 1 }
        ]
    },
    {
        prompt: 'Вы играете в Dota 2?',
        options: [
            { option: 'Дота для пидоров', score: 0 },
            { option: 'Иногда', score: 0.5 },
            { option: 'Я наиграл 10,000 часов', score: 1 }
        ]
    },
    {
        prompt: 'Буэ-буэ-буэ',
        options: [
            { option: 'Говори четче!', score: 0 },
            { option: 'Ахахаха, это было смешно', score: 0.5 },
            { option: 'Буэ-буэ-буэ', score: 1 }
        ]
    },
    {
        prompt: 'Какой ваш любимый тайтл?',
        options: [
            { option: 'Это китайские мультики?', score: 0 },
            { option: 'Не знаю, мне нравится несколько', score: 0.5 },
            { option: 'Я люблю все аниме😍', score: 1 }
        ]
    },
    {
        prompt: 'Путин красавчик?',
        options: [
            { option: 'Он ограбил нашу страну и опозорил ее на мировой арене! А еще я отсталый!', score: 0 },
            { option: 'Его дела говорят сами за себя😏', score: 0.5 },
            { option: 'Да😍', score: 1 }
        ]
    },
    {
        prompt: 'Магия - это круто?',
        options: [
            { option: 'Да!', score: 0 },
            { option: 'Мне все равно', score: 0.5 },
            { option: 'Я предпочитаю научную фантастику', score: 1 }
        ]
    },
    {
        prompt: 'Ваши результаты: ',
        options: [
            { option: 'Пройти еще раз', score: 0 }
        ]
    },
]

Array.prototype.shuffle = function () {
    for (let i = this.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this[i], this[j]] = [this[j], this[i]];
    }
    return this;
} // shuffle order of elements in arrays

function shuffleQuestions(arr) {
    let first = arr[0] // get first item
    let therest = arr.slice(1, this.length - 1) // remove first and last items
    let last = arr[arr.length - 1] // get last item

    therest.shuffle() //shuffle therest
    therest.map( item => item.options.shuffle() ) //shuffle options

    therest.unshift(first) // add to the beginning
    therest.push(last) // add to the end

    return therest
}

Vue.config.devtools = true
Vue.config.errorHandler = function(err, vm, info) {
    quiz.resetQuiz()
}

let quiz = new Vue({
    el: '#quiz',
    data: {
        questions: shuffleQuestions(questions),
        isEnded: false,
        scores: 0,
        diagnosis: '',
        currentQuestion: 0,
        currentPrompt: '',
        currentOptions: [],
        currentScore: 0,
    },
    methods: {
        nextQuestionHandler: function(scores) {
            this.currentPrompt = this.questions[this.currentQuestion].prompt
            this.currentOptions = this.questions[this.currentQuestion].options
            this.currentScore = scores
            
            this.scores += this.currentScore // count scores up

            this.currentQuestion++

            if (this.currentQuestion === this.questions.length) {
                this.isEnded = true
                this.makeUpDiagnosis()
            }
        },
        makeUpDiagnosis: function() {
            let percentScores = Math.floor( this.scores / (this.questions.length - 2) * 100 )

            if (percentScores >= 70) {
                this.diagnosis = 'Вы.. Вы.. не фошызд! Поздравляем! Вы можете присоединиться к армии Антизига!'
            } else if (percentScores >= 40 && percentScores < 70) {
                this.diagnosis = 'Видимо ты не фошызд, но также ты и не борец с фошызмом как не борода, скорее всего ты обычный человек, так что уходи😞'
            } else if (percentScores >= 0 && percentScores < 40) {
                this.diagnosis = 'У меня для тебя плохие новости, братишка. Ты фошызд и твое местоположение было триангулировано, так что сейчас Охуительный Антизиг едет к тебе, ФОШЫЗД!'
            }
        },
        resetQuiz: function() {
            this.questions = shuffleQuestions(questions)
            this.isEnded = false
            this.scores = 0
            this.diagnosis = ''
            this.currentQuestion = 0
            this.currentPrompt = ''
            this.currentOptions = []
            this.currentScore = 0


            this.nextQuestionHandler(0)
            this.nextQuestionHandler(0)
        }
    },
    beforeMount: function() {
        this.nextQuestionHandler(0)
    }
})
