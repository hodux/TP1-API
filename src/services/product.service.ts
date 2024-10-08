import { IProduct } from "../interfaces/product.interface";
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

        if (!newProduct) {
            throw { status: 400 }; // Validation error
        }

        try {
            const product = result.find((b : any) => b.id === parseInt(requestedId));

            product.name = newProduct.name || product.name;
            product.description = newProduct.description || product.description;
            product.category = newProduct.category || product.category
            product.quantity = newProduct.quantity || product.quantity
            product.price = newProduct.price || product.price
    
            await fs.writeFile("json/products.json", JSON.stringify(result, null, 2));
        } catch (error) {
            throw { status: 404 };
        }

    }

    public static async deleteProductFromId(requestedId : any): Promise<void> {
        const data = await fs.readFile("json/products.json", "utf-8");
        const result = JSON.parse(data);
    
        const productIndex = result.findIndex((b: any) => b.id === parseInt(requestedId));
    
        if (productIndex !== -1) { 
            result.splice(productIndex, 1); 
            await fs.writeFile("json/products.json", JSON.stringify(result, null, 2));
        } else {
            throw new Error();
        }
    }
    
}
