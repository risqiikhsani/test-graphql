import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
// const client = new ApolloClient({
//   uri: 'https://4wzkzpanx5hengnmchbnbdp6wm.appsync-api.ap-southeast-2.amazonaws.com/graphql',  
//   cache: new InMemoryCache()
// });

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const httpLink = createHttpLink({
    uri: 'https://4wzkzpanx5hengnmchbnbdp6wm.appsync-api.ap-southeast-2.amazonaws.com/graphql',
});


const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            'x-api-key': API_KEY,
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

export default client