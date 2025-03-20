import { Router } from 'express';
import productModel from '../models/product.model.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;

    let filter = {};
    if (query) {
      if (query === 'available') {
        filter = { available: true };
      } else {
        filter = { category: query };
      }
    }

    const options = {
      limit: parseInt(limit),
      page: parseInt(page),
      sort: sort ? { price: sort === 'asc' ? 1 : -1 } : undefined,
      lean: true,
    };

    const products = await productModel.paginate(filter, options);

    res.status(200).send({
      status: 'success',
      payload: products.docs,
      totalPages: products.totalPages,
      prevPage: products.prevPage,
      nextPage: products.nextPage,
      page: products.page,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
      prevLink: products.hasPrevPage ? `/products?limit=${limit}&page=${products.prevPage}&sort=${sort}&query=${query || ''}` : null,
      nextLink: products.hasNextPage ? `/products?limit=${limit}&page=${products.nextPage}&sort=${sort}&query=${query || ''}` : null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: 'error', message: 'Failed to get products' });
  }
});

export default router;