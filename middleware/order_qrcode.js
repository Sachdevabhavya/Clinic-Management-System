const qrcode = require("qrcode")

async function generateQrCode(pname , phone_no , emailId , medicines){
    try {
        const qrCodeData = `Patient Name : ${pname}\n Phone No : ${phone_no}\n Email Id : ${emailId} \n Medicines : ${medicines}`
        const qrCodePath = `../order_qrcodes_data/${pname}`

        await qrcode.toFile(qrCodePath , qrCodeData)
        
        return qrCodePath
        
    } catch (error) {
        console.log(error)
    }
}

module.exports = {generateQrCode}