import {
  searchAddressByAmphoe,
  searchAddressByProvince,
  searchAddressByTambon,
  searchAddressByZipcode,
} from "./index"

describe("More then 1 zipcode District", function () {
  it("District ปราณบุรี have 2 result", function () {
    let result = searchAddressByTambon("ปราณบุรี")
    expect(result.length).toBe(2)
    expect(
      result.filter((item) => item.province === "ประจวบคีรีขันธ์").length
    ).toBe(2)
  })
  it("District วังก์พง have 2 result", function () {
    let result = searchAddressByTambon("วังก์พง")
    expect(result.length).toBe(2)
    expect(
      result.filter((item) => item.province === "ประจวบคีรีขันธ์").length
    ).toBe(2)
  })
  it("District หนองตาแต้ม have 2 result", function () {
    let result = searchAddressByTambon("หนองตาแต้ม")
    expect(result.length).toBe(2)
    expect(
      result.filter((item) => item.province === "ประจวบคีรีขันธ์").length
    ).toBe(2)
  })
  it("District เขาจ้าว have 2 result", function () {
    let result = searchAddressByTambon("เขาจ้าว")
    expect(result.length).toBe(2)
    expect(
      result.filter((item) => item.province === "ประจวบคีรีขันธ์").length
    ).toBe(2)
  })
  it("District สามร้อยยอด have 2 result", function () {
    let result = searchAddressByTambon("สามร้อยยอด")
    expect(result.length).toBe(2)
    expect(
      result.filter((item) => item.province === "ประจวบคีรีขันธ์").length
    ).toBe(2)
  })
  it("District เขาน้อย have 2 result", function () {
    let result = searchAddressByTambon("เขาน้อย")
    expect(
      result.filter((item) => item.province === "ประจวบคีรีขันธ์").length
    ).toBe(2)
  })
})

describe("search", function () {
  it("searchAddressByTambon", function () {
    let result = searchAddressByTambon("อรัญประเทศ")
    expect(result.length).toBe(1)

    result = searchAddressByTambon(" อรัญประเทศ")
    expect(result.length).toBe(1)

    result = searchAddressByTambon("อรัญประเทศ ")
    expect(result.length).toBe(1)

    result = searchAddressByTambon("  อรัญประเทศ  ")
    expect(result.length).toBe(1)

    result = searchAddressByTambon("")
    expect(result.length).toBe(0)

    result = searchAddressByTambon("  ")
    expect(result.length).toBe(0)
  })

  it("searchAddressByAmphoe", function () {
    let result = searchAddressByAmphoe("อรัญประเทศ")
    expect(result.length).toBe(13)

    result = searchAddressByAmphoe("")
    expect(result.length).toBe(0)
  })

  it("searchAddressByProvince", function () {
    let result = searchAddressByProvince("สระแก้ว")
    expect(result.length).toBe(20)

    result = searchAddressByProvince("สระแก้ว", 10)
    expect(result.length).toBe(10)

    result = searchAddressByProvince("อรัญประเทศ")
    expect(result.length).toBe(0)

    result = searchAddressByProvince("")
    expect(result.length).toBe(0)
  })

  it("searchAddressByZipcode", function () {
    let result = searchAddressByZipcode("27120")
    expect(result.length).toBe(15)

    result = searchAddressByZipcode(27120)
    expect(result.length).toBe(15)

    result = searchAddressByZipcode(27120, 5)
    expect(result.length).toBe(5)

    result = searchAddressByZipcode("")
    expect(result.length).toBe(0)
  })
})
