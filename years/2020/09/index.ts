/* eslint-disable no-continue */
/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import chalk from 'chalk';
import { performance } from 'perf_hooks';
// eslint-disable-next-line no-unused-vars
import _ from 'lodash';
import * as util from '../../../util/util';
import * as test from '../../../util/test';
import * as LOGUTIL from '../../../util/log';

const { log, logSolution } = LOGUTIL;
const YEAR = 2020;
const DAY = 9;
const DEBUG = true;
const useFullInput: boolean = true;
LOGUTIL.setDebug(DEBUG);

type TestCase = {
    input: string
    expected: string
}

const test1: TestCase = {
    input:
`35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`,
    expected: '127',
};

const test2: TestCase = {
    input: test1.input,
    expected: '62',
};

// problem url  : https://adventofcode.com/2020/day/9

function year2020Day9Part1(input: string): string|number {
    const data = input.split('\n');
    let length = 25;
    if (data.length < 50) { // Test data had slightly different rules
        length = 5;
    }
    for (let index = length; index < data.length; index++) {
        const section = data.slice(index - length, index).map((a: string) => +a);
        const targets = section.map((a) => +data[index] - +a);
        const intersection = targets.filter((value) => section.includes(value));
        if (intersection.length === 0) {
            return data[index];
        }
    }
    return '0';
}

function year2020Day9Part2(input: string) {
    const series = input.split('\n');
    const invalidNumber = +year2020Day9Part1(input);
    for (let i = 0; i < series.length; i++) {
        const addable1 = +series[i];
        let sum = addable1;
        const min = addable1;
        let max = 0;
        let j = i + 1;
        while (sum < invalidNumber) {
            const addable2 = +series[j];
            sum += addable2;
            if (+series[j - 1] > max) {
                max = +series[j - 1];
            }
            j++;
        }
        if (sum === invalidNumber) {
            return +min + +max;
        }
    }
    return '0';
}

async function run() {
    const part1tests: TestCase[] = [test1];
    const part2tests: TestCase[] = [test2];

    // Run tests
    test.beginTests();
    test.beginSection();
    part1tests.forEach((testCase: TestCase) => {
        test.logTestResult(testCase, String(year2020Day9Part1(testCase.input)));
    });
    test.beginSection();
    part2tests.forEach((testCase: TestCase) => {
        test.logTestResult(testCase, String(year2020Day9Part2(testCase.input)));
    });
    test.endTests();

    // Get input and run program while measuring performance
    if (useFullInput === true) {
        const input = await util.getInput(DAY, YEAR);

        const part1Before = performance.now();
        const part1Solution = String(await year2020Day9Part1(input));
        const part1After = performance.now();

        const part2Before = performance.now();
        const part2Solution = String(await year2020Day9Part2(input));
        const part2After = performance.now();

        logSolution(part1Solution, part2Solution);

        log(chalk.gray('--- Performance ---'));
        log(chalk.gray(`Part 1: ${util.msToString(part1After - part1Before)}`));
        log(chalk.gray(`Part 2: ${util.msToString(part2After - part2Before)}`));
        log();
    }
}

run()
    .then(() => {
        process.exit();
    })
    .catch((error) => {
        throw error;
    });
