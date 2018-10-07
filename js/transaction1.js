var app = new Vue({
    el: '#transaction1',
    data: {
        userid: '',
        price: 0,
        pay: 0,
        round: 30,
        current: 0,
        correct_num: 0,
        earn_stage: 0,

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

        startTime: 0,

        countdown: 20,
        userNote: [1, 2, 5, 10, 50]
    },

    created () {
        this.next(false);
        this.tick();
        this.startTime = Date.now();
        localStorage.removeItem('earn1');
        localStorage.removeItem('earn2');
        localStorage.removeItem('earn3');
        localStorage.removeItem('earn4');
        localStorage.removeItem('earn5');
        localStorage.removeItem('multiplier');
        localStorage.removeItem('deduction');
    },

    computed: {
        change () {
            return Math.round((this.pay - this.price) * 100)/100;
        },
        totalExcess () {
            return Math.round(this.store.excess.reduce((a, b) => a + b, 0)*10)/10;
        },
        formatTime () {
            return Math.floor(this.countdown / 60) + ":" + (this.countdown % 60);
        }
    },

    methods: {
        tick () {
            if (this.countdown === 0) {
                this.earn_stage = (0.5 * this.correct_num) - this.totalExcess;
                localStorage.setItem('earn1', this.earn_stage);
                alert('Time is up. You have finished the test. You have made ' + this.correct_num + ' correct transactions. You have given away S$' + this.totalExcess + ' excess change. Your earnings for this stage is S$' + this.earn_stage + '. Please wait......');
                window.location = 'transaction2.html';
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

        next (submit=true) {
            if (this.current === this.round) {
                this.earn_stage = (0.5 * this.correct_num) - this.totalExcess;
                localStorage.setItem('earn1', this.earn_stage);
                alert('You have finished maximum number of 30 questions. You have made ' + this.correct_num + ' correct transactions. You have given away S$' + this.totalExcess + ' excess change. Your earnings for this stage is S$' + this.earn_stage + '. Please wait......');
                window.location = 'transaction2.html';
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

            if (submit) {
                // submit to google doc
                let responseTime = Math.round((Date.now() - this.startTime) / 1000);
                this.startTime = Date.now();

                let params = 'entry.1563813375=' + responseTime 
                + '&entry.871563223=' + this.userid

                + '&entry.871563223=' + this.userid
                + '&entry.871563223=' + this.userid
                + '&entry.871563223=' + this.userid
                + '&entry.871563223=' + this.userid
                + '&entry.871563223=' + this.userid
                + '&entry.871563223=' + this.userid

                this.sendResult('https://docs.google.com/forms/d/e/1FAIpQLScWfLKDXUn4O3O01jnv4UrTnLBeBCFtfPIASO01F5JCm7Ssgg/formResponse?' + params)

            }

        },

        sendResult (fullURL) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
              if (this.readyState == 4 && this.status == 200) {
                document.getElementById("demo").innerHTML =
                this.responseText;
              }
            };
            xhttp.open("GET", fullURL, true);
            xhttp.send();
          },

        onSubmit () {
            // calculate
            result = Math.round((parseInt(this.ten) * 10 + parseInt(this.five) * 5 + parseInt(this.two) * 2 + parseInt(this.one) + parseInt(this.fiftyc) * 0.5 + parseInt(this.twentyc) * 0.2 + parseInt(this.tenc) * 0.1 + parseInt(this.fivec) * 0.05)*100)/100;

            // compare
            if (result < this.change) {
                alert('You have short changed the customer');
                return;
            } else if (result === this.change){
                this.correct_num ++;
            } else {
                excess = Math.round((result - this.change)*10)/10;
                this.store.excess.push(excess);
            }
            this.next();
        }
    }

  })
