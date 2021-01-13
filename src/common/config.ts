export const appConfig = {
    tokenKey: 'Authorization',
    apiUrl:
        process.env.NODE_ENV === 'production' ? '*' : '*',
    indexImg: 'https://tp.huadongbio.com:9000/weixinapp-shanjian/index-cover.jpg',
}