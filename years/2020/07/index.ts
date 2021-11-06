/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import chalk from 'chalk';
import { performance } from 'perf_hooks';
// eslint-disable-next-line no-unused-vars
import _ from 'lodash';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import * as util from '../../../util/util';
import * as test from '../../../util/test';
import * as LOGUTIL from '../../../util/log';

const { log, logSolution } = LOGUTIL;

const YEAR = 2020;
const DAY = 7;
const DEBUG = true;
LOGUTIL.setDebug(DEBUG);

const useFullInput: boolean = false;

type TestCase = {
    input: string
    expected: string
}

const test1: TestCase = {
    input:
`light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`,
    expected: '4',
};

const test2: TestCase = {
    input: test1.input,
    expected: 'OUTPUT_HERE',
};

// problem url  : https://adventofcode.com/2020/day/7

type LuggageRule = {
    type?: string,
    canContain?: LuggageRule[],
    [x: string]: any
}

type LuggageRules = [
    type?: LuggageRule
]

function year2020Day7Part1(input: string) {
    const fullRules: LuggageRules = [];

    input
        .replace(/bags?\.?/g, 'bag')
        .replace(/ contain no other bag/g, '')
        .split('\n')
        .forEach((rule: string) => {
            const outer: Array<string> = rule.split(' contain ');
            outer.slice(1).forEach((r: string) => {
                const inner: LuggageRule[] = [];
                r.split(', ').forEach((innerinner: any) => {
                    const repeats: Array<number> = _.times(innerinner.slice(0, 1), Number);
                    repeats.forEach(() => {
                        inner.push([innerinner.slice(2)]);
                    });
                });
                const x: any = [];
                x[outer[0]] = inner;
                fullRules.push(x);
            });
        });

    console.log('---');
    // console.dir(fullRules[0]);
    fullRules.forEach((rule) => {
        console.log(rule);
    });
    console.log('^^^');
    // console.dir(fullRules[1]);
    // console.dir(fullRules[2]);
    // console.dir(fullRules[3]);
    // log(fullRules);

    return 'Not implemented';
}

function workingStructure(input: string) {
    const fullRules: LuggageRules = [];

    input
        .replace(/bags?\.?/g, 'bag')
        .replace(/ contain no other bag/g, '')
        .split('\n')
        .forEach((rule: string) => {
            const outer: Array<string> = rule.split(' contain ');
            outer.slice(1).forEach((r: string) => {
                const s0: LuggageRule[] = [];
                r.split(', ').forEach((innerinner: any) => {
                    const repeats: Array<number> = _.times(innerinner.slice(0, 1), Number);
                    repeats.forEach(() => {
                        s0.push({ type: innerinner.slice(2) });
                    });
                });
                fullRules.push({ type: outer[0], canContain: s0 });
            });
        });

    // console.log('🛅 🛅 🛅');
    // console.log(fullRules);
    console.log(JSON.stringify(fullRules));
    log(fullRules[0]);

    return 'Not implemented';
}

function year2020Day7Part2(input: string) {
    return 'Not implemented';
}

async function run() {
    const part1tests: TestCase[] = [test1];
    const part2tests: TestCase[] = [test2];

    // Run tests
    test.beginTests();
    test.beginSection();

    part1tests.forEach((testCase: TestCase) => {
        test.logTestResult(testCase, String(year2020Day7Part1(testCase.input)));
    });
    test.beginSection(true);
    part2tests.forEach((testCase: TestCase) => {
        test.logTestResult(testCase, String(year2020Day7Part2(testCase.input)));
    });
    test.endTests();

    // Get input and run program while measuring performance
    if (useFullInput === true) {
        const input = await util.getInput(DAY, YEAR);

        const part1Before = performance.now();
        const part1Solution = String(await year2020Day7Part1(input));
        const part1After = performance.now();

        const part2Before = performance.now();
        const part2Solution = String(await year2020Day7Part2(input));
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
