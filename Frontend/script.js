import { BASE_URL } from './app.js';

const outputElement = document.getElementById('output');

function appendOutput(text) {
    outputElement.textContent += `${text}\n`;
}

document.getElementById('create-rule').addEventListener('click', async () => {
    const ruleString = document.getElementById('rule-string').value;
    try {
        const response = await fetch(`${BASE_URL}/create_rule`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ rule_string: ruleString })
        });
        const result = await response.json();
        appendOutput(`Create Rule Response: ${JSON.stringify(result)}`);
    } catch (error) {
        appendOutput(`Error: ${error}`);
    }
});

document.getElementById('combine-rules').addEventListener('click', async () => {
    const ruleIds = document.getElementById('combine-ids').value.split(',').map(id => parseInt(id.trim()));
    try {
        const response = await fetch(`${BASE_URL}/combine_rules`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ rule_ids: ruleIds })
        });
        const result = await response.json();
        appendOutput(`Combine Rules Response: ${JSON.stringify(result)}`);
    } catch (error) {
        appendOutput(`Error: ${error}`);
    }
});

document.getElementById('evaluate-rule').addEventListener('click', async () => {
    const ruleId = parseInt(document.getElementById('evaluate-id').value);
    const data = document.getElementById('evaluate-data').value;
    try {
        const response = await fetch(`${BASE_URL}/evaluate_rule`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ rule_id: ruleId, data: JSON.parse(data) })
        });
        const result = await response.json();
        appendOutput(`Evaluate Rule Response: ${JSON.stringify(result)}`);
    } catch (error) {
        appendOutput(`Error: ${error}`);
    }
});

document.getElementById('modify-rule').addEventListener('click', async () => {
    const ruleId = parseInt(document.getElementById('modify-id').value);
    const newRuleString = document.getElementById('new-rule-string').value;
    try {
        const response = await fetch(`${BASE_URL}/modify_rule`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ rule_id: ruleId, new_rule_string: newRuleString })
        });
        const result = await response.json();
        appendOutput(`Modify Rule Response: ${JSON.stringify(result)}`);
    } catch (error) {
        appendOutput(`Error: ${error}`);
    }
});
