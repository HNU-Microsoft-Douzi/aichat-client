// components/person-select-group/personSelectGroup.ts
var log = require('../../utils/log.js')
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        visible: false,
        selectedPersonName: '莉莉', // 默认选择莉莉的name
        screenWidth: 0,
        personList: [
            // 更多数据...
        ],
    },

    lifetimes: {
        attached() {
            const _this = this;
            wx.getSystemInfo({
                success: function (res) {
                    console.info(`屏幕宽度: ${res.windowWidth}`)
                    _this.setData({
                        screenWidth: res.windowWidth - 30,
                    });
                },
            });
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        onPersonSelect: function (event) {
            const personId = event.currentTarget.dataset.id;
            this.setData({
                selectedPersonName: personId,
            });
        },
        onConfirmSelect: function () {
            if (this.data.selectedPersonName === null) {
                console.log('用户没有选择任何item');
            } else {
                console.log('用户选择的item的id:', this.data.selectedPersonName);
                this._updateUserSelectPartnerId(this.data.selectedPersonName);
                this.setData({
                    visible: false
                })
            }
        },
        onVisibleChange(e) {
            this.setData({
                visible: e.detail.visible,
            });
        },
        show() {
            if (this.data.personList.length === 0) {
                this._updatePartnerList();
            }
            this.setData({
                visible: true
            })
        },
        _updateUserSelectPartnerId(name) {
            const _this = this;
            wx.cloud.callFunction({
                // 云函数名称
                name: 'updateUserSetting',
                data: {
                    partner_name: name
                },
                success: function (res) {
                    _this.setData({
                        selectedPersonName: name
                    })
                    // 重置app.ts中的全局变量
                    getApp().initUserSettingData();
                    _this.triggerEvent('partnerChange', { name: _this.data.selectedPersonName });
                },
                fail: console.error
            });
        },
        _updatePartnerList() {
            const _this = this;
            const database = getApp().globalData.db;
            database.collection(getApp().globalData.partner_name).get().then(res => {
                console.info(`${getApp().globalData.partner_name} get partner success: ${JSON.stringify(res.data)}`);
                const partners = res.data;
                let partnerList: any[] = []
                partners.forEach(item => {
                    partnerList.push({
                        id: item._id,
                        name: item.name,
                        image: `https://www.yubanstar.top/pic?filename=${item.image}`,
                        language: item.language,
                        speed: item.speed,
                        text_style: item.text_style,
                        vcn: item.vcn,
                        voice_style: item.voice_style,
                        prompt: item.prompt,
                        short_description: item.short_description,
                        full_description: item.full_description
                    })
                });
                _this.setData({
                    personList: partnerList
                })
            }, err => {
                console.info(`get partner fail`);
                log.error(err)
            });
        }
    }
})
