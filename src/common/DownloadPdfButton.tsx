import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const DownloadPdfButton = ({ targetRef }) => {
    const [loading, setLoading] = useState(false);

    const handleDownloadPdf = async () => {
        setLoading(true);
        const element = targetRef.current;

        // Ensure all images are loaded
        const images = element.getElementsByTagName('img');
        const loadPromises = Array.from(images).map((img) => {
            return new Promise((resolve) => {
                if (img.complete) {
                    resolve();
                } else {
                    img.onload = resolve;
                    img.onerror = () => resolve();  // resolve even if the image fails to load
                }
            });
        });

        try {
            await Promise.all(loadPromises);

            // Generate canvas from element
            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                allowTaint: true,
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 210; // Width of A4 page in mm
            const pageHeight = 295; // Height of A4 page in mm

            // Calculate the height required to fit the entire content in one page
            const aspectRatio = canvas.width / canvas.height;
            const imgHeight = imgWidth / aspectRatio;

            // Adjust the height to ensure it fits within the A4 page dimensions
            let adjustedImgHeight = imgHeight;
            if (imgHeight > pageHeight) {
                adjustedImgHeight = pageHeight;
            }

            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, adjustedImgHeight);
            pdf.save('download.pdf');
        } catch (error) {
            console.error('Error generating PDF:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleDownloadPdf}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
        >
            {loading ? 'Generating PDF...' : 'Download as PDF'}
        </button>
    );
};

export default DownloadPdfButton;
