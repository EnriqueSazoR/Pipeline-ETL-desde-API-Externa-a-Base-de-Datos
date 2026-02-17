import { pool } from "../config/database.js";

export const getLastProcessedTimestamp = async (
    processName: string
): Promise<Date | null> => {
    const client = await pool.query(
        `SELECT last_processed_at FROM etl_metadata WHERE process_name = $1`,
        [processName]
    );

    return client.rows[0]?.last_processed_at ?? null;

   }; 


export const updateLastProcessedTimestamp = async (
    processName: string,
    timestamp: Date
): Promise<void> => {
    await pool.query(
       `UPDATE etl_metadata SET last_processed_at = $2,
        updated_at = NOW() WHERE process_name = $1`,
        [processName, timestamp]
    );
};

export const insertEtlLog = async (
    status: string,
    rowsInserted: number,
    errorMessage?: string
): Promise<void> => {
    await pool.query(
        `INSERT INTO etl_log (status, rows_inserted, error_message)
         VALUES ($1, $2, $3)`,
        [status, rowsInserted, errorMessage || null]
    );
};