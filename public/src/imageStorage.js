//imageStorage.js


const imageStorage = {
    images: [],
  
    addImage(image) {
      this.images.push(image);
    },
  
    getImages() {
      return this.images;
    },
  
    getImageById(id) {
      return this.images.find(image => image.id === id);
    },
  
    deleteImage(id) {
      this.images = this.images.filter(image => image.id !== id);
    },
  };
  
  export default imageStorage;