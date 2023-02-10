
const  MapCloudinaryImgDataToImgObject = (Urls,ProductIDs)=> {
    return Urls.map((url, index) => {
        return {
          filename: `Image-${index}.jpeg`,
          url: url,
          productId: ProductIDs[index]
        }
        
      });
}

module.exports=MapCloudinaryImgDataToImgObject