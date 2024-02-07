// This is V1.0 - Feb 7, 2024
document.addEventListener('DOMContentLoaded', function() {
    var button = document.getElementById('calendlyButton');
    button.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default anchor behavior

        // Convert slashes to hyphens, and remove leading hyphen if present
        var utmTerm = window.location.pathname.replace(/\//g, '-').replace(/^-/, ''); 
        var encodedUTMTerm = encodeURIComponent(utmTerm);

        // Retrieve and log UTM parameters from session storage with 'query.' prefix
        var utmParams = getUTMParametersFromSession();
        console.log("UTM Parameters from Session Storage:", utmParams); // Log retrieved UTM parameters

        // Construct the Calendly URL with UTM parameters
        var calendlyUrl = `https://calendly.com/d/2dz-wq6-6bk?utm_term=${encodedUTMTerm}${utmParams}`;
        console.log("Final Calendly URL:", calendlyUrl); // Log the final URL

        Calendly.initPopupWidget({url: calendlyUrl});
        return false;
    });
});

function getUTMParametersFromSession() {
    const utmKeys = ['query.utm_source', 'query.utm_medium', 'query.utm_campaign', 'query.utm_content'];
    let utmParamsString = '';

    // Iterate and log each check, accounting for 'query.' prefix
    utmKeys.forEach(key => {
        const value = sessionStorage.getItem(key);
        console.log(`Checking for ${key}:`, value); // Log each UTM parameter check
        if (value) {
            // Remove 'query.' prefix from key when appending to URL
            const cleanKey = key.replace('query.', '');
            utmParamsString += `&${encodeURIComponent(cleanKey)}=${encodeURIComponent(value)}`;
        }
    });

    return utmParamsString;
}
