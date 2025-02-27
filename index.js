const express = require("express");
const puppeteer = require("puppeteer");
const path = require("path");

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const generatePDF = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", 
  });
  const page = await browser.newPage();

  const url = `http://localhost:${port}`;

  try {
    await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 }); 

    const pdfPath = path.join(__dirname, "yourName.pdf");

    await page.pdf({
      path: pdfPath,
      format: "A2",
      printBackground: true,
      
    });

    console.log(`PDF generated successfully: ${pdfPath}`);
  } catch (error) {
    console.error("Error generating PDF:", error);
  } finally {
    await browser.close();
  }
};

app.listen(port, async () => {
  console.log(`Server is running at http://localhost:${port}`);
  try {
    //await generatePDF();
    console.log("radi")
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
});
