// pages/classify/classify.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        asideBars:["证件","书籍","生活用品","电子产品"],
        select:0,
        rightItems: [   // 右侧物品栏数据
          { name: "身份证", img: "../../images/demo2.jpg" },//0
          { name: "学生证", img: "../../images/demo2.jpg" },//1
          { name: "书本", img: "../../images/demo2.jpg" },//2
          { name: "钥匙", img: "../../images/demo2.jpg" },//3
          { name: "书包", img: "../../images/demo2.jpg" },//4
          { name: "手机", img: "../../images/demo2.jpg" },//5
          // 根据实际需要添加更多物品数据
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
        const rightItems = this.data.rightItems
        console.log(rightItems)
        let toShow=[]
        if (index === 0) { // 如果选择的是左边第一个分类
          console.log('证件')
          toShow = rightItems.slice(0, 2); // 取rightItems中的第一个和第二个物品
      } else if(index === 1) {
          console.log('书籍')
          // 其他分类的处理，可以根据实际情况进行更改
          // 这里假设其他分类也展示前两个物品
          toShow = rightItems.slice(2,3);
      } else if(index === 2){
          toShow = rightItems.slice(3, 5);
      } else{
          toShow = rightItems.slice(5);
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
      this.setData({
        rightItems: [
          { name: "身份证", img: "../../images/demo2.jpg" },
          { name: "学生证", img: "../../images/demo2.jpg" },
          { name: "书本", img: "../../images/demo2.jpg" },
          { name: "钥匙", img: "../../images/demo2.jpg" },
          { name: "书包", img: "../../images/demo2.jpg" },
          { name: "手机", img: "../../images/demo2.jpg" }
          // 添加更多物品数据
      ],
        select: 0,
        rightItemsToShow: this.data.rightItems.slice(0, 2)
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