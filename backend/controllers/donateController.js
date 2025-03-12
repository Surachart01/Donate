import donate from "../models/donate"

export const getAllDonate = async (req, res) => {
    try {
        const data = await donate.find({})
        res.status("200").json({msg:"Get all donate success" , data:data})
    } catch (error) {
        res.status("500").json({ msg:"Cannot get data."})
    }
}

export const getDonateById = async (req,res) => {
    try {
        const {id} = req.params
        const data = await donate.findById(id)

        if(!data){
            return res.status('404').json({ msg:"Not found"});
        }
        res.status("200").json({ msg:"Get data success" , data:data})
    } catch (error) {
        res.status("500").json({ msg:"Cannot get data."})
    }
}

export const searchDonate = async (req , res ) => {
    try {
        
    } catch (error) {
        res.status("500").json({ msg:"Cannot get data."})
    }
}

export const createDonate = async (req, res) => {
    try {
        const {igName , description , images} = req.params
        
    } catch (error) {
        
    }
}