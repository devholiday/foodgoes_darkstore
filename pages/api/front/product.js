import { withSessionRoute } from "../../../lib/withSession";
import dbConnect from '../../../lib/dbConnect';
import Product from '../../../models/Product';

export default withSessionRoute(handler);

async function handler(req, res) {
  try {
    await dbConnect();

    const {productId} = req.query;

    const product = await Product.findOne({_id: productId, status: 'active'});
    if (!product) {
      throw("not found product")
    }

    res.status(200).json({
      id: product.id,
      title: product.title,
      image: product.images && product.images.length ? process.env.UPLOAD_PRODUCTS+product.images[0] : null,
      images: product.images.map(img => process.env.UPLOAD_PRODUCTS+img),
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      brand: product.brand,
      description: product.description
    });
  } catch(e) {
    res.status(200).json(null);
  }
}