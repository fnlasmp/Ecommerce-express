import { Router } from 'express';
import cartModel from '../models/cart.model.js';

const router = Router();

// Create a new cart
router.post('/', async (req, res) => {
  try {
    const cart = await cartModel.create({});
    res.status(201).send({ status: 'success', payload: cart });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: 'error', message: 'Failed to create cart' });
  }
});

// Get a cart by ID
router.get('/:cid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const cart = await cartModel.findById(cartId).populate('products.product').populate('products.product').lean();

     if (!cart) {
      return res.status(404).send({ status: 'error', message: 'Cart not found' });
    }

    // res.status(200).send({ status: 'success', payload: cart });
    res.render('cart', {
      products: cart.products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: 'error', message: 'Failed to get cart' });
  }
});

// Add a product to a cart
router.post('/:cid/products/:pid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity || 1;

    const cart = await cartModel.findById(cartId);

    if (!cart) {
      return res.status(404).send({ status: 'error', message: 'Cart not found' });
    }

    const productIndex = cart.products.findIndex(p => p.product.toString() === productId);

    if (productIndex > -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    await cart.save();

    res.status(200).send({ status: 'success', payload: cart });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: 'error', message: 'Failed to add product to cart' });
  }
});

// Remove a product from a cart
router.delete('/:cid/products/:pid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;

    const cart = await cartModel.findById(cartId);

    if (!cart) {
      return res.status(404).send({ status: 'error', message: 'Cart not found' });
    }

    cart.products = cart.products.filter(p => p.product.toString() !== productId);

    await cart.save();

    res.status(200).send({ status: 'success', payload: cart });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: 'error', message: 'Failed to remove product from cart' });
  }
});

// Update a cart with an array of products
router.put('/:cid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const products = req.body;

    if (!Array.isArray(products)) {
      return res.status(400).send({ status: 'error', message: 'Invalid product format' });
    }

    const cart = await cartModel.findById(cartId);

    if (!cart) {
      return res.status(404).send({ status: 'error', message: 'Cart not found' });
    }

    cart.products = products;
    await cart.save();

    res.status(200).send({ status: 'success', payload: cart });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: 'error', message: 'Failed to update cart' });
  }
});

// Update product quantity in a cart
router.put('/:cid/products/:pid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity;

    if (quantity === undefined) {
      return res.status(400).send({ status: 'error', message: 'Quantity is required' });
    }

    const cart = await cartModel.findById(cartId);

    if (!cart) {
      return res.status(404).send({ status: 'error', message: 'Cart not found' });
    }

    const productIndex = cart.products.findIndex(p => p.product.toString() === productId);

    if (productIndex === -1) {
      return res.status(404).send({ status: 'error', message: 'Product not found in cart' });
    }

    cart.products[productIndex].quantity = quantity;
    await cart.save();

    res.status(200).send({ status: 'success', payload: cart });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: 'error', message: 'Failed to update product quantity' });
  }
});

// Delete all products from a cart
router.delete('/:cid', async (req, res) => {
  try {
    const cartId = req.params.cid;

    const cart = await cartModel.findById(cartId);

    if (!cart) {
      return res.status(404).send({ status: 'error', message: 'Cart not found' });
    }

    cart.products = [];
    await cart.save();

    res.status(200).send({ status: 'success', payload: cart });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: 'error', message: 'Failed to delete products from cart' });
  }
});

export default router;