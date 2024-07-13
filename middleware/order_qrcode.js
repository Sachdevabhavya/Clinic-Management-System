const qrcode = require("qrcode");
const path = require("path");

async function generateQrCode(pname , phone_no , emailId , medicines) {
  try {
    const medicinesStr = medicines.map(med => `${med.medicine_name} (Qty: ${med.qty})`).join(", ");
    const qrCodeData = `Patient Name: ${pname}\n Phone Number: ${phone_no} \n Email ID : ${emailId} \n Medicines : ${medicinesStr}`;
    const qrCodeFileName = `${pname}-${phone_no}.png`;
    const qrCodePath = path.join(__dirname, `../order_qrcodes_data/${qrCodeFileName}`);

    await qrcode.toFile(qrCodePath, qrCodeData);

    return qrCodePath;
  } catch (error) {
    console.error("Error generating QR code:", error);
    throw new Error("Failed to generate QR code");
  }
}

module.exports = { generateQrCode };
