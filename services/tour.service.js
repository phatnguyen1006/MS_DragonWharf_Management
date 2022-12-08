import Tour from "../models/tour.model.js"
import mongoose from "mongoose"

class TourService {
    static async bookTour(data) {
        try {
            delete data.guider;

            if (Date.parse(data.date) < Date.now()) {
                return {
                    success: false,
                    message: "Không thể đặt tour tại thời điểm trong quá khứ.",
                    data: null
                }
            }

            const tour = await Tour.create(data);
            await   Tour.populate(tour, {path: "user", select: "-password -__v"})

            return {
                success: true,
                message: "Đặt tour thành công!",
                data: tour
            }
        } catch(e) {
            if (e instanceof mongoose.Error.ValidationError) {
                return {
                    success: false,
                    message: "Thông tin tour không đủ hoặc không hợp lệ.",
                    data: null
                }
            }
            throw e
        }
    }

    static async getToursByUser(userId) {
        try {
            const tour = await Tour.find({ user: userId })

            return {
                success: true,
                message: "Lấy dữ liệu tour theo người dùng thành công.",
                data: tour
            }
        } catch(e) {
            if (e instanceof mongoose.CastError) return {
                success: false,
                message: "ID người dùng không hợp lệ.",
                data: null
            }
            throw e
        }
    }

    // Admin only
    /////////////////////////////////////////////////////////////////////////////////////////////

    static async getTours() {
        const tours = await Tour.find().populate("user", "-password -__v")

        return {
            success: true,
            message: "Lấy dữ liệu tour thành công!",
            data: tours
        }
    }

    static async getTourByID(tourId) {
        try {
            const tour = await Tour.findById(tourId)
    
            if (!tour) return {
                success: false,
                message: "ID tour không tồn tại.",
                data: null
            }
    
            return {
                success: true,
                message: "Lấy dữ liệu tour thành công!",
                data: tour
            }
        } catch(e) {
            if (e instanceof mongoose.CastError) return {
                success: false,
                message: "ID tour không tồn tại.",
                data: null
            }
            throw e
        }
    }

    static async assignGuider(tourId, guider) {
        try {
            if (!guider || guider == "") return {
                success: false,
                message: "Vui lòng cung cấp tên người hướng dẫn.",
                data: null
            }
            const tour = await Tour.findByIdAndUpdate(tourId, { guider, inspected: true }, { returnDocument: "after" })

            if (!tour) return {
                success: false,
                message: "Không tìm thấy tour.",
                data: null
            }

            return {
                success: true,
                message: "Đã duyệt tour và thêm người hướng dẫn.",
                data: tour
            }
        } catch(e) {
            if (e instanceof mongoose.CastError) return {
                success: false,
                message: "Không tìm thấy tour.",
                data: null
            }
            throw e
        }
    }
}

export default TourService;