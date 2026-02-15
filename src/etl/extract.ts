export interface RawPriceData {
    prices : [number, number][];
    market_caps: [number, number][];
    total_volumes: [number, number][];
}

export const extractCryptoPrices = async (
    coinId: string,
    days: number

): Promise<RawPriceData> => {
    const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Error al extraer la data de CoinGecko ${response.status}`);
    }

    const data: RawPriceData = await response.json();

    return data;
};