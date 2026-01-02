// The "Ontology" is implicit in the object structures
// The "Rules" are defined as constants

const RULES = {
    TEMP_CRITICAL: 42.0,
    TEMP_HIGH: 38.0,
    HUMIDITY_DANGER: 20.0
};

class KnowledgeEngine {

    /**
     * Rule 1: Analyze a single day for immediate risk
     * @param {Object} dayData - { tmax: number, rhum: number, date: string }
     * @returns {Object|null} - Alert object or null
     */
    static checkDailyRisk(dayData) {
        // Logic: Critical Heat Rule
        if (dayData.tmax >= RULES.TEMP_CRITICAL) {
            return {
                type: "HEATWAVE_CRITICAL",
                level: "CRITICAL",
                message: `Critical temperature detected: ${dayData.tmax}°C exceeds safety limit.`,
                date: dayData.date
            };
        }

        // Logic: Dry Heat Rule (High Temp + Low Humidity)
        if (dayData.tmax >= RULES.TEMP_HIGH && dayData.rhum < RULES.HUMIDITY_DANGER) {
            return {
                type: "DRY_HEAT_RISK",
                level: "HIGH",
                message: `Dangerous dry heat: ${dayData.tmax}°C with only ${dayData.rhum}% humidity.`,
                date: dayData.date
            };
        }

        return null; // No alert
    }

    /**
     * Rule 2: Analyze history for persistent patterns (3-day heatwave)
     * @param {Array} historyBuffer - Array of last 3 days of data
     * @returns {Object|null}
     */
    static checkPersistentRisk(historyBuffer) {
        if (historyBuffer.length < 3) return null;

        // Extract last 3 days
        const last3Days = historyBuffer.slice(-3);

        // Check if ALL 3 days have TMAX > 40 (Slightly lower threshold for duration)
        const isPersistent = last3Days.every(day => day.tmax > 40.0);

        if (isPersistent) {
            return {
                type: "PERSISTENT_HEATWAVE",
                level: "EXTREME",
                message: "Extreme Heatwave: Temperature > 40°C for 3 consecutive days.",
                date: last3Days[last3Days.length - 1].date
            };
        }

        return null;
    }

    /**
     * Main Processing Function
     * Takes the full prediction list and adds "alert" fields to relevant days
     */
    static processForecasts(forecastList) {
        const processedData = [];
        const historyBuffer = [];

        forecastList.forEach(day => {
            // Create a copy of the data to avoid mutating original
            const enrichedDay = { ...day, alert: null };

            // 1. Check Daily Rules
            const dailyAlert = this.checkDailyRisk(day);
            if (dailyAlert) {
                enrichedDay.alert = dailyAlert;
            }

            // 2. Update Buffer & Check Persistent Rules
            historyBuffer.push(day);
            if (historyBuffer.length > 3) historyBuffer.shift(); // Keep size 3

            const persistentAlert = this.checkPersistentRisk(historyBuffer);
            
            // If persistent alert exists, it overrides or adds to daily alert
            if (persistentAlert) {
                enrichedDay.alert = persistentAlert; // Prioritize persistent alert
            }

            processedData.push(enrichedDay);
        });

        return processedData;
    }
}

module.exports = KnowledgeEngine;