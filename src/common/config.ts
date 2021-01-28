export const appConfig = {
    tokenKey: 'Authorization',
    apiUrl:
        process.env.NODE_ENV === 'production' ? 'https://dev.huadongbio.com:8505/' : 'https://dev.huadongbio.com:8505/',
    indexImg: 'http://dev.huadongbio.com:8500/shanjian-app/index-cover.jpg',
    productImg: 'http://dev.huadongbio.com:8500/shanjian-app/goods.png',
    productId: '142605399923757056',
    orderPrice: 1000,
    postImg: 'https://dev.huadongbio.com:8505/wechat/share-poster.jpg',
}