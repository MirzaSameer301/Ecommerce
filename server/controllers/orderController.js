import Order from '../models/Order.js'
import Product from '../models/Product.js'
import Cart from '../models/Cart.js'

export const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      totalAmount,
      cartId,
    } = req.body;

    // Create a new order with Cash on Delivery method
    const newlyCreatedOrder = new Order({
      userId,
      cartId,
      cartItems,
      addressInfo,
      orderStatus: "pending", // Initial order status
      paymentMethod: "Cash on Delivery",
      paymentStatus: "unpaid", // Payment status for COD
      totalAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
    });

    // Save the order to the database
    await newlyCreatedOrder.save();

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      orderId: newlyCreatedOrder._id,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

export const confirmOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    let order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order cannot be found",
      });
    }

    // Update order status to confirmed and payment status to paid
    order.orderStatus = "confirmed";
    order.paymentStatus = "paid";

    // Deduct stock for each product in the order
    for (let item of order.cartItems) {
      let product = await Product.findById(item.productId);

      if (!product || product.totalStock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Not enough stock for product ${item.productId}`,
        });
      }

      product.totalStock -= item.quantity;
      await product.save();
    }

    // Delete the cart associated with the order
    const getCartId = order.cartId;
    await Cart.findByIdAndDelete(getCartId);

    // Save the updated order
    await order.save();

    res.status(200).json({
      success: true,
      message: "Order confirmed",
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

