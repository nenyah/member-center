export const validate = {
    isMobile(s: string) {
        return /^1[3456789]\d{9}$/.test(s)
    }
}

