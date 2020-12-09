import chalk from 'chalk';

const grayBar = chalk.gray('║');
const blueBar = chalk.blueBright('│');

let testIndex = 1;
let sectionIndex = 1;
let testsHidden = false;
let sectionHidden = false;

function testLog(...params: any[]) {
    if (!sectionHidden && !testsHidden) {
        console.log(...params);
    }
}

export function beginTests(showTests = true) {
    testIndex = 1;
    sectionIndex = 1;
    testsHidden = !showTests;

    testLog(chalk.gray('╔═══════════════ TEST CASES ═══════════════╗\n║'));
}

export function beginSection(showSection = true) {
    sectionHidden = !showSection;
    if (sectionIndex > 1 && showSection === true) {
        testLog(grayBar + chalk.blueBright('  └────────────────────────────────────┘'));
    }
    testLog(grayBar + chalk.blueBright(`  ┌─────── BEGIN SECTION ${sectionIndex} TESTS ──────┐`));
    sectionIndex++;
}

function formatTestInput(input: string) {
    return `${grayBar}  ${blueBar}      ${input.split('\n').join(`\n${grayBar}  ${blueBar}      `)}`;
}

type TestCase = {
    input: string
    expected: string
}

export function logTestResult(testCase: TestCase, result: string) {
    if (testCase.expected === result) {
        testLog(`${grayBar}  ${blueBar} ${testIndex}.  ${chalk.greenBright('SUCCESS')}`);
    } else {
        testLog(`${grayBar}  ${blueBar} ${testIndex}.  ${chalk.redBright('FAILED')}`);
        testLog(`${grayBar}  ${blueBar}     ${chalk.blackBright('┄┄┄┄┄┄┄┄┄┄┄┄┄┄  Test Input')}`);
        testLog(formatTestInput(testCase.input));
        testLog(`${grayBar}  ${blueBar}     ${chalk.blackBright('┄┄┄┄┄┄┄┄┄┄┄┄┄┄  End')}`);
        testLog(`${grayBar}  ${blueBar}     Expected: ${testCase.expected}`);
        testLog(`${grayBar}  ${blueBar}     Actual  : ${chalk.yellowBright(result)}`);
    }
    testIndex++;
}

export function endTests() {
    sectionHidden = false;
    testIndex = 1;
    sectionIndex = 1;
    testLog(grayBar + chalk.blueBright('  └────────────────────────────────────┘'));
    testLog(grayBar + chalk.gray('\n╚════════════════ END TESTS ═══════════════╝'));
}
