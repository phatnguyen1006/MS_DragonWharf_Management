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

            const tour = await Tour.create(data)

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
            const tour = await Tour.find({ user: userId }).sort({_id: -1})

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

    static async getTours(page, limit) {
        const skip = (page - 1)*limit
        const tours = await Tour.find().skip(skip).limit(limit).sort({_id: -1})

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

    static async assignGuider(tourId, guider, fee) {
        try {
            if (!guider || guider == "") return {
                success: false,
                message: "Vui lòng cung cấp tên người hướng dẫn.",
                data: null
            }
            if (!fee) return {
                success: false,
                message: "Vui lòng điền phí tour.",
                data: null
            }
            const tour = await Tour.findByIdAndUpdate(tourId, { guider, fee, status: 'approved' }, { returnDocument: "after" })

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

    static async statisticTourByMonth(from, to) {
        try {
            const statisticTour = await Tour.aggregate(
                [
                    { 
                        $match: {
                            date: { $gt: from, $lt: to },
                        },
                    },
                    { 
                        $addFields: {
                            month: { $dateToString: { format: "%m/%Y", date: "$date" } },
                            sortMonth: { $dateToString: { format: "%Y-%m", date: "$date" } }
                        }
                    },
                    {
                        $group: { 
                            _id: {
                                sortMonth: "$sortMonth",
                            },
                            count: { $sum: 1}
                        },
                    },
                    { 
                        $addFields: {
                            sortMonth: { $toDate: "$_id.sortMonth" }
                        }
                    },
                    { 
                        $sort : { sortMonth: 1 } 
                    },
                    {
                        $project: {
                            _id: 0,
                            month: { $dateToString: { format: "%m/%Y", date: "$sortMonth" } },
                            count: "$count",
                        }
                    },
                ]
            )

            return {
                success: true,
                message: "Lấy thống kê Tour thành công.",
                data: statisticTour
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

    static async rejectTour(tourId, reason) {
        try {
            const result = await Tour.findByIdAndUpdate(
                tourId, 
                { 
                    status: "rejected",
                    $set: { rejectReason: reason }
                }, 
                { 
                    returnDocument: "after" 
                }
            )

            if (!result) return {
                success: false,
                message: "Không tìm thấy tour.",
                data: null
            }

            return {
                success: true,
                message: "Đã reject tour.",
                data: result
            }
        } catch(e){
            if (e instanceof mongoose.CastError) return {
                success: false,
                message: "Không tìm thấy tour.",
                data: null
            }
            throw e
        }
    }

    static async addTour(data) {
        try {
            if (Date.parse(data.date) < Date.now()) {
                return {
                    success: false,
                    message: "Không thể tạo tour tại thời điểm trong quá khứ.",
                    data: null
                }
            }

            const tour = await Tour.create(data);

            return {
                success: true,
                message: "Tạo tour thành công!",
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
}

export default TourService;