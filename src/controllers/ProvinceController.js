const ProvinceService = require("../services/ProvinceService");

const GetProvince = async (req, res) => {
    try {
        const resp = await ProvinceService.GetProvince();
        if(resp.success == true){
            res.status(200).json(resp);
        }
        else{
            res.status(400).json(resp);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    };

    // if(resp.success == true){
    //     return res.status(200).json({
    //         success: true,
    //         message: "True",
    //         items: resp.items
    //     });
    // }
    // else {
    //     return res.status(500).json({
    //         success: false,
    //         message: "False",
    //         error: resp.errMsg
    //     });
    // }
};

module.exports = {
    GetProvince
}