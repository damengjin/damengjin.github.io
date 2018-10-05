var app = new Vue({
    el: '#transaction3',
    data: {
      price: 0,
      pay: 0,
      round: 30,
      current: 0,
      correct_num3: 0,
      earn_stage3: 0,
      multiplier: 0,
      deduction:0,

      ten: 0,
      five: 0,
      two: 0,
      one: 0,
      fiftyc: 0,
      twentyc: 0,
      tenc: 0,
      fivec: 0,

      store: {
        excess: []
      },

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
        totalExcess3 () {
            return Math.round(this.store.excess.reduce((a, b) => a + b, 0)*10)/10;
        },
        formatTime () {
            return Math.floor(this.countdown / 60) + ":" + (this.countdown % 60);
        }
    },
    
    watch: {
        multiplier: function (val) {
            multiplier = val;
        },

        deduction: function (val) {
            deduction = val;
        }
      },

    methods: {
        tick () {
            if (this.countdown === 0) {
                this.earn_stage3 = (this.multiplier * this.correct_num3) - (this.deduction * this.totalExcess3);
                alert('Time is up. You have made ' + this.correct_num3 + ' correct transactions. S$' + (this.deduction * this.totalExcess3) + ' is deducted due to excess change. Your earnings for this stage is S$' + this.earn_stage + '. Please wait......');
                window.location = 'file:///C:/Users/bizwjin/Desktop/cashier/random_fixed4.html';
                return;
            }
            setTimeout(() => {
                this.countdown--;
                this.tick();
            }, 1000);
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
                this.earn_stage3 = (this.multiplier * this.correct_num3) - (this.deduction * this.totalExcess3);
                alert('You have finished the maximum number of questions in this test. You have made ' + this.correct_num3 + ' correct transactions. S$' + (this.deduction * this.totalExcess3) + ' is deducted due to excess change. Your earnings for this stage is S$' + this.earn_stage + '. Please wait......');
                window.location = 'file:///C:/Users/bizwjin/Desktop/cashier/random_fixed4.html';
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
                this.correct_num3 ++;
            } else {
                excess = Math.round((result - this.change)*10)/10;
                this.store.excess.push(excess);
            }
            this.next();
        }
    }

  })