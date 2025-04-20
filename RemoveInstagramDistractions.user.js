// ==UserScript==
// @name         Instagram Remove Distractions
// @namespace    http://tampermonkey.net/
// @version      1.5
// @description  Remove all the Instagram distractions to get concentrated on what's really important
// @author       ZygoteCode
// @match        https://www.instagram.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=instagram.com
// @updateURL    https://github.com/ZygoteCode/Remove-Instagram-Distractions/raw/main/RemoveInstagramDistractions.user.js
// @downloadURL  https://github.com/ZygoteCode/Remove-Instagram-Distractions/raw/main/RemoveInstagramDistractions.user.js
// @grant        none
// ==/UserScript==

(function()
{
    if (window.location.href.startsWith("https://www.instagram.com/?"))
    {
        window.location.href = "https://www.instagram.com/";
    }

    const head = document.head || document.getElementsByTagName('head')[0];
    const styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.innerHTML = "a[href='/explore/'],a[href='/reels/'],a[href='https://www.threads.net/'],footer[role='contentinfo']{display:none!important;visibility:hidden!important;}";
    head.appendChild(styleElement);

    function getElementByXpath(path)
    {
        return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }

    function asyncLoop()
    {
        try
        {
            var resetPasswordElement = document.querySelector("a[href='/accounts/password/reset/']");
            var twoFactorElement = document.querySelector("i[style='background-image: url(\"https://static.cdninstagram.com/rsrc.php/v3/yS/r/ajlEU-wEDyo.png\"); background-position: 0px -104px; background-size: auto; width: 76px; height: 76px; background-repeat: no-repeat; display: inline-block;']");

            if (resetPasswordElement == null && resetPasswordElement == undefined && twoFactorElement == null && twoFactorElement == undefined)
            {
                if (window.location.href == 'https://www.instagram.com/')
                {
                    var feedElement = document.querySelector("main[role='main']");

                    if (feedElement != null && feedElement != undefined)
                    {
                        feedElement.remove();
                    }
                }

                var notificationsElement = getElementByXpath("/html/body/div[2]/div/div/div[2]/div/div/div[1]/div[1]/div[1]/div/div/div/div/div[2]/div[6]");

                if (notificationsElement != null && notificationsElement != undefined)
                {
                    if (notificationsElement.innerHTML.includes("M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"))
                    {
                        notificationsElement.remove();
                    }
                }
            }
        }
        catch (e)
        {

        }

        setTimeout(async function()
        {
            await asyncLoop();
        },
        500);
    }

    asyncLoop();
})();
