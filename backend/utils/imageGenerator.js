const { createCanvas } = require('canvas');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to delete existing images for a domain
const deleteExistingImages = async (domainName, tld) => {
    try {
        // Construct the public ID prefix for the domain
        const publicIdPrefix = `domain_images/${domainName}.${tld}`;

        // Search for existing images with the same prefix
        const result = await cloudinary.api.resources({
            type: 'upload',
            prefix: publicIdPrefix,
            max_results: 500, // Adjust based on the number of images
        });

        // Delete all existing images for the domain
        for (const image of result.resources) {
            await cloudinary.uploader.destroy(image.public_id);
            // console.log(`Deleted existing image: ${image.public_id}`);
        }
    } catch (error) {
        console.error('Error deleting existing images:', error);
    }
};

// Function to generate and upload a new domain image
const generateDomainImage = async (domainName, tld) => {
    let retries = 3;

    while (retries > 0) {
        try {
            // Delete existing images for the domain
            await deleteExistingImages(domainName, tld);

            const width = 400; // Image width
            const height = 200; // Image height

            // Create a canvas
            const canvas = createCanvas(width, height);
            const ctx = canvas.getContext('2d');

            // Define styles
            const styles = [
                { textColor: '#c1121f', font: 'bold 40px Arial', backgroundColor: '#ffffff' },
                { textColor: '#ff5733', font: 'bold 40px Arial', backgroundColor: '#ffffff' },
            ];

            // Select a style based on the domain name (or use a random style)
            const style = styles[domainName.length % styles.length]; // Use domain name length to pick a style

            // Set background color
            ctx.fillStyle = style.backgroundColor;
            ctx.fillRect(0, 0, width, height);

            // Set text properties
            ctx.fillStyle = style.textColor;
            ctx.font = style.font;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            // Combine domain name and TLD
            const fullDomain = `${domainName}.${tld}`;

            // Draw domain name and TLD
            ctx.fillText(fullDomain, width / 2, height / 2);

            // Convert canvas to a buffer
            const buffer = canvas.toBuffer('image/png');

            // Upload the image to Cloudinary
            const result = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder: 'domain_images', public_id: `${domainName}.${tld}` },
                    (error, result) => {
                        if (error) {
                            console.error('Cloudinary upload failed:', error);
                            reject(new Error('Image upload failed'));
                        } else {
                            resolve(result);
                        }
                    }
                ).end(buffer);
            });

            return result.secure_url;
        } catch (error) {
            retries--;
            if (retries === 0 || error.code !== 'ECONNRESET') {
                throw error;
            }
            await new Promise(resolve => setTimeout(resolve, 2000)); // 2s backoff
        }
    }
};

module.exports = generateDomainImage;