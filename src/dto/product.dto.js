class ProductDTO {
    constructor({ title, description, price, code, stock, category, thumbnail}) {
      this.title = title;
      this.description = description;
      this.price = price;
      this.code = code;
      this.stock = stock;
      this.category = category;
      this.thumbnail = thumbnail;
      this.status = true;
    }
  }
  
  export default ProductDTO;