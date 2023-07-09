Component({
    properties: {},
    data: {
        mode: 'voice',
        isPressing: false,
        loading: false,
        inputValue: '',
        autosize: {
            maxHeight: 80,
            minHeight: 20,
          },
          bottomHeight: 0
    },
    methods: {
        onLineChange(e) {
            console.log('lineCount: ', e.detail);
          },
        changeMode() {
            wx.vibrateShort({ type: "medium" })
            if (this.data.mode === 'voice') {
                this.setData({
                    mode: 'text',
                    bottomHeight: 0
                });
            } else if (this.data.mode === 'text') {
                this.setData({
                    mode: 'voice'
                });
            }
        },
        setLoadingState(loading: boolean) {
            console.info(`setLoadingState loading: ${loading}`)
            this.setData({
                loading: loading
            })
            if (!loading) {
                this.setData({
                    isPressing: false
                })
            }
        },
        longPressed() {
            console.info(`longPressed`)
            this.setData({
                isPressing: true
            })
            this.triggerEvent('longPressed', {}, {})
        },
        onTouchEnd: function () {
            this.triggerEvent('onTouchEnd', {}, {})
        },
        onChange: function(e) {
            console.info(`value: ${JSON.stringify(e.detail.value)}`)
            this.setData({
                inputValue: e.detail.value
            });
        },
        confirm: function () {
            console.info(this.data.inputValue)
            if (this.data.inputValue === '') {
                return;
            }
            wx.vibrateShort({ type: "medium" })
            this.triggerEvent('confirm', { inputValue: this.data.inputValue }, {})
            this.setData({
                inputValue: ''
            });
        },
        inputFocus(e) {
            const height = e.detail.height;
            if(height) {
                this.setData({
                    bottomHeight: height
                })
            }
        },
        changeInputBlur(e) {
            this.setData({
                bottomHeight: 0
            })
        }
    }
});