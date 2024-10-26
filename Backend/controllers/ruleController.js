const Rule = require('../models/Rule');
const { parseRuleString, evaluateAST, Node } = require('../utils/astUtils');

exports.createRule = async (req, res) => {
    try {
        const { rule_string } = req.body;
        const ast = parseRuleString(rule_string);
        const rule = await Rule.create({ rule_string, ast: JSON.stringify(ast) });
        res.json({ id: rule.id, ast: rule.ast });
    } catch (error) {
        console.error('Error creating rule:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.combineRules = async (req, res) => {
    try {
        const { rule_ids } = req.body;
        const rules = await Rule.findAll({ where: { id: rule_ids } });
        const combinedAST = { type: 'operator', value: 'AND', nodes: rules.map(rule => JSON.parse(rule.ast)) };
        const combinedRuleString = rules.map(rule => rule.rule_string).join(' AND ');
        const combinedRule = await Rule.create({
            rule_string: combinedRuleString,
            ast: JSON.stringify(combinedAST)
        });
        res.json({ id: combinedRule.id, combined_ast: combinedRule.ast });
    } catch (error) {
        console.error("Error combining rules:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.evaluateRule = async (req, res) => {
    try {
        const { rule_id, data } = req.body;
        const rule = await Rule.findByPk(rule_id);
        if (!rule) return res.status(404).json({ error: 'Rule not found' });
        const ast = JSON.parse(rule.ast);
        const result = evaluateAST(ast, data);
        res.json({ result });
    } catch (error) {
        console.error("Error evaluating rule:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.modifyRule = async (req, res) => {
    try {
        const { rule_id, new_rule_string } = req.body;
        const rule = await Rule.findByPk(rule_id);
        if (!rule) return res.status(404).json({ message: 'Rule not found' });
        const newAST = parseRuleString(new_rule_string);
        rule.rule_string = new_rule_string;
        rule.ast = JSON.stringify(newAST);
        await rule.save();
        res.json({ message: 'Rule updated successfully' });
    } catch (error) {
        console.error("Error modifying rule:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
