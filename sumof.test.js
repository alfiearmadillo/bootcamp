//const { expect } = require("expect")
//const { test } = require("picomatch")
const testing = require("./sumof.js")
const sumOf = new testing

test("10 and 5 makes 15", () => {
    expect(sumOf.sumof(10,5)).toBe(15)
})

test("Should be only numbers", () => {
   expect(sumOf.sumof("𒐫𒈙",1)).toBe("nice try")
})

test("Both have values", () => {
    expect(sumOf.sumof("",)).toBe("nice try")
 })

 test("Isnt boolean", () => {
    expect(sumOf.sumof(true,false)).toBe("nice try")
 })

 test("big number", () => {
    expect(sumOf.sumof(87454987598743658764387569874365874387568734658746387568734657463756438765743656438756873465,487653657638745687364587638745687364587634875687346587364875638746587346587634875638745)).toBe(8.74554752524013e+91)
 })

 test("Exact", () => {
    expect(sumOf.sumof(0.9999999999999999,1)).toBe(2)
 })

 test("math", () => {
    expect(sumOf.sumof(-73+26,174/63.9)).toBe(-44.27699530516432)
 })

 test("complex number", () => {
    expect(sumOf.sumof(Math.sqrt(-1),1)).toBe("nice try")
 })
