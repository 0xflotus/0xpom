const execa = require("execa").shellSync;

test("01 0xpom with valid date", () => {
  const { stdout } = execa("0xpom 2018-11-30");
  expect(stdout).toBe("Last Quarter");
});

test("02 0xpom with todays date", () => {
  expect(() => {
    const today = new Date();
    const [{ stdout: stdone }, { stdout: stdtwo }] = [
      execa(
        `0xpom ${today.getFullYear()}-${today.getMonth()}-${today.getDay()}`
      ),
      execa("0xpom")
    ];
    expect(stdone).toBe(stdtwo);
  });
});

test("03 Should throw because of wrong Moon phase", () => {
  expect(() => {
    const { stdout } = execa("0xpom 2018-11-30");
    expect(stdout).toBe("Full Moon");
  }).toThrow();
});

test("04 right emoji", () => {
  const { stdout: stdone } = execa("0xpom 2018-11-30 -e");
  expect(stdone).toBe("🌗");

  const { stdout: stdtwo } = execa("0xpom -e 2018-11-30");
  expect(stdtwo).toBe("🌗");
});

test("05 test three dates in a row", () => {
  [1, 2, 3]
    .map(num => execa("0xpom 2018-11-0" + num).stdout)
    .forEach(e => {
      expect(e).toBe("Last Quarter");
    });
});

test("06 test help flag", () => {
  const { stdout } = execa("0xpom -h");
  ["d", "e", "h"].forEach(e =>
    expect.apply({}, [stdout]).toMatch(new RegExp("-" + e))
  );
});

test("07 test -d flag", () => {
  const { stdout } = execa("0xpom -d 2018-11-11");
  expect(stdout).toBe("399157 km");
});
