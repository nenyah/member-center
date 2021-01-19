export const appConfig = {
    tokenKey: 'Authorization',
    apiUrl:
        process.env.NODE_ENV === 'production' ? 'https://dev.huadongbio.com:8505/' : 'https://dev.huadongbio.com:8505/',
    indexImg: 'http://192.168.0.175:8500/shanjian-app/index-cover.jpg',
    privacyImg: 'http://192.168.0.175:8500/shanjian-app/privacy.jpg',
}