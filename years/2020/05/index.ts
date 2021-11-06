import _ from 'lodash';
import * as util from '../../../util/util';
import * as test from '../../../util/test';
import chalk from 'chalk';
import * as LOGUTIL from '../../../util/log';
import { performance } from 'perf_hooks';
import { convertCompilerOptionsFromJson } from 'typescript';
const { log, logSolution, trace } = LOGUTIL;

const YEAR = 2020;
const DAY = 5;
const DEBUG = true;
LOGUTIL.setDebug(DEBUG);

// problem url  : https://adventofcode.com/2020/day/5

function getSeat(ticket: Array<string>): Array<number> {
    let seats: number = 128;
    let min: number = 0;
    let max: number = 127;

    let row = getPartition(seats, min, max, ticket, 0)
    let column = getPartition(8, 0, 7, ticket.slice(Math.max(ticket.length - 3, 1)), 0)
    console.log(`💺${ticket.join('')}\trow:${row}\tcol:${column}\tseatID:${row * 8 + column}`)
    return [row, column]
}

async function p2020day5_part1(input: string): Promise<any> {
    const inputArray = input.split('\n');
    const seatIDs: Array<number> = [];

    const airplane: Array<any> = [];
    for (let i = 0; i < 127; i++) {
        airplane.push(['.', '.', '.', '.', '.', '.', '.', '.']);
    }

    inputArray.forEach((line) => {
        const [row, column] = getSeat(line.split(''));
        airplane[row][column] = '#';
        seatIDs.push(row * 8 + column);
    });

    return airplane; //
}
function getPartition(seats: number, min: number, max: number, ticket: Array<string>, i: number = 0): any {
    if (ticket.join('') == 'BBFFBFBRRR')
        console.log(`Seats: ${seats}\t min: ${min}\t max: ${max}\t ticket: ${ticket.join('')}\t direction: ${ticket[i]}\t i: ${i}`)
    if ((i === 6 && ticket[i] === 'F') || (i === 2 && ticket[i] === 'L')) {
        // console.log(`⬇️ ${min}`)
        return min
    } else if ((i === 6 && (ticket[i] === 'B') || (i === 2 && ticket[i] === 'R'))) {
        // console.log(`⬆️ ${max}`)
        return max
    }
    if (ticket[i] === 'F' || ticket[i] === 'L') {
        i++
        seats = seats/2
        max = min+seats-1
        return getPartition(seats, min, max, ticket, i)
    } else if (ticket[i] === 'B' || ticket[i] === 'R') {
        i++
        // console.log("B or L")
        seats = seats/2
        min = min+seats
        max = max
        return getPartition(seats, min, max, ticket, i)
    } else {
        console.log('Why am I here?')
        return false
    }
}




async function p2020day5_part2(input: string) {
    let airplane: Array<any> = await p2020day5_part1(input)
    
    for (let i = 0; i < airplane.length; i++) {
        console.log(`${i}\t${airplane[i].join(' ')}`);
    }

    /*
    706 too high
    */
    return 'Not implemented';
}

async function run() {
    const part1tests: TestCase[] = [{
        input: `BFFFBBFRRR
FFFBBBFRRR
BBFFBBFRLL`,
        expected: '820'
    }];
    const part2tests: TestCase[] = [];

    // Run tests
    // test.beginTests(true)
    // test.beginSection();
    // for (const testCase of part1tests) {
    // 	test.logTestResult(testCase, String(await p2020day5_part1(testCase.input)));
    // }
    // test.beginSection();
    // for (const testCase of part2tests) {
    // 	test.logTestResult(testCase, String(await p2020day5_part2(testCase.input)));
    // }
    // test.endTests();

    // Get input and run program while measuring performance
    const input = await util.getInput(DAY, YEAR);

    const part1Before = performance.now();
    const part1Solution = String(await p2020day5_part1(input));
    const part1After = performance.now();

    const part2Before = performance.now()
    const part2Solution = String(await p2020day5_part2(input));
    const part2After = performance.now();

    logSolution(part1Solution, part2Solution);

    log(chalk.gray('--- Performance ---'));
    log(chalk.gray(`Part 1: ${util.msToString(part1After - part1Before)}`));
    log(chalk.gray(`Part 2: ${util.msToString(part2After - part2Before)}`));
    log();
}

run()
    .then(() => {
        process.exit();
    })
    .catch(error => {
        throw error;
    });
