// Listen for messages from popup.js to capture the screenshot
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "captureFullPageScreenshot") {
        // Use html2canvas to capture the screenshot
        html2canvas(document.body, {
            useCORS: true,
            scale: window.devicePixelRatio,
            logging: false,
            scrollX: 0,
            scrollY: -window.scrollY,
            windowWidth: document.documentElement.scrollWidth,
            windowHeight: document.documentElement.scrollHeight
        }).then(canvas => {
            const imageUrl = canvas.toDataURL("image/png");
            sendResponse({ screenshotUrl: imageUrl });
        }).catch(err => {
            console.error("Error capturing screenshot:", err);
            sendResponse({ error: "Failed to capture screenshot" });
        });

        // Returning true here to indicate that we'll send a response asynchronously
        return true;
    }
});
