import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { renderBadge } from "./badge.ts";

describe("renderBadge", () => {
  it("draws the cloud, the puff and the glyph", () => {
    const svg = renderBadge([{ d: "M0 0h24v24H0z", fill: "#FFCB5C" }]);
    assert.equal(svg.match(/<path /g)?.length, 3);
    assert.match(svg, /<path d="M0 0h24v24H0z" fill="#FFCB5C"\/>/);
  });

  it("omits the clip paths when no layer is split", () => {
    assert.doesNotMatch(renderBadge([{ d: "M0 0h1v1z", fill: "#FFCB5C" }]), /<defs>/);
  });

  it("draws a split layer twice, once per clipped half", () => {
    const svg = renderBadge([{ d: "M0 0h1v1z", fill: "#5CC8FF", split: "#FFCB5C" }]);
    assert.match(svg, /<defs>/);
    assert.match(svg, /fill="#5CC8FF" clip-path="url\(#upper\)"/);
    assert.match(svg, /fill="#FFCB5C" clip-path="url\(#lower\)"/);
  });

  it("drops the outline for line-drawn logos only where asked", () => {
    assert.match(
      renderBadge([{ d: "M0 0h1v1z", fill: "#FFCB5C", noOutline: true }]),
      /fill="#FFCB5C" stroke="none"/,
    );
    assert.doesNotMatch(renderBadge([{ d: "M0 0h1v1z", fill: "#FFCB5C" }]), /stroke="none"/);
  });

  it("applies the even-odd rule only where asked", () => {
    assert.match(renderBadge([{ d: "M0 0h1v1z", fill: "#FFCB5C", evenOdd: true }]), /evenodd/);
    assert.doesNotMatch(renderBadge([{ d: "M0 0h1v1z", fill: "#FFCB5C" }]), /evenodd/);
  });
});
