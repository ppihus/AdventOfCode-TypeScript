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
const DAY = 10;
const DEBUG = true;
const useFullInput: boolean = true;
LOGUTIL.setDebug(DEBUG);

type TestCase = {
    input: string
    expected: string
}

const part1Test1: TestCase = {
    input:
`16
10
15
5
1
11
7
19
6
12
4`,
    expected: '35',
};
const part1Test2: TestCase = {
    input:
`28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3`,
    expected: '220',
};

const part2Test1: TestCase = {
    input: part1Test1.input,
    expected: '8',
};
const part2Test2: TestCase = {
    input: part1Test2.input,
    expected: '19208',
};

// problem url  : https://adventofcode.com/2020/day/10

function year2020Day10Part1(input: string): string {
    let adapters: number[] = input
        .split('\n')
        .map((line: string): number => +line)
        .sort((a, b) => a - b);

    let outletJolts = 0;
    let joltDifference1 = 0;
    let joltDifference3 = 0;

    const deviceInputJoltage = adapters[adapters.length - 1] + 3;
    adapters = [outletJolts, ...adapters, deviceInputJoltage];

    for (let index = 1; index < adapters.length; index++) {
        const adapterJolts = adapters[index];
        outletJolts = adapterJolts - outletJolts;
        const diffWithLast = adapterJolts - adapters[index - 1];
        if (diffWithLast === 1) {
            joltDifference1++;
        } else if (diffWithLast === 3) {
            joltDifference3++;
        } else {
            return 'Got error';
        }
    }
    const answer = (joltDifference1 * joltDifference3).toString();
    return answer;
}

const cache = new Map<number, number>(); // ?
function pathCount(adapters: number[], from: number): number {
    // If the same pathCount() call was already made before, then return that.
    if (cache.has(from)) {
        return cache.get(from) as number;
    }
    let paths: number = 0;
    for (
        let nextIndex = from + 1;
        nextIndex < adapters.length && adapters[nextIndex] - adapters[from] <= 3;
        nextIndex++
    ) {
        paths += pathCount(adapters, nextIndex);
    }
    paths ||= 1;
    cache.set(from, paths);
    return paths;
}

function year2020Day10Part2(input: string): string {
    let adapters: number[] = input
        .split('\n')
        .map((line: string): number => +line)
        .sort((a, b) => a - b);

    const outletJolts: number = 0;
    const deviceInputJoltage = adapters[adapters.length - 1] + 3;
    adapters = [outletJolts, ...adapters, deviceInputJoltage];

    const answer = pathCount(adapters, 0);
    cache.clear(); // make sure next runs of year2020Day10Part2 will have empty cache
    return answer.toString();
}

async function run() {
    const part1tests: TestCase[] = [part1Test1, part1Test2];
    const part2tests: TestCase[] = [part2Test1, part2Test2];

    // Run tests
    test.beginTests();

    test.beginSection();
    part1tests.forEach((testCase: TestCase) => {
        test.logTestResult(testCase, String(year2020Day10Part1(testCase.input)));
    });

    test.beginSection();
    part2tests.forEach((testCase: TestCase) => {
        test.logTestResult(testCase, String(year2020Day10Part2(testCase.input)));
    });

    test.endTests();

    // Get input and run program while measuring performance
    if (useFullInput === true) {
        const input = await util.getInput(DAY, YEAR);

        const part1Before = performance.now();
        const part1Solution = String(await year2020Day10Part1(input));
        const part1After = performance.now();

        const part2Before = performance.now();
        const part2Solution = String(await year2020Day10Part2(input));
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
