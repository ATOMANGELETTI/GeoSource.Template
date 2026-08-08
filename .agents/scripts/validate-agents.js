/**
 * @file validate-agents.js
 * @description Node.js validation utility for .agents workspace structure, JSON schemas, and link integrity.
 */

const fs = require('fs');
const path = require('path');

const AGENTS_DIR = path.resolve(__dirname, '..');
const REQUIRED_DIRS = [
  'core',
  'commands',
  'scripts',
  'plugins',
  'documents',
  'agents',
  'rules',
  'workflows',
  'skills',
  'memory',
  'schemas',
  'data',
  'assets'
];

let errors = [];
let warnings = [];

console.log('=== GeoSource Workspace Agent System Validator ===\n');

// 1. Directory Checks
console.log('[1/4] Checking required directories...');
for (const dir of REQUIRED_DIRS) {
  const dirPath = path.join(AGENTS_DIR, dir);
  if (!fs.existsSync(dirPath)) {
    errors.push(`Missing required directory: .agents/${dir}`);
  } else {
    console.log(`  ✓ .agents/${dir}`);
  }
}

// 2. Core JSON Schema Validation
console.log('\n[2/4] Validating core JSON configurations...');
const jsonFiles = [
  'core/agent-manifest.json',
  'core/environment.json',
  'core/context-loader.json',
  'core/bootstrap.json'
];

for (const relPath of jsonFiles) {
  const filePath = path.join(AGENTS_DIR, relPath);
  if (!fs.existsSync(filePath)) {
    errors.push(`Missing JSON config: .agents/${relPath}`);
    continue;
  }
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    JSON.parse(content);
    console.log(`  ✓ .agents/${relPath} (Valid JSON)`);
  } catch (err) {
    errors.push(`Invalid JSON in .agents/${relPath}: ${err.message}`);
  }
}

// 3. AGENTS.md File Existence & Link Checking
console.log('\n[3/4] Checking AGENTS.md file links...');
const candidateAgentsMd = [
  path.join(AGENTS_DIR, 'AGENTS.md'),
  path.join(AGENTS_DIR, '..', 'AGENTS.md')
];

let agentsMdChecked = false;
for (const agentsMdPath of candidateAgentsMd) {
  if (fs.existsSync(agentsMdPath)) {
    agentsMdChecked = true;
    const content = fs.readFileSync(agentsMdPath, 'utf8');
    const fileLinkRegex = /file:\/\/\/([^\s\)\>]+)/g;
    let match;
    let linkCount = 0;
    while ((match = fileLinkRegex.exec(content)) !== null) {
      linkCount++;
      const rawPath = decodeURIComponent(match[1]).split('#')[0];
      const targetPath = rawPath.replace(/\//g, path.sep);
      if (!fs.existsSync(targetPath)) {
        warnings.push(`Broken link in ${path.relative(AGENTS_DIR, agentsMdPath)} -> file:///${match[1]}`);
      }
    }
    console.log(`  ✓ ${path.relative(AGENTS_DIR, agentsMdPath)} checked (${linkCount} file links found)`);
  }
}
if (!agentsMdChecked) {
  errors.push('Missing AGENTS.md');
}

// 4. Skills Directory Frontmatter Check
console.log('\n[4/4] Validating skill frontmatter...');
function validateSkillFolder(parentDir, skillName, relPrefix) {
  const skillMd = path.join(parentDir, skillName, 'SKILL.md');
  if (!fs.existsSync(skillMd)) {
    errors.push(`Missing SKILL.md in ${relPrefix}/${skillName}`);
  } else {
    const text = fs.readFileSync(skillMd, 'utf8');
    const trimmed = text.trimStart();
    const hasName = /^name\s*:/m.test(trimmed);
    const hasDesc = /^description\s*:/m.test(trimmed);
    if (!trimmed.startsWith('---') || !hasName || !hasDesc) {
      warnings.push(`${relPrefix}/${skillName}/SKILL.md missing standard YAML frontmatter (name/description)`);
    } else {
      console.log(`  ✓ Skill '${skillName}' valid (${relPrefix})`);
    }
  }
}

const skillsDir = path.join(AGENTS_DIR, 'skills');
if (fs.existsSync(skillsDir)) {
  const skillFolders = fs.readdirSync(skillsDir, { withFileTypes: true });
  for (const entry of skillFolders) {
    if (entry.isDirectory()) {
      validateSkillFolder(skillsDir, entry.name, '.agents/skills');
    }
  }
}

// Summary Report
console.log('\n==================================================');
if (warnings.length > 0) {
  console.log(`\nWarnings (${warnings.length}):`);
  warnings.forEach((w) => console.warn(`  ⚠️ ${w}`));
}

if (errors.length > 0) {
  console.error(`\nValidation FAILED with ${errors.length} error(s):`);
  errors.forEach((e) => console.error(`  ❌ ${e}`));
  process.exit(1);
} else {
  console.log('\n✅ Validation SUCCESSFUL! All .agents components are valid.');
  process.exit(0);
}
