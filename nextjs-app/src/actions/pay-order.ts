'use server';

import { ApiClient } from "@coin-voyage/paykit/server";
import { type PayOrder, type PayOrderMetadata } from "@coin-voyage/paykit/types";

export interface PayOrderProps {
    valueUsd: number
    metadata: PayOrderMetadata
}

export async function createPayOrder(props: Partial<PayOrderProps>): Promise<PayOrder | null> {
    if (!props.valueUsd) {
        throw new Error('valueUsd is required')
    }

    if (!process.env.NEXT_PUBLIC_COIN_VOYAGE_API_KEY || !process.env.COIN_VOYAGE_API_SECRET) {
        throw new Error('API key and secret are required')
    }

    const isProduction = process.env.NEXT_PUBLIC_COIN_VOYAGE_ENVIRONMENT === 'production';
    const apiClient = ApiClient({
        apiKey: process.env.NEXT_PUBLIC_COIN_VOYAGE_API_KEY,
        environment: isProduction ? 'production' : 'development',
    });

    const signature = apiClient.generateAuthorizationSignature(process.env.COIN_VOYAGE_API_SECRET)

    try {
        const payOrder = await apiClient.createSalePayOrder({
            destination_value_usd: props.valueUsd,
            metadata: props.metadata
        }, signature)

        return payOrder || null
    } catch (error) {
        console.error('Failed to create pay order', error)
        return null
    }
}