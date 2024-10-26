class Node {
    constructor(type, value, left = null, right = null) {
        this.type = type;
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

function parseRuleString(ruleString) {
    const tokens = ruleString.replace(/\(/g, ' ( ').replace(/\)/g, ' ) ').split(' ');

    function parseExpression() {
        const stack = [[]];
        for (let token of tokens) {
            if (token === '(') {
                stack.push([]);
            } else if (token === ')') {
                const expr = stack.pop();
                stack[stack.length - 1].push(expr);
            } else if (token === 'AND' || token === 'OR') {
                stack[stack.length - 1].push(token);
            } else if (token.trim()) {
                stack[stack.length - 1].push(token);
            }
        }

        function buildTree(expr) {
            if (Array.isArray(expr)) {
                if (expr.length === 1) return buildTree(expr[0]);
                if (expr.includes('OR')) {
                    const idx = expr.indexOf('OR');
                    return new Node('operator', 'OR', buildTree(expr.slice(0, idx)), buildTree(expr.slice(idx + 1)));
                } else if (expr.includes('AND')) {
                    const idx = expr.indexOf('AND');
                    return new Node('operator', 'AND', buildTree(expr.slice(0, idx)), buildTree(expr.slice(idx + 1)));
                }
            }
            return new Node('operand', expr);
        }

        return buildTree(stack[0]);
    }

    return parseExpression();
}

function evaluateAST(ast, data) {
    console.log("Evaluating AST:", ast); // Add this line
    if (ast.type === 'operator') {
        if (ast.value === 'AND') {
            return evaluateAST(ast.left, data) && evaluateAST(ast.right, data);
        } else if (ast.value === 'OR') {
            return evaluateAST(ast.left, data) || evaluateAST(ast.right, data);
        }
    } else if (ast.type === 'operand') {
        // Ensure ast.value is a string
        console.log("Operand value:", ast.value); // Add this line
        const [left, op, right] = ast.value.split(' '); // Check here for type errors
        const leftValue = data[left];
        const rightValue = isNaN(right) ? right.trim().replace(/'/g, '') : parseInt(right);

        if (op === '>') {
            return leftValue > rightValue;
        } else if (op === '<') {
            return leftValue < rightValue;
        } else if (op === '=') {
            return leftValue === rightValue;
        }
    }
    return false;
}

module.exports = { parseRuleString, evaluateAST, Node };
