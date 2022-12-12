import UserService from "../services/user.service.js";

class UserController {
    static async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: "Vui lòng cung cấp đầy đủ thông tin.",
                    data: null
                })
            }
            
            const result = await UserService.login(email, password)
            if (result.success) {
                return res.json(result)
            } else {
                return res.status(401).json(result)
            }
        } catch (e) {
            console.log(e.stack)
            return res.status(500).json({
                success: false,
                message: "Đã có lỗi xảy ra. Vui lòng thử lại sau.",
                data: null
            })
        }
    }

    static async register(req, res) {
        try {
            if (
                !req.body.email ||
                !req.body.password ||
                !req.body.name ||
                !req.body.phone
            ) return res.status(400).json({
                success: false,
                message: "Vui lòng cung cấp đầy đủ thông tin.",
                data: null
            })

            const result =await UserService.register(req.body) 
            if (result.success) {
                return res.json(result)
            } else {
                return res.status(400).json(result)
            }

        } catch (e) {
            if (e.code == 11000) return res.status(400).json({
                success: false,
                message: "Email đã tồn tại. Vui lòng sử dụng email khác.",
                data: null
            })
            console.log(e.stack);
            return res.status(500).json({
                success: false,
                message: "Đã có lỗi xảy ra. Vui lòng thử lại sau.",
                data: null
            })
        }
    }

    static async getUserInfo(req, res) {
        try {
            const id = req.userId;
            
            const result = await UserService.getUserInfo(id);

            if (result.success) {
                return res.json(result)
            } else {
                return res.status(404).json(result)
            }
        } catch (e) {
            console.log(e.stack);
            return res.status(500).json({
                success: false,
                message: "Đã có lỗi xảy ra. Vui lòng thử lại sau.",
                data: null
            })
        }
    }

    static async updateUserInfo(req, res) {
        try {
            const userId = req.userId;
            const data = req.body;

            const result = await UserService.updateUserInfo(userId, data);
            if (result.success) {
                return res.json(result) 
            } else {
                return res.status(400).json(result)
            }
        } catch (e) {
            console.log(e.stack);
            return res.status(500).json({
                success: false,
                message: "Đã có lỗi xảy ra. Vui lòng thử lại sau.",
                data: null
            })
        }
    }

    static async refreshToken(req, res) {
        try {
            const { refreshToken } = req.body;
            if (!refreshToken) {
                return res.status(400).json({
                    success: "false",
                    messeage: "Vui lòng cung cấp token.",
                    data: null
                })
            }
            const result = await UserService.refreshToken(refreshToken)
            if (result.success) {
                return res.json(result)
            } else return res.status(400).json(result)
        } catch(e) {
            console.log(e.stack);
            return res.status(500).json({
                success: false,
                message: "Đã có lỗi xảy ra. Vui lòng thử lại sau.",
                data: null
            })
        }
    }

    // Admin only
    /////////////////////////////////////////////////////////////////////////////////////////////

    static async getUserList(req, res) {
        try {
            const { limit } = req.query || 20
            const { page } = req.query || 1
            const result = await UserService.getUserList(page, limit);
    
            if (result.success) return res.json(result)
            else return res.status(400).json(result)
        } catch(e) {
            console.log(e.stack)
            return res.status(500).json({
                success: false,
                message: "Đã có lỗi xảy ra. Vui lòng thử lại sau.",
                data: null
            })
        }
    }

    static async getUserById(req, res) {
        try {
            const { id } = req.params;

            if (!id) return res.status(400).status("Vui lòng cung cấp id người dùng.")

            const result = await UserService.getUserById(id)
            
            if (result.success) return res.json(result)
            else return res.status(400).json(result)
        } catch(e) {
            console.log(e.stack)
            return res.status(500).json({
                success: false,
                message: "Đã có lỗi xảy ra. Vui lòng thử lại sau.",
                data: null
            })
        }
    }

    static async searchUser(req, res) {
        try {
            const query = req.query.q;
            if (!query) return res.status(400).json({
                success: false,
                message: "Vui lòng cung cấp từ khoá.",
                data: null
            })

            const result = await UserService.searchUser(query)
            if (result.success) return res.json(result)
            else return res.status(500).json(result)
        } catch(e) {
            console.log(e.stack)
            return res.status(500).json({
                success: false,
                message: "Đã có lỗi xảy ra. Vui lòng thử lại sau.",
                data: null
            })
        }
    }
}

export default UserController;