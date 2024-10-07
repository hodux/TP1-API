import { randomInt } from "crypto";
import { IProduct } from "../interfaces/product.interface";
import { Product } from "../models/product.model";
import fs from "fs/promises";

export class ProductService {
    public static async getAllProducts(): Promise<IProduct[]> {
        
        const data = await fs.readFile("json/products.json", "utf-8");
        const result = JSON.parse(data);

        return result;
    }

    public static async addProduct(newProduct: IProduct): Promise<void> {
        const data = await fs.readFile("json/products.json", "utf-8");
        const result = JSON.parse(data);

        // Ajout automatique de id
        newProduct.id = result.length + 1;

        result.push(newProduct);

        await fs.writeFile("json/products.json", JSON.stringify(result, null, 2));
    }

    public static async modifyProductFromId(requestedId : any, newProduct: IProduct): Promise<void> {
        const data = await fs.readFile("json/products.json", "utf-8");
        const result = JSON.parse(data);

        const product = result.find((b : any) => b.id === parseInt(requestedId));
        product.name = newProduct.name || product.name;
        product.description = newProduct.description || product.description;
        product.category = newProduct.category || product.category
        product.quantity = newProduct.quantity || product.quantity
        product.price = newProduct.price || product.price

        await fs.writeFile("json/products.json", JSON.stringify(result, null, 2));
    }

    public static async deleteProductFromId(requestedId : any): Promise<void> {
        const data = await fs.readFile("json/products.json", "utf-8");
        const result = JSON.parse(data);

        result.splice(requestedId-1, 1)

        await fs.writeFile("json/products.json", JSON.stringify(result, null, 2));
    }
    
}
