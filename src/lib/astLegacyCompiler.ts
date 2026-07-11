/**
 * Phase 9: Autonomous Legacy App Compiler
 * 
 * This module demonstrates the AST (Abstract Syntax Tree) parsing logic required 
 * to ingest legacy HTML code (e.g., from an old web-based order management system) 
 * and autonomously map it into strictly typed, modern Android Jetpack Compose (Kotlin) code.
 */

import * as htmlparser2 from 'htmlparser2';

interface ComposeNode {
  type: string;
  properties: Record<string, string>;
  children: ComposeNode[];
}

export class LegacyToComposeCompiler {
  
  /**
   * 1. Parse Legacy HTML into an intermediate AST
   */
  static parseHtmlToAst(htmlString: string): ComposeNode {
    const root: ComposeNode = { type: 'Column', properties: {}, children: [] };
    const stack: ComposeNode[] = [root];

    const parser = new htmlparser2.Parser({
      onopentag(name, attributes) {
        const parent = stack[stack.length - 1];
        let node: ComposeNode = { type: 'Box', properties: {}, children: [] };

        // 2. Autonomous Mapping Logic (HTML -> Jetpack Compose)
        switch (name.toLowerCase()) {
          case 'div':
          case 'section':
            node.type = attributes.class?.includes('row') ? 'Row' : 'Column';
            break;
          case 'form':
            node.type = 'Column';
            node.properties['modifier'] = 'Modifier.padding(16.dp)';
            break;
          case 'input':
            node.type = 'OutlinedTextField';
            node.properties['value'] = 'state.value';
            node.properties['label'] = `"${attributes.placeholder || 'Enter text'}"`;
            break;
          case 'button':
            node.type = 'Button';
            break;
          case 'h1':
          case 'h2':
          case 'p':
          case 'span':
            node.type = 'Text';
            break;
          default:
            node.type = 'Box'; // Fallback
        }

        parent.children.push(node);
        // Only push to stack if it's not a self-closing tag equivalent in UI
        if (name !== 'input' && name !== 'img') {
          stack.push(node);
        }
      },
      ontext(text) {
        const trimmed = text.trim();
        if (trimmed) {
          const current = stack[stack.length - 1];
          if (current.type === 'Text' || current.type === 'Button') {
             current.properties['text'] = `"${trimmed}"`;
          }
        }
      },
      onclosetag(name) {
        if (name !== 'input' && name !== 'img') {
          stack.pop();
        }
      }
    });

    parser.write(htmlString);
    parser.end();

    return root.children[0] || root; // Return the first primary layout node
  }

  /**
   * 3. Traverse the AST and generate clean Kotlin/Jetpack Compose code
   */
  static generateKotlinCode(node: ComposeNode, indent = ''): string {
    let code = `${indent}${node.type}(`;
    
    // Append properties (e.g., Modifier, text, value)
    const props = Object.entries(node.properties)
      .map(([k, v]) => `${k} = ${v}`)
      .join(', ');
      
    code += props ? `${props}) {\n` : ') {\n';

    // Recursively generate children
    if (node.children.length > 0) {
      node.children.forEach(child => {
        code += this.generateKotlinCode(child, indent + '    ');
      });
      code += `${indent}}\n`;
    } else {
      code = code.replace(' {\n', '\n'); // Handle nodes with no children
    }

    return code;
  }

  /**
   * End-to-End Compiler Execution
   */
  static compile(htmlInput: string): string {
    const ast = this.parseHtmlToAst(htmlInput);
    const imports = [
      'import androidx.compose.foundation.layout.*',
      'import androidx.compose.material3.*',
      'import androidx.compose.runtime.*',
      'import androidx.compose.ui.Modifier',
      'import androidx.compose.ui.unit.dp',
      '\n@Composable\nfun GeneratedOrderManagementScreen() {\n'
    ].join('\n');
    
    const composeCode = this.generateKotlinCode(ast, '    ');
    return `${imports}${composeCode}}\n`;
  }
}
