import _ from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import * as LOGUTIL from "../../../util/log";
import { performance } from "perf_hooks";
const { log, logSolution, trace } = LOGUTIL;

const YEAR = 2020;
const DAY = 2;
const DEBUG = true;
LOGUTIL.setDebug(DEBUG);

// problem url  : https://adventofcode.com/2020/day/2

async function p2020day2_part1(input: string) {

	let inputArray = input.split("\n").map(n => {
		return n.trim().split(" ") //?
	})

	let validCount: number = 0
	for (let line of inputArray) {
		line[0].split("-")
		let allowedLength = line[0].split("-") //?
		let min: number = +allowedLength[0]
		let max: number = +allowedLength[1]
		let letter: string = line[1][0]
		let regex = new RegExp(letter, 'g')
		let count: number = (line[2].match(regex) || []).length //?
		if (count >= min && count <= max) {
			validCount++
		}
	}

	return validCount
}

async function p2020day2_part2(input: string) {
	let inputArray = input.split("\n").map(n => {
		return n.trim().split(" ") 
	})

	let validCount: number = 0
	for (let line of inputArray) {
		let positions = line[0].split("-")
		let pos1: string = line[2][+positions[0]-1]
		let pos2: string = line[2][+positions[1]-1]
		let letter: string = line[1][0]
		if ( pos1 === letter ? !(pos2 === letter): pos2 === letter) {
			validCount++
		}
	}

	return validCount
}

async function run() {
	const part1tests: TestCase[] = [{
		input: `1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc`,
		expected: `2`
	}];
	const part2tests: TestCase[] = [{
		input: `1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc`,
		expected: `1`
	}];

	// Run tests
	test.beginTests()
	test.beginSection(false);
	for (const testCase of part1tests) {
		test.logTestResult(testCase, String(await p2020day2_part1(testCase.input)));
	}
	test.beginSection();
	for (const testCase of part2tests) {
		test.logTestResult(testCase, String(await p2020day2_part2(testCase.input)));
	}
	test.endTests();

	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2020day2_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now()
	const part2Solution = String(await p2020day2_part2(input));
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
