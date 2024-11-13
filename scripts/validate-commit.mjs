#!/usr/bin/env node

import chalk from 'chalk';
import { readFileSync } from 'fs';

const VALID_TYPES = ['feat', 'fix', 'change', 'temp', 'wip'];
const MIN_SUBJECT_LENGTH = 3;

const formatErrorMessage = (type, found, expected) =>
  `${chalk.red('✖')} ${type}\n   ${found ? `Found: ${chalk.yellow(found)}\n   ` : ''}${expected ? `Expected: ${chalk.green(expected)}` : ''}`;

const showExamples = () => {
  console.log('\nValid examples:');
  console.log(chalk.green('  feat: add user authentication'));
  console.log(chalk.green('  fix: resolve navigation bug'));
  console.log(chalk.green('  change: update button styles'));
  console.log(chalk.green('  temp: temporary login fix'));
  console.log(chalk.green('  wip: implement dashboard\n'));
};

const validateCommitMessage = (message) => {
  const errors = [];

  // Basic format check
  const regex = /^([a-zA-Z]+):\s(.+)$/;
  const match = message.match(regex);

  if (!match) {
    return {
      valid: false,
      errors: [
        formatErrorMessage(
          'Invalid commit format',
          `${chalk.yellow(message)}`,
          `Format should be ${chalk.green('type: subject')}`
        ),
      ],
    };
  }

  const [, type, subject] = match;

  // Rule: type-enum
  if (!VALID_TYPES.includes(type.toLowerCase())) {
    errors.push(
      formatErrorMessage(
        'Invalid type',
        type,
        `Must be one of: ${VALID_TYPES.map((t) => chalk.green(t)).join(', ')}`
      )
    );
  }

  // Rule: type-case
  if (type !== type.toLowerCase()) {
    errors.push(
      formatErrorMessage('Type must be lowercase', type, type.toLowerCase())
    );
  }

  // Rule: subject-empty
  if (!subject?.trim()) {
    errors.push(formatErrorMessage('Commit subject cannot be empty'));
  }

  // Rule: subject-min-length
  const subjectLength = subject?.trim().length ?? 0;
  if (subject && subjectLength < MIN_SUBJECT_LENGTH) {
    errors.push(
      formatErrorMessage(
        'Commit subject too short',
        `Length: ${subjectLength}`,
        `Minimum length: ${MIN_SUBJECT_LENGTH}`
      )
    );
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

const main = () => {
  try {
    const commitMsgFile = process.argv[2];
    const commitMessage = readFileSync(commitMsgFile, 'utf8').trim();
    const result = validateCommitMessage(commitMessage);

    if (!result.valid) {
      console.log(chalk.red('\n✖ Invalid commit message format\n'));
      result.errors.forEach((error) => console.log(error));
      showExamples();
      process.exit(1);
    }

    console.log(chalk.green('\n✔ Valid commit message format\n'));
    process.exit(0);
  } catch (error) {
    console.error(
      chalk.red('\n✖ Error validating commit message:'),
      error.message
    );
    process.exit(1);
  }
};

main();
