// export const addFn = (context, options) => {

// }
import axios from 'axios'
axios.defaults.baseURL = 'https://www.easy-mock.com/mock/5cd4edc7e393cf7606e9d2f4';
export const addFn = ({ commit }, options) => {
    setTimeout(() => {
        commit('add', options); // 触发 mutations中的add函数

    }, 1000)
}

export const getBanner = ({ commit }, options) => {
    // return axios.get('/bannerList');
    // 把请求好的数据放到 vuex的state中
    axios.get('/nba/book').then((data) => {
        commit('changeBanner', data.data);
    });
}

export const getHomeList = () => {
    // 调取首页下的列表数据
    return axios.get('/nba/homeList');

}

// 获取列表页的初始数据
export const getList = ({ commit }, options) => {
    axios.get('/nba/listData').then(data => {
        commit('changeList', data.data); // 触发mutations 中的函数
    });
}