// export default {

// }

// export const add = () => {

// }
// export let add = () => {

// }
// export var add = () => {

// }

export function add(state,options) {
    state.count++;
}

export function remove(state,options) {
    state.count--;
}

export function changeBanner(state, options) {
    // 改变state中的 bannerList 数据
    state.bannerList = options;
}

export function changeList(state, options) {
    // 重置state 中的列表页数据
    state.listData = options;
    state.isGetList = true;
}
// 删除 listData中的对应数据
export function removeList(state, options) {
    // 要从state中的listData中 把options这条数据删除
    state.listData = state.listData.filter(item=> {
        return item.bookId != options.bookId;
    })
}

// 添加 listData中的新数据
export function addList(state, options) {
    state.listData.unshift(options);
}


// 删除收藏页的对应数据
export function removeCollect(state, options) {
    // 要从state中的listData中 把options这条数据删除
    state.collectData = state.collectData.filter(item=> item.bookId != options.bookId);
}

// 向收藏列表添加数据
export function addCollect(state, options) {
    // 在添加之前 要先去判断有没有 有的话就不用再去 添加了
    let bol = state.collectData.some(item=> {
        return item.bookId === options.bookId;
    })

    if(bol) return; // bol 是true 代表数组中有该条数据 就不用添加了
    state.collectData.unshift(options);
}