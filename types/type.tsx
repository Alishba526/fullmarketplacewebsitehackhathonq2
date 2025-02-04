
export interface Product {
    productImage: any;
    id:  null | undefined;
    colors: any;
    category: string;
    quantity: any;
    inventory: number;
    image: any;
    productName:any;
    _id: string; // Unique ID
    name: string; // Product name
    title: string; // Title of the product
    price: number; // Product price
    description: string; // Description of the product
    imageUrl: string; // URL of the product image
    slug: {
      _type: "slug"; // Sanity slug type
      current: string; // Current slug value
    };


    

  }
