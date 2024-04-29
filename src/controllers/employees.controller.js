import {pool} from '../db.js';

export const getEmployee = async (req, res) => {
    try {
        const {rows} = await pool.query('SELECT * FROM employee ORDER BY id ASC');
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            msg: 'Something goes wrong!!!'
        })
    }
}

export const getEmployeeById = async (req, res) => {
    const {id} = req.params
    try {
        const {rows} = await pool.query('SELECT * FROM employee WHERE id= $1', [id]);

        if(rows.length <= 0){
            return res.status(404).json({
                msg: 'Employee not found'
            })
        }

        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            msg: 'Something goes wrong!!!'
        })
    }
}

export const createEmployee = async (req, res) => {
    const {name, salary} = req.body;
    try {
        const {rowCount} = await pool.query('INSERT INTO employee (name, salary) VALUES($1, $2)', [name, salary]);
        const {rows} = await pool.query('SELECT MAX(id) FROM employee');
        res.send({
            name,
            salary,
            id: rows[0].max,
            msg: `Se han insertado ${rowCount} filas a la bd`,
            err: false
        })
    } catch (error) {
        return res.status(500).json({
            msg: 'Something goes wrong!!!'
        })
    }
}

export const updateEmployee = async (req, res) => {
    const {id} = req.params;
    const {name, salary} = req.body;
    try {
        const {rowCount} = await pool.query('UPDATE employee SET name = $1, salary = $2 WHERE id = $3', [name, salary, id]);
        const {rows} = await pool.query('SELECT * FROM employee WHERE id = $1', [id]);
    
        if(rowCount <= 0){
            return res.status(404).json({
                msg: 'Employee not found'
            })
        }
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            msg: 'Something goes wrong!!!'
        })
    }
}

export const updateEmployeePartial = async (req, res) => {
    const {id} = req.params;
    const {name, salary} = req.body;
    try {
        const {rowCount} = await pool.query(
            'UPDATE employee SET name = COALESCE($1, name), salary = COALESCE($2, salary) WHERE id = $3',
            [name, salary, id]);
        const {rows} = await pool.query('SELECT * FROM employee WHERE id = $1', [id]);
    
        if(rowCount <= 0){
            return res.status(404).json({
                msg: 'Employee not found'
            })
        }
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            msg: 'Something goes wrong!!!'
        })
    }
}

export const deleteEmployee = async (req, res) => {
    const {id} = req.params;
    try {
        const {rowCount} = await pool.query('DELETE FROM employee WHERE id = $1', [id]);
    
        if(rowCount <= 0){
            return res.status(404).json({
                msg: 'Employee not found'
            })
        }

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
            msg: 'Something goes wrong!!!'
        })
    }
}