import { IProduct } from "../interfaces/product.interface";
import { Product } from "../models/product.model";

export class ProductService {
    public static async getAllProducts(): Promise<IProduct[]> {
        return[new Product(1, "Cookbook", 59.99, "A cookbook with recipes")];
    }
}
