Component({
    properties: {},
    data: {
        mode: 'text',
        isPressing: false,
        loadding: false,
        inputValue: ''
    },
    methods: {
        changeMode() {
            if (this.data.mode === 'voice') {
                this.setData({
                    mode: 'text'
                })
            } else if (this.data.mode === 'text') {
                this.setData({
                    mode: 'voice'
                })
            }
        },
        longPressed() {
            console.info(`longPressed`)
            this.setData({
                isPressing: true
            })
        },
        onTouchEnd: function () {
            this.setData({
                isPressing: false
            })
        },
        confirm: function () {
            console.log(this.data.inputValue);
            this.setData({
                inputValue: ''
            });
        },
        bindInput: function (e) {
            this.setData({
                inputValue: e.detail.value
            });
        }
    }
});