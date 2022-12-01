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

    static async getReports() {
        const reports = await Report.find().select("-__v");

        return {
            success: true,
            message: "Lấy dữ liệu phản hồi thành công.",
            data: reports
        }
    }

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
}

export default ReportService