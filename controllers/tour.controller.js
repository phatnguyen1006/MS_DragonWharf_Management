import TourService from "../services/tour.service.js";
import moment from "moment/moment.js";

class TourController {
    static async bookTour(req, res) {
        try {
            const data = req.body;
    
            const result = await TourService.bookTour(data)
    
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

    static async getToursByUser(req, res) {
        try {
            const userId = req.userId

            const result = await TourService.getToursByUser(userId)

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

    // Admin only
    /////////////////////////////////////////////////////////////////////////////////////////////
    
    static async getTours(req, res) {
        try {
            const result = await TourService.getTours();
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

    static async getTourById(req, res) {
        try {
            const { tourId } = req.params

            const result = await TourService.getTourByID(tourId);

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

    static async assignGuider(req, res) {
        try {
            const { tourId, guider, fee } = req.body

            const result = await TourService.assignGuider(tourId, guider, fee)

            if (result.success) return res.json(result)
            else return res.status(404).json(result)
        } catch(e) {
            console.log(e.stack)
            return res.status(500).json({
                success: false,
                message: "Đã có lỗi xảy ra. Vui lòng thử lại sau.",
                data: null
            })
        }
    }

    static async statisticTourByMonth(req, res) {
        try {
            const from = new Date(moment(req.params.from).subtract(1, 'days'));
		    const to = new Date(moment(req.params.to).add(1, 'months'));

            const result = await TourService.statisticTourByMonth(from, to);

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

    static async rejectTour(req, res) {
        try {
            const tourId = req.params.id

            const result = await TourService.rejectTour(tourId)

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

    static async addTour(req, res) {
        try {
            const data = req.body

            const result = await TourService.addTour(data)

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
}

export default TourController;