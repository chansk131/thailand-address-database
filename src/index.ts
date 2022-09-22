import db from "../database/db.json"

export type Address = {
  tambon: string
  amphoe: string
  province: string
  zipcode: string
}

const preprocess = (data): Address[] => {
  let lookup: string[] = []
  let words: string[] = []
  let expanded = []
  let useLookup = false
  let t

  if (data.lookup && data.words) {
    // compact with dictionary and lookup
    useLookup = true
    lookup = data.lookup.split("|")
    words = data.words.split("|")
    data = data.data
  }

  t = function (text: string) {
    function repl(m: string) {
      let ch = m.charCodeAt(0)
      return words[ch < 97 ? ch - 65 : 26 + ch - 97]
    }
    if (!useLookup) {
      return text
    }
    if (typeof text === "number") {
      text = lookup[text]
    }
    return text.replace(/[A-Z]/gi, repl)
  }

  if (!data[0].length) {
    // non-compacted database
    return data
  }
  // decompacted database in hierarchical form of:
  // [["province",[["amphur",[["district",["zip"...]]...]]...]]...]
  data.map(function (provinces) {
    let i = 1

    provinces[i].map(function (amphoes) {
      amphoes[i].map(function (tambons) {
        tambons[i] = tambons[i] instanceof Array ? tambons[i] : [tambons[i]]
        tambons[i].map(function (zipcode) {
          let entry = {
            tambon: t(tambons[0]),
            amphoe: t(amphoes[0]),
            province: t(provinces[0]),
            zipcode: zipcode,
          }
          expanded.push(entry)
        })
      })
    })
  })
  return expanded
}

const data = preprocess(db)

const resolveResultbyField = (
  type: keyof Address,
  searchString: string,
  maxResult?: number
): Address[] => {
  searchString = searchString.toString().trim()
  if (searchString === "") {
    return []
  }
  if (!maxResult) {
    maxResult = 20
  }
  let possibles = []
  try {
    possibles = data
      .filter((item) => {
        let regex = new RegExp(searchString, "g")
        return (item[type] || "").toString().match(regex)
      })
      .slice(0, maxResult)
  } catch (e) {
    return []
  }
  return possibles
}

export const searchAddressByTambon = (
  searchString: string,
  maxResult?: number
): Address[] => {
  return resolveResultbyField("tambon", searchString, maxResult)
}
export const searchAddressByAmphoe = (
  searchString: string,
  maxResult?: number
): Address[] => {
  return resolveResultbyField("amphoe", searchString, maxResult)
}
export const searchAddressByProvince = (
  searchString: string,
  maxResult?: number
): Address[] => {
  return resolveResultbyField("province", searchString, maxResult)
}
export const searchAddressByZipcode = (
  searchString: string | number,
  maxResult?: number
): Address[] => {
  return resolveResultbyField("zipcode", searchString.toString(), maxResult)
}
