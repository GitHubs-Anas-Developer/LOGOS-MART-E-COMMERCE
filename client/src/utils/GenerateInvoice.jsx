rfimport { jsPDF } from "jspdf";

function GenerateInvoice(orderDetails) {
  const doc = new jsPDF();

  // Page setup
  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);

  // Header (Company logo and title)
  doc.setFontSize(20);
  doc.text("INVOICE", 105, 20, null, null, "center");
  doc.setFontSize(12);
  doc.text("Your Company Name", 105, 30, null, null, "center");

  // Column Setup (2 columns for product details and price summary)
  const marginLeft = 20;
  const marginTop = 40;
  const columnWidth = 80; // Width of each column
  const secondColumnX = marginLeft + columnWidth + 20; // X coordinate for second column
  const rowHeight = 10; // Height of each row

  // Customer Details Column (left column)
  doc.text("Customer Details", marginLeft, marginTop);
  doc.text(`Name: ${orderDetails.customer.name}`, marginLeft, marginTop + rowHeight);
  doc.text(`Email: ${orderDetails.customer.email}`, marginLeft, marginTop + 2 * rowHeight);
  doc.text(`Phone: ${orderDetails.customer.phone}`, marginLeft, marginTop + 3 * rowHeight);
  doc.text(`Address: ${orderDetails.customer.address}`, marginLeft, marginTop + 4 * rowHeight);

  // Order Summary Column (right column)
  doc.text("Order Summary", secondColumnX, marginTop);
  let productStartY = marginTop + rowHeight * 2;
  
  orderDetails.products.forEach((product, index) => {
    doc.text(`${product.name}`, secondColumnX, productStartY);
    doc.text(`Qty: ${product.quantity}`, secondColumnX + 70, productStartY);
    doc.text(`₹${product.price}`, secondColumnX + 120, productStartY);
    productStartY += rowHeight;
  });

  // Payment Summary (bottom part of the page, spanning both columns)
  const paymentStartY = productStartY + 10;
  doc.text("Payment Summary", marginLeft, paymentStartY);
  doc.text(`Subtotal: ₹${orderDetails.subTotal}`, marginLeft, paymentStartY + rowHeight);
  doc.text(`Tax: ₹${orderDetails.taxPrice}`, marginLeft, paymentStartY + 2 * rowHeight);
  doc.text(`Delivery: ₹${orderDetails.deliveryCharge}`, marginLeft, paymentStartY + 3 * rowHeight);
  doc.text(`Total: ₹${orderDetails.totalAmount}`, secondColumnX, paymentStartY + 3 * rowHeight);

  // Footer (Terms and Conditions)
  doc.setFontSize(8);
  doc.text(
    "Terms & Conditions: This is a system-generated receipt and is not valid for tax purposes.",
    marginLeft,
    paymentStartY + 5 * rowHeight
  );

  // Save the PDF
  doc.save(`Invoice_${orderDetails.orderId}.pdf`);
}
