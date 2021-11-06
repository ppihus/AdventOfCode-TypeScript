import _ from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import * as LOGUTIL from "../../../util/log";
import { performance } from "perf_hooks";
const { log, logSolution, trace } = LOGUTIL;

const YEAR = 2020;
const DAY = 3;
const DEBUG = true;
LOGUTIL.setDebug(DEBUG);

// problem url  : https://adventofcode.com/2020/day/2

async function p2020day3_part1(input: string) {

	let inputArray = input.split("\n") //?
	let forest = []
	for (let line of inputArray) {
		forest.push(line.split(""))
	}
	forest.shift()

	return traverseSlopes(forest, 3, 1)
}

async function p2020day3_part2(input: string) {

	let inputArray = input.split("\n") //?
	let forest = []
	for (let line of inputArray) {
		forest.push(line.split(""))
	}
	forest.shift()

	let results = []
	results.push(traverseSlopes(forest, 1, 1))
	results.push(traverseSlopes(forest, 3, 1))
	results.push(traverseSlopes(forest, 5, 1))
	results.push(traverseSlopes(forest, 7, 1))
	results.push(traverseSlopes(forest, 1, 2))

	const answer = results.reduce((pv, cv) => pv * cv) //?
	return answer

}

function traverseSlopes(forest: any[], rightStep: number, downStep: number = 1) {
	let counter: number = 0
	let leftAlignment: number = 0

	for (let line in forest) {
		if (+line % downStep === 0 && downStep !== 1) {
			continue;
		}
		leftAlignment += rightStep
		if (forest[line][leftAlignment] == "#") {
			// console.log(`🌲 X: ${leftAlignment} Y: ${line} - ${forest[line][leftAlignment]}`)
			counter++
		} else {
			// console.log(`0️⃣  X: ${leftAlignment} Y: ${line} - ${forest[line][leftAlignment]}`)
		}

		if (leftAlignment + rightStep >= forest[line].length) {
			leftAlignment = (rightStep - (forest[line].length - +leftAlignment)) - rightStep
		}
	}
	return counter
}

async function run() {
	const part1tests: TestCase[] = [{
		input: `..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`,
		expected: `7`
	}];
	const part2tests: TestCase[] = [{
		input: `..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`,
		expected: `336`
	}];

	// Run tests
	test.beginTests()
	test.beginSection(false);
	for (const testCase of part1tests) {
		test.logTestResult(testCase, String(await p2020day3_part1(testCase.input)));
	}
	test.beginSection(false);
	for (const testCase of part2tests) {
		test.logTestResult(testCase, String(await p2020day3_part2(testCase.input)));
	}
	test.endTests();

	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2020day3_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now()
	const part2Solution = String(await p2020day3_part2(input));
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
