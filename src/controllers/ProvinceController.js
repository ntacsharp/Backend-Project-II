const Service = require("../services/ProvinceService");

const GetProvince = async (req, res) => {
    resp = await Service.GetProvince(req, res);
    if(resp.success == true){
        return res.status(200).json({
            success: true,
            message: "True",
            items: resp.items
        });
    }
    else {
        return res.status(500).json({
            success: false,
            message: "False",
            error: resp.errMsg
        });
    }
}

module.exports = {
    GetProvince
}