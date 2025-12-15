export const formatPhoneNumber = (phoneNumberString: string) => {
    if (phoneNumberString) {
        return `${phoneNumberString.slice(0, 3)} ${phoneNumberString.slice(3, 5)} ${phoneNumberString.slice(5, 8)} ${phoneNumberString.slice(8, 10)} ${phoneNumberString.slice(10)}`
    } else {
        return ""
    }
}
