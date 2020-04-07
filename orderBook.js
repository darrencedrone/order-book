const isCompatible = (existingOrder, incomingOrder) => existingOrder.type !== incomingOrder.type && existingOrder.price === incomingOrder.price

const reconcileOrder = (existingBook, incomingOrder) => {
  for (let i = 0; i < existingBook.length; i++) {
    if (isCompatible(existingBook[i], incomingOrder) && existingBook[i].quantity === incomingOrder.quantity) {
      return existingBook.slice(0, i).concat(existingBook[i + 1]).filter(value => value.quantity)
    } else if (isCompatible(existingBook[i], incomingOrder) && existingBook[i].quantity > incomingOrder.quantity) {
      existingBook[i].quantity -= incomingOrder.quantity
      return existingBook.slice(0, i).concat(existingBook[i + 1]).concat([existingBook[i]]).filter(value => value.quantity)
    } else if (isCompatible(existingBook[i], incomingOrder) && existingBook[i].quantity < incomingOrder.quantity) {
      incomingOrder.quantity -= existingBook[i].quantity
      existingBook[i] = 0
    }
  } return existingBook.concat([incomingOrder]).filter(value => value.quantity)
}

module.exports = reconcileOrder