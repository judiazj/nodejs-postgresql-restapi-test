import {pool} from '../db.js';

export const ping = async (req, res) => {
    const {rows} = await pool.query('SELECT \'Pong\' AS Result');
    res.json(rows[0])
}