import { IProduct } from "../interfaces/product.interface";
import { Product } from "../models/product.model";
import fs from "fs/promises";

export class ProductService {
    public static async getAllProducts(): Promise<IProduct[]> {
        
        const data = await fs.readFile("json/products.json", "utf-8");
        const result = JSON.parse(data);

        // Mapping pour prendre seulement les données requis
        // Quantity est 5 pour chaque produit, le fakestoreapi ne contient pas de property pour quantity
        const products: IProduct[] = result.map((item: any) => {
            return new Product(
                item.id,
                item.title,
                item.description,
                item.category,
                5,
                item.price
            );
        });

        return products;
    }

    public static async addProduct(newProduct: IProduct): Promise<void> {
        const data = await fs.readFile("json/products.json", "utf-8");
        const result = JSON.parse(data);

        // Ajout automatique de id
        newProduct.id = result.length + 1;

        result.push(newProduct);

        await fs.writeFile("json/products.json", JSON.stringify(result, null, 2));
    }
    
}
