import _ from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import * as LOGUTIL from "../../../util/log";
import { performance } from "perf_hooks";
const { log, logSolution, trace } = LOGUTIL;

const YEAR = 2020;
const DAY = 1;
const DEBUG = true;
LOGUTIL.setDebug(DEBUG);

// problem url  : https://adventofcode.com/2020/day/1

async function p2020day1_part1(input: string): Promise<Number> {
	let solution: Number = 0;
	let h: Array<number> = [];
	let l: Array<number> = [];
	// let list: Array<number> = input.split("\n").map(n => +n).sort()
	input.split("\n").map(n => {
		let value = Number(n);
		if (value >= 1010) {
			h.push(value)
		} else {
			l.push(value)
		}
	})


	mainloop: for (let hv of h) {
		for (let lv of l) {
			if (hv + lv === 2020) {
				solution = hv * lv;
				break mainloop;
			}
		}
	}

	return solution; //?
}

async function p2020day1_part2(input: string): Promise<Number> {
	let solution: Number = 0;
	let list = input.split("\n")
		.map(e1 => {
			let n = Number(e1);
			return isNaN(n) ? e1.trim() : n;
		})
		.sort()


	mainloop: for (let row in list) {
		for (let reverseRow = list.length; reverseRow > 0; reverseRow--) {
			let third = list.find(el => +el + +list[row] + +list[reverseRow] === 2020)
			if (third) {
				solution = +third * +list[row] * +list[reverseRow]
				break mainloop;
			}
		}
	}
	return solution;
}

async function run() {
	const part1tests: TestCase[] = [{
		input: `1721
979
366
299
675
1456`,
		expected: `514579`
	}];
	const part2tests: TestCase[] = [{
		input: `1721
979
366
299
675
1456`,
		expected: `241861950`
	}];

	// Run tests
	test.beginTests()
	test.beginSection();
	for (const testCase of part1tests) {
		test.logTestResult(testCase, String(await p2020day1_part1(testCase.input)));
	}
	test.beginSection(false);
	for (const testCase of part2tests) {
		test.logTestResult(testCase, String(await p2020day1_part2(testCase.input)));
	}
	test.endTests();

	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2020day1_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now()
	const part2Solution = String(await p2020day1_part2(input));
	const part2After = performance.now();

	logSolution(part1Solution, part2Solution);

	log(chalk.gray("--- Performance ---"));
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
