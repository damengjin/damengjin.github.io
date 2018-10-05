var app = new Vue({
    el: '#random_fixed',
    data: {
      choices2: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

      random_row: 0,
      earn4: 0,
      ansStr: ''
    },

    
    watch: {
        choices2: function (val) {
            let pivot = 0;
            for (let i = val.length-1; i >= 0; i--) {
                if (val[i] === 1) {
                    if (pivot === 0) {
                        pivot = i;
                    }
                }
                if (pivot > 0) {
                    this.choices2[i] = 1;
                }
            }
        }
    },

    methods: {
        onSubmit () {
            // generate random choice from 1 ~ 10
            this.random_row = Math.floor(Math.random() * 10) + 1;

            if (this.choices2[this.random_row - 1] === 1) {
                this.earn4 = Math.random() < 0.5 ? 0 : 5;
                this.ansStr = 'random Payment. ';
            } else {
                this.earn4 = 0.5 * (this.random_row-1);
                this.ansStr = 'fixed Payment. ';
            }
            alert('The computer has randomly chosen row ' + this.random_row +'. Based on your selection, you will earn a ' + this.ansStr + 'You will receive S$' + this.pay + ' in this stage. Please wait......');
            window.location = 'file:///C:/Users/bizwjin/Desktop/cashier/Adding_numbers5.html';  
            return;
        }
    }

})