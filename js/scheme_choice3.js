var app = new Vue({
    el: '#scheme_choice',
    data: {
      choices: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

      scheme_num: 0,
      multiplier: 0,
      deduct: 0,
      Deductstr: ''
    },

    watch: {
        choices: function (val) {
            let pivot = 0;
            for (let i = val.length-1; i >= 0; i--) {
                if (val[i] === 1) {
                    if (pivot === 0) {
                        pivot = i;
                    }
                }
                if (pivot > 0) {
                    this.choices[i] = 1;
                }
            }
        }
    },

    methods: {
        onSubmit () {

            // generate random choice from 1 ~ 10
            this.scheme_num = Math.floor(Math.random() * 10) + 1;

            // return the payoff
            if (this.choices[this.scheme_num] === 1) {
                this.multiplier = 0.5;
                this.deduct = 1;
                this.Deductstr = 'Excess change will be deducted from your earnings.';
            } else {
                this.multiplier = Math.round(0.05 * this.scheme_num*100)/100;
                this.deduct = 0;
                this.Deductstr = 'Excess change will NOT be deducted from your earnings.';
            }
            alert('The computer has randomly chosen row' + this.scheme_num +'. Based on your selection, you will earn S$' + this.multiplier + ' for every correct transaction in this stage. ' + this.Deductstr + ' Please wait......');
            window.location = 'file:///C:/Users/bizwjin/Desktop/cashier/transaction3.html';    
            return;
        }

    }

  })