interface Config {
    port: number;
    database: DatabaseConfig;
    typeorm: TypeOrmConfig;
    kafka: KafkaConfig;
}

interface DatabaseConfig {
    host: string;
    port: number;
    user: string;
    password: string;
}

interface TypeOrmConfig {
    database: string;
    synchronize: () => boolean;
}

interface KafkaConfig {
    host: string;
    port: number;
    groupId: string;
}

const getConfig = () => ({
    port: parseInt(process.env.TRANSACTIONS_API_PORT, 10) || 3000,
    database: {
        host: process.env.PG_HOST,
        port: parseInt(process.env.PG_PORT) || 5432,
        user: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
    },
    typeorm: {
        database: process.env.TO_DATABASE,
        synchronize: () => {
            if (process.env.TO_SYNCHRONIZE === "true") return true;
            if (process.env.TO_SYNCHRONIZE === "false") return false;
            return false;
        },
    },
    kafka: {
        host: process.env.KAFKA_HOST,
        port: parseInt(process.env.KAFKA_PORT, 10) || 9092,
        groupId: process.env.KAFKA_TRANSACTIONS_GROUP_ID,
    },
});

export { type Config, type DatabaseConfig, type TypeOrmConfig, type KafkaConfig, getConfig };
