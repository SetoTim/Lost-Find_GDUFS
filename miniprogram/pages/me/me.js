// pages/me/me.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // login: false,       //登录状态
        avatarUrl: '',      //头像
        nickName: '',       //昵称
        // 页面跳转选择
        cellList: [{
                url: '../../images/myPublish.png',
                text: '我的发布',
                page: '../myPublish/myPublish'
            },
            {
                url: '../../images/_collection.png',
                text: '我的收藏',
                page: '../myCollection/myCollection'
            },
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
                wx.setStorageSync('userInfo', userInfo)
                wx.setStorageSync('login', true)
                this.setData({
                    login: true,
                    avatarUrl,
                    nickName
                })
            }
        })
  wx.getUserInfo({
              //成功后会返回
              success:(res)=>{
                console.log(res);
                // 把你的用户信息存到一个变量中方便下面使用
                let userInfo1 = res.userInfo
                //获取openId（需要code来换取）这是用户的唯一标识符
                // 获取code值
                wx.login({
                  //成功放回
                  success:(res)=>{
                    console.log(res);
                    let code=res.code
                    // 通过code换取openId
                    wx.request({
                      url: `https://api.weixin.qq.com/sns/jscode2session?appid=wx81392b94c4130c1b&secret=240e5c36cf3d79950c211a129b6223c3&js_code=${code}&grant_type=authorization_code`,
                      success:(res)=>{
                        console.log(res);
                        userInfo1.openid=res.data.openid
                        wx.setStorageSync('openid', userInfo1.openid);
                      }
                    })
                  }
                })
              }
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