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
const DAY = 11;
const DEBUG = true;
const useFullInput: boolean = true;
LOGUTIL.setDebug(DEBUG);

type TestCase = {
    input: string
    expected: string
}

const test1: TestCase = {
    input:
`L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`,
    expected: '37',
};

const test2: TestCase = {
    input: test1.input,
    expected: 'OUTPUT_HERE',
};

// problem url  : https://adventofcode.com/2020/day/11

function getAdjacent(layout: string[][], seat: number[]) {
    const row = seat[0];
    const col = seat[1];

    const adjacent: number[][] = [];
    adjacent.push(
        [row - 1, col - 1], [row - 1, col], [row - 1, col + 1],
        [row, col - 1], [row, col + 1],
        [row + 1, col - 1], [row + 1, col], [row + 1, col + 1],
    );

    let count = 0;
    adjacent.forEach((r) => {
        if (layout[r[0]][r[1]] === '#') {
            count++;
        }
    });

    return count;
}

function year2020Day11Part1(input: string): string {
    const layout: string[][] = input
        .split('\n')
        .map((row: string): string[] => row
            .split(''));

    const emptyLayout = layout.map((arr) => arr.slice());
    let paddedLayout = [...Array(emptyLayout.length + 2)]
        .map(() => Array(emptyLayout[0].length + 2));

    for (let i = 0; i < layout.length; i++) {
        for (let j = 0; j < layout[0].length; j++) {
            paddedLayout[i + 1][j + 1] = layout[i][j];
        }
    }
    for (;;) {
        const workingCopyLayout = paddedLayout.map((arr) => arr.slice());
        let changed = false;
        for (let j = 0; j < paddedLayout.length; j++) {
            for (let k = 0; k < paddedLayout[j].length; k++) {
                const seat = paddedLayout[j][k];
                if (seat === '#') {
                    if (getAdjacent(paddedLayout, [j, k]) >= 4) {
                        workingCopyLayout[j][k] = 'L';
                        changed = true;
                    }
                } else if (seat === 'L') {
                    if (getAdjacent(paddedLayout, [j, k]) === 0) {
                        workingCopyLayout[j][k] = '#';
                        changed = true;
                    }
                }
            }
        }
        paddedLayout = workingCopyLayout.map((arr) => arr.slice());
        if (!changed) {
            break;
        }
    }
    let count = 0;
    paddedLayout.forEach((r) => {
        count += (r.join('').match(/#/g) || []).length;
    });
    log(count);
    return count.toString();
}

function year2020Day11Part2(input: string): string {
    return "Not implemented";
}

async function run() {
    const part1tests: TestCase[] = [test1];
    const part2tests: TestCase[] = [test2];

    // Run tests
    test.beginTests();
    test.beginSection();

    part1tests.forEach((testCase: TestCase) => {
        test.logTestResult(testCase, String(year2020Day11Part1(testCase.input)));
    });

    test.beginSection(false);
    part2tests.forEach((testCase: TestCase) => {
        test.logTestResult(testCase, String(year2020Day11Part2(testCase.input)));
    });

    test.endTests();

    // Get input and run program while measuring performance
    if (useFullInput === true) {
        const input = await util.getInput(DAY, YEAR);

        const part1Before = performance.now();
        const part1Solution = String(await year2020Day11Part1(input));
        const part1After = performance.now();

        const part2Before = performance.now();
        const part2Solution = String(await year2020Day11Part2(input));
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
