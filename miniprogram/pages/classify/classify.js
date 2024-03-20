// pages/classify/classify.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        asideBars:["证件类","书籍类","生活用品类","电子产品类","其他"],
        select:0,
        rightItemsId: [   
          { name: "身份证", img: "../../images/IDCard.png" },
          { name: "学生证", img: "../../images/studentIDCard.png" }
      ],
        rightItemsBook: [
          { name: "课本", img: "../../images/classBook.png" },
          { name: "课外书", img: "../../images/afterClassBook.png" }
        ],
        rightItemsLifes: [
          { name: "钥匙", img: "../../images/Keys.png" },
          { name: "书包", img: "../../images/bag.png" }
        ],
        rightItemsElectronic: [
          { name: "手机", img: "../../images/phone.png" },
          { name: "U盘", img: "../../images/upan.png" }
        ],
        rightItemsOthers: [
          { name: "其他", img: "../../images/others.png" }
        ]

    },
    goTo(e){
        const index = this.data.select
        wx.navigateTo({
          url: `../classifed/classified?index=${index}`
        })
        console.log(index)
},
    // 侧边栏的选择
    selectBar(e){
        const {index} = e.currentTarget.dataset
        let toShow=[]
        if (index === 0) { // 如果选择的是左边第一个分类
          toShow = this.data.rightItemsId; // 取rightItems中的第一个和第二个物品
      } else if(index === 1) {
          // 其他分类的处理，可以根据实际情况进行更改
          // 这里假设其他分类也展示前两个物品
          toShow = this.data.rightItemsBook;
      } else if(index === 2){
          toShow = this.data.rightItemsLifes;
      } else if(index === 3){
          toShow = this.data.rightItemsElectronic;
      } else{
          toShow = this.data.rightItemsOthers
      }
        this.setData({
            select:index,
            rightItemsToShow: toShow
        })
    },
    // 跳转到搜索页面
    toSearch(){
        wx.navigateTo({
          url: '../search/search',
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      const login1 = wx.getStorageSync('login');
      if(login1){}else{
        wx.switchTab({
          url: '../me/me',
          success: () => {
              wx.showToast({
                  icon: 'none',
                  title: '请前往我的页面进行登录',
              })
          }
      })
      };
      this.setData({
        rightItemsId: [   
          { name: "身份证", img: "../../images/IDCard.png" },
          { name: "学生证", img: "../../images/studentIDCard.png" }
      ],
      rightItemsId: [   
        { name: "身份证", img: "../../images/IDCard.png" },
        { name: "学生证", img: "../../images/studentIDCard.png" }
    ],
      rightItemsBook: [
        { name: "课本", img: "../../images/classBook.png" },
        { name: "课外书", img: "../../images/afterClassBook.png" }
      ],
      rightItemsLifes: [
        { name: "钥匙", img: "../../images/Keys.png" },
        { name: "书包", img: "../../images/bag.png" }
      ],
      rightItemsElectronic: [
        { name: "手机", img: "../../images/phone.png" },
        { name: "u盘", img: "../../images/upan.png" }
      ],
      rightItemsOthers: [
        { name: "其他", img: "../../images/others.png" }
      ],
        select: 0,
        rightItemsToShow: this.data.rightItemsId
    });
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
        if(typeof this.getTabBar === 'function' && this.getTabBar()){
            this.getTabBar().setData({
                select:1
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