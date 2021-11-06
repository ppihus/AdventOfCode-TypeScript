import _ from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import * as LOGUTIL from "../../../util/log";
import { performance } from "perf_hooks";
const { log, logSolution, trace } = LOGUTIL;

const YEAR = 2020;
const DAY = 4;
const DEBUG = true;
LOGUTIL.setDebug(DEBUG);

// problem url  : https://adventofcode.com/2020/day/4

async function p2020day4_part1(input: string) {
	let inputArray = input.split("\n\n") //?
	let passports: Array<any> = [];

	inputArray.forEach(line => {
		passports.push(line.replace(/\r?\n|\r/g, " ").replace(/\s+/g, "\n").split("\n"))
	})

	let validPassportCount: number = 0

	let j = 0
	passports.forEach(passport => {
		j++
		if (passportHasAllFields(passport)) {
			validPassportCount++;
		} else {
			console.log(j)
		}
	})

	return validPassportCount
}

let j = 0
function passportHasAllFields(passport: Array<any>): boolean {
	const requiredFields: Array<string> = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"]
	let validFieldCount: number = 0
	passport.forEach(field => {
		if (requiredFields.includes(field.substring(0, 3))) {
			validFieldCount++
		}
	})

	if (validFieldCount === requiredFields.length) {
		return true
	} else {
		return false
	}
}

async function p2020day4_part2(input: string) {
	let inputArray = input.split("\n\n") //?
	let passports: Array<any> = [];

	inputArray.forEach(line => {
		passports.push(line.replace(/\r?\n|\r/g, " ").replace(/\s+/g, "\n").split("\n"))
	})

	let validPassportCount: number = 0

	passports.forEach(passport => {
		if (passportHasAllFields(passport)) {
			if (passportFieldsAreValid(passport)) {
				validPassportCount++
			}
		}
	})

	return validPassportCount
}

function passportFieldsAreValid(passport: Array<any>): boolean {
	let p: any = []
	passport.forEach(field => p.push(field.split(":")))

	let pp: any = {}

	p.forEach((field: any[]) => {
		pp[field[0]] = field[1]
	})

	const byrRegx = /19[2-9]\d|200[0-2]/
	if (!(pp.byr.match(byrRegx))) {
		return false
	}

	const iyrRegex = /20[0-1]\d|2020/
	if (!(pp.iyr.match(iyrRegex))) {
		return false
	}
	const eyrRegex = /202[0-9]|2030/
	if (!(pp.eyr.match(eyrRegex))) {
		return false
	}

	const hgtRegex = /^((1[5-8]\d|19[0-3])cm|(59|6\d|7[0-6])in)$/
	if (!(pp.hgt.match(hgtRegex))) {
		return false
	}

	const hclRegex: any = /^#[0-9a-f]{6}$/
	if (!pp.hcl.match(hclRegex)) {
		return false
	}

	const pidRegex: any = /^[0-9]{9}$/
	if (!pp.pid.match(pidRegex)) {
		return false
	}

	const eclRequirements: any = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"]
	if (!eclRequirements.includes(pp.ecl)) {
		return false
	}
	return true

}

async function run() {
	const part1tests: TestCase[] = [{
		input: `ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm

iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:1929

hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:179cm

hcl:#cfa07d eyr:2025 pid:166559648
iyr:2011 ecl:brn hgt:59in`,
		expected: `2`
	}];
	const part2tests: TestCase[] = [{
		input: `eyr:1972 cid:100
hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926

iyr:2019
hcl:#602927 eyr:1967 hgt:170cm
ecl:grn pid:012533040 byr:1946

hcl:dab227 iyr:2012
ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277

hgt:59cm ecl:zzz
eyr:2038 hcl:74454a iyr:2023
pid:3556412378 byr:2007

pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980
hcl:#623a2f

eyr:2029 ecl:blu cid:129 byr:1989
iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm

hcl:#888785
hgt:164cm byr:2001 iyr:2015 cid:88
pid:545766238 ecl:hzl
eyr:2022

iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719`,
		expected: `4`
	}];

	// Run tests
	test.beginTests()
	test.beginSection(false);
	for (const testCase of part1tests) {
		test.logTestResult(testCase, String(await p2020day4_part1(testCase.input)));
	}
	test.beginSection(false);
	for (const testCase of part2tests) {
		test.logTestResult(testCase, String(await p2020day4_part2(testCase.input)));
	}
	test.endTests();

	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2020day4_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now()
	const part2Solution = String(await p2020day4_part2(input));
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
