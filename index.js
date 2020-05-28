let questions = [
    {
        prompt: 'Quiz: are you a natsi?',
        options: [
            { option: 'Start', score: 0 }
        ]
    },
    {
        prompt: 'Who is Barack Obama?',
        options: [
            { option: 'A remarkable man!', score: 0 },
            { option: 'The 44th president of the USA', score: 0.5 },
            { option: '🐒', score: 1 }
        ]
    },
    {
        prompt: 'Do you support such expressions as "Russia is for russians" and "Jews must die"?',
        options: [
            { option: 'Yes, and btw my momma was beating me during my childhood', score: 0 },
            { option: 'I keep neutrality', score: 0.5 },
            { option: 'No', score: 1 }
        ]
    },
    {
        prompt: 'Is Jinga your phone?',
        options: [
            { option: 'Jinga is a bad cellphone, i prefer iPhone', score: 0 },
            { option: 'I didn\'t hear about it, do you mean python\'s framework Django?', score: 0.5 },
            { option: 'JINGA! The only reliable device.', score: 1 }
        ]
    },
    {
        prompt: 'What would have happened after WW2 alternatively?',
        options: [
            { option: 'We would eat bavarian sausages and drink bear, because hitler (raise ukraine) wasn\'t going to exterminate all russians', score: 0 },
            { option: 'IDK but i guess nothing good', score: 0.5 },
            { option: 'A total nightmare', score: 1 }
        ]
    },
    {
        prompt: 'You are?',
        options: [
            { option: 'National socialist', score: 0 },
            { option: 'Libertarian', score: 0.5 },
            { option: 'Communist', score: 1 }
        ]
    },
    {
        prompt: 'Do you play Dota 2?',
        options: [
            { option: 'Dota is for gays', score: 0 },
            { option: 'Sometimes', score: 0.5 },
            { option: 'I\'ve played about 10,000 hours', score: 1 }
        ]
    },
    {
        prompt: 'Bue-bue-bue',
        options: [
            { option: 'Speak clearly!', score: 0 },
            { option: 'Hahahaha, that was fun', score: 0.5 },
            { option: 'Bue-bue-bue', score: 1 }
        ]
    },
    {
        prompt: 'What\'s your favorite title?',
        options: [
            { option: 'These chinese cartoons?', score: 0 },
            { option: 'I dunno cause i like several ones', score: 0.5 },
            { option: 'I LOVE all anime 😍', score: 1 }
        ]
    },
    {
        prompt: 'Is our president awesome?',
        options: [
            { option: 'He has robbed our country and ashamed her at the world arena! And also i\'m retarded!', score: 0 },
            { option: 'His affairs speak for themselves', score: 0.5 },
            { option: 'Yes 😍', score: 1 }
        ]
    },
    {
        prompt: 'Is magic cool?',
        options: [
            { option: 'Yes!', score: 0 },
            { option: 'Whatever', score: 0.5 },
            { option: 'I prefer science fantastic', score: 1 }
        ]
    },
    {
        prompt: 'Your results: ',
        options: [
            { option: 'Try again', score: 0 }
        ]
    },
]

Vue.config.devtools = true
Vue.config.errorHandler = function(err, vm, info) {
    quiz.resetQuiz()
}

let quiz = new Vue({
    el: '#quiz',
    data: {
        questions,
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
                this.diagnosis = 'You are.. you are.. not a natsi! Congratulations! You can join the Antisig army.'
            } else if (percentScores >= 50 && percentScores < 70) {
                this.diagnosis = 'Apparently you\'re not a natsi, but you\'re also not a natsi-struggler as the great not a beard guy, you seem to be a usual person so walk away😞'
            } else if (percentScores >= 0 && percentScores < 50) {
                this.diagnosis = 'We\'ve got bad news, kid. You\'re a natsi and your location has been triangulated, so now The Gobsmaking Antisig is coming to you, NATSI'
            }
        },
        resetQuiz: function() {
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
