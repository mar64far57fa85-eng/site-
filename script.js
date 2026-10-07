/* =========================================================
   🌌 KEYHANIK - JAVASCRIPT
   هماهنگ با index.html و style.css فعلی
========================================================= */


/* =========================================================
   1. آماده شدن سایت
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    console.log("🌌 Keyhanik loaded successfully.");

    setupCalendarFilters();
    setupSmoothLinks();
    setupSearchEnterKey();

});


/* =========================================================
   2. دکمه جستجوی بالای سایت
   HTML:
   onclick="focusSearch()"
========================================================= */

function focusSearch() {

    const searchInput = document.getElementById("mainSearch");

    if (!searchInput) return;

    searchInput.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

    setTimeout(function () {
        searchInput.focus();
    }, 500);
}


/* =========================================================
   3. جستجوی سایت
   HTML:
   onclick="searchSite()"
   onclick="searchSite('bottomSearch')"
========================================================= */

function searchSite(inputId = "mainSearch") {

    const input = document.getElementById(inputId);

    if (!input) return;

    const query = normalizeText(input.value);

    if (!query) {

        input.focus();

        showNotification(
            "🔎 لطفاً چیزی برای جستجو وارد کن."
        );

        return;
    }


    /*
       بخش‌هایی که قرار است جستجو شوند
    */

    const searchableItems = document.querySelectorAll(
        ".planet-card, .star-card, .galaxy-card, .article-card, .mission-small-card, .month-card"
    );


    let foundItems = [];


    searchableItems.forEach(function (item) {

        const text = normalizeText(item.innerText);

        if (text.includes(query)) {

            foundItems.push(item);

        }

    });


    /* اگر چیزی پیدا شد */

    if (foundItems.length > 0) {

        const firstResult = foundItems[0];

        firstResult.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });


        /*
           برجسته کردن نتایج
        */

        foundItems.forEach(function (item) {

            item.classList.add("search-highlight");

        });


        setTimeout(function () {

            foundItems.forEach(function (item) {

                item.classList.remove("search-highlight");

            });

        }, 2500);


        showNotification(
            "🔭 " + foundItems.length + " نتیجه برای «" +
            input.value +
            "» پیدا شد."
        );

    } else {

        showNotification(
            "🌌 نتیجه‌ای برای «" +
            input.value +
            "» پیدا نشد."
        );

    }

}


/* =========================================================
   4. نرمال‌سازی متن فارسی
========================================================= */

function normalizeText(text) {

    return String(text)
        .toLowerCase()
        .replace(/ي/g, "ی")
        .replace(/ى/g, "ی")
        .replace(/ك/g, "ک")
        .replace(/\u200c/g, " ")
        .replace(/\s+/g, " ")
        .trim();

}


/* =========================================================
   5. جستجو با Enter
========================================================= */

function setupSearchEnterKey() {

    const searchInputs = document.querySelectorAll(
        "#mainSearch, #bottomSearch"
    );


    searchInputs.forEach(function (input) {

        input.addEventListener("keydown", function (event) {

            if (event.key === "Enter") {

                searchSite(input.id);

            }

        });

    });

}


/* =========================================================
   6. مأموریت فعلی
   HTML:
   onclick="startMission()"
========================================================= */

function startMission() {

    const missionSection = document.getElementById("mission");

    if (!missionSection) return;


    /*
       اگر پنل مأموریت در H
       TML جدید وجود داشته باشد
       آن را باز می‌کنیم.
    */

    const missionPanel =
        document.getElementById("missionPanel");


    if (missionPanel) {

        missionPanel.classList.remove("hidden");

        missionPanel.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        return;

    }


    /*
       اگر هنوز پنل جدید را به HTML اضافه نکرده‌ای،
       فقط پیام نمایش داده می‌شود.
    */

    showNotification(
        "🚀 مأموریت «رازهای مریخ» آغاز شد!"
    );

}


/* =========================================================
   7. لینک‌های داخلی سایت
========================================================= */

function setupSmoothLinks() {

    const links = document.querySelectorAll(
        'a[href^="#"]'
    );


    links.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId =
                link.getAttribute("href");


            if (!targetId || targetId === "#") {

                return;

            }


            const target =
                document.querySelector(targetId);


            if (!target) return;


            event.preventDefault();


            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });

}


/* =========================================================
   8. فیلتر تقویم نجومی
========================================================= */

function setupCalendarFilters() {

    const filterButtons =
        document.querySelectorAll(
            ".calendar-filters button"
        );


    const monthCards =
        document.querySelectorAll(
            ".month-card"
        );


    if (
        filterButtons.length === 0 ||
        monthCards.length === 0
    ) {

        return;

    }


    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const filter =
                normalizeText(button.innerText);


            filterButtons.forEach(function (btn) {

                btn.classList.remove("active");

            });


            button.classList.add("active");


            monthCards.forEach(function (month) {

                const events =
                    month.querySelectorAll(".event");


                let visibleEvents = 0;


                events.forEach(function (event) {

                    const eventText =
                        normalizeText(event.innerText);


                    let show = false;


                    /* همه */

                    if (
                        filter.includes("همه")
                    ) {

                        show = true;

                    }


                    /* بارش شهابی */

                    else if (
                        filter.includes("بارش")
                    ) {

                        show =
                            eventText.includes("شهاب") ||
                            eventText.includes("بارش");

                    }


                    /* ماه */

                    else if (
                        filter === "ماه"
                    ) {

                        show =
                            eventText.includes("ماه") ||
                            eventText.includes("ماه کامل") ||
                            eventText.includes("ماه نو");

                    }


                    /* گرفت‌ها */

                    else if (
                        filter.includes("گرفت")
                    ) {

                        show =
                            eventText.includes("گرفت") ||
                            eventText.includes("خورشیدگرفتگی") ||
                            eventText.includes("ماه‌گرفتگی");

                    }


                    /* فصل‌ها */

                    else if (
                        filter.includes("فصل")
                    ) {

                        show =
                            eventText.includes("فصل") ||
                            eventText.includes("اعتدال") ||
                            eventText.includes("انقلاب");

                    }


                    event.style.display =
                        show ? "" : "none";


                    if (show) {

                        visibleEvents++;

                    }

                });


                /*
                   اگر در ماه هیچ رویدادی باقی نمانده،
                   کارت ماه مخفی می‌شود.
                */

                if (visibleEvents === 0) {

                    month.style.display = "none";

                } else {

                    month.style.display = "";

                }

            });

        });

    });

}


/* =========================================================
   9. اعلان کوچک
========================================================= */

function showNotification(message) {

    let notification =
        document.getElementById(
            "keyhanikNotification"
        );


    /*
       اگر اعلان وجود نداشت، بساز
    */

    if (!notification) {

        notification =
            document.createElement("div");

        notification.id =
            "keyhanikNotification";


        notification.style.position =
            "fixed";

        notification.style.bottom =
            "25px";

        notification.style.right =
            "25px";

        notification.style.zIndex =
            "9999";

        notification.style.padding =
            "14px 20px";

        notification.style.borderRadius =
            "14px";

        notification.style.background =
            "rgba(10, 18, 40, 0.95)";

        notification.style.color =
            "#ffffff";

        notification.style.border =
            "1px solid rgba(100, 170, 255, 0.35)";

        notification.style.boxShadow =
            "0 10px 30px rgba(0,0,0,0.35)";

        notification.style.fontFamily =
            "inherit";

        notification.style.opacity =
            "0";

        notification.style.transform =
            "translateY(20px)";

        notification.style.transition =
            "all 0.3s ease";


        document.body.appendChild(
            notification
        );

    }


    notification.textContent =
        message;


    /* نمایش */

    requestAnimationFrame(function () {

        notification.style.opacity =
            "1";

        notification.style.transform =
            "translateY(0)";

    });


    /* مخفی شدن */

    clearTimeout(
        notification.hideTimer
    );


    notification.hideTimer =
        setTimeout(function () {

            notification.style.opacity =
                "0";

            notification.style.transform =
                "translateY(20px)";

        }, 3000);

}


/* =========================================================
   10. انیمیشن ظاهر شدن کارت‌ها هنگام اسکرول
========================================================= */

function setupScrollAnimation() {

    const cards = document.querySelectorAll(
        ".quick-card, .planet-card, .star-card, .galaxy-card, .article-card, .mission-small-card"
    );


    if (!("IntersectionObserver" in window)) {

        return;

    }


    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "show-card"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    cards.forEach(function (card) {

        observer.observe(card);

    });

}


/* =========================================================
   11. اجرای انیمیشن کارت‌ها
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    setupScrollAnimation
);


/* =========================================================
   12. کنترل لینک‌های # خالی
==================
======================================= */

document.addEventListener(
    "click",
    function (event) {

        const link =
            event.target.closest('a[href="#"]');


        if (!link) return;


        event.preventDefault();

    }
);
