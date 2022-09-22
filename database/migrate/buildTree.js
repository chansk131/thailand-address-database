const tree = require("./database.json")
const fs = require("fs")

console.log("123")

const sortAlphabetAsc = (a, b) => {
  if (a[0] < b[0]) return -1
  if (a[0] > b[0]) return 1
  return 0
}

let provinces = []
let resultTree = tree
  .map((item) => {
    if (!provinces.find((prov) => prov === item.province)) {
      provinces.push(item.province)
      console.log(item.province + " ------- Done !")
      let provinceTree = tree.filter(
        (treeItem) => treeItem.province === item.province
      )
      let amphoes = []
      return [
        item.province,
        provinceTree
          .map((provinceTreeItem) => {
            let amphoeTree = tree.filter(
              (treeItem) =>
                treeItem.province === provinceTreeItem.province &&
                treeItem.amphoe === provinceTreeItem.amphoe
            )
            if (!amphoes.find((amphoe) => amphoe === provinceTreeItem.amphoe)) {
              amphoes.push(provinceTreeItem.amphoe)
              let tambons = []
              return [
                provinceTreeItem.amphoe,
                amphoeTree
                  .map((amphoeTreeItem) => {
                    let tambonTree = tree.filter(
                      (treeItem) =>
                        treeItem.province === amphoeTreeItem.province &&
                        treeItem.amphoe === amphoeTreeItem.amphoe &&
                        treeItem.tambon === amphoeTreeItem.tambon
                    )
                    if (
                      !tambons.find(
                        (tambon) => tambon === amphoeTreeItem.tambon
                      )
                    ) {
                      tambons.push(amphoeTreeItem.tambon)
                      // console.log(amphoeTreeItem.province + ' -- ' + amphoeTreeItem.amphoe + ' -- ' + amphoeTreeItem.tambon + ' ------- Done !')
                      return [
                        amphoeTreeItem.tambon,
                        tambonTree.map((tambonTreeItem) => {
                          return tambonTreeItem.zipcode
                        }),
                      ]
                    }
                  })
                  .filter(Boolean)
                  .sort(sortAlphabetAsc),
              ]
            }
          })
          .filter(Boolean)
          .sort(sortAlphabetAsc),
      ]
    }
  })
  .filter(Boolean)
  .sort(sortAlphabetAsc)

fs.writeFileSync("./database/migrate/tree.json", JSON.stringify(resultTree))
