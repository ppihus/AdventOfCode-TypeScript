/* tslint:disable no-console */
/* tslint:disable import/no-unresolved */
/* tslint:disable import/extensions */
// tslint:disable: no-unused-vars
// tslint:disable: no-unused-expression
// tslint:disable: no-bitwise
// tslint:disable: comment-format
import chalk from 'chalk';
import { performance } from 'perf_hooks';
import _, { xor } from 'lodash';
import * as util from '../../../util/util';
import * as test from '../../../util/test';
import * as LOGUTIL from '../../../util/log';

const { log, logSolution } = LOGUTIL;
const YEAR = 2021;
const DAY = 3;
const DEBUG = true;
const useFullInput: boolean = true;
LOGUTIL.setDebug(DEBUG);

type TestCase = {
    input: string
    expected: string
}

const test1: TestCase = {
    input:
`00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`,
    expected: '198',
};

const test2: TestCase = {
    input:
`00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`,
    expected: '230',
};

// problem url  : https://adventofcode.com/2021/day/3

function transpose(a: number[][]) {
  return a[0].map((_, c) => a.map(r => r[c]));
}

function addBitsToPosition(input: number, position: number): number {
    return input = (input ^ (1<<position))
}

function getMostCommonBits(input: number[]): number {
    return +input.sort()[Math.floor(input.length/2)]
}

function year2021Day3Part1(input: string): string {
    const diagnosticReport: number[][] = input.split('\n')
        .map((row: string): number[] => row
            .split('')
            .map((line: string): number => +line)
        );

    const transposedReport = transpose(diagnosticReport)

    let gammaRateBin: number = 0;
    let epsilonRateBin: number = 2**transposedReport.length-1 // Correct length, but filled with 1's in binary.

    for (const [idx, line] of transposedReport.entries()) {
       if (getMostCommonBits(line) === 1) {
        const bitPosition: number = transposedReport.length-idx-1
        gammaRateBin = addBitsToPosition(gammaRateBin, bitPosition)
        epsilonRateBin = addBitsToPosition(epsilonRateBin, bitPosition)
       }
    }

    return (gammaRateBin*epsilonRateBin).toString()
}

function year2021Day3Part2(input: string): string {
    const diagnosticReport: number[][] = input.split('\n')
    .map((row: string): number[] => row
        .split('')
        .map((line: string): number => +line)
    );

    let i: number = 0
    let o2GeneratorRating: number[][] = diagnosticReport
    while (o2GeneratorRating.length > 1) {
        const mostCommonBit = getMostCommonBits(transpose(o2GeneratorRating)[i]) //?
        const keep = []
        for (const line of o2GeneratorRating) {
            if (line[i] === mostCommonBit) { keep.push(line) }
        }
        o2GeneratorRating = keep
        i++
    }

    i = 0
    let co2ScrubberRating: number[][] = diagnosticReport
    while (co2ScrubberRating.length > 1) {
        const mostCommonBit = getMostCommonBits(transpose(co2ScrubberRating)[i]) //?
        const keep = []
        for (const line of co2ScrubberRating) {
            if (line[i] !== mostCommonBit) { keep.push(line) }
        }
        co2ScrubberRating = keep
        i++
    }
    return (parseInt(o2GeneratorRating[0].join(""), 2) * parseInt(co2ScrubberRating[0].join(""), 2)).toString()
}

async function run() {
    const part1tests: TestCase[] = [test1];
    const part2tests: TestCase[] = [test2];

    // Run tests
    test.beginTests();
    test.beginSection();

    part1tests.forEach((testCase: TestCase) => {
        test.logTestResult(testCase, String(year2021Day3Part1(testCase.input)));
    });

    test.beginSection();
    part2tests.forEach((testCase: TestCase) => {
        test.logTestResult(testCase, String(year2021Day3Part2(testCase.input)));
    });

    test.endTests();

    // Get input and run program while measuring performance
    if (useFullInput === true) {
        const input = await util.getInput(DAY, YEAR);

        const part1Before = performance.now();
        const part1Solution = String(await year2021Day3Part1(input));
        const part1After = performance.now();

        const part2Before = performance.now();
        const part2Solution = String(await year2021Day3Part2(input));
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
