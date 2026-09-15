import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { contrastRatio, flatten, isHex, mix, withAlpha } from "./color.ts";

describe("contrastRatio", () => {
  it("is 21 for black on white", () => {
    assert.equal(contrastRatio("#000000", "#FFFFFF"), 21);
  });

  it("is 1 for a colour on itself", () => {
    assert.equal(contrastRatio("#7CC2FF", "#7CC2FF"), 1);
  });

  it("does not depend on argument order", () => {
    assert.equal(contrastRatio("#0E1322", "#E9C46A"), contrastRatio("#E9C46A", "#0E1322"));
  });

  it("matches the published 4.54:1 for #767676 on white", () => {
    assert.equal(contrastRatio("#767676", "#FFFFFF").toFixed(2), "4.54");
  });
});

describe("withAlpha", () => {
  it("appends the opacity as a byte", () => {
    assert.equal(withAlpha("#7CC2FF", 0.25), "#7CC2FF40");
  });

  it("replaces an existing alpha rather than appending a second", () => {
    assert.equal(withAlpha("#7CC2FF40", 1), "#7CC2FFFF");
  });
});

describe("mix", () => {
  it("returns the midpoint at half weight", () => {
    assert.equal(mix("#000000", "#FFFFFF", 0.5), "#808080");
  });

  it("returns the start colour at zero weight", () => {
    assert.equal(mix("#E9C46A", "#FFFFFF", 0), "#E9C46A");
  });
});

describe("flatten", () => {
  it("composites a translucent colour onto its background", () => {
    assert.equal(flatten("#FFFFFF80", "#000000"), "#808080");
  });

  it("leaves an opaque colour unchanged", () => {
    assert.equal(flatten("#E9C46A", "#000000"), "#E9C46A");
  });
});

describe("isHex", () => {
  it("accepts six and eight digit uppercase hex", () => {
    assert.ok(isHex("#0E1322"));
    assert.ok(isHex("#0E132280"));
  });

  it("rejects lowercase, shorthand and unprefixed values", () => {
    assert.ok(!isHex("#0e1322"));
    assert.ok(!isHex("#FFF"));
    assert.ok(!isHex("0E1322"));
  });
});
