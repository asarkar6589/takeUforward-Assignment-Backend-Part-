const mySqlPool = require("../database/connections");

exports.getAllDetails = async (req, res) => {
    try {
        const data = await mySqlPool.query('select * from bannersettings');

        // This data is an array. It contains many junk data. So we will destructure it.

        const [records] = data;

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "No data found !"
            })
        }

        return res.status(200).json({
            success: true,
            records
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error
        })
    }
}

exports.updateDetails = async (req, res) => {
    try {
        const { id } = req.params;

        const { banner_on_off, banner_description, banner_timer, banner_link } = req.body;

        if (!id) {
            return res.status(404).json({
                success: false,
                message: "No id is given"
            })
        }

        /*
        
            const data = await mySqlPool.query(`select * from bannersettings where id = ${id}`);

            If we write like this, then we can have query injection. So we will write it like this ;
        
        */

        const data = await mySqlPool.query(`update bannersettings set banner_on_off = ?, banner_description = ?, banner_timer = ?, banner_link = ? where id = ?`, [banner_on_off, banner_description, banner_timer, banner_link, id]);

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "No data found !"
            })
        }

        // This data is an array. It contains many junk data. So we will destructure it.
        const [records] = data;

        return res.status(200).json({
            success: true,
            message: "Details updated successfully",
            records
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error
        })
    }
}
