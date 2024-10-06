import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';

export class ProductController {

    public static async getProducts(req: Request, res: Response) {
        const products = await ProductService.getAllProducts();
        res.json(products); 
    }

}
