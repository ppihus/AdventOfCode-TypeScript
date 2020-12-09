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

const YEAR: number = 2020;
const DAY: number = 6;
const DEBUG: boolean = true;
const useFullInput: boolean = true;
LOGUTIL.setDebug(DEBUG);

type TestCase = {
    input: string;
    expected: string;
};

const test1: TestCase = {
    input: `abc

a
b
c

ab
ac

a
a
a
a

b`,
    expected: '11',
};

const test2: TestCase = {
    input: test1.input,
    expected: '6',
};

// problem url  : https://adventofcode.com/2020/day/6

function year2020Day6Part1(input: string): number {
    let yesAnswerCount: number = 0;

    input.split('\n\n').forEach((element: string) => {
        yesAnswerCount += new Set(element.replace(/\n/g, '').split('')).size;
    });

    return yesAnswerCount;
}

function intersectCount(firstSet: Set<string>, ...sets: Array<Set<string>>): number {
    const count = sets.length;
    firstSet.forEach((item: string) => {
        let i = count;
        let allHave = true;
        while (--i) {
            allHave = sets[i].has(item);
            if (!allHave) {
                break;
            }
        }
        if (!allHave) {
            firstSet.delete(item);
        }
    });
    return firstSet.size;
}
function year2020Day6Part2(input: string): number {
    let answer: number = 0;
    const groups: Array<Array<Set<string>>> = [];

    input.split('\n\n').forEach((element: string) => {
        const groupAnswers: Array<Set<string>> = [];
        element.split('\n').forEach((person: string) => {
            groupAnswers.push(new Set(person));
        });
        groups.push(groupAnswers);
    });

    groups.forEach((group: Set<string>[]) => {
        answer += intersectCount(group[0], ...group);
    });

    return answer;
}

async function run() {
    const part1tests: TestCase[] = [test1];
    const part2tests: TestCase[] = [test2];

    // Run tests
    test.beginTests();
    test.beginSection();

    part1tests.forEach((testCase: TestCase) => {
        test.logTestResult(testCase, String(year2020Day6Part1(testCase.input)));
    });

    test.beginSection();
    part2tests.forEach((testCase: TestCase) => {
        test.logTestResult(testCase, String(year2020Day6Part2(testCase.input)));
    });
    test.endTests();

    // Get input and run program while measuring performance
    if (useFullInput === true) {
        const input = await util.getInput(DAY, YEAR);

        const part1Before = performance.now();
        const part1Solution = String(await year2020Day6Part1(input));
        const part1After = performance.now();

        const part2Before = performance.now();
        const part2Solution = String(await year2020Day6Part2(input));
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
