import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

const API_URL = 'https://api.thegraph.com/subgraphs/name/yama-finance/yama-finance';

const auctionQuery = `
    query($vaultOwner: Bytes) {
        auctions(first: 1000, where: { vault__owner: $vaultOwner }) {
            initialPrice
            startTime
        }
    }
`;

const client = new ApolloClient({
    uri: API_URL,
    cache: new InMemoryCache(),
});

export const getFormattedTimeString = (timestamp: number): string => {
    return new Date(timestamp * 1000).toLocaleString();
}

export const getLenderProfitGraph = async (
    account: string,
    decimals: number,
): Promise<string> => {
    try {
        const { data } = await client.query({
            query: gql(auctionQuery),
            variables: {
                id: account,
            },
        });
        let result = '';
        const auctions = data.auctions;
        auctions.forEach(auction => {
            const initialPrice = auction.initialPrice / 10 ** decimals;
            const startTime = auction.startTime;
            const formattedTime = getFormattedTimeString(startTime);
            result += `${formattedTime} - liquidation auction starting at ${initialPrice}\n`;
        });
        return result;
    } catch (error) {
        console.log(error);
        return 'Error fetching data';
    }
}