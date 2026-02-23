const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const authMiddleware = require('./middleware/auth');

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

async function startServer() {
    const app = express();
    app.use(cors());
    app.use(express.json({ limit: '50mb' })); // Increase limit for Base64 images

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => {
            const user = authMiddleware(req);
            return { user };
        },
        // Optional: Better error formatting
        formatError: (error) => {
            return {
                message: error.message,
                path: error.path,
                extensions: {
                    code: error.extensions.code
                }
            };
        }
    });

    await server.start();
    server.applyMiddleware({ app });

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}${server.graphqlPath}`);
    });
}

startServer();
