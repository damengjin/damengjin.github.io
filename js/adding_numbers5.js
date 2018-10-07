var app = new Vue({
    el: '#adding_numbers',
    data: {
      current: 1,
      correct_num5: 0,
      earn_stage5: 0,
      value1: 0,
      value2: 0,
      value3: 0,
      value4: 0,
      ans: 0,
      countdown: 20
    },

    created () {
        this.get_question();
        this.tick();
    },

    computed: {
        formatTime () {
            return Math.floor(this.countdown / 60) + ":" + (this.countdown % 60);
        }
    },

    methods: {
        tick () {
            if (this.countdown === 0) {
                this.earn_stage5 = 0.5 * this.correct_num5;
                localStorage.setItem('earn5', this.earn_stage5);
                alert('Time is up. You have correctly answered ' + this.correct_num5 + ' questions. Your earnings at this stage is: S$' + this.earn_stage5 + '. Please wait......');
                window.location = 'final_result6.html';  
                return;
            }
            setTimeout(() => {
                this.countdown--;
                this.tick();
            }, 1000);
        },

        clear() {
            this.ans = 0;
        },

        get_sum () {
            return this.value1 + this.value2 + this.value3 + this.value4;
        },

        get_question () {
            // clear
            this.clear();

            // new numbers to add up
            this.value1 = Math.floor(Math.random() * 100) + 1;
            this.value2 = Math.floor(Math.random() * 100) + 1;
            this.value3 = Math.floor(Math.random() * 100) + 1;
            this.value4 = Math.floor(Math.random() * 100) + 1;
        },

        onSubmit () {
            // calculate
            ans = parseInt(this.ans);

            // compare
            if (ans === this.get_sum()){
                this.correct_num5 ++;
            } 

            // increase round
            this.current++;

            // regenerate random numbers after press submit
            this.get_question();
        }
    }

  })
