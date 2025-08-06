// server.js (o index.js)
const express = require("express");
const bodyParser = require("body-parser"); // Para parsear el cuerpo de las peticiones POST
const cors = require("cors"); // Para permitir peticiones desde tu frontend (si está en un dominio diferente)
const path = require("path");

const app = express();
const PORT = 3000; // Puedes usar cualquier puerto disponible, CodeSandbox te dará una URL

// Middlewares
app.use(bodyParser.json()); // Habilita el parsing de JSON en las peticiones
app.use(cors()); // Habilita CORS para permitir que tu frontend haga peticiones

// --- ¡ESTO ES CRUCIAL PARA VER TU FORMULARIO! ---
app.use(express.static(path.join(__dirname, ""))); // <-- Importante: la cadena vacía ''

// Esta ruta sirve tu index.html cuando alguien visita la URL principal de tu sandbox
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html")); // <-- Asume index.html está en la raíz
});

// Ruta para manejar el pago
app.post("/process-payment", (req, res) => {
  const { email, amount, paymentOption } = req.body;

  console.log(`Recibida solicitud de pago:`);
  console.log(`Correo: ${email}`);
  console.log(`Monto: ${amount}`);
  console.log(`Opción de pago: ${paymentOption}`);

  // Aquí iría la lógica real de procesamiento de pago
  // En un entorno real, esto interactuaría con pasarelas de pago (Stripe, PayPal, etc.)
  let responseMessage = "";
  let success = true;

  switch (paymentOption) {
    case "creditCard":
      responseMessage = `Pago con tarjeta de crédito procesado para ${email} por $${amount}.`;
      // Lógica para tarjeta de crédito
      break;
    case "paypal":
      responseMessage = `Pago con PayPal procesado para ${email} por $${amount}.`;
      // Lógica para PayPal
      break;
    case "bankTransfer":
      responseMessage = `Transferencia bancaria iniciada para ${email} por $${amount}.`;
      // Lógica para transferencia bancaria
      break;
    default:
      responseMessage = "Opción de pago no válida.";
      success = false;
      break;
  }

  if (success) {
    res.status(200).json({
      message: responseMessage,
      status: "success",
      paymentOption: paymentOption, // Envía la opción de pago de vuelta al frontend
    });
  } else {
    res.status(400).json({
      message: responseMessage,
      status: "error",
    });
  }
});

// Ruta de prueba
//app.get("/", (req, res) => {
//  res.send("Servidor de pagos funcionando!");
//});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
