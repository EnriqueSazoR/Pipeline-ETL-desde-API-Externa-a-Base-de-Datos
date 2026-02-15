import type { RawPriceData } from "./extract.js";

export interface TransformedPriceRecord {
    price : number;
    market_cap : number | null;
    volume_24h : number | null;
    price_timestamp: Date;
}

export const transformCryptoPrices = (
    rawData: RawPriceData
): TransformedPriceRecord[] => {
    const transformed: TransformedPriceRecord[] = [];

    const { prices, market_caps, total_volumes } = rawData;

    for (let i = 0; i < prices.length; i++) {
        const currentPrice = prices[i];

        if (!currentPrice) continue;

        const [timestamap, price] = currentPrice;

        const markeCap = market_caps[i]?.[1] ?? null;
        const volume = total_volumes[i]?.[1] ?? null;

        // Convertir milisegundos a Date
        const date = new Date(timestamap);

        transformed.push({
            price,
            market_cap: markeCap,
            volume_24h: volume,
            price_timestamp: date,
        });
    }

    return transformed;
}