'use client';
import React, { useEffect, useState } from 'react';
import { loadStripe, Stripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
	'pk_test_51QLqlw00phqwBHh4kTvBMZhiLnDHO0iqAH4lGsrfMRsxuN7f5kuGiSUtcxBLQVl2EE7z4b4kHZtsX0bG2MqxgFSr003ukeQSSi',
);

const PaymentPage: React.FC = () => {
	const [stripe, setStripe] = useState<Stripe | null>(null);
	const [elements, setElements] = useState<any>(null);
	const [clientSecret, setClientSecret] = useState<string>('');

	useEffect(() => {
		const initializeStripe = async () => {
			const stripeInstance = await stripePromise;
			setStripe(stripeInstance);

			// Fetch clientSecret từ backend
			const response = await fetch('http://localhost:5000/stripe/create-intent', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ amount: 5000, currency: 'usd' }),
			});
			const data = await response.json();
			setClientSecret(data.clientSecret);
		};

		initializeStripe();
	}, []);

	useEffect(() => {
		if (stripe && clientSecret) {
			const elementsInstance = stripe.elements();
			const cardElement = elementsInstance.create('card');
			cardElement.mount('#card-element');
			setElements(elementsInstance);
		}
	}, [stripe, clientSecret]);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		if (!stripe || !elements || !clientSecret) {
			console.error('Stripe.js not loaded properly');
			return;
		}

		const cardElement = elements.getElement('card');

		const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
			payment_method: {
				card: cardElement,
			},
		});

		if (error) {
			console.error('Payment failed:', error.message);
		} else {
			console.log('Payment successful:', paymentIntent);
			alert('Thanh toán thành công!');
		}
	};

	return (
		<div>
			<h2>Thanh toán trực tuyến</h2>
			<form onSubmit={handleSubmit}>
				<div id='card-element' style={{ border: '1px solid #ccc', padding: '10px' }}></div>
				<button type='submit' style={{ marginTop: '10px' }}>
					Thanh toán
				</button>
			</form>
		</div>
	);
};

export default PaymentPage;
