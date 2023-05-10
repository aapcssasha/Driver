(function() {var domains=['www.couture.zappos.com','www.evitamins.com','couture.zappos.com','www.zappos.com','m.zappos.com','www.zchocolat.com','luxury.zappos.com'];var websiteId=8218462;var trackingServerDomain='www.qksrv.net';var generateLinkOnLoad=false;var publisherId=4673946;var sid=undefined;var debug=false;(function() {
    function log(consoleStr){
        if (debug && window.console){
            console.log(consoleStr);
        }
    }

//IE 8 doesn't have indexOf
    if(!Array.prototype.indexOf) {
        log("shimming Array.indexOf ...");
        Array.prototype.indexOf = function (obj, start) {
            for (var i = (start || 0), j = this.length; i < j; i++) {
                if (this[i] === obj) {
                    return i;
                }
            }
            return -1;
        }
    }

//dom ready with support for older browsers (IE8)
//  if support no longer needed, just use
//      document.addEventListener("DOMContentLoaded", handler, false)
    function bindReady(handler) {

        var called = false;

        function ready() {
            if (called) return;
            called = true;
            handler()
        }

        if (document.addEventListener) { // native event
            log("using native addEventListener");
            document.addEventListener("DOMContentLoaded", ready, false)
        } else if (document.attachEvent) {  // IE

            try {
                var isFrame = window.frameElement != null
            } catch (e) {
            }

            // IE, the document is not inside a frame
            if (document.documentElement.doScroll && !isFrame) {
                function tryScroll() {
                    if (called) return;
                    try {
                        document.documentElement.doScroll("left");
                        log("using doScroll hack");
                        ready()
                    } catch (e) {
                        setTimeout(tryScroll, 10)
                    }
                }

                tryScroll()
            }

            // IE, the document is inside a frame
            document.attachEvent("onreadystatechange", function () {
                if (document.readyState === "complete") {
                    log("using onreadystatechange");
                    ready()
                }
            })
        }

        // Old browsers
        if (window.addEventListener) {
            log("using window addEventListener");
            window.addEventListener('load', ready, false)
        }
        else if (window.attachEvent) {
            log("using attachEvent onload");
            window.attachEvent('onload', ready)
        }
        else {
            var fn = window.onload; // very old browser, copy old onload
            window.onload = function () { // replace by new onload and call the old one
                log("using window.onload");
                fn && fn();
                ready()
            }
        }
    }

//IE 8 doesn't have addEventListener
    function addEvent(element, event, func) {
        if(element.addEventListener) {
            element.addEventListener(event, func);
        }
        else if(element.attachEvent) { // IE DOM
            element.attachEvent("on" + event, func);
        }
    }

    function getDomainAndProtocol(url) {
        var matches = url.match(/^(https?)\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
        var protocol = matches && matches[1];
        var domain = matches && matches[2];
        return {domain: domain, protocol: protocol };
    }

    function matchesParentDomain(domain) {
        for (var i=0; i < domains.length; i++){
            var suffix = domains[i];
            if (domain.indexOf(suffix, domain.length - suffix.length) !== -1)
                return true;
        }
        return false
    }

    function autoMonetizeLink(element){
        var start = new Date().getTime();
        var url = element.href;
        var domainAndProtocol = getDomainAndProtocol(url);
        if(!domainAndProtocol.domain) return;

        var domainInLowerCase = domainAndProtocol.domain.toLowerCase();
        var hashIndex = url.indexOf('#');
        var frag = "";
        if (hashIndex > -1) {
            frag = url.substring(hashIndex + 1);
            url = url.substring(0, hashIndex);
        }
        if (domains.indexOf(domainInLowerCase) >= 0 || matchesParentDomain(domainInLowerCase)) {
            log("Domain found in list. Automonetizing...");
            var extraParams = "";
            if (sid) {
                extraParams = "/sid/" + sid;
            }
            if(frag) {
                extraParams = extraParams + "/fragment/" + encodeURIComponent(frag);
            }
            element.href = "https://" + trackingServerDomain + "/links/" + websiteId + "/type/am" + extraParams + "/" + url;
        } else {
            log("Domain not found in list. ");
        }

        log("total time: " + (new Date().getTime() - start));
    }

    function createClickHandlerFor(element) {
        return function () {
            autoMonetizeLink(element)
        };
    }

    function autoMonetizeLinks() {
        log("auto monetizing links");

        var anchors = document.getElementsByTagName("a");
        log("found " + anchors.length + " a tags.");
        for (var i = 0; i < anchors.length; i++) {
            var anchor = anchors[i];
            if(generateLinkOnLoad)
                autoMonetizeLink(anchor);
            else
                addEvent(anchor, "click", createClickHandlerFor(anchor));
        }
    }

    if(document.readyState === "complete") {
        log("readState is complete");
        autoMonetizeLinks();
    } else {
        log("DOMContentLoaded is registered");
        bindReady(autoMonetizeLinks)
    }
})();
})()