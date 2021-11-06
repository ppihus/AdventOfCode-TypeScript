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
const YEAR = 2019;
const DAY = 1;
const DEBUG = true;
const useFullInput: boolean = true;
LOGUTIL.setDebug(DEBUG);

type TestCase = {
    input: string
    expected: string
}

const test1: TestCase = {
    input:
`12
14
1969
100756`,
    expected: '34241',
};

const test2_1: TestCase = {
    input: `14`,
    expected: '2',
};
const test2_2: TestCase = {
    input: `1969`,
    expected: '966',
};

const test2_3: TestCase = {
    input:  `100756`,
    expected: '50346',
};

// problem url  : https://adventofcode.com/2019/day/1

function year2019Day1Part1(input: string): string {
    let fuel: number = input
        .split('\n')
        .map((line: string): number => +line)
        .reduce((pv, cv) => pv + Math.floor(cv/3)-2,0);
    return fuel.toString();
}

function calculateFuelRecursive(mass: number): number {
    let fuel = Math.floor(mass/3)-2
    if (fuel > 0) {
        return fuel + calculateFuelRecursive(fuel)
    } else {
        return 0
    }
}

function year2019Day1Part2(input: string): string {
    let totalFuel = input
        .split('\n')
        .map((line: string): number => +line)
        .reduce((pv, cv) => pv + calculateFuelRecursive(cv), 0);

    return totalFuel.toString();
}

async function run() {
    const part1tests: TestCase[] = [test1];
    const part2tests: TestCase[] = [
        test2_1,
        test2_2,
        test2_3
    ];

    // Run tests
    test.beginTests();
    test.beginSection();

    part1tests.forEach((testCase: TestCase) => {
        test.logTestResult(testCase, String(year2019Day1Part1(testCase.input)));
    });

    test.beginSection();
    part2tests.forEach((testCase: TestCase) => {
        test.logTestResult(testCase, String(year2019Day1Part2(testCase.input)));
    });

    test.endTests();

    // Get input and run program while measuring performance
    if (useFullInput === true) {
        const input = await util.getInput(DAY, YEAR);

        const part1Before = performance.now();
        const part1Solution = String(await year2019Day1Part1(input));
        const part1After = performance.now();

        const part2Before = performance.now();
        const part2Solution = String(await year2019Day1Part2(input));
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
