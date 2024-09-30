document.getElementById("captureBtn").addEventListener("click", async () => {
    // Get the active tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // Capture the screenshot for the entire visible page
    chrome.tabs.captureVisibleTab(tab.windowId, { format: 'png' }, function(image) {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError.message);
            alert("Error capturing screenshot: " + chrome.runtime.lastError.message);
            return;
        }

        // Create a download link for the screenshot
        let link = document.createElement('a');
        link.href = image;
        link.download = 'screenshot.png';
        link.click();
    });
});
