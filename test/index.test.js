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
  }).toThrow();
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
