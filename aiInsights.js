/* =====================================================
   AI INSIGHTS
   MemoryCare - Shravani
   Activity/Performance Based Only
===================================================== */


/* -----------------------------------------------------
   SAMPLE ACTIVITY DATA

   Later actual game/activity page se data aa sakta hai.
----------------------------------------------------- */

let activityData = JSON.parse(
    localStorage.getItem("activityData") || "[]"
);


/* -----------------------------------------------------
   ADD ACTIVITY RESULT

   Example:
   addActivityResult("Memory Game", true, 20);

   completed = true / false
   responseTime = seconds
----------------------------------------------------- */

function addActivityResult(activityName, completed, responseTime) {

    const result = {
        activity: activityName,
        completed: completed,
        responseTime: responseTime,
        date: new Date().toISOString()
    };

    activityData.push(result);

    localStorage.setItem(
        "activityData",
        JSON.stringify(activityData)
    );

    updateAIInsights();
}


/* -----------------------------------------------------
   GET RECENT ACTIVITIES
----------------------------------------------------- */

function getRecentActivities() {

    return activityData.slice(-5);
}


/* -----------------------------------------------------
   COMPLETION RATE
----------------------------------------------------- */

function getCompletionRate() {

    const recent = getRecentActivities();

    if (recent.length === 0) {
        return 100;
    }

    const completed = recent.filter(
        item => item.completed === true
    ).length;

    return Math.round(
        (completed / recent.length) * 100
    );
}


/* -----------------------------------------------------
   AVERAGE RESPONSE TIME
----------------------------------------------------- */

function getAverageResponseTime() {

    const recent = getRecentActivities();

    if (recent.length === 0) {
        return 0;
    }

    const validTimes = recent
        .filter(item => typeof item.responseTime === "number")
        .map(item => item.responseTime);

    if (validTimes.length === 0) {
        return 0;
    }

    const total = validTimes.reduce(
        (sum, time) => sum + time,
        0
    );

    return Math.round(
        total / validTimes.length
    );
}


/* -----------------------------------------------------
   PERFORMANCE LEVEL

   Good
   Average
   Poor
----------------------------------------------------- */

function getPerformanceLevel() {

    const completionRate = getCompletionRate();

    if (completionRate >= 80) {
        return "Good";
    }

    if (completionRate >= 50) {
        return "Average";
    }

    return "Poor";
}


/* -----------------------------------------------------
   RESPONSE TIME CHANGE
----------------------------------------------------- */

function getResponseTimeChange() {

    const recent = getRecentActivities();

    if (recent.length < 2) {
        return "same";
    }

    const last = recent[recent.length - 1];
    const previous = recent[recent.length - 2];

    if (
        typeof last.responseTime !== "number" ||
        typeof previous.responseTime !== "number"
    ) {
        return "same";
    }

    if (last.responseTime > previous.responseTime + 5) {
        return "slower";
    }

    if (last.responseTime < previous.responseTime - 5) {
        return "faster";
    }

    return "same";
}


/* -----------------------------------------------------
   GENERATE SIMPLE AI INSIGHT
----------------------------------------------------- */

function generateAIInsight() {

    const performance = getPerformanceLevel();
    const responseChange = getResponseTimeChange();

    let insight = "";
    let suggestion = "";
    let icon = "😊";


    /* GOOD PERFORMANCE */

    if (performance === "Good") {

        icon = "😊";

        insight =
            "Your recent activities are going well.";

        suggestion =
            "Keep going at your own pace.";
    }


    /* AVERAGE PERFORMANCE */

    else if (performance === "Average") {

        icon = "🌱";

        insight =
            "Your recent activities are going at a steady pace.";

        suggestion =
            "Take your time and try one simple activity next.";
    }


    /* POOR PERFORMANCE */

    else {

        icon = "🌱";

        insight =
            "Recent activities seem a little difficult.";

        suggestion =
            "Try an easier activity next.";
    }


    /* RESPONSE TIME CHANGE */

    if (responseChange === "slower") {

        insight =
            "Your recent activity response time has changed.";

        suggestion =
            "Take your time and try an easier activity next.";

        icon = "⏱️";
    }


    else if (responseChange === "faster") {

        insight =
            "Your recent activity response time has improved.";

        suggestion =
            "You can continue with a simple activity.";

        icon = "⭐";
    }


    return {
        insight: insight,
        suggestion: suggestion,
        icon: icon
    };
}


/* -----------------------------------------------------
   UPDATE AI CARD
----------------------------------------------------- */

function updateAIInsights() {

    const insightText =
        document.getElementById("aiInsightText");

    const suggestionText =
        document.getElementById("aiSuggestionText");

    const icon =
        document.querySelector(".insight-icon");


    if (!insightText || !suggestionText) {
        return;
    }

    const result = generateAIInsight();


    insightText.textContent =
        result.insight;

    suggestionText.textContent =
        result.suggestion;


    if (icon) {
        icon.textContent =
            result.icon;
    }
}


/* -----------------------------------------------------
   WEEKLY ACTIVITY MESSAGE
----------------------------------------------------- */

function getWeeklyMessage() {

    const recent = getRecentActivities();

    if (recent.length >= 4) {

        return "You have completed more activities this week.";

    }

    return "";
}


/* -----------------------------------------------------
   INITIALIZE
----------------------------------------------------- */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateAIInsights();

    }
);