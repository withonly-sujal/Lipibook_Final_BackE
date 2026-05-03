import Razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { successResponse, errorResponse } from '../utils/response.js';
import { db } from '../config/firebase.config.js';

dotenv.config();

/**
 * Initialize Razorpay instance
 */
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/**
 * Create a Razorpay Order
 * POST /api/payment/create-order
 */
const createOrder = async (req, res) => {
    try {
        const { amount } = req.body;

        // Validate amount (amount in paise, minimum ₹1 = 100 paise)
        const orderAmount = amount || 3000; // Default ₹30 = 3000 paise

        if (orderAmount < 100) {
            return errorResponse(res, 'Amount must be at least ₹1 (100 paise)', 400);
        }

        const options = {
            amount: orderAmount, // Amount in paise
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
            notes: {
                purpose: 'Modi to Devanagari document conversion',
            },
        };

        const order = await razorpay.orders.create(options);

        console.log('✅ Razorpay order created:', order.id);

        return successResponse(res, {
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            keyId: process.env.RAZORPAY_KEY_ID,
        }, 'Order created successfully');

    } catch (error) {
        console.error('❌ Error creating Razorpay order:', error);
        return errorResponse(res, 'Failed to create payment order', 500);
    }
};

/**
 * Verify Razorpay Payment Signature
 * POST /api/payment/verify
 */
const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        // Validate required fields
        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return errorResponse(res, 'Missing payment verification data', 400);
        }

        // Create HMAC SHA256 signature
        const body = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body)
            .digest('hex');

        // Compare signatures
        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            console.log('✅ Payment verified successfully:', razorpay_payment_id);

            // Store payment record in Firestore for summary tracking
            try {
                await db.collection('payments').doc(razorpay_payment_id).set({
                    paymentId: razorpay_payment_id,
                    orderId: razorpay_order_id,
                    amount: 30, // ₹30 per conversion
                    currency: 'INR',
                    status: 'success',
                    userUid: req.user?.uid || 'unknown',
                    userEmail: req.user?.email || 'unknown',
                    createdAt: new Date().toISOString(),
                });
                console.log('✅ Payment record saved to Firestore');
            } catch (dbError) {
                // Log but don't fail the payment verification if DB write fails
                console.error('⚠️ Failed to save payment record:', dbError.message);
            }

            return successResponse(res, {
                paymentId: razorpay_payment_id,
                orderId: razorpay_order_id,
                verified: true,
            }, 'Payment verified successfully');
        } else {
            console.error('❌ Payment verification failed - signature mismatch');
            return errorResponse(res, 'Payment verification failed', 400);
        }

    } catch (error) {
        console.error('❌ Error verifying payment:', error);
        return errorResponse(res, 'Payment verification error', 500);
    }
};

/**
 * Get Payment Summary (Total transactions + Total amount)
 * GET /api/payment/summary
 */
const getSummary = async (req, res) => {
    try {
        const paymentsRef = db.collection('payments');
        const snapshot = await paymentsRef.where('status', '==', 'success').get();

        let totalTransactions = 0;
        let totalAmount = 0;

        snapshot.forEach((doc) => {
            const data = doc.data();
            totalTransactions++;
            totalAmount += data.amount || 0;
        });

        return successResponse(res, {
            totalTransactions,
            totalAmount,
        }, 'Payment summary fetched successfully');

    } catch (error) {
        console.error('❌ Error fetching payment summary:', error);
        return errorResponse(res, 'Failed to fetch payment summary', 500);
    }
};

export default {
    createOrder,
    verifyPayment,
    getSummary,
};
