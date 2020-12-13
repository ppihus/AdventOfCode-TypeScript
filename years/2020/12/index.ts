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
const DAY = 12;
const DEBUG = true;
const useFullInput: boolean = true;
LOGUTIL.setDebug(DEBUG);

type TestCase = {
    input: string
    expected: string
}

const test1: TestCase = {
    input:
`F10
N3
F7
R90
F11`,
    expected: '25',
};

const test2: TestCase = {
    input: test1.input,
    expected: '286',
};

// problem url  : https://adventofcode.com/2020/day/12

function move(
    lastMove: { facing: string, coords: number[] },
    instruction: { cmd: string, distance: number },
): { facing: string, coords: number[] } {
    const NESW: string = 'NESW';
    const { cmd, distance } = instruction;
    let { facing, coords } = lastMove;

    const moves: any = {
        E: [1, 0],
        W: [-1, 0],
        N: [0, 1],
        S: [0, -1],
    };

    if (NESW.includes(cmd)) {
        coords = coords.map((c, i) => c + (moves[cmd][i] * distance));
    } else {
        switch (cmd) {
        case 'R': { facing = NESW[(NESW.indexOf(facing) + (distance / 90)) % 4]; break; }
        case 'L': { facing = NESW[(NESW.indexOf(facing) + ((360 - distance) / 90)) % 4]; break; }
        case 'F': { return move(lastMove, { cmd: facing, distance }); }
        default: { break; }
        }
    }

    return { facing, coords };
}

function year2020Day12Part1(input: string): string {
    return input
        .split('\n')
        .map((row): { cmd: string, distance: number } => (
            { cmd: row[0], distance: +row.substring(1, row.length) }
        ))
        .reduce((pv, cv) => move(pv, cv), { facing: 'E', coords: [0, 0] })
        .coords
        .reduce((pv, cv) => Math.abs(pv) + Math.abs(cv))
        .toString();
}

function movePart2(
    ship: number[],
    waypoint: number[],
    instruction: { cmd: string, distance: number },
): { ship: number[], waypoint: number[] } {
    const NESW: string = 'NESW';
    const { cmd, distance } = instruction;
    let newShip = ship;
    let newWaypoint = waypoint;

    const moves: any = {
        E: [1, 0],
        W: [-1, 0],
        N: [0, 1],
        S: [0, -1],
    };

    if (NESW.includes(cmd)) {
        newWaypoint = waypoint.map((c, i) => c + (moves[cmd][i] * distance)); // ?
    }

    switch (cmd) {
    case 'F': {
        newShip = [
            ship[0] + (distance * waypoint[0]),
            ship[1] + (distance * waypoint[1]),
        ];
        break;
    }
    case 'R': {
        newWaypoint = new Array(distance / 90).fill(0).reduce((pv) => ([pv[1], -pv[0]]), waypoint);
        break;
    }
    case 'L': {
        newWaypoint = new Array(distance / 90).fill(0).reduce((pv) => ([-pv[1], pv[0]]), waypoint);
        break;
    }
    default: { break; }
    }

    return { ship: newShip, waypoint: newWaypoint };
}

function year2020Day12Part2(input: string): string {
    const waypoint = [10, 1];
    const ship = [0, 0];

    return input
        .split('\n')
        .map((row): { cmd: string, distance: number } => (
            { cmd: row[0], distance: +row.substring(1, row.length) }
        ))
        .reduce((pv, cv) => (movePart2(pv.ship, pv.waypoint, cv)), { ship, waypoint })
        .ship
        .reduce((pv, cv) => Math.abs(pv) + Math.abs(cv))
        .toString();
}

async function run() {
    const part1tests: TestCase[] = [test1];
    const part2tests: TestCase[] = [test2];

    // Run tests
    test.beginTests();
    test.beginSection();

    part1tests.forEach((testCase: TestCase) => {
        test.logTestResult(testCase, String(year2020Day12Part1(testCase.input)));
    });

    test.beginSection();
    part2tests.forEach((testCase: TestCase) => {
        test.logTestResult(testCase, String(year2020Day12Part2(testCase.input)));
    });

    test.endTests();

    // Get input and run program while measuring performance
    if (useFullInput === true) {
        const input = await util.getInput(DAY, YEAR);

        const part1Before = performance.now();
        const part1Solution = String(await year2020Day12Part1(input));
        const part1After = performance.now();

        const part2Before = performance.now();
        const part2Solution = String(await year2020Day12Part2(input));
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
