// pages/me/me.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({

    /**
     * 页面的初始数据
     */
    data: {
        // login: false,       //登录状态
        avatarUrl: defaultAvatarUrl,      //头像
        nickName: '',       //昵称
        // 页面跳转选择
        cellList: [{
                url: '../../images/myPublish.png',
                text: '我的发布',
                page: '../myPublish/myPublish'
            },
            // {
            //     url: '../../images/_collection.png',
            //     text: '我的收藏',
            //     page: '../myCollection/myCollection'
            // },
            {
                url: '../../images/myInformation.png',
                text: '我的信息',
                page: '../myInfo/myInfo'
            },
            {
                url: '../../images/logout.png',
                text: '退出登录'
            }
        ]
    },
    onChooseAvatar(e) {
      const { avatarUrl } = e.detail
      this.setData({
        avatarUrl
      })
      wx.setStorageSync('avatarUrl', avatarUrl)
    },
    // 实现页面跳转
    toDetail(e) {
        const {
            page
        } = e.currentTarget.dataset
        if (page) {
            wx.navigateTo({
                url: page,
            })
        } else {
            wx.showModal({
                title: '提示',
                content: '确定退出吗？',
                success: (res) => {
                    // console.log(res)
                    const {
                        confirm
                    } = res
                    // 清空缓存中的登录状态和个人信息
                    if (confirm) {
                        wx.removeStorageSync('login')
                        wx.removeStorageSync('userInfo')
                        this.setData({
                            login: false
                        })
                    }
                }
            })
        }
    },
    setNickName(e){
      let nickName = e.detail.value
      wx.setStorageSync('nickName', nickName)
      console.log(nickName)
    },
    // 实现登录
    toLogin() {
        wx.getUserProfile({
            desc: '获取用户信息',
            success: (res) => {
                // console.log(res)
                const {
                    userInfo: {
                        avatarUrl,
                        nickName
                    }
                } = res
                const userInfo = {
                    avatarUrl,
                    nickName
                }
                const avatarUrl1 = wx.getStorageSync('avatarUrl')
                const nickName1 = wx.getStorageSync('nickName')
                wx.setStorageSync('userInfo', userInfo)
                wx.setStorageSync('login', true)
                this.setData({
                    login: true,
                    avatarUrl : avatarUrl1,
                    nickName : nickName1
                })
            }
        })
        wx.cloud.callFunction({
          name:'GetOpenId',
        }).then(res=>{
         wx.setStorageSync('openid', res.result.userInfo.openId)//res就将appid和openid返回了
            //做一些后续操作，不用考虑代码的异步执行问题。
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const login = wx.getStorageSync('login')
        const userInfo = wx.getStorageSync('userInfo')
        if (userInfo) {
            const {
                avatarUrl,
                nickName
            } = userInfo
            this.setData({
                avatarUrl,
                nickName
            })
        }
        this.setData({
            login: !!login
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        if (typeof this.getTabBar === 'function' && this.getTabBar()) {
            this.getTabBar().setData({
                select: 4
            })
        }
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})