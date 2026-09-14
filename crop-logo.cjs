const Jimp = require('jimp');

async function processLogo() {
  try {
    const image = await Jimp.read('public/assets/logo.jpeg');
    
    // Convert to PNG with alpha channel
    image.rgba(true);
    
    // Scan all pixels
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
      const red = this.bitmap.data[idx + 0];
      const green = this.bitmap.data[idx + 1];
      const blue = this.bitmap.data[idx + 2];
      
      // If the pixel is close to white (allow for JPEG artifacts), make it transparent
      if (red > 230 && green > 230 && blue > 230) {
        this.bitmap.data[idx + 3] = 0; // Set alpha to 0
      }
    });

    // Auto crop to remove transparent borders
    image.autocrop();

    // Save as PNG
    await image.writeAsync('public/assets/logo.png');
    console.log('Logo successfully processed and saved as logo.png');
  } catch (err) {
    console.error('Error processing logo:', err);
  }
}

processLogo();
