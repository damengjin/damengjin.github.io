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

      countdown: 20,
      userNote: [1, 2, 5, 10, 50]
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
    

    methods: {
        tick () {
            if (this.countdown === 0) {
                this.multiplier = localStorage.getItem('multiplier');
                this.deduction = localStorage.getItem('deduction');
                this.earn_stage3 = (this.multiplier * this.correct_num3) - (this.deduction * this.totalExcess3);
                localStorage.setItem('earn3', this.earn_stage3)
                alert('Time is up. You have made ' + this.correct_num3 + ' correct transactions. S$' + (this.deduction * this.totalExcess3) + ' is deducted due to excess change. Your earnings for this stage is S$' + Math.round(this.earn_stage3*10)/10 + '. Please wait......');
                window.location = 'random_fixed4.html';
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
                this.multiplier = localStorage.getItem('multiplier');
                this.deduction = localStorage.getItem('deduction');
                this.earn_stage3 = (this.multiplier * this.correct_num3) - (this.deduction * this.totalExcess3);
                localStorage.setItem('earn3', this.earn_stage3)
                alert('You have finished the maximum number of questions in this test. You have made ' + this.correct_num3 + ' correct transactions. S$' + (this.deduction * this.totalExcess3) + ' is deducted due to excess change. Your earnings for this stage is S$' + Math.round(this.earn_stage3*10)/10 + '. Please wait......');
                window.location = 'random_fixed4.html';
                return;
            }

            // clear
            this.clear();

            // new change
            value1 = Math.round(Math.random()*500+1) / 10;
            this.price = value1;
            this.pay = 0;

            while (this.pay < this.price) {
                let randIndex = Math.round(Math.random() * (this.userNote.length-1))
                let radomNote = this.userNote[randIndex]
                console.log(randIndex)
                this.pay += radomNote
            };

            // increase round
            this.current++;
        },

        onSubmit () {
            // calculate
            result = Math.round((parseInt(this.ten) * 10 + parseInt(this.five) * 5 + parseInt(this.two) * 2 + parseInt(this.one) + parseInt(this.fiftyc) * 0.5 + parseInt(this.twentyc) * 0.2 + parseInt(this.tenc) * 0.1 + parseInt(this.fivec) * 0.05)*100)/100;

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