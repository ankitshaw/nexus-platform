import neo4j from 'neo4j-driver';

const URI = process.env.NEO4J_URI || 'neo4j+s://demo.databases.neo4j.io';
const USER = process.env.NEO4J_USERNAME || 'neo4j';
const PASSWORD = process.env.NEO4J_PASSWORD || 'password';

const driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD));

export async function getGraphSession() {
    return driver.session();
}

export async function closeGraphDriver() {
    await driver.close();
}
