var app = new Vue({
    el: '#transaction_no_deduct',
    data: {
      message: 'Hello Vue!',
      price: 0,
      pay: 0,
      round: 30,
      current: 0,
      correct_num2: 0,
      earn_stage2: 0,

      ten: 0,
      five: 0,
      two: 0,
      one: 0,
      fiftyc: 0,
      twentyc: 0,
      tenc: 0,
      fivec: 0,

      countdown: 180
    },

    created () {
        this.next();
        this.tick();
    },

    computed: {
        change () {
            return Math.round((this.pay - this.price) * 100)/100;
        },
        formatTime () {
            return Math.floor(this.countdown / 60) + ":" + (this.countdown % 60);
        }
    },

    methods: {
        tick () {
            if (this.countdown === 0) {
                this.earn_stage2 = 0.5 * this.correct_num2;
                alert('You have finished the test. You have made ' + this.correct_num2 + ' correct transactions. Your earnings for this stage is S$' + this.earn_stage2 + '. Please wait......');
                window.location = 'file:///Users/damengjin/Desktop/damengjin.github.io/scheme_choice3.html';
                return;
            }
            setTimeout(() => {
                this.countdown--;
                this.tick();
            }, 1000);
        },

        add (val) {
            console.log('++')
            this[val]++;
        },

        sub (val) {
            console.log('++')
            if (this[val] > 0){
                this[val]--;
            }
        },

        clear() {
            this.ten = 0;
            this.five = 0;
            this.two = 0;
            this.one = 0;
            this.fiftyc = 0;
            this.twentyc = 0;
            this.tenc = 0;
            this.fivec = 0;
        },

        next () {
            if (this.current === this.round) {
                this.earn_stage2 = 0.5 * this.correct_num2;
                alert('You have finished the test. You have made ' + this.correct_num2 + ' correct transactions. Your earnings for this stage is S$' + this.earn_stage2 + '. Please wait......');
                window.location = 'file:///Users/damengjin/Desktop/damengjin.github.io/scheme_choice3.html';
                return;
            }

            // clear
            this.clear();

            // new change
            value1 = Math.round(Math.random()*500+1) / 10;
            value2 = Math.round(Math.random()*500+1) / 10;
            this.price = Math.min(value1, value2);
            this.pay = Math.ceil(Math.max(value1, value2));

            // increase round
            this.current++;
        },

        onSubmit () {
            // calculate
            result = parseInt(this.ten) * 10 + parseInt(this.five) * 5 + parseInt(this.two) * 2 + parseInt(this.one) + parseInt(this.fiftyc) * 0.5 + parseInt(this.twentyc) * 0.2 + parseInt(this.tenc) * 0.1 + parseInt(this.fivec) * 0.05;

            // compare
            if (result < this.change) {
                alert('You have short changed the customer');
                return;
            } else if (result === this.change){
                this.correct_num ++;
            } 
            this.next();
        }
    }

  })