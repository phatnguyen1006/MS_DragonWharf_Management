import Report from "../models/report.model.js"
import mongoose from "mongoose"

class ReportService {
    static async submitReport(email, type, content, rating) {
        try {
            const report = await Report.create({ email, type, content, rating })

            return {
                success: true,
                message: "Ý kiến của bạn đã được ghi nhận.",
                data: report
            }
        } catch(e) {
            if (e instanceof mongoose.Error.ValidationError) return {
                success: false,
                message: "Không đầy đủ thông tin hoặc thông tin không hợp lệ. Vui lòng kiểm tra lại",
                data: null
            } 
            else throw e
        }
    }

    static async getReports(page, limit) {
        const skip = (page - 1)*limit
        const reports = await Report.find().skip(skip).limit(limit).sort({_id: -1}).select("-__v");

        return {
            success: true,
            message: "Lấy dữ liệu phản hồi thành công.",
            data: reports
        }
    }

    // Admin only
    ////////////////////////////////////////////////////////////////////////////////

    static async getReportById(reportId) {
        try {
            const report = await Report.findById(reportId).select("-__v");
    
            if (!report) {
                return {
                    success: false,
                    message: "Không tìm thấy dữ liệu phản hồi.",
                    data: null
                }
            }
    
            return {
                success: true,
                message: "Lấy dữ liệu phản hồi thành công.",
                data: report
            }
        } catch(e) {
            if (e instanceof mongoose.CastError) {
                return {
                    success: false,
                    message: "Không tìm thấy dữ liệu phản hồi.",
                    data: null
                }
            }
            throw e
        }
    }

    static async searchReport(keyword) {
        const searchResult = await Report.find().or([
            { email: { $regex: new RegExp(keyword, "i") } },
            { content: { $regex: new RegExp(keyword, "i") } },
            { type: { $regex: new RegExp(keyword, "i") } },
        ]).select("-__v")

        return {
            success: true,
            message: "Tìm kiếm phản hồi thành công.",
            data: searchResult
        }
    }

    static async statisticReport() {
        try {
            console.log("errrorrr    ")
            const statisticReport = await Report.aggregate(
                [
                    {
                        $group: { 
                            _id: {
                                type: "$type",
                            },
                            count: { $sum: 1}
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            type: "$_id.type",
                            count: "$count",
                        }
                    }
                ]
            )

            return {
                success: true,
                message: "Thống kê Report thành công.",
                data: statisticReport
            }
        } catch (e) {
            if (e instanceof mongoose.CastError) {
                return {
                    success: false,
                    message: "Không tìm thấy dữ liệu phản hồi.",
                    data: null
                }
            }
            console.log("errrorrr    ", e)
            throw e
        }
    }
}

export default ReportService