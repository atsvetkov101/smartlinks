import * as dotenv from 'dotenv';

dotenv.config();

export const { DATABASE_URL } = process.env;
export const SEQ_LOGGING = process.env.SEQ_LOGGING === 'true';
export const SEQ_LOG_QUERY_PARAMETERS = process.env.SEQ_LOG_QUERY_PARAMETERS === 'true';
export const SEQ_SSL_ENABLED = process.env.SEQ_SSL_ENABLED === 'true';

export const PORT = Number(process.env.PORT) || 8080;
