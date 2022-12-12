import ReportService from "../services/report.service.js";

class ReportController {
    static async submitReport(req, res) {
        try {
            const { email, type, content, rating } = req.body;

            const result = await ReportService.submitReport(email, type, content, rating);
            if (result.success) {
                return res.json(result)
            } else return res.status(400).json(result)
        } catch(e) {
            console.log(e.stack)
            return res.status(500).json({
                success: false,
                message: "Đã có lỗi xảy ra. Vui lòng thử lại sau.",
                data: null
            })
        }
    }

    static async getReports(req, res) {
        try {
            const { limit } = req.query || 20
            const { page } = req.query || 1
            const result = await ReportService.getReports(page, limit);
            if (result.success) {
                return res.json(result)
            } else return res.status(400).json(result)
        } catch (e) {
            console.log(e.stack)
            return res.status(500).json({
                success: false,
                message: "Đã có lỗi xảy ra. Vui lòng thử lại sau.",
                data: null
            })
        }
    }

    static async getReportById(req, res) {
        try {
            const { reportId } = req.params
            
            const result = await ReportService.getReportById(reportId);
            if (result.success) {
                return res.json(result)
            } else return res.status(400).json(result)
        } catch(e) {
            console.log(e.stack)
            return res.status(500).json({
                success: false,
                message: "Đã có lỗi xảy ra. Vui lòng thử lại sau.",
                data: null
            })
        }
    }

    static async searchReport(req, res) {
        try {
            const query = req.query.q

            if (!query) return res.status(400).json({
                success: false,
                message: "Vui lòng cung cấp từ khoá.",
                data: null
            })

            const result = await ReportService.searchReport(query)
            if (result.success) return res.json(result)
            else return res.status(500).json(result)
        } catch(e) {
            console.log(e.stack)
            return res.status(500).json({
                success: true,
                message: "Đã có lỗi xảy ra. Vui lòng thử lại sau.",
                data: null
            })
        }
    }

    static async statisticReport(req, res) {
        console.log("errrorrr    ")
        try {
            const result = await ReportService.statisticReport()
            if (result.success) return res.json(result)
            else return res.status(500).json(result)
        } catch(e) {
            console.log(e.stack)
            return res.status(500).json({
                success: true,
                message: "Đã có lỗi xảy ra. Vui lòng thử lại sau.",
                data: null
            })
        }
    }
}

export default ReportController;