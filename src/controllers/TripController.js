const TripService = require("../services/TripService");

const GetTrip = async (req, res) => {
    try {
        const resp = await TripService.GetTrip(req);
        res.json({ data: resp });
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
    GetTrip
}