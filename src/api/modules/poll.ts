import http from '@/utils/request'

type Answer = {
    [index: string]: string | string[]
    username: string
    gender: string
    age: string
    stature: string
    weight: string
    waistline: string
    targetWeight: string
    homeFat: string
    fatTime: string
    losingWeightWays: string[]
    loseWeightInHalfYear: string
    eatRegularly: string[]
}
export default {
    info: (): Promise<any> => {
        return http.get(`questionnaire/form`, {})
    },
    uploadAnswer: (answer: Answer): Promise<any> => {
        return http.post(`questionnaire`, answer)
    }
}
