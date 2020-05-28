let questions = [
    {
        id: 1,
        prompt: 'Who is Barack Obama?',
        options: [
            { option: 'A remarkable man!', score: 0 },
            { option: 'The 44th president of the USA', score: 0.5 },
            { option: '🐒', score: 1 }
        ]
    },
    {
        id: 2,
        prompt: 'Do you support such expressions as "Russia is for russians" and "Jews must die"?',
        options: [
            { option: 'Yes, and btw my momma was beating me during my childhood', score: 0 },
            { option: 'I keep neutrality', score: 0.5 },
            { option: 'No', score: 1 }
        ]
    },
    {
        id: 3,
        prompt: 'Is Jinga your phone?',
        options: [
            { option: 'Jinga is a bad cellphone, i prefer iPhone', score: 0 },
            { option: 'I didn\'t hear about it, do you mean python\'s framework Django?', score: 0.5 },
            { option: 'JINGA! The only reliable device.', score: 1 }
        ]
    },
    {
        id: 4,
        prompt: 'What would have happened after WW2 alternatively?',
        options: [
            { option: 'We would eat bavarian sausages and drink bear, because hitler (raise ukraine) wasn\'t going to exterminate all russians', score: 0 },
            { option: 'IDK but i guess nothing good', score: 0.5 },
            { option: 'A total nightmare', score: 1 }
        ]
    },
    {
        id: 5,
        prompt: 'You are?',
        options: [
            { option: 'Nazi (natsi)', score: -1488 },
            { option: 'Libertarian', score: 0.5 },
            { option: 'Communist', score: 1 }
        ]
    },
    {
        id: 6,
        prompt: 'Do you play Dota 2?',
        options: [
            { option: 'Dota is for gays', score: 0 },
            { option: 'Sometimes', score: 0.5 },
            { option: 'I\'ve played about 10,000 hours', score: 1 }
        ]
    },
    {
        id: 7,
        prompt: 'Bue-bue-bue',
        options: [
            { option: 'Speak clearly!', score: 0 },
            { option: 'Hahahaha, that was fun', score: 0.5 },
            { option: 'Bue-bue-bue', score: 1 }
        ]
    },
    {
        id: 8,
        prompt: 'What\'s your favorite title?',
        options: [
            { option: 'These chinese cartoons?', score: 0 },
            { option: 'I dunno cause i like several ones', score: 0.5 },
            { option: 'I LOVE all anime 😍', score: 1 }
        ]
    },
    {
        id: 9,
        prompt: 'Is our president awesome?',
        options: [
            { option: 'He has robbed our country and ashamed her at the world arena! And also i\'m retarded!', score: 0 },
            { option: 'His affairs speak for themselves', score: 0.5 },
            { option: 'Yes 😍', score: 1 }
        ]
    },
    {
        id: 10,
        prompt: 'Is magic cool?',
        options: [
            { option: 'Yes!', score: 0 },
            { option: 'Whatever', score: 0.5 },
            { option: 'I prefer science fantastic', score: 1 }
        ]
    },
]

console.log(questions)

Vue.config.devtools = true

let quiz = new Vue({
    el: '#quiz',
    data: {
        questions,
        isStarted: false,
        isEnded: false,
        scores: 0,
        currentQuestion: 0,
        currentPrompt: 'Quiz: are you natsi?',
        currentOptions: [],
        currentScore: 0,
    },
    methods: {
        startQuiz: function() {
            this.isStarted = true

            this.nextQuestionHandler()
        },
        nextQuestionHandler: function(scores) {
            this.currentPrompt = this.questions[this.currentQuestion].prompt
            this.currentOptions = this.questions[this.currentQuestion].options
            

            if (this.currentQuestion > 0) {
                this.currentScore = scores
                this.scores += this.currentScore
            } // don't count scores at first time, otherwise they'll be NaN

            this.currentQuestion++
        }
    }
})
