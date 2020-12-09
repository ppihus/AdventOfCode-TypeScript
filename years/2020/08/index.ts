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
const DAY = 8;
const DEBUG = true;
const useFullInput: boolean = true;
LOGUTIL.setDebug(DEBUG);

type TestCase = {
    input: string
    expected: string
}

const test1: TestCase = {
    input:
`nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`,
    expected: '5',
};

const test2: TestCase = {
    input:
`nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +0
acc +0
acc +6`,
    expected: '8',
};

// problem url  : https://adventofcode.com/2020/day/8

function runProgram(instructions: Array<string>) {
    let acc: number = 0;
    const seen: number[] = [];
    for (let i = 0; i < instructions.length; i++) {
        const cmd = instructions[i].slice(0, 3);
        const arg = +instructions[i].slice(3, instructions[i].length);
        if (seen.includes(i)) {
            return { acc, infiniteloop: true };
        }
        seen.push(i);
        if (cmd === 'acc') {
            acc += arg;
        } else if (cmd === 'jmp') {
            i = i + arg - 1;
        }
    }
    return { acc, infiniteloop: false };
}

function year2020Day8Part1(input: string) {
    const instructions: string[] = input.split('\n');
    return runProgram(instructions).acc;
}

function* tryReplacingInstructions(instructions: Array<string>): Generator<{}> {
    for (let i = 0; i < instructions.length; i++) {
        const instructionsCopy: Array<string> = Object.assign([], instructions);
        if (instructionsCopy[i].slice(0, 3) === 'jmp') { // TODO sholud try replacing 'jmp' to 'nop' also
            instructionsCopy[i] = instructionsCopy[i].replace('jmp', 'nop');
            const programOutput = runProgram(instructionsCopy);
            if (programOutput.infiniteloop === false) {
                yield programOutput;
            } else {
                yield programOutput;
            }
        }
    }
}

function year2020Day8Part2(input: string) {
    const iterator = tryReplacingInstructions(input.split('\n'));
    let response: number = 0;
    let infiniteloop: boolean = true;

    while (infiniteloop === true) {
        const iteratedOutput = iterator.next();
        infiniteloop = iteratedOutput.value.infiniteloop;
        response = iteratedOutput.value.acc;
    }
    return response;
}

async function run() {
    const part1tests: TestCase[] = [test1];
    const part2tests: TestCase[] = [test2];

    // Run tests
    test.beginTests();
    test.beginSection();
    part1tests.forEach((testCase: TestCase) => {
        test.logTestResult(testCase, String(year2020Day8Part1(testCase.input)));
    });
    test.beginSection();
    part2tests.forEach(async (testCase: TestCase) => {
        test.logTestResult(testCase, String(year2020Day8Part2(testCase.input)));
    });
    test.endTests();

    // Get input and run program while measuring performance
    if (useFullInput === true) {
        const input = await util.getInput(DAY, YEAR);

        const part1Before = performance.now();
        const part1Solution = String(await year2020Day8Part1(input));
        const part1After = performance.now();

        const part2Before = performance.now();
        const part2Solution = String(await year2020Day8Part2(input));
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
