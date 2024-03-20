// pages/myPublish/myPublish.js

import {
    formatTime
} from '../../utils/index' //导入时间格式化函数

const db = wx.cloud.database()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabList: ['寻主', '寻物'],
        list: [],
        select: 0
    },

    getTab(e) {
        // console.log(e)
        const select = e.detail;
        this.setData({
            select
        })
        this.onLoad();
    },

    // 进入物品的详情页面
    toDetail(e) {
        let {
            item
        } = e.currentTarget.dataset;
        // const id = item.id;
        // delete item['_id'];
        // item._id = id;
        // console.log(item)
        wx.navigateTo({
            // 通过路径将数据传入
            url: `../detailPage/detailPage?info=${JSON.stringify(item)}`,
            // url:`../detailPage/detailPage?id=${item._id}`
        })
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const {
            select
        } = this.data;
        // 查表，对tab进行动态切换
        const openid = wx.getStorageSync('openid');
        db.collection('publish').where({
            type: String(select),
            _openid: openid
        }).get({
            success: (res) => {
                // console.log(res);
                const {
                    data
                } = res;
                const sortedData = data.sort((a, b) => {
                  return a.time > b.time ? -1 : a.time < b.time ? 1 : 0;
                });
                this.setData({
                    list: sortedData.map(item => {
                        return {
                            ...item,
                            time: formatTime(item.time)
                        }
                    })
                })
            }
        })
    },
    deleteItem(e) {
      const { item } = e.currentTarget.dataset;
      const id = item._id; // 获取item的_id
      const imgList = item.imgList;
      wx.showModal({
        title: '提示',
        content: '确定要删除这条记录吗？',
        success(res) {
          if (res.confirm) {
            // 用户点击了确定，执行删除操作
            db.collection('publish').where({
              _id: id
            }).remove({
              success: function (res) {
                console.log('删除成功')
                wx.showToast({
                  title: '删除成功',
                  icon: 'success',
                  duration: 2000
                });
                // 遍历imgList，删除云存储中的图片
            imgList.forEach(async (imgItem, index) => {
              try {
                // 注意：这里需要替换为您的云存储空间中图片的真实路径
                const result = await wx.cloud.deleteFile({
                  fileList: [imgItem], // 云存储中图片的URL
                });
                console.log('删除云存储图片', result);
              } catch (error) {
                console.error('删除云存储图片失败', error);
              }
            });
                // 删除成功后，更新页面数据
                const newList = this.data.list.filter(listItem => listItem._id !== id);
                this.setData({
                  list: newList
                });
                this.onLoad();
              }.bind(this)
            });
          } else if (res.cancel) {
            console.log('用户点击了取消')
          }
        }
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