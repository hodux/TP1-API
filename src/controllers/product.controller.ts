import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';

export class ProductController {

    public static async getProducts(req: Request, res: Response) {
        try {
            let products = await ProductService.getAllProducts();

            if(req.query.minPrice && req.query.maxPrice) {
                const minPrice = parseFloat(req.query.minPrice as string)
                const maxPrice = parseFloat(req.query.maxPrice as string) 
                products = products.filter((product: any) => product.price >= minPrice && product.price <= maxPrice);
            }
            if(req.query.minStock && req.query.maxStock) {
                const minStock = parseInt(req.query.minStock as string)
                const maxStock = parseInt(req.query.maxStock as string) 
                products = products.filter((product: any) => product.quantity >= minStock && product.quantity <= maxStock);
            }
            res.status(200).json(products); 
        } catch (error) {
            res.status(400).json({ message: "Requête invalide", error})
        }
    }

    public static async addProduct(req: Request, res: Response) {
        try {
            const newProduct = req.body; 
            await ProductService.addProduct(newProduct); 
            res.status(201).json({ message: 'Succès ajout product' }); 
        } catch (error) {
            res.status(400).json({ message: 'Erreur ajout product', error });
        }
    }

    public static async modifyProductById(req: Request, res: Response) {
        try {
            const requestedId = req.params.id;
            const newProduct = req.body;
            await ProductService.modifyProductFromId(requestedId, newProduct);
            res.status(200).json({ message: 'Produit modifié avec succès' }); 
        } catch (error : any) {
            if (error.status === 400) {
                res.status(400).json({ message: 'Requête invalide', error: error.message });
            } else if (error.status === 404) {
                res.status(404).json({ message: 'Produit ne existe pas', error: error.message });
            }
        }
    }

    public static async deleteProductById(req: Request, res: Response) {
        try {
            const requestedId = req.params.id;
            await ProductService.deleteProductFromId(requestedId);
            res.status(201).json({ message: 'Produit supprimer avec succès' }); 
        } catch (error) {
            res.status(404).json({ message: 'Produit ne existe pas', error });
        }
    }


}
