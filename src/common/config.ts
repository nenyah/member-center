export const appConfig = {
    tokenKey: 'Authorization',
    apiUrl:
        process.env.NODE_ENV === 'production' ? '*' : '*',
    indexImg: 'http://192.168.0.175:8500/shanjian-app/index-cover.jpg',
}