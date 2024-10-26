const axios = require('axios');

const BASE_URL = 'http://127.0.0.1:5000';

async function testCreateRule(ruleString) {
    console.log("Testing create_rule...");
    try {
        const response = await axios.post(`${BASE_URL}/create_rule`, { rule_string: ruleString });
        console.log(`Response:`, response.data);
        return response.data.id;
    } catch (error) {
        console.error("Error creating rule:", error.response ? error.response.data : error.message);
    }
}

async function testCombineRules(ruleId1, ruleId2) {
    console.log("\nTesting combine_rules...");
    try {
        const response = await axios.post(`${BASE_URL}/combine_rules`, { rule_ids: [ruleId1, ruleId2] });
        console.log(`Response:`, response.data);
        return response.data.id;
    } catch (error) {
        console.error("Error combining rules:", error.response ? error.response.data : error.message);
    }
}

async function testEvaluateRule(ruleId, data) {
    console.log("\nTesting evaluate_rule...");
    try {
        const response = await axios.post(`${BASE_URL}/evaluate_rule`, { rule_id: ruleId, data: data });
        console.log(`Response:`, response.data);
    } catch (error) {
        console.error("Error evaluating rule:", error.response ? error.response.data : error.message);
    }
}

async function testModifyRule(ruleId, newRuleString) {
    console.log("\nTesting modify_rule...");
    try {
        const response = await axios.post(`${BASE_URL}/modify_rule`, { rule_id: ruleId, new_rule_string: newRuleString });
        console.log(`Response:`, response.data);
    } catch (error) {
        console.error("Error modifying rule:", error.response ? error.response.data : error.message);
    }
}

(async () => {
    // Create Rule 1
    const ruleString1 = "(age > 30 AND department = 'Sales')";
    const ruleId1 = await testCreateRule(ruleString1);

    // Create Rule 2
    const ruleString2 = "(salary > 50000 OR experience > 5)";
    const ruleId2 = await testCreateRule(ruleString2);

    if (ruleId1 && ruleId2) {
        // Combine Rules
        const combinedRuleId = await testCombineRules(ruleId1, ruleId2);

        if (combinedRuleId) {
            // Evaluate Combined Rule
            const data = {
                age: 35,
                department: "Sales",
                salary: 60000,
                experience: 6
            };
            await testEvaluateRule(combinedRuleId, data);
        }

        // Modify Rule
        const newRuleString = "age > 40 AND department = 'HR'";
        await testModifyRule(ruleId1, newRuleString);
    }
    console.log("All tests completed.");
})();
