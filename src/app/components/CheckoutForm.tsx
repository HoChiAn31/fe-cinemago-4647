'use client';
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, notification } from 'antd';

const CheckoutForm: React.FC = () => {
	const stripe = useStripe();
	const elements = useElements();
	const [isProcessing, setIsProcessing] = useState(false);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		if (!stripe || !elements) {
			// Stripe.js has not yet loaded.
			return;
		}

		const cardElement = elements.getElement(CardElement);

		if (!cardElement) {
			notification.error({
				message: 'Card element is not found.',
			});
			return;
		}

		setIsProcessing(true);

		// Create a payment method with the card details
		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: 'card',
			card: cardElement,
		});

		if (error) {
			setIsProcessing(false);
			notification.error({
				message: error.message || 'An error occurred during payment.',
			});
		} else {
			// You can handle the payment method and send it to your server
			// For example, create a payment intent using the payment method ID
			const { id } = paymentMethod;

			// Call your backend to handle the payment (create a PaymentIntent, etc.)
			const response = await fetch('/api/stripe/confirm-payment', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ paymentMethodId: id }),
			});

			const paymentResult = await response.json();

			if (paymentResult.error) {
				setIsProcessing(false);
				notification.error({
					message: paymentResult.error.message || 'Payment failed.',
				});
			} else {
				setIsProcessing(false);
				notification.success({
					message: 'Payment successful!',
				});
				// You can redirect the user or show a success message here
			}
		}
	};

	return (
		<form onSubmit={handleSubmit} className='flex w-full flex-col gap-4'>
			<div className='w-full'>
				<label htmlFor='card-element' className='mb-2 block'>
					Card details
				</label>
				<CardElement
					id='card-element'
					options={{
						style: {
							base: {
								fontSize: '16px',
								color: '#000',
								fontFamily: 'Arial, sans-serif',
								'::placeholder': {
									color: '#ccc',
								},
							},
						},
					}}
				/>
			</div>

			<Button
				type='primary'
				htmlType='submit'
				className='w-full'
				disabled={isProcessing || !stripe || !elements}
				loading={isProcessing}
			>
				Pay Now
			</Button>
		</form>
	);
};

export default CheckoutForm;
