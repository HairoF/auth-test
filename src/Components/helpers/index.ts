export default function validate(type:string,str: string):boolean {
    if(type === 'username') {
        return str.length >= 4 ? true : false
    } else {
        return str.length >= 3 ? true : false
    }
}
