import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';

export class ProductController {

    public static async getProducts(req: Request, res: Response) {
        const products = await ProductService.getAllProducts();
        res.json(products); 
    }

    public static async addProduct(req: Request, res: Response) {
        try {
            const newProduct = req.body; 
            await ProductService.addProduct(newProduct); 
            res.status(201).json({ message: 'Succès ajout product' }); 

        } catch (error) {
            res.status(500).json({ message: 'Erreur ajout product', error });
        }
    }

    public static async modifyProductById(req: Request, res: Response) {
        try {
            const requestedId = req.params.id;
            const newProduct = req.body;
            await ProductService.modifyProductFromId(requestedId, newProduct);
            res.status(201).json({ message: 'Succès modification product' }); 
        } catch (error) {
            res.status(500).json({ message: 'Erreur modification product', error });
        }
    }

    public static async deleteProductById(req: Request, res: Response) {
        try {
            const requestedId = req.params.id;
            await ProductService.deleteProductFromId(requestedId);
            res.status(201).json({ message: 'Succès supprimer product' }); 
        } catch (error) {
            res.status(500).json({ message: 'Erreur supprimer product', error });
        }
    }


}
