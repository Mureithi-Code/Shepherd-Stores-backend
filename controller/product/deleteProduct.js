const productModel = require('../../models/productModel')
const uploadProductPermission = require('../../helpers/permission')

const deleteProductController = async (req, res) => {
    try {
        const hasPermission = await uploadProductPermission(req.userId)
        if (!hasPermission) {
            return res.status(403).json({
                message: "Permission denied",
                success: false,
                error: true
            })
        }

        const { productId } = req.body

        if (!productId) {
            return res.status(400).json({
                message: "Product ID is required",
                success: false,
                error: true
            })
        }

        const deletedProduct = await productModel.findByIdAndDelete(productId)

        if (!deletedProduct) {
            return res.status(404).json({
                message: "Product not found",
                success: false,
                error: true
            })
        }

        res.json({
            message: "Product deleted successfully",
            data: deletedProduct,
            success: true,
            error: false
        })

    } catch (err) {
        res.status(500).json({
            message: err.message || "Internal Server Error",
            success: false,
            error: true
        })
    }
}

module.exports = deleteProductController
