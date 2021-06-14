export const countProperty = (obj : any) : number => {
    var count = 0;
    for (let p in obj) {
        count ++;
    }
    return count;
}