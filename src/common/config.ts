export const appConfig = {
    tokenKey: 'Authorization',
    apiUrl:
        process.env.NODE_ENV === 'production' ? 'https://dev.huadongbio.com:8505/' : 'https://dev.huadongbio.com:8505/',
    indexImg: 'http://dev.huadongbio.com:8500/shanjian-app/index-cover.jpg',
    privacyImg: 'http://dev.huadongbio.com:8500/shanjian-app/privacy.jpg',
    productImg: 'http://dev.huadongbio.com:8500/shanjian-app/goods.png',
    product: '膳见纤玺 高纤多维复合蛋白固体饮料（20g*10 包）',
}