

export function generateId() {
    const alphabets = "abc8debg7hijkl0mn6GH5IJKLMNo9pq1rstuv2wxy3zABCD4EFOPQRSTUVWSYZ"
    let id = ""
    for (let i = 0; i < 5; i++) {
        let ind = Math.floor(Math.random() * alphabets.length)
        id += alphabets[ind]
    }
    return id
}


export function getCoverPicture() {
    const images = ["/pic1.webp", "/pic2.webp", "/pic3.jpeg", "/pic4.jpeg"]
    let ind = Math.floor(Math.random() * 4)
    return images[ind]
}