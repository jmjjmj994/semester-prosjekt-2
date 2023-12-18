





const validImgUrl = (url, callback) => {
   
    const img = new Image()
    
    img.onload = () => {
        callback(true)
    }
    img.onerror = () => {
        callback(false)
    }
   img.src = url
    console.log(img)
}
const confirm = (value) => {
    console.log(value)
}
validImgUrl("https://cdn.pixabay.com/photo/2023/05/26/15/52/buttterfly-8019730_960_720.jpg", confirm)