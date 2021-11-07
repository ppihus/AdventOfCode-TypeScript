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
const DAY = 2;
const DEBUG = true;
const useFullInput: boolean = true;
LOGUTIL.setDebug(DEBUG);

type TestCase = {
    input: string
    expected: string
}

const TEST_1_1: TestCase = {
    input: `1,9,10,3,2,3,11,0,99,30,40,50`,
    expected: '3500,9,10,70,2,3,11,0,99,30,40,50'
};
const TEST_1_2: TestCase = {
    input: `1,0,0,0,99`,
    expected: '2,0,0,0,99',
};
const TEST_1_3: TestCase = {
    input: `2,3,0,3,99`,
    expected: '2,3,0,6,99',
};
const TEST_1_4: TestCase = {
    input: `2,4,4,5,99,0`,
    expected: '2,4,4,5,99,9801',
};
const TEST_1_5: TestCase = {
    input: `1,1,1,4,99,5,6,0,99`,
    expected: '30,1,1,4,2,5,6,0,99',
};

const test2: TestCase = {
    input: ``,
    expected: 'OUTPUT_HERE',
};

// problem url  : https://adventofcode.com/2019/day/2

function year2019Day2Part1(input: string): number[] {
    const memory: number[] = input
        .split(',')
        .map((line: string): number => +line)

    for ( let pointer = 0; pointer < memory.length; pointer += 4 ) {
        const v = memory[pointer];
        if (v === 99) { return memory }

        const targetAddress = memory[pointer+3]
        const parameter1 = memory[memory[pointer+1]]
        const parameter2 = memory[memory[pointer+2]]

        if (v === 1) { memory[targetAddress] = parameter1 + parameter2 }
        if (v === 2) { memory[targetAddress] = parameter1 * parameter2 }
    }

    return memory;
}

function year2019Day2Part2(input: string): string {
    return 'Not implemented';
}

async function run() {
    const part1tests: TestCase[] = [
        TEST_1_1,
        TEST_1_2,
        TEST_1_3,
        TEST_1_4,
        TEST_1_5,
    ];
    const part2tests: TestCase[] = [test2];

    // Run tests
    test.beginTests();
    test.beginSection();

    part1tests.forEach((testCase: TestCase) => {
        test.logTestResult(testCase, String(year2019Day2Part1(testCase.input)));
    });

    test.beginSection();
    // part2tests.forEach((testCase: TestCase) => {
    //     test.logTestResult(testCase, String(year2019Day2Part2(testCase.input)));
    // });

    test.endTests();

    // Get input and run program while measuring performance
    if (useFullInput === true) {
        const input = await util.getInput(DAY, YEAR);

        const part1Before = performance.now();
        const part1Solution = String(await year2019Day2Part1(input));
        const part1After = performance.now();

        const part2Before = performance.now();
        const part2Solution = String(await year2019Day2Part2(input));
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
